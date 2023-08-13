import IMetric from "./IMetric";

/**
 * Measures the process memory consumption.
 * @implements {IMetric}
 */
export default class MemoryMetric implements IMetric {
    /**
     * @inheritdoc
     */
    async collect(): Promise<Record<string, any>> {
        const memoryConsumption = { consumption: -1, measurementApi: "" }

        // Checks if measureUserAgentSpecificMemory is available.
        if (window.crossOriginIsolated && !(performance as any).measureUserAgentSpecificMemory) {
            memoryConsumption.measurementApi = "measureUserAgentSpecificMemory"
            memoryConsumption.consumption = await (performance as any).measureUserAgentSpecificMemory()
        }

        else if (performance && (performance as any).memory) {
            memoryConsumption.measurementApi = "performance.memory"
            memoryConsumption.consumption = (performance as any).memory
        }

        else if (process && (process as any).memoryUsage) {
            memoryConsumption.measurementApi = "process.memoryUsage"
            memoryConsumption.consumption = process.memoryUsage().rss
        }

        return memoryConsumption
    }
}
