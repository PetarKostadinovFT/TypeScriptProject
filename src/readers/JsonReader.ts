import { BaseReader } from './BaseReader.js';
import { Room } from '../interfaces/Room.js';

export class JsonReader implements BaseReader {
  private static cachedData: Record<string, Room[]> = {};

  static async readData(filePath: string): Promise<Room[]> {
    if (JsonReader.cachedData[filePath]) {
      return JsonReader.cachedData[filePath];
    }

    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Failed to fetch JSON data from ${filePath}`);
    }

    const json = await response.json();
    JsonReader.cachedData[filePath] = json;
    return json as Room[];
  }

  async readData(filePath: string): Promise<Room[]> {
    return JsonReader.readData(filePath);
  }
}
