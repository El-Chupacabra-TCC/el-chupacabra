import ITask from "../Tasks/ITask";

/**
 * Represents a contract for collecting an execution metric.
 * @interface
 */
export default interface IMetric {
    /**
     * Marks the start of the profiling for the metric.
     */
    start(): void;

    /**
     * Collects data related to the execution metric.
     * @returns {Promise<Record<string, any>>} A record containing the collected metric data.
     */
    collect(): Promise<Record<string, any>>;
}
