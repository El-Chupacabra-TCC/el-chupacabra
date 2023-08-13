import BrowserExecutionProfile from "./ExecutionProfile/BrowserExecutionProfile.js";
import IExecutionProfile from "./ExecutionProfile/IExecutionProfile.js";
import NodeExecutionProfile from "./ExecutionProfile/NodeExecutionProfile.js";

// const executionProfile = new BrowserExecutionProfile() as IExecutionProfile
const executionProfile = new NodeExecutionProfile() as IExecutionProfile

executionProfile.collect().then((data: any) => {
    console.log('Execution Profile Data:', data);
}).catch((error: any) => {
    console.error('Error collecting execution profile:', error);
});
