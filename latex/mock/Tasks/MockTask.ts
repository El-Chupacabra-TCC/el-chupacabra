import { Helpers } from '../Helpers/Helpers';
import { Resource } from '../Helpers/MockResource';
import { Metric } from '../Metrics/Metric';
import { GetDeltaTime } from '../Metrics/GetDeltaTime';
import { GetResourceUsage } from '../Metrics/GetResourceUsage';
import { SimpleTask } from './SimpleTask';

export class MockTask extends SimpleTask {

  constructor(name: string) {
    super(name, [new GetResourceUsage(), new GetDeltaTime()]);
  }

  async execute(): Promise<any> {
    Resource.alloc(100);
    console.log(`Executing simple task: ${this.name}`);
    await Helpers.sleep(50, 100);
  }

  postTaskJob(): void {
    Resource.free({size: 100});
  }
}
