import { Room } from '../src/interfaces/Room';

describe('Room Interface', () => {
    it('should define the correct properties', () => {
        const room: Room = {
            number: '101',
            type: 'Standard',
            occupancy: 2,
            price: 100
        };

        expect(room.number).toEqual('101');
        expect(room.type).toEqual('Standard');
        expect(room.occupancy).toEqual(2);
        expect(room.price).toEqual(100);
    });


});