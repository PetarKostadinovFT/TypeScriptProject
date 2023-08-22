export class JsonReader {
    static async readData(filePath) {
        if (JsonReader.cachedData[filePath]) {
            return JsonReader.cachedData[filePath];
        }
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`Failed to fetch JSON data from ${filePath}`);
        }
        const json = await response.json();
        JsonReader.cachedData[filePath] = json;
        return json;
    }
    async readData(filePath) {
        return JsonReader.readData(filePath);
    }
}
JsonReader.cachedData = {};
