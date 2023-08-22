import { Display } from '../src/display/Display';
import { BaseReader } from '../src/readers/BaseReader.js';

describe('Display', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should get room data from reader correctly', async () => {
        const mockReadData = jest.fn().mockResolvedValue([
            { number: '101', type: 'Standard', occupancy: 2, price: 100 },
            { number: '102', type: 'Deluxe', occupancy: 3, price: 150 },
        ]);

        BaseReader.readData = mockReadData;

        const filePath = '/fake/rooms.csv';
        const display = new Display(BaseReader, filePath);
        const rooms = await display.getRoomData();

        expect(mockReadData).toHaveBeenCalledWith(filePath);
        expect(rooms).toEqual([
            { number: '101', type: 'Standard', occupancy: 2, price: 100 },
            { number: '102', type: 'Deluxe', occupancy: 3, price: 150 },
        ]);
    });

    it('should handle reader error gracefully', async () => {
        const mockReadData = jest.fn().mockRejectedValue(new Error('Reader error'));

        BaseReader.readData = mockReadData;

        const filePath = '/fake/rooms.csv';
        const display = new Display(BaseReader, filePath);
        const rooms = await display.getRoomData();

        expect(mockReadData).toHaveBeenCalledWith(filePath);
        expect(rooms).toEqual([]);
    });
});
