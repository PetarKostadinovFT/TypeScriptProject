import { BaseReader } from '../readers/BaseReader.js';
import { Room } from '../interfaces/Room.js';

export class Display {
  private reader: BaseReader;
  private filePath: string;

  constructor(reader: BaseReader, filePath: string) {
    this.reader = reader;
    this.filePath = filePath;
  }

  async getRoomData(): Promise<Room[]> {
    try {
      const rooms = await this.reader.readData(this.filePath);
      return rooms as Room[];
    } catch (error) {
      console.error('Error reading and displaying data:', error);
      return [];
    }
  }
}

