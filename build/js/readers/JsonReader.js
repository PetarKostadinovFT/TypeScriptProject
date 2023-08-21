import { BaseReader } from './BaseReader.js';
export class JsonReader extends BaseReader {
    constructor() {
        super(...arguments);
        this.cachedData = {};
    }
    async readData(filePath) {
        if (this.cachedData[filePath]) {
            return this.cachedData[filePath];
        }
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`Failed to fetch JSON data from ${filePath}`);
        }
        const json = await response.json();
        this.cachedData[filePath] = json;
        return json;
    }
}
