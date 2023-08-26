import IExecutionProfile from "./ExecutionProfile/IExecutionProfile.js";
import BrowserExecutionProfile from "./ExecutionProfile/BrowserExecutionProfile.js";
import NodeExecutionProfile from "./ExecutionProfile/NodeExecutionProfile.js";
import DeltaTimeMetric from "./Metrics/DeltaTimeMetric.js";
import MemoryMetric from "./Metrics/MemoryMetric.js";
import SheetsonPersister from "./Persister/SheetsonPersister.js";
import JsonFilePersister from "./Persister/JsonFilePersister.js";
import Project from "./Project.js";
import CompositeTask from "./Tasks/CompositeTask.js";
import FirstNPrimesTask from "./Tasks/FirstNPrimesTask.js";
import ITask from "./Tasks/ITask.js";
import IPersister from "./Persister/IPersister.js";


export function Execute()
{
    // const executionProfile = new BrowserExecutionProfile() as IExecutionProfile
    const executionProfile = new NodeExecutionProfile() as IExecutionProfile

    const persister = new JsonFilePersister("./result.json") as IPersister
    // const persister = new SheetsonPersister(
    //     apiUrl
    //     apiKey
    //     spreadsheetId
    // ) as IPersister

    const tasks = new CompositeTask(
        [new MemoryMetric(), new DeltaTimeMetric()],
        [
            new FirstNPrimesTask([new DeltaTimeMetric()], 4),
            new FirstNPrimesTask([new DeltaTimeMetric()], 10)
        ]
    ) as ITask
    var project = new Project(executionProfile, tasks, persister)
    return project.executeTask()
}

Execute()
