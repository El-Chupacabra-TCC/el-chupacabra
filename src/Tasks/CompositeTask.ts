import IMetric from "../Metrics/IMetric.js"
import ITask from "./ITask.js"
import BaseTask from "./BaseTask.js"

/**
 * Represents a composite task that executes a collection of tasks and groups their results.
 * @extends {BaseTask}
 */
export default class CompositeTask extends BaseTask {
    private tasks: ITask[]
    private childTaskNamesMap: Record<string, Array<string>>

    /**
     * Creates an instance of CompositeTask with a collection of tasks.
     * @param {IMetric[]} metrics - Metrics to be collected from this group of tasks.
     * @param {ITask[]} tasks - A collection of tasks to be executed.
     */
    constructor(metrics: IMetric[], tasks: ITask[]) {
        super(metrics)
        this.tasks = tasks
        this.childTaskNamesMap = this.generateChildTaskNamesMap(tasks)
    }

    /**
     * @inheritdoc
     */
    protected async execute(): Promise<Record<string, any>> {
        const results: Record<string, any> = {}

        for (const task of this.tasks) {
            let taskResult = await task.run()
            let key = this.childTaskNamesMap[task.constructor.name].shift() || task.constructor.name
            results[key] = taskResult[task.constructor.name]
        }

        return results
    }

    private generateChildTaskNamesMap(tasks: ITask[]): Record<string, Array<string>> {
        const namesMap: Record<string, Array<string>>  = {}

        tasks.map(x => {
            const taskName = x.constructor.name

            if (!(taskName in namesMap)) {
                namesMap[taskName] = [`${taskName}_0`]
            }
            else {
                namesMap[taskName].push(`${taskName}_${namesMap[taskName].length}`)
            }
        })
        
        return namesMap
    }
}
