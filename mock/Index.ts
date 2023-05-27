class Index {
    public static async main() {
        const task = new CompositeTask();
        task.addTask(new MockTask("Task 1"));
        task.addTask(new MockTask("Task 2"));
        task.addTask(new MockTask("Task 3"));
        const project = new Project(new SheetsonPersister(), task);
        project.executeTask();
    }
}