import type IExecutionProfile from "../ExecutionProfile/IExecutionProfile";
import type IMetric from "../Metrics/IMetric";
import type IPersister from "../Persister/IPersister";
import Profiling from "./Profiling.js";

type _persistenceCallback = (profilingTree: Profiling | null) => void


/**
 * El Chupacabra simplified interface.
 */
export class EasyElc {
    protected _executionProfile: IExecutionProfile;
    protected _persister: IPersister;
    private _profilingsTree: Profiling | null;
    private _activeProfilingsStack: Profiling[];
    private _persistenceCallbacks: _persistenceCallback[];


    /**
     * Creates an instance of EasyElc.
     * @param {IExecutionProfile} executionProfile - The execution profile.
     * @param {IPersister} persister - The persister.
     */
    constructor(executionProfile: IExecutionProfile, persister: IPersister) {
        this._executionProfile = executionProfile;
        this._persister = persister;
        this._activeProfilingsStack = [];
        this._profilingsTree = null;
        this._persistenceCallbacks = [];
    }

    /**
     * Starts profiling using El Chupacabra.
     * @param {string} uniqueName - A unique name for the profiling operation.
     * @param {IMetric[]} metrics - An array of metrics to collect during profiling.
     * @returns {Object} An object with a 'finish' function to terminate the profiling.
     */
    startProfiling(uniqueName: string, metrics: IMetric[]): Record<string, any> {
        const newProfiling = new Profiling(uniqueName, metrics);

        if (this._profilingsTree === null) {
            this._profilingsTree = newProfiling;
        }
        else {
            const parentNode = this._getNewestActiveProfiling() ?? this._profilingsTree;

            if (uniqueName in parentNode.childs) {
                const numberOfAppearences = Object.keys(parentNode.childs).filter(k => k.match(new RegExp(`^${uniqueName}(\$|_[0-9]{1,}\$`))).length
                parentNode.childs[`${uniqueName}_${numberOfAppearences}`] = newProfiling;
            }
            else {
                parentNode.childs[uniqueName] = newProfiling;
            }
        }
        
        this._activeProfilingsStack.push(newProfiling);
        metrics.forEach(x => x.start());
        return { finish: (metadata: Record<string, any> | null = null) => {
            newProfiling.metadata = metadata;
            this._terminateProfiling(newProfiling);
        } };
    }

    /**
     * Registers a function that will be called after the persistence being successfully executed.
     * @param {_persistenceCallback} callback - It receives the profiling tree and should return void.
     */
    registerPersistenceCallback(callback: _persistenceCallback): void {
        this._persistenceCallbacks.push(callback);
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
            })
            .finally(() => {
                if (this._activeProfilingsStack.length === 0) {
                    this._saveResults().then(result => {
                        for (const callback of this._persistenceCallbacks) {
                            callback(result);
                        }
                    });
                }
            });
    }

    private async _saveResults(): Promise<Profiling | null> {
        if (this._activeProfilingsStack.length !== 0) {
            throw Error(
                `These profilings need to be stoped before saving the results: ${this._activeProfilingsStack.map(prof => prof.uniqueName)}`)
        }

        const profilingsTree = this._profilingsTree;
        const executionMetadata = await this._executionProfile.collect();
        const visitorId = executionMetadata.visitorId;
        delete executionMetadata.visitorId;

        const profilingsData = {
            datetime: new Date(),
            visitorId: visitorId,
            executionMetadata: JSON.stringify(executionMetadata),
            data: JSON.stringify(this._profilingsTree).replace("\"runningMetrics\":[],", "")
        }

        this._profilingsTree = null;
        await this._persister.save(profilingsData);
        return profilingsTree;
    }

    private _getNewestActiveProfiling(): Profiling | null {
        if (this._activeProfilingsStack.length === 0) {
            return null;
        }

        return this._activeProfilingsStack.slice(-1)[0];
    }
}
