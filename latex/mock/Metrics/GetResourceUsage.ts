import { Resource } from "../Helpers/MockResource";
import { AbstractMetric } from "./AbstractMetric";

export class GetResourceUsage extends AbstractMetric<number> {
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