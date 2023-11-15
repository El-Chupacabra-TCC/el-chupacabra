import fs from 'fs/promises';
import IPersister from './IPersister';

/**
 * A class to save data to an json file.
 */
export default class JsonFilePersister implements IPersister {
    private filePath: string;

    /**
     * Creates an instance of SheetsonPersister.
     * @param {string} filePath - The path to save the file.
     */
    constructor(filePath: string) {
        this.filePath = filePath;
    }

    /**
     * @inheritdoc
     */
    async save(data: Record<string, any>): Promise<void> {
        try {
            const jsonContent = JSON.stringify(data, null, 2); // Indentation for readability
            if(jsonContent != null)
            {
                await fs.writeFile(this.filePath, jsonContent, 'utf-8');
            }
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error saving data: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred while saving data.');
            }
        }
    }
}
