import ITask from "../Tasks/ITask";
import IMetric from "./IMetric";

/**
 * Measures the time span between constructor and collect calls.
 * @implements {IMetric}
 */
export default class DeltaTimeMetric implements IMetric {
    private startTime: number = Date.now()

    /**
     * @inheritdoc
     */
    start(): void {
        this.startTime = Date.now()
    }

    /**
     * @inheritdoc
     */
    async collect(taskBeingExecuted: ITask): Promise<Record<string, any>> {
        const currentTime = Date.now()
        const deltaTime = currentTime - this.startTime

        const timeMeasurement = { deltaTime }

        return Promise.resolve(timeMeasurement)
    }
}
