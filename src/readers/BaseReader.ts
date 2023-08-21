export abstract class BaseReader {
  abstract readData(filePath: string): Promise<any[]>;
}

