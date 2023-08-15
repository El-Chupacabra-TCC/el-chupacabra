import IMetric from "../Metrics/IMetric";

/**
 * Represents a contract for executing a task.
 * @interface
 */
export default interface ITask {
    /**
     * Executes the task.
     * @param {IMetric[]} metrics - Metrics to be collected during execution.
     * @returns {Promise<Record<string, any>>} A nested report with metrics and metadata about the
     * task execution.
     */
    run(metrics: IMetric[]): Promise<Record<string, any>>;
}
