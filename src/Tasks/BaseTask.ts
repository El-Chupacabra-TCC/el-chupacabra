import IMetric from "../Metrics/IMetric"
import ITask from "./ITask"

/**
 * Base for class for Task implementations.
 * @implements {ITask}
 */
export default abstract class BaseTask implements ITask {
    protected metrics: IMetric[]

    /**
     * Base constructor for all Tasks.
     * @param {IMetric[]} metrics - Metrics to be collected from this task.
     */
    constructor(metrics: IMetric[]) {
        this.metrics = metrics
    }

    /**
     * @inheritdoc
     */
    async run(): Promise<Record<string, any>> {
        await this.preTaskJob()
        const result = await this.execute(this.metrics)
        await this.postTaskJob()

        return { [this.constructor.name]: result }
    }

    /**
     * Executes the task with metric collection.
     * @abstract
     * @returns {Promise<Record<string, any>>} A promise that resolves with a report containing
     * metrics and data about the task execution.
     */
    protected abstract execute(metrics: IMetric[]): Promise<Record<string, any>>

    /**
     * Override this method to performs pre-task jobs.
     * @protected
     */
    protected async preTaskJob(): Promise<void> {
        return Promise.resolve()
    }

    /**
     * Override this method to performs post-task jobs.
     * @protected
     */
    protected async postTaskJob(): Promise<void> {
        return Promise.resolve()
    }
}
