import IMetric from "../Metrics/IMetric.js"
import BaseTask from "./BaseTask.js"

/**
 * Task which its behaviour is delegated to a function received in the constructor.
 * @template T - The type of the delegated function.
 * @extends {BaseTask}
 */
export default class DelegatedTask<T extends (...args: any[]) => any> extends BaseTask {
    private _name: string
    private _delegatedFunction: T
    private _args: any[]

    /**
     * Receives the delegated proceeding.
     * @param {IMetric[]} metrics - Metrics to be collected from this task.
     * @param {string} name - Helps to identify the result of particular instances.
     * @param {T} delegatedFunction - Delegated proceeding for this task.
     * @param {any[]} args - Arguments for the delegatedFunction.
     */
    constructor(metrics: IMetric[], name: string, delegatedFunction: T, args: any[]) {
        super(metrics)
        this._name = name
        this._delegatedFunction = delegatedFunction
        this._args = args
    }

    /**
     * @inheritdoc
     */
    protected async execute(): Promise<Record<string, any>> {
        const CELL_LIMIT_SIZE: number = 50000
        let result: string = ""

        try {
            result = this.toJson(this._delegatedFunction(...this._args))
        }
        catch (error: any) {
            result = error.toString() + '\n' + error.stack
            console.error(`An error occurred during \"${this._name}\":`, result)
        }

        const serializedArgs = this.toJsonWithLimit(this._args, CELL_LIMIT_SIZE)
        return {
            name: this._name,
            metadata: {
                input: serializedArgs,
                output: this.toJsonWithLimit(result, CELL_LIMIT_SIZE - serializedArgs.length)
            }
        }
    }

    protected toJsonWithLimit(obj: any, limit: number): string {
        const joinedString = this.toJson(obj)
      
        if (joinedString.length < limit) {
          return joinedString
        }

        return joinedString.substring(0, limit)
    }

    private toJson(obj: any): string {
        return JSON.stringify(obj, null, 2)
    }
}
