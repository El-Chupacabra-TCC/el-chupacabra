import IMetric from "./IMetric";

/**
 * Measures the process memory consumption.
 * @implements {IMetric}
 */
export default class MemoryMetric implements IMetric {
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
        const memoryConsumption = { usedApis: [] as string[], measurements: {} }
        const measurements = [
            await this.getNewBrowserApiMemoryData(),
            this.getOldBrowserApiMemoryData(),
            this.getNodeMemoryData()
        ]

        for (let m of measurements) {
            if (Object.keys(m).length === 0) {
                continue
            }

            memoryConsumption.usedApis.push(Object.keys(m)[0])
            memoryConsumption.measurements = { ...memoryConsumption.measurements, ...m }
        }

        return memoryConsumption
    }

    private async getNewBrowserApiMemoryData(): Promise<Record<string, any>> {
        try {
            if (!self.crossOriginIsolated) {
                Promise.resolve({})
            }

            return {
                ["measureUserAgentSpecificMemory"]: {
                    memory: await (performance as any).measureUserAgentSpecificMemory()
                }
            }
        }
        catch {
            return Promise.resolve({})
        }
    }

    private getOldBrowserApiMemoryData(): Record<string, any> {
        try {
            const memoryInfo = (performance as any).memory;
            return {
                ["performance.memory"]: {
                    usedJSHeapSize: memoryInfo.usedJSHeapSize,
                    totalJSHeapSize: memoryInfo.totalJSHeapSize,
                    jsHeapSizeLimit: memoryInfo.jsHeapSizeLimit
                }
            }
        }
        catch {
            return {}
        }
    }

    private getNodeMemoryData(): Record<string, any> {
        try {
            const memoryUsage = process.memoryUsage()
            return {
                ["process.memoryUsage"]: {
                    rss: memoryUsage.rss,
                    heapTotal: memoryUsage.heapTotal,
                    heapUsed: memoryUsage.heapUsed
                }
            }
        }
        catch {
            return {}
        }
    }
}
