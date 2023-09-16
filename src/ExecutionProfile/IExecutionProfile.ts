import BaseTask from "../Tasks/BaseTask";
import ITask from "../Tasks/ITask";

/**
 * Represents a contract for collecting execution profile data.
 * @interface
 */
export default interface IExecutionProfile {
    /**
     * Collects execution profile data.
     * @returns {Promise<Record<string, any>>} An object containing every execution profile data the
     * implementation was able to collect.
     */
    collect(): Promise<Record<string, any>>;
}
