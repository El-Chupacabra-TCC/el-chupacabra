import { IPersister } from "./Persister/IPersister";
import { Task } from "./Tasks/Task";

export class Project {
  protected IPersister: IPersister;
  protected Task: Task;
  constructor(persister: IPersister, task: Task)
  {
    this.IPersister = persister;
    this.Task = task;
  }
  async executeTask(): Promise<void> {
    const result = await this.Task.run();
    await this.IPersister.save(result);
  }
}