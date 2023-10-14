import IPersister from './IPersister';

/**
 * Just log the persistence calls.
 */
export default class LogPersister implements IPersister {

    /**
     * @inheritdoc
     */
    async save(data: Record<string, any>): Promise<void> {
        console.log(data)
    }
}
