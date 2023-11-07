import IExecutionProfile from "./ExecutionProfile/IExecutionProfile.js";
import BrowserExecutionProfile from "./ExecutionProfile/BrowserExecutionProfile.js";
export const ExecutionProfiles = {
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
import SheetsonPersister from "./Persister/SheetsonPersister.js";
import LogPersister from "./Persister/LogPersister.js";
export const Persisters = {
    SheetsonPersister,
    LogPersister
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

import { EasyElc as ez } from "./EasyElc/EasyElc.js";
export const EasyElc = ez;
