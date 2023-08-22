import { BaseReader } from './BaseReader.js';
import { Room } from '../interfaces/Room.js';
import { Cache } from '../interfaces/Cache.js'



export class JsonReader {
  // Static property to hold cached data
  private static cachedData: Cache = {};

  static async readData(filePath: string): Promise<any> {
    if (this.cachedData[filePath]) {
      return this.cachedData[filePath];
    }

    const response = await fetch(filePath);

    if (!response.ok) {
      throw new Error(`Failed to fetch JSON data from ${filePath}`);
    }

    const jsonData = await response.json();
    this.cachedData[filePath] = jsonData;

    return jsonData;
  }
}
