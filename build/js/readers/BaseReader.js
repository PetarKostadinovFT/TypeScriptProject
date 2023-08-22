export class BaseReader {
    static async readData(filePath) {
        throw new Error("This method should be implemented by subclasses");
    }
}
