import IMetric from "./IMetric";
import * as acorn from 'acorn';

/**
 * Measures the length of a function's abstract syntax tree (AST).
 * @implements {IMetric}
 */
export default class FunctionLengthMetric implements IMetric {
  private TargetFunction: Function;

  constructor(targetFunction: Function) {
    this.TargetFunction = targetFunction;
  }
  /**
     * @inheritdoc
     */
    start(): void {
      return
  }

  /**
   * @inheritdoc
   */
  async collect(): Promise<Record<string, any>> {
    const ast = acorn.parse(this.TargetFunction.toString(), {
      ecmaVersion: 2020,
      sourceType: "module",
    });

    const functionLength = this.calculateAstLength(ast);
    return { functionLength };
  }

  private calculateAstLength(node: any): number {
    let length: number = 0;

    function visitNode(node: any): void {
      length++;

      for (const key in node) {
        if (node[key] && typeof node[key] === "object") {
          if (Array.isArray(node[key])) {
            for (const item of node[key]) {
              if (item && typeof item === "object") {
                visitNode(item);
              }
            }
          } else {
            visitNode(node[key]);
          }
        }
      }
    }

    visitNode(node);

    return length;
  }
}
