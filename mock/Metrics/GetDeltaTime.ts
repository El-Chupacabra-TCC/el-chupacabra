import { Resource } from "../Helpers/MockResource";
import { AbstractMetric } from "./AbstractMetric";

export class GetDeltaTime extends AbstractMetric<number> {
  private date: number;
  constructor() {
    super();
    this.date = Date.now();
  }
  get metric(): number {
    return (Date.now() - this.date);
  }
  get name(): string {
    return "DeltaTime";
  }
}