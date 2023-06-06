export class Resource {
    private static _total: number = 500;
    static alloc(size: number): any {
        this._total -= size;
        return {size};
    }
    static free(block: any): void {
        this._total += block.size;
    }
    static get total(): number {
        return this._total;
    }
}