import { Resource } from "../Helpers/MockResource";
import { Metric } from "./Metric";

export class GetDeltaTime extends Metric<number> {
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