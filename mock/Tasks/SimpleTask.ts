abstract class SimpleTask extends Task {
  private name: string;
  private metrics: AbstractMetric [];

  constructor(name: string) {
    super();
    this.name = name;
    this.metrics = [];
  }
}
