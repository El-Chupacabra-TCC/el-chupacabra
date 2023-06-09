import { Task } from "./Task";

export class CompositeTask extends Task {
    private tasks: Task[];
  
    constructor() {
      super("Composite Task", []);
      this.tasks = [];
    }
  
    addTask(task: Task): void {
      this.tasks.push(task);
      task.metrics.forEach(element => {
        this.metrics.add(element);
      });
    }

    async execute(): Promise<any> {
      console.log("Executing composite task...");
      let tasks = {};
      for (const task of this.tasks) {
        tasks[task.name] = await task.run();
      }
      return tasks;
    }
  }
  