import { BaseReader } from './BaseReader.js';
export class JsonReader extends BaseReader {
    async readData(filePath) {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`Failed to fetch JSON data from ${filePath}`);
        }
        const json = await response.json();
        return json;
    }
}
