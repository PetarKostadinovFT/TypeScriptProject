import { Display } from '../src/display/Display';
import { CsvReader } from '../src/readers/CsvReader';
import { JsonReader } from '../src/readers/JsonReader';

describe('Display', () => {
    it('should fetch and display CSV data correctly', async () => {

        const mockCsvReader = new CsvReader();
        mockCsvReader.readData = jest.fn().mockResolvedValue([
            { number: '101', type: 'Standard', occupancy: 2, price: 100 },
            { number: '102', type: 'Deluxe', occupancy: 3, price: 150 },
        ]);

        const csvDisplay = new Display(mockCsvReader, './rooms.csv');
        const rooms = await csvDisplay.getRoomData();

        expect(rooms).toEqual([
            { number: '101', type: 'Standard', occupancy: 2, price: 100 },
            { number: '102', type: 'Deluxe', occupancy: 3, price: 150 },
        ]);
    });

    it('should fetch and display JSON data correctly', async () => {
        const mockJsonReader = new JsonReader();
        mockJsonReader.readData = jest.fn().mockResolvedValue([
            { number: '201', type: 'Standard', occupancy: 2, price: 120 },
            { number: '202', type: 'Deluxe', occupancy: 3, price: 180 },
        ]);

        const jsonDisplay = new Display(mockJsonReader, './rooms.json');
        const rooms = await jsonDisplay.getRoomData();

        expect(rooms).toEqual([
            { number: '201', type: 'Standard', occupancy: 2, price: 120 },
            { number: '202', type: 'Deluxe', occupancy: 3, price: 180 },
        ]);
    });

});