import DeltaTimeMetric from "../Metrics/DeltaTimeMetric.js"
import FunctionLengthMetric from "../Metrics/FunctionLengthMetric.js"
import IMetric from "../Metrics/IMetric.js"
import BaseTask from "./BaseTask.js"

/**
 * Calculates the first n prime numbers.
 * @extends {BaseTask}
 */
export default class FirstNPrimesTask extends BaseTask {
    private howManyToCalculate: number

    /**
     * Sets how many prime numbers must be calculated.
     * @param {IMetric[]} metrics - Metrics to be collected from this task.
     * @param {number} howMany - Amount of prime numbers to be calculates.
     */
    constructor(howMany: number) {
        super([new DeltaTimeMetric()]);
        this.metrics.push(new FunctionLengthMetric(this.execute));
        this.howManyToCalculate = howMany > 0 ? Math.floor(howMany) : 0
    }

    /**
     * @inheritdoc
     */
    protected async execute(): Promise<Record<string, any>> {
        const results: Record<string, any> = { amountOfPrimes: 0, primes: [] }
        const primes: number[] = []

        for (let i = 0; primes.length < this.howManyToCalculate; i++) {
            if (this.isPrime(i)) {
                primes.push(i)
            }
        }

        results.primes = primes
        results.amountOfPrimes = primes.length
        return results
    }

    private isPrime(i: number): boolean {
        i = Math.floor(i)

        if (i <= 3 || i == 7) {
            return i > 1
        }

        if (i % 2 == 0 || i % 3 == 0 || i % 7 == 0) {
            return false
        }

        for (let j = 5; j < Math.floor((i ** 0.5) + 1); j += 6) {
            if (i % j == 0 || i % (j + 2) == 0) {
                return false
            }
        }

        return true
    }
}
