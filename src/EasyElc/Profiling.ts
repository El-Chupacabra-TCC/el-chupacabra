import IMetric from "../Metrics/IMetric";

export default class Profiling {
    uniqueName: string;
    runningMetrics: IMetric[];
    metricsResults: Record<string, any>[];
    childs: Record<string, Profiling>;

    constructor(uniqueName: string, metrics: IMetric[]) {
      this.uniqueName = uniqueName;
      this.runningMetrics = metrics;
      this.metricsResults = [];
      this.childs = {};
    }
}
