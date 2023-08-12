/**
 * Represents a contract for collecting execution profile data.
 * @interface
 */
export default interface IExecutionProfile {
    /**
     * Collects execution profile data.
     * @returns {Record<string, any>} An object containing every execution profile data the
     * implementation was able to collect.
     */
    collect(): Record<string, any>;
}
