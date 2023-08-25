export default class Flat {
  private static isBuffer(obj: any): boolean {
    return (
      obj &&
      obj.constructor &&
      typeof obj.constructor.isBuffer === 'function' &&
      obj.constructor.isBuffer(obj)
    );
  }

  private static keyIdentity<T>(key: T): T {
    return key;
  }

  public static flatten(target: Record<string, any>, opts: FlattenOptions = {}): Record<string, any> {
    const { delimiter = '.', maxDepth, transformKey = this.keyIdentity, safe } = opts;
    const output: Record<string, any> = {};

    const step = (object: Record<string, any>, prev = '', currentDepth = 1): void => {
      Object.keys(object).forEach((key) => {
        const value = object[key];
        const isarray = safe && Array.isArray(value);
        const type = Object.prototype.toString.call(value);
        const isbuffer = Flat.isBuffer(value);
        const isobject =
          type === '[object Object]' ||
          type === '[object Array]';

        const newKey = prev ? prev + delimiter + transformKey(key) : transformKey(key);

        if (!isarray && !isbuffer && isobject && Object.keys(value).length &&
          (!maxDepth || (currentDepth ?? 0) < maxDepth)) {
          step(value, newKey, (currentDepth ?? 0) + 1);
        } else {
          output[newKey] = value;
        }
      });
    };

    step(target);

    return output;
  }
}

interface FlattenOptions {
  delimiter?: string;
  maxDepth?: number;
  transformKey?: (key: string) => string;
  safe?: boolean;
}
