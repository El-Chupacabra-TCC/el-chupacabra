export abstract class AbstractMetric<TMetric> {
    constructor() {}
    abstract get metric(): TMetric;
    abstract get name(): string;
}