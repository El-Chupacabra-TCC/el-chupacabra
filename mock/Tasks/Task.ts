export abstract class Task {
  public name: string;

  run(): void {
    this.preTaskJob();
    this.execute();
    this.postTaskJob();
  }

  preTaskJob(): string {return 'preTaskJob';};
  abstract execute(): Promise<string>;
  postTaskJob(): string {return 'postTaskJob';};
}
