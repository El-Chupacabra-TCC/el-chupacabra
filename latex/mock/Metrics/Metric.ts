export abstract class Metric<TMetric> {
    constructor() {}
    abstract get metric(): TMetric;
    abstract get name(): string;
}