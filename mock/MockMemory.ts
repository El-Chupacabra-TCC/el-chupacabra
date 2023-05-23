class Memory {
    private _total: number;
    constructor(total: number) {
        this._total = total;
    }
    malloc(size: number): any {
        this._total -= size;
        return {size};
    }
    free(block: any): void {
        this._total += block.size;
    }
    get total(): number {
        return this._total;
    }
}