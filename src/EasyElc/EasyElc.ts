import type IExecutionProfile from "../ExecutionProfile/IExecutionProfile";
import type IMetric from "../Metrics/IMetric";
import type IPersister from "../Persister/IPersister";
import Profiling from "./Profiling.js";

 
export default class EasyElc {
    protected _executionProfile: IExecutionProfile;
    protected _persister: IPersister;
    private _profilingsRoot: Profiling | null;
    private _activeProfilingsStack: Profiling[];

    constructor(executionProfile: IExecutionProfile, persister: IPersister) {
        this._executionProfile = executionProfile;
        this._persister = persister;
        this._activeProfilingsStack = [];
        this._profilingsRoot = null;
    }

    startProfiling(uniqueName: string, metrics: IMetric[]): Record<string, any> {
        const newProfiling = new Profiling(uniqueName, metrics);

        if (this._profilingsRoot === null) {
            this._profilingsRoot = newProfiling;
        }
        else {
            const parentNode = this._getNewestActiveProfiling() ?? this._profilingsRoot;
            if (uniqueName in parentNode.childs) {
                const numberOfAppearences = Object.keys(parentNode.childs).filter(k => k.match(new RegExp(`^${uniqueName}(\$|_[0-9]{1,}\$`))).length
                parentNode.childs[`${uniqueName}_${numberOfAppearences}`] = newProfiling;
            }
            else {
                parentNode.childs[uniqueName] = newProfiling;
            }
        }
        
        this._activeProfilingsStack.push(newProfiling);
        return { finish: async () => await this._terminateProfiling(newProfiling) };
    }

    private _terminateProfiling(aProfiling: Profiling): void {
        const index = this._activeProfilingsStack.indexOf(aProfiling);
        this._activeProfilingsStack.splice(index, 1);

        async function resolveMetrics(metrics: IMetric[]): Promise<Record<string, any>[]> {
            const result = [];

            for (const m of metrics) {
                result.push({ [m.constructor.name]: await m.collect() })
            }

            return result;
        }

        resolveMetrics(aProfiling.runningMetrics)
            .then(results => {
                aProfiling.metricsResults = results
                aProfiling.runningMetrics = []
            })
            .catch(err => {
                console.error(err);
                console.log("There was an error while collecting a metric.");
                aProfiling.metricsResults.push({ error: err})
            });
    }

    private _getNewestActiveProfiling(): Profiling | null {
        if (this._activeProfilingsStack.length === 0) {
            return null;
        }

        return this._activeProfilingsStack.slice(-1)[0];
    }
}
