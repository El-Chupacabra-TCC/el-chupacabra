import { Memory } from "../Helpers/MockMemory";
import { AbstractMetric } from "./AbstractMetric";

export class GetMemoryUsage extends AbstractMetric<number> {
  constructor() {
    super();
  }
  get metric(): number {
    return Memory.total;
  }
  get name(): string {
    return "Memory Usage";
  }
}