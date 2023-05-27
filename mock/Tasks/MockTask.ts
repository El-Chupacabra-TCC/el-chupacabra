class MockTask extends SimpleTask {
  private name: string;
  private metrics: AbstractMetric<any> [];

  constructor(name: string) {
    super();
    this.name = name;
    this.metrics = [];
  }

  async execute(): Promise<string> {
    this.metrics.push(new GetMemoryUsage());
    Memory.malloc(100);
    console.log(`Executing simple task: ${this.name}`);
    await Helpers.sleep(50, 100);
    return `Simple task executed: ${this.name}`;
  }
}
