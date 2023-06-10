import { Resource } from "../Helpers/MockResource";
import { Metric } from "./Metric";

export class GetResourceUsage extends Metric<number> {
  constructor() {
    super();
  }
  get metric(): number {
    return Resource.total;
  }
  get name(): string {
    return "Resource Usage";
  }
}