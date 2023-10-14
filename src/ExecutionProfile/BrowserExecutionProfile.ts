import IExecutionProfile from "./IExecutionProfile";

type PluginMimeTypeData = {
  type: string;
  suffixes: string;
};

type PluginData = {
  name: string;
  description: string;
  mimeTypes: PluginMimeTypeData[];
};

type FontPreferences = {
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  fontStyle: string;
  lineHeight: string;
  textDecoration: string;
  // Add other font-related properties as needed
};
function withNaturalFonts<T>(
  action: (document: Document, container: HTMLElement) => Promise<T>,
  containerWidthPx = 4000
): Promise<T> {
  // Implement withNaturalFonts logic here
  return Promise.resolve(action(document, document.body));
}
/**
 * Represents a class for collecting execution data in a Browser environment.
 * @implements {IExecutionProfile}
 */
export default class BrowserExecutionProfile implements IExecutionProfile {
  /**
   * @inheritdoc
   */
  async collect(): Promise<Record<string, any>> {
    const date = new Date();
    const executionProfile: Record<string, any> = {
      software: {
        type: "Browser",
        userAgent: navigator.userAgent,
        language: navigator.language,
        windowInnerWidth: window.innerWidth,
        windowInnerHeight: window.innerHeight,
        devicePixelRatio: window.devicePixelRatio,
        appCodeName: window.navigator.appCodeName,
        appName: window.navigator.appName,
        hardwareConcurrency: window.navigator.hardwareConcurrency,
        appVersion: window.navigator.appVersion,
        product: window.navigator.product,
        platform: window.navigator.platform,
        productSub: window.navigator.productSub,
        vendor: window.navigator.vendor,
        vendorSub: window.navigator.vendorSub,
        doNotTrack: window.navigator.doNotTrack,
        msMaxTouchPoints: window.navigator.msMaxTouchPoints,
        isWebdriver:
          typeof window.navigator.webdriver !== "undefined"
            ? window.navigator.webdriver.toString()
            : "unknown",
        hasLocalStorage: !!window.localStorage,
        hasSessionStorage: !!window.sessionStorage,
      },
      os: {
        timeZoneOffset: date.getTimezoneOffset(),
        osCpu: navigator.oscpu,

        language: (() => {
          const language =
            navigator.language ||
            navigator.userLanguage ||
            navigator.browserLanguage ||
            navigator.systemLanguage;
          return Array.isArray(navigator.languages)
            ? [language, ...navigator.languages]
            : [language, ...(language ? language.split(",") : [])];
        })(),

        memory: navigator.deviceMemory || undefined,

        architecture: (() => {
          const f = new Float32Array(1);
          const u8 = new Uint8Array(f.buffer);
          f[0] = Infinity;
          f[0] = f[0] - f[0];
          return u8[3];
        })(),

        CpuClass: navigator.cpuClass || undefined,

        Plugins: (() => {
          const rawPlugins = navigator.plugins;
          if (!rawPlugins) return undefined;

          const plugins: PluginData[] = [];
          for (let i = 0; i < rawPlugins.length; ++i) {
            const plugin = rawPlugins[i];
            if (!plugin) continue;

            const mimeTypes: PluginMimeTypeData[] = [];
            for (let j = 0; j < plugin.length; ++j) {
              const mimeType = plugin[j];
              mimeTypes.push({
                type: mimeType.type,
                suffixes: mimeType.suffixes,
              });
            }

            plugins.push({
              name: plugin.name,
              description: plugin.description,
              mimeTypes,
            });
          }
          return plugins;
        })(),

        fontPreferences: (() => {
          const defaultFont = window.getComputedStyle(document.body);
          return {
            fontFamily: defaultFont.fontFamily,
            fontSize: defaultFont.fontSize,
            fontWeight: defaultFont.fontWeight,
            fontStyle: defaultFont.fontStyle,
            lineHeight: defaultFont.lineHeight,
            textDecoration: defaultFont.textDecoration,
          };
        })(),

        TouchSupport: (() => {
          const n = navigator;
          let maxTouchPoints =
            n.maxTouchPoints !== undefined
              ? Number(n.maxTouchPoints)
              : n.msMaxTouchPoints || 0;
          let touchEvent = false;
          try {
            document.createEvent("TouchEvent");
            touchEvent = true;
          } catch {
            touchEvent = false;
          }
          const touchStart = "ontouchstart" in window;
          return {
            maxTouchPoints,
            touchEvent,
            touchStart,
          };
        })(),
      },
      hardware: {
        screen: {
          width: screen.width,
          height: screen.height,
          colorDepth: screen.colorDepth,
          pixelDepth: screen.pixelDepth,
        },
        hardwareConcurrency: window.navigator.hardwareConcurrency,
      },
      volatile: {
        localeDatetime: {
          date: date.toLocaleDateString(),
          time: date.toLocaleTimeString(),
        },
        totalJSHeapSize:
          (window.performance as any).memory?.totalJSHeapSize || -1,
      },
    };

    const fingerprintString = JSON.stringify({
      software: this.RemoveMutableValues(executionProfile.software),
      os: this.RemoveMutableValues(executionProfile.os),
      hardware: this.RemoveMutableValues(executionProfile.hardware),
    });

    executionProfile.visitorId = await this.getVisitorId(fingerprintString);

    return executionProfile;
  }

  private RemoveMutableValues(dict: Record<string, any>): Record<string, any> {
    let result = JSON.parse(JSON.stringify(dict));
    const keysToRemove = ["windowInnerWidth","windowInnerHeight","screen.width","screen.height"];
  
    for (const key of keysToRemove) {
      const keys = key.split('.');
      if (keys.length === 1) {
        delete result[key];
      } else {
        this.removeNestedKey(result, keys);
      }
    }
  
    return result;
  }
  
  private removeNestedKey(obj: Record<string, any>, keys: string[]) {
    const key = keys[0];
    if (obj[key] && keys.length > 1) {
      this.removeNestedKey(obj[key], keys.slice(1));
    } else {
      delete obj[key];
    }
  }

  private async getVisitorId(input: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const buffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = new Uint8Array(buffer);
    const hashHex = Array.from(hashArray)
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
  }
}
