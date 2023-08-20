/**
 * Represents a contract for persisting data.
 * @interface
 */
export default interface Ipersister {
    /**
     * Saves data to a persistent storage.
     * @param {Record<string, any>} data - The data to be saved.
     * @returns {Promise<void>} A promise that resolves when the data is saved.
     */
    save(data: Record<string, any>): Promise<void>;
}
