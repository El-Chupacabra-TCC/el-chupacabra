class Project {
  protected IPersister: IPersister;
  protected Task: Task;
  constructor(persister: IPersister, task: Task)
  {
    this.IPersister = persister;
    this.Task = task;
  }
  async executeTask(): Promise<void> {
    const data = await this.Task.execute();
    await this.IPersister.save(data);
  }
}