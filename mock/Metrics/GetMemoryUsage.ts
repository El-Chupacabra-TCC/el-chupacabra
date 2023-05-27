class GetMemoryUsage extends AbstractMetric<number> {
  constructor() {
    super();
  }
  get metric(): number {
    return Memory.total;
  }
}