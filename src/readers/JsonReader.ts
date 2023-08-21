import { BaseReader } from './BaseReader.js';
import { Room } from '../interfaces/Room.js';

export class JsonReader extends BaseReader {
  async readData(filePath: "./rooms.json"): Promise<Room[]> {

    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Failed to fetch JSON data from ${filePath}`);
    }

    const json = await response.json();
    return json as Room[];
  }
}


