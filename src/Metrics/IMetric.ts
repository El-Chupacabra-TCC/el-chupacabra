/**
 * Represents a contract for collecting an execution metric.
 * @interface
 */
export default interface IMetric {
    /**
     * Collects data related to the execution metric.
     * @returns {Promise<Record<string, any>>} A record containing the collected metric data.
     */
    collect(): Promise<Record<string, any>>;
}
