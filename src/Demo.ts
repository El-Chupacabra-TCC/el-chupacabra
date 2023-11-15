import IExecutionProfile from "./ExecutionProfile/IExecutionProfile.js";
import NodeExecutionProfile from "./ExecutionProfile/NodeExecutionProfile.js";
import DeltaTimeMetric from "./Metrics/DeltaTimeMetric.js";
import MemoryMetric from "./Metrics/MemoryMetric.js";
import JsonFilePersister from "./Persister/JsonFilePersister.js";
import Project from "./Project.js";
import CompositeTask from "./Tasks/CompositeTask.js";
import FirstNPrimesTask from "./Tasks/FirstNPrimesTask.js";
import ITask from "./Tasks/ITask.js";
import IPersister from "./Persister/IPersister.js";


// Setup which executionProfile and persister are used.
const executionProfile = new NodeExecutionProfile() as IExecutionProfile
const persister = new JsonFilePersister("./result.json") as IPersister

// Define the Task tree and which metrics are collected from each task.
const tasks = new CompositeTask(
    [new MemoryMetric(), new DeltaTimeMetric()],
    [
        new FirstNPrimesTask([new DeltaTimeMetric()], 100000),
        new FirstNPrimesTask([new DeltaTimeMetric()], 1000000)
    ]
) as ITask

// See the data collected in result.json.
const project = new Project(executionProfile, tasks, [persister])
project.executeTask()
