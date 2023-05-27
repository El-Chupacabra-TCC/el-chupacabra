import { SheetsonPersister } from './Persister/SheetsonPersister';
import { CompositeTask } from './Tasks/CompositeTask';
import { MockTask } from './Tasks/MockTask';
import { Project } from './Project';

export class Index {
    public static async main() {
        console.log("Hello world!");
        const task = new CompositeTask();
        task.addTask(new MockTask("Task 1"));
        task.addTask(new MockTask("Task 2"));
        task.addTask(new MockTask("Task 3"));
        const project = new Project(new SheetsonPersister(), task);
        project.executeTask();
    }
}

Index.main();