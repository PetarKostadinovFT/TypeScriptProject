import { Room } from './interfaces/Room.js';
import { CsvReader } from './readers/CsvReader.js';
import { JsonReader } from './readers/JsonReader.js';
import { Display } from './display/Display.js';

const csvReader = new CsvReader();
const jsonReader = new JsonReader();

const csvDisplay = new Display(csvReader, './rooms.csv');
const jsonDisplay = new Display(jsonReader, './rooms.json');

const csvButton = document.getElementById('csvButton');
const jsonButton = document.getElementById('jsonButton');
const infoContainer = document.getElementById('infoContainer');
const headerText = document.getElementById('titleDoc');

csvButton?.addEventListener('click', async () => {
  try {
    const rooms: Room[] = await csvDisplay.getRoomData();
    displayRooms(infoContainer, rooms);
    updateHeaderText('Hotel One csv-info');
  } catch (error) {
    console.error('Error:', error);
  }
});

jsonButton?.addEventListener('click', async () => {
  try {
    const rooms: Room[] = await jsonDisplay.getRoomData();
    displayRooms(infoContainer, rooms);
    updateHeaderText('Hotel Two json-info');
  } catch (error) {
    console.error('Error:', error);
  }
});

function displayRooms(container: HTMLElement | null, rooms: Room[]): void {
  if (!container) return;

  container.innerHTML = '';

  rooms.forEach((room) => {
    const roomDiv = document.createElement('div');
    roomDiv.classList.add('room');

    const overlay = document.createElement('div');
    overlay.classList.add('overlay');

    overlay.innerHTML = `
        <h2>Room Number: ${room.number}</h2>
        <p>Type: ${room.type}</p>
        <p>Occupancy: ${room.occupancy}</p>
        <p>Price: $${room.price}</p>
        <hr>
      `;

    roomDiv.appendChild(overlay);
    container.appendChild(roomDiv);
  });
}

function updateHeaderText(text: string): void {
  if (headerText) {
    headerText.textContent = text;
  }
}