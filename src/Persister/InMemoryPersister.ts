import IPersister from './IPersister';

/**
 * A simple in-memory persister that stores data for later retrieval.
 */
export default class InMemoryPersister implements IPersister {
    private storedData: Record<string, any> = {};

    /**
     * @inheritdoc
     */
    async save(dataToPersist: Record<string, any>): Promise<void> {
        this.storedData = dataToPersist;
    }

    /**
     * Retrieve the stored data.
     */
    getStoredData(): Record<string, any> {
        return this.storedData;
    }
}
