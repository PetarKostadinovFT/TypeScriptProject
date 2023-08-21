import { JsonReader } from '../src/readers/JsonReader';

describe('JsonReader', () => {

    const fetchMock = jest.spyOn(global, 'fetch');

    beforeEach(() => {
        fetchMock.mockReset();
    });

    afterAll(() => {
        fetchMock.mockRestore();
    });

    it('should fetch and parse JSON data correctly', async () => {
        const jsonData = [
            { number: '101', type: 'Standard', occupancy: 2, price: 100 },
            { number: '102', type: 'Deluxe', occupancy: 3, price: 150 },
        ];

        const mockResponse = new Response(JSON.stringify(jsonData), {
            status: 200,
            headers: { 'Content-type': 'application/json' },
        });

        fetchMock.mockResolvedValue(mockResponse);

        const jsonReader = new JsonReader();
        const filePath = './rooms.json';

        const result = await jsonReader.readData(filePath);

        expect(result).toEqual(jsonData);
        expect(fetchMock).toHaveBeenCalledWith(filePath);
    });

    it('should throw an error when fetching fails', async () => {
        const mockResponse = new Response(null, { status: 404 });

        fetchMock.mockResolvedValue(mockResponse);

        const jsonReader = new JsonReader();
        const filePath = './rooms.json';

        await expect(jsonReader.readData(filePath)).rejects.toThrowError(
            `Failed to fetch JSON data from ${filePath}`
        );
        expect(fetchMock).toHaveBeenCalledWith(filePath);
    });

    it('should use cached data when available', async () => {
        const jsonData = [
            { number: '101', type: 'Standard', occupancy: 2, price: 100 },
            { number: '102', type: 'Deluxe', occupancy: 3, price: 150 },
        ];

        const jsonReader = new JsonReader();
        jsonReader['cachedData']['./rooms.json'] = jsonData;

        fetchMock.mockResolvedValue(new Response(null));

        const filePath = './rooms.json';
        const result = await jsonReader.readData(filePath);

        expect(result).toEqual(jsonData);
        expect(fetchMock).not.toHaveBeenCalled();
    });
});
