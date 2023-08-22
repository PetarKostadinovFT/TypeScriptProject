export abstract class BaseReader {
  static async readData(filePath: string): Promise<any[]> {
    throw new Error("This method should be implemented by subclasses");
  }
}