import { CsvReader } from '../src/readers/CsvReader';

describe('CsvReader', () => {

    const fetchMock = jest.spyOn(global, 'fetch');

    beforeEach(() => {
        fetchMock.mockReset();
    });

    afterAll(() => {
        fetchMock.mockRestore();
    });

    it('should fetch and parse CSV data correctly', async () => {
        const csvData = [
            'number,type,occupancy,price',
            '101,Standard,2,100',
            '102,Deluxe,3,150',
        ].join('\n');

        const mockResponse = new Response(csvData, {
            status: 200,
            headers: { 'Content-type': 'text/csv' },
        });

        fetchMock.mockResolvedValue(mockResponse);

        const csvReader = new CsvReader();
        const filePath = './rooms.csv';

        const result = await csvReader.readData(filePath);

        expect(result).toEqual([
            { number: '101', type: 'Standard', occupancy: 2, price: 100 },
            { number: '102', type: 'Deluxe', occupancy: 3, price: 150 },
        ]);

        expect(fetchMock).toHaveBeenCalledWith(filePath);
    });

    it('should throw an error when fetching fails', async () => {
        const mockResponse = new Response(null, { status: 404 });

        fetchMock.mockResolvedValue(mockResponse);

        const csvReader = new CsvReader();
        const filePath = './rooms.csv';

        await expect(csvReader.readData(filePath)).rejects.toThrowError(
            `Failed to fetch CSV data from ${filePath}`
        );
        expect(fetchMock).toHaveBeenCalledWith(filePath);
    });

    it('should handle parsing CSV data with different line endings', async () => {

        const csvData = 'number,type,occupancy,price\r\n101,Standard,2,100\n102,Deluxe,3,150\r';

        const mockResponse = new Response(csvData, {
            status: 200,
            headers: { 'Content-type': 'text/csv' },
        });

        fetchMock.mockResolvedValue(mockResponse);

        const csvReader = new CsvReader();
        const filePath = './rooms.csv';

        const result = await csvReader.readData(filePath);

        expect(result).toEqual([
            { number: '101', type: 'Standard', occupancy: 2, price: 100 },
            { number: '102', type: 'Deluxe', occupancy: 3, price: 150 },
        ]);

        expect(fetchMock).toHaveBeenCalledWith(filePath);
    });

    it('should handle invalid CSV data', async () => {
        const invalidCsvData = 'number,type,occupancy,price\n101,Standard,2\n102,Deluxe,3,150';

        const mockResponse = new Response(invalidCsvData, {
            status: 200,
            headers: { 'Content-type': 'text/csv' },
        });

        fetchMock.mockResolvedValue(mockResponse);

        const csvReader = new CsvReader();
        const filePath = './rooms.csv';

        await expect(csvReader.readData(filePath)).rejects.toThrowError(
            'Invalid CSV data format at line 1'
        );
        expect(fetchMock).toHaveBeenCalledWith(filePath);
    });

    it('should return cached data for subsequent calls', async () => {
        const csvData = [
            'number,type,occupancy,price',
            '101,Standard,2,100',
            '102,Deluxe,3,150',
        ].join('\n');

        const mockResponse = new Response(csvData, {
            status: 200,
            headers: { 'Content-type': 'text/csv' },
        });

        fetchMock.mockResolvedValue(mockResponse);

        const csvReader = new CsvReader();
        const filePath = './rooms.csv';

        const result1 = await csvReader.readData(filePath);
        const result2 = await csvReader.readData(filePath);

        expect(result1).toEqual(result2);
        expect(fetchMock).toHaveBeenCalledTimes(1);
    });

});
