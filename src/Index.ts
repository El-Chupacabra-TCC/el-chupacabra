import BrowserExecutionProfile from "./ExecutionProfile/BrowserExecutionProfile.js";
import IExecutionProfile from "./ExecutionProfile/IExecutionProfile.js";
import NodeExecutionProfile from "./ExecutionProfile/NodeExecutionProfile.js";
import DeltaTimeMetric from "./Metrics/DeltaTimeMetric.js";
import IMetric from "./Metrics/IMetric.js";
import MemoryMetric from "./Metrics/MemoryMetric.js";

const executionProfile = new BrowserExecutionProfile() as IExecutionProfile
// const executionProfile = new NodeExecutionProfile() as IExecutionProfile

// const metric = new MemoryMetric() as IMetric
const metric = new DeltaTimeMetric() as IMetric

executionProfile.collect().then((data: any) => {
    console.log('Execution Profile Data:', data);
}).catch((error: any) => {
    console.error('Error collecting execution profile:', error);
});

metric.collect().then((data: any) => {
    console.log('Metric Data:', data);
}).catch((error: any) => {
    console.error('Error collecting metric:', error);
});
