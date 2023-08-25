/**
 * A utility class for flattening nested objects.
 */
export default class Flat {
  /**
   * Checks if an object is a buffer.
   * @param obj - The object to check.
   * @returns `true` if the object is a buffer, otherwise `false`.
   */
  private static isBuffer(obj: any): boolean {
    return (
      obj &&
      obj.constructor &&
      typeof obj.constructor.isBuffer === 'function' &&
      obj.constructor.isBuffer(obj)
    );
  }

  /**
   * Identity function that returns the input key as is.
   * @param key - The key to transform.
   * @returns The input key unchanged.
   */
  private static keyIdentity<T>(key: T): T {
    return key;
  }

  /**
   * Flattens a nested object.
   * @param target - The object to flatten.
   * @param opts - Options for the flattening process.
   * @returns The flattened object.
   */
  public static flatten(target: Record<string, any>, opts: FlattenOptions = {}): Record<string, any> {
    const { delimiter = '.', maxDepth, transformKey = this.keyIdentity, safe } = opts;
    const output: Record<string, any> = {};

    /**
     * Recursively steps through the object and flattens it.
     * @param object - The object to flatten.
     * @param prev - The prefix for the current key.
     * @param currentDepth - The current depth in the object hierarchy.
     */
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

/**
 * Options for the flattening process.
 */
interface FlattenOptions {
  delimiter?: string;
  maxDepth?: number;
  transformKey?: (key: string) => string;
  safe?: boolean;
}
