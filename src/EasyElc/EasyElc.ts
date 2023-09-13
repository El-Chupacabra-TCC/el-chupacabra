import type IExecutionProfile from "../ExecutionProfile/IExecutionProfile";
import type IMetric from "../Metrics/IMetric";
import type IPersister from "../Persister/IPersister";

 
export default class EasyElc {
    protected _executionProfile: IExecutionProfile;
    protected _persister: IPersister;
    private _profilerCallStack: string[] = [];
    private _profilingTree: Record<string, any> = { childs: {} };

    constructor(executionProfile: IExecutionProfile, persister: IPersister) {
        this._executionProfile = executionProfile;
        this._persister = persister;
    }

    startProfiling(uniqueName: string, metrics: IMetric[]): Record<string, any> {
        // Retornar objeto com função terminate. Ao invés, de passar token pro terminate.
        if (uniqueName == "metrics" || uniqueName == "childs") {
            throw new Error(`The name \"${uniqueName}\" is reserved. Please, choose other name.`);
        }

        if (this._profilerCallStack.includes(uniqueName) ||
            !this._isNameUnique(this._profilingTree.childs, uniqueName)) {
            throw new Error(`The name \"${uniqueName}\" is not unique.`);
        }

        let node = this._profilingTree.childs;
        for (const profilingName of this._profilerCallStack) {
            node = node[profilingName].childs;
        }

        node[uniqueName] = { metrics: metrics, childs: {} };
        this._profilerCallStack.push(uniqueName);
        const profilingHandler = { finish: async () => await this.terminateProfiling(uniqueName) };
        return profilingHandler;
    }

    async terminateProfiling(uniqueName: string): Promise<void> {
        // Remover o asincronismo
        const profilingIndex = this._profilerCallStack.findIndex(
            profilingName => profilingName == uniqueName);

        if (profilingIndex == -1) {
            throw new Error(`There is no active profiling named: ${uniqueName}.`);
        }
        this._profilerCallStack.splice(profilingIndex, 1);

        let childs = this._profilingTree.childs;
        const node = this._findNodeByName(this._profilingTree, uniqueName) ?? childs[uniqueName];
        node.metrics = await this._resolveMetrics(node.metrics);
    }

    private _isNameUnique(profilingTree: Record<string, any>, name: string): boolean {
        if (name in profilingTree) {
            return false;
        }

        const childResults = [];
        for (const key of Object.keys(profilingTree)) {
            childResults.push(this._isNameUnique(profilingTree[key].childs, name));
        }

        return childResults.length > 0 ? childResults.every(v => v == true) : true;
    }

    private async _resolveMetrics(metrics: IMetric[]): Promise<Record<string, any>[]> {
        const result: Record<string, any>[] = [];

        for (const metric of metrics) {
            result.push(await metric.collect());
        }

        return result;
    }

    private _findNodeByName(profilingTree: any, uniqueName: string): Record<string, any> | null {
        let childs = profilingTree.childs;

        if (uniqueName in childs) {
            return childs[uniqueName];
        }
        
        for (const childNode of Object.values(childs)) {
            let childResult = this._findNodeByName(childNode, uniqueName);

            if (childResult != null) {
                return childResult;
            }
        }

        return null;
    }
}
