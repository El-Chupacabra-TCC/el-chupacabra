import ITask from "../Tasks/ITask"
import IExecutionProfile from "./IExecutionProfile"

/**
 * Represents a class for collecting execution data in a Browser environment.
 * @implements {IExecutionProfile}
 */
export default class BrowserExecutionProfile implements IExecutionProfile {

    /**
     * @inheritdoc
     */
    async collect(): Promise<Record<string, any>> {
        const date = new Date()
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
                appVersion: window.navigator.appVersion,
                product: window.navigator.product,
                productSub: window.navigator.productSub,
                vendor: window.navigator.vendor,
                vendorSub: window.navigator.vendorSub,
                doNotTrack: window.navigator.doNotTrack,
                isWebdriver: typeof window.navigator.webdriver !== 'undefined' ? window.navigator.webdriver.toString() : 'unknown'
            },
            os: {
                timeZoneOffset: date.getTimezoneOffset()
            },
            hardware: {
                screen: {
                    width: screen.width,
                    height: screen.height,
                    colorDepth: screen.colorDepth,
                    pixelDepth: screen.pixelDepth,
                },
                hardwareConcurrency: window.navigator.hardwareConcurrency
            },
            volatile: {
                localeDatetime: {
                    date: date.toLocaleDateString(),
                    time: date.toLocaleTimeString()
                },
                totalJSHeapSize: (window.performance as any).memory?.totalJSHeapSize || -1
            }
        }

        const fingerprintString = JSON.stringify(
            {
                software: executionProfile.software,
                os: executionProfile.os,
                hardware: executionProfile.hardware
            })
        executionProfile.visitorId = await this.getVisitorId(fingerprintString)

        return executionProfile
    }

    private async getVisitorId(input: string): Promise<string> {
        const encoder = new TextEncoder();
        const data = encoder.encode(input);
        const buffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = new Uint8Array(buffer);
        const hashHex = Array.from(hashArray)
            .map(byte => byte.toString(16).padStart(2, '0'))
            .join('');
        return hashHex;
    }
}
