import BrowserExecutionProfile from "./ExecutionProfile/BrowserExecutionProfile.js";
import IExecutionProfile from "./ExecutionProfile/IExecutionProfile.js";
import NodeExecutionProfile from "./ExecutionProfile/NodeExecutionProfile.js";
import DeltaTimeMetric from "./Metrics/DeltaTimeMetric.js";
import IMetric from "./Metrics/IMetric.js";
import MemoryMetric from "./Metrics/MemoryMetric.js";
import JsonFilePersister from "./Persister/JsonFilePersister.js";
import Project from "./Project.js";
import CompositeTask from "./Tasks/CompositeTask.js";
import FirstNPrimesTask from "./Tasks/FirstNPrimesTask.js";
import ITask from "./Tasks/ITask.js";

// executionProfile.collect().then((data: any) => {
//     console.log('Execution Profile Data:', data);
// }).catch((error: any) => {
//     console.error('Error collecting execution profile:', error);
// });

// metric.collect().then((data: any) => {
//     console.log('Metric Data:', data);
// }).catch((error: any) => {
//     console.error('Error collecting metric:', error);
// });

export function Execute()
{
    // const executionProfile = new BrowserExecutionProfile() as IExecutionProfile
    const executionProfile = new NodeExecutionProfile() as IExecutionProfile

    // const metric = new DeltaTimeMetric() as IMetric
    const metric = new MemoryMetric() as IMetric


    const persister = new JsonFilePersister("./result.json")

    const tasks = new CompositeTask(
        [metric, new DeltaTimeMetric()],
        [
            new FirstNPrimesTask([new DeltaTimeMetric()], 4),
            new FirstNPrimesTask([new DeltaTimeMetric()], 10)
        ]
    ) as ITask
    //const results = tasks.run().then(x => console.log(JSON.stringify(x, null, 4))).catch(e => console.error("ERROR"))
    var project = new Project(executionProfile, tasks, persister)
    return project.executeTask()
}

if (typeof document !== "undefined") {
    const runButton: HTMLButtonElement | null = document?.getElementById("runButton") as HTMLButtonElement;

    (runButton ?? (() => {
        throw new Error("Error with the implementation of the button. Check the HTML.");
    }))?.addEventListener("click", function() {
        Execute();
    });
} else {
    Execute();
}

