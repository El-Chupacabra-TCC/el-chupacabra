export class MockTime {
    public static sleep(
        min: number,
        max: number) : Promise<void> {
        const delayTime = Math.floor(
            Math.random() * (max - min) + min);
        return new Promise<void>((resolve) => 
            setTimeout(resolve, delayTime));
    }
}