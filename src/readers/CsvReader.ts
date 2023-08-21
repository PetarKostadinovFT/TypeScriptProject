import { BaseReader } from './BaseReader.js';
import { Room } from '../interfaces/Room.js';

export class CsvReader extends BaseReader {
  async readData(filePath: "./rooms.csv"): Promise<Room[]> {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Failed to fetch CSV data from ${filePath}`);
    }

    const csvText = await response.text();
    const lines = csvText.trim().split('\n');

    const headers = lines[0].split(',');
    const data: Room[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',');
      const room: Room = {
        number: values[0],
        type: values[1],
        occupancy: Number(values[2]), // Convert occupancy to a number
        price: parseFloat(values[3]), // Convert price to a number
      };

      data.push(room);
    }

    return data;
  }
}
