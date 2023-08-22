import { Display } from '../src/display/Display';
import { BaseReader } from '../src/readers/BaseReader';

describe('Display', () => {
    it('should get room data from the reader', async () => {
        const mockReader: BaseReader = {
            readData: jest.fn().mockResolvedValue([]),
        };

        const filePath = './rooms.csv';
        const display = new Display(mockReader, filePath);

        const result = await display.getRoomData();

        expect(result).toEqual([]);
        expect(mockReader.readData).toHaveBeenCalledWith(filePath);
    });

    it('should handle errors when reading data', async () => {
        const mockReader: BaseReader = {
            readData: jest.fn().mockRejectedValue(new Error('Mock Error')),
        };

        const filePath = './rooms.csv';
        const display = new Display(mockReader, filePath);

        const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();

        const result = await display.getRoomData();

        expect(result).toEqual([]);
        expect(mockReader.readData).toHaveBeenCalledWith(filePath);

        expect(consoleErrorMock).toHaveBeenCalledWith('Error reading and displaying data:', expect.any(Error));

        consoleErrorMock.mockRestore();
    });
});
