import ITask from "../Tasks/ITask";
import IMetric from "./IMetric";

/**
 * Measures the network consumption.
 * @implements {IMetric}
 */
export default class NetworkMetric  implements IMetric {
  private chunkMetrics: { chunkVelocity: number, time: number, size: number }[] = [];
  private totalSize: number = 0;

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
    try {
      const response = await fetch('your_url_here'); // Replace with your actual URL
      await this.fetchResponseMetrics(response);

      const totalTime = this.chunkMetrics.reduce((total, chunk) => total + chunk.time, 0);
      const averageVelocity = this.totalSize ? this.totalSize / totalTime : 0;

      const maxVelocity = Math.max(...this.chunkMetrics.map(chunk => chunk.chunkVelocity));
      const minVelocity = Math.min(...this.chunkMetrics.map(chunk => chunk.chunkVelocity));

      return {
        maxVelocity,
        minVelocity,
        averageVelocity,
        totalSize: this.totalSize,
        chunkMetrics: this.chunkMetrics.join(';')
      };
    } catch (error) {
      console.error("Error collecting network metric:", error);
      throw new Error("Failed to collect network metrics.");
    }
  }

  /**
   * Fetches the response and records chunk metrics.
   * @param {Response} resp - The response object.
   * @returns {Promise<void>}
   * @throws {Error} Throws an error if the response body is null or undefined.
   */
  async fetchResponseMetrics(resp: Response): Promise<void> {
    const chunks = [];
    const reader = resp.body?.getReader();
    const contentType = resp.headers.get("content-type") ?? "";
    this.totalSize = +(resp.headers.get("content-length") ?? 0);
    const startTime = performance.now();

    if (!reader) {
      throw new Error("Response body is null or undefined.");
    }

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);

      const endTime = performance.now();
      const totalTime = endTime - startTime;
      const chunkVelocity = value.length / totalTime;

      this.chunkMetrics.push({ chunkVelocity, time: totalTime, size: value.length });
    }

    // Do something with the chunks if needed
    // const blob = new Blob(chunks, { type: contentType });
  }
}