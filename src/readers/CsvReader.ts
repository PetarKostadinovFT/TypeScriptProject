import { BaseReader } from './BaseReader.js';
import { Room } from '../interfaces/Room.js';

export class CsvReader extends BaseReader {
  private cachedData: Room[] | null = null;

  async readData(filePath: string): Promise<Room[]> {
    if (this.cachedData) {
      return this.cachedData;
    }

    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Failed to fetch CSV data from ${filePath}`);
    }

    const csvText = await response.text();
    const lines = csvText.trim().split('\n');

    const data: Room[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',');
      if (values.length !== 4) {
        throw new Error(`Invalid CSV data format at line ${i}`);
      }

      const room: Room = {
        number: values[0],
        type: values[1],
        occupancy: Number(values[2]),
        price: parseFloat(values[3]),
      };

      data.push(room);
    }

    this.cachedData = data;
    return data;
  }
}
