import Ipersister from './IPersister'; // Assuming the path to the Ipersister interface

/**
 * A class to save data using the Sheetson API.
 */
export default class SheetsonPersister implements Ipersister {
    private apiUrl: string;
    private apiKey: string;
    private spreadsheetId: string;

    /**
     * Creates an instance of SheetsonPersister.
     * @param {string} apiUrl - The URL of the Sheetson API.
     * @param {string} apiKey - The API key for authentication.
     * @param {string} spreadsheetId - The ID of the Google Sheets spreadsheet.
     */
    constructor(apiUrl: string, apiKey: string, spreadsheetId: string) {
        this.apiUrl = apiUrl;
        this.apiKey = apiKey;
        this.spreadsheetId = spreadsheetId;
    }

    /**
     * @inheritdoc
     */
    async save(data: Record<string, any>): Promise<void> {
        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`,
                    'X-Sheetson-Spreadsheet-Id': this.spreadsheetId
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`Failed to save data: ${response.statusText}`);
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