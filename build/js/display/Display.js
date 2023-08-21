export class Display {
    constructor(reader, filePath) {
        this.reader = reader;
        this.filePath = filePath;
    }
    async getRoomData() {
        try {
            const rooms = await this.reader.readData(this.filePath);
            return rooms;
        }
        catch (error) {
            console.error('Error reading and displaying data:', error);
            return [];
        }
    }
}
