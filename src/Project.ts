import IExecutionProfile from "./ExecutionProfile/IExecutionProfile";
import IPersister from "./Persister/IPersister";
import ITask from "./Tasks/ITask";

/**
 * Represents a project that executes a task and saves its result using an execution profile and a persister.
 */
export default class Project {
    /**
     * The execution profile used to collect execution metric data.
     */
    protected ExecutionProfile: IExecutionProfile;

    /**
     * The persister used to save data.
     */
    protected Persisters: IPersister[];

    /**
     * The task to be executed.
     */
    protected Task: ITask;

    /**
     * Creates a new Project instance.
     * @param {IPersister} persister - The persister to be used for data saving.
     * @param {ITask} task - The task to be executed.
     * @param {IExecutionProfile} profile - The execution profile used to collect metric data.
     */
    constructor(profile: IExecutionProfile, task: ITask, persisters: IPersister[]) {
        this.ExecutionProfile = profile;
        this.Persisters = persisters;
        this.Task = task;
    }

    /**
     * Executes the task, collects execution profile data, and saves the result.
     * @returns {Promise<void>} A promise that resolves when the task is executed and data is saved.
     */
    async executeTask(): Promise<void> {
        try {
            const profileData = await this.ExecutionProfile.collect();

            const result = await this.Task.run();

            this.Persisters.forEach(async x => await x.save({
                profile: profileData,
                taskResult: result,
            }));
        } catch (error) {
            console.error("An error occurred during task execution:", error);
        }
    }
}
