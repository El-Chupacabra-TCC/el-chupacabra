abstract class AbstractMetric<TMetric> {
    constructor() {}
    abstract get metric(): TMetric;
}