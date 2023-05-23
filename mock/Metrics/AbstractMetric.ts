abstract class AbstractMetric {
    private _name: string;
    constructor() {
        this._name = "AbstractMetric";
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
}