export class MockTime {
    public static sleep(t: number, t2: number) : Promise<void> {
        return new Promise(
            r => setTimeout(
                r,~~ (Math.random()*(t2-t)+t)
            )
        );
    }
}