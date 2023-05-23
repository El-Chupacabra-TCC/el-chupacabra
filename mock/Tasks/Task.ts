abstract class Task {

  run(): void {
    this.preTaskJob();
    this.execute();
    this.postTaskJob();
  }

  preTaskJob(): string {return 'preTaskJob';};
  abstract execute(): Promise<string>;
  postTaskJob(): string {return 'postTaskJob';};
}
