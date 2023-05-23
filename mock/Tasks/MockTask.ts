class MockTask extends Task {
  private name: string;
  private metrics: AbstractMetric [];

  constructor(name: string) {
    super();
    this.name = name;
    this.metrics = [];
  }

  execute(): Promise<string> {
    this.metrics.push(new MockedMertric());
    console.log(`Executing simple task: ${this.name}`);
    return Helpers
      .sleep(50, 100)
      .then(() => `Simple task executed: ${this.name}`);
  }
}
