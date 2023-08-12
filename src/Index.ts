import BrowserExecutionProfile from "./ExecutionProfile/BrowserExecutionProfile.js";
import IExecutionProfile from "./ExecutionProfile/IExecutionProfile.js";

const executionProfile = new BrowserExecutionProfile() as IExecutionProfile

executionProfile.collect().then((data: any) => {
    console.log('Execution Profile Data:', data);
}).catch((error: any) => {
    console.error('Error collecting execution profile:', error);
});
