import IExecutionProfile from "./ExecutionProfile/IExecutionProfile.js";
import BrowserExecutionProfile from "./ExecutionProfile/BrowserExecutionProfile.js";
import NodeExecutionProfile from "./ExecutionProfile/NodeExecutionProfile.js";
export const ExecutionProfiles = {
    NodeExecutionProfile,
    BrowserExecutionProfile
};

import IMetric from "./Metrics/IMetric.js";
import DeltaTimeMetric from "./Metrics/DeltaTimeMetric.js";
import MemoryMetric from "./Metrics/MemoryMetric.js";
export const Metrics = {
    DeltaTimeMetric,
    MemoryMetric
};

import IPersister from "./Persister/IPersister.js";
import JsonFilePersister from "./Persister/JsonFilePersister.js";
import SheetsonPersister from "./Persister/SheetsonPersister.js";
export const Persisters = {
    JsonFilePersister,
    SheetsonPersister
};

import BaseTask from "./Tasks/BaseTask.js";
import CompositeTask from "./Tasks/CompositeTask.js";
import FirstNPrimesTask from "./Tasks/FirstNPrimesTask.js";
import ITask from "./Tasks/ITask.js";
export const Tasks = {
    BaseTask,
    CompositeTask,
    FirstNPrimesTask
};

import Project from "./Project.js";
export const project = Project;
