
/**
 * Represents a contract for executing a task.
 * @interface
 */
export default interface ITask {
    /**
     * Executes the task.
     * @returns {Promise<Record<string, any>>} A nested report with metrics and metadata about the
     * task execution.
     */
    run(): Promise<Record<string, any>>;
}
