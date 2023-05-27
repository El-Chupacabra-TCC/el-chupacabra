import { Memory } from "../Helpers/MockMemory";
import { AbstractMetric } from "./AbstractMetric";

export class GetDeltaTime extends AbstractMetric<number> {
  private date: Date;
  constructor() {
    super();
    this.date = new Date();
  }
  get metric(): number {
    let now = new Date();
    return (now.getTime() - this.date.getTime());
  }
  get name(): string {
    return "DeltaTime";
  }
}