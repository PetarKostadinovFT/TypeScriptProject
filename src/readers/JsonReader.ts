import { BaseReader } from './BaseReader.js';
import { Room } from '../interfaces/Room.js';

export class JsonReader extends BaseReader {
  private cachedData: Record<string, Room[]> = {};

  async readData(filePath: string): Promise<Room[]> {
    if (this.cachedData[filePath]) {
      return this.cachedData[filePath];
    }

    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Failed to fetch JSON data from ${filePath}`);
    }

    const json = await response.json();
    this.cachedData[filePath] = json;
    return json as Room[];
  }
}
