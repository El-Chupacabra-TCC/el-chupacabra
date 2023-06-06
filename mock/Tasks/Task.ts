import { AbstractMetric } from "../Metrics/AbstractMetric";

export abstract class Task {
  public name: string;
  public metrics: Set<AbstractMetric<any>>;

  constructor(name: string, metrics: AbstractMetric<any>[])
  {
    this.metrics = new Set(metrics);
    this.name = name;
  }

  async run(): Promise<any> {
    this.preTaskJob();
    let data = await this.execute();
    let metrics = {};
    this.metrics.forEach(element => {
      metrics[element.name] = element.metric;
    });
    this.postTaskJob();
    return {metrics, data};
  }

  preTaskJob(): void {};
  abstract execute(): Promise<any>;
  postTaskJob(): void {};
}
