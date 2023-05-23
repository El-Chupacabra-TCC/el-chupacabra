// Composite task that can contain subtasks
class CompositeTask extends Task {
    private tasks: Task[];
  
    constructor() {
      super();
      this.tasks = [];
    }
  
    addTask(task: Task): void {
      this.tasks.push(task);
    }

    async execute(): Promise<string> {
      console.log("Executing composite task...");
      for (const task of this.tasks) {
        task.execute();
      }
      return "Composite task executed";
    }
  }
  