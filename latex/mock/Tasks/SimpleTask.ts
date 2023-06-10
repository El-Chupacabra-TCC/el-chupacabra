import { Metric } from "../Metrics/Metric";
import { Task } from "./Task";

export abstract class SimpleTask extends Task {

  constructor(name: string, metrics: Metric<any>[]) {
    super(name, metrics);
  }
}
