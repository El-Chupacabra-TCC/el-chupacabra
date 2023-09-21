import IExecutionProfile from "./ExecutionProfile/IExecutionProfile.js";
import NodeExecutionProfile from "./ExecutionProfile/NodeExecutionProfile.js";
import DeltaTimeMetric from "./Metrics/DeltaTimeMetric.js";
import MemoryMetric from "./Metrics/MemoryMetric.js";
import SheetsonPersister from "./Persister/SheetsonPersister.js";
import Project from "./Project.js";
import CompositeTask from "./Tasks/CompositeTask.js";
import FirstNPrimesTask from "./Tasks/FirstNPrimesTask.js";
import ITask from "./Tasks/ITask.js";
import IPersister from "./Persister/IPersister.js";
import FunctionLengthMetric from "./Metrics/FunctionLengthMetric.js";
import JsonFilePersister from "./Persister/JsonFilePersister.js";


export function Execute()
{
    const executionProfile = new NodeExecutionProfile() as IExecutionProfile
    
    const persister = new SheetsonPersister(
        "NOME_DA_ABA_DA_SUA_PLANILHA",
        "API_KEY",
        "ID_DA_PLANILHA"
    ) as IPersister

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

