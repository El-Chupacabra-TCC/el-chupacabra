import IMetric from "./IMetric";
import acorn from "../node_modules/acorn/dist/acorn";

/**
 * Measures the length of a function's abstract syntax tree (AST).
 * @implements {IMetric}
 */
export default class FunctionLengthMetric implements IMetric {
  private targetFunction: Function;

  constructor(targetFunction: Function) {
    this.targetFunction = targetFunction;
  }

  /**
   * @inheritdoc
   */
  async collect(): Promise<Record<string, any>> {
    const ast = acorn.parse(this.targetFunction.toString(), {
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
