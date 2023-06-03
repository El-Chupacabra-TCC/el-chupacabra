import { AbstractMetric } from "../Metrics/AbstractMetric";
import { Task } from "./Task";

export abstract class SimpleTask extends Task {

  constructor(name: string, metrics: AbstractMetric<any>[]) {
    super(name, metrics);
  }
}
