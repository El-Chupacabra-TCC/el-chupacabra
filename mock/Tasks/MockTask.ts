import { Helpers } from '../Helpers/Helpers';
import { Memory } from '../Helpers/MockMemory';
import { AbstractMetric } from '../Metrics/AbstractMetric';
import { GetMemoryUsage } from '../Metrics/GetMemoryUsage';
import { SimpleTask } from './SimpleTask';

export class MockTask extends SimpleTask {
  private metrics: AbstractMetric<any> [];

  constructor(name: string) {
    super();
    this.name = name;
    this.metrics = [];
  }

  async execute(): Promise<any> {
    this.metrics.push(new GetMemoryUsage());
    Memory.malloc(100);
    console.log(`Executing simple task: ${this.name}`);
    await Helpers.sleep(50, 100);
    let metrics = {};
    this.metrics.forEach(element => {
      metrics[element.name] = element.metric;
    });
    Memory.free({size: 100});
    return metrics;
  }
}
