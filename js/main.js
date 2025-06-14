import { DeviceTracker } from './deviceTracker.js';
import { renderDevices } from './dom.js';

export const API_KEY = '1a8a4967d62d64dbd1146828aa6d125e'; // Replace with OpenWeatherMap API key
let devices = [
    new DeviceTracker('Phone', 'mobile', '123456789012345', 'in-range', 'Lilongwe', 'Airtel Tower', '265123456789', []),
    new DeviceTracker('Laptop', 'computer', '00:1A:2B:3C:4D:5E', 'lost', 'Blantyre', 'Home Wi-Fi', '', []),
    new DeviceTracker('Tablet', 'mobile', '987654321098765', 'in-range', 'Mzuzu', 'TNM Tower', '265987654321', [])
];

export function createNewDevice(name, type, id, status, lastLocation) {
    const network = type === 'mobile' ? 'Unknown Tower' : 'Unknown Wi-Fi';
    return new DeviceTracker(name, type, id, status, lastLocation, network);
}

document.addEventListener('DOMContentLoaded', () => {
    renderDevices(devices, API_KEY);

    const addForm = document.getElementById('add-device-form');
    addForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('device-name').value;
        const type = document.getElementById('device-type').value;
        let id = document.getElementById('device-id').value.replace(/:/g, '').toUpperCase();
        const status = 'lost';
        const location = document.getElementById('device-location').value;
        if ((type === 'mobile' && !/^[0-9]{15}$/.test(id)) || (type === 'computer' && !/^[0-9A-F]{12}$/.test(id))) {
            alert('Invalid IMEI (15 digits) or MAC (12 hex digits) format.');
            return;
        }
        const newDevice = createNewDevice(name, type, id, status, location);
        devices.push(newDevice);
        renderDevices(devices, API_KEY);
        addForm.reset();
    });

    const updateForm = document.getElementById('update-location-form');
    updateForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const deviceIndex = document.getElementById('update-device-select').value;
        const newLocation = document.getElementById('new-location').value;
        if (deviceIndex !== '' && devices[deviceIndex]) {
            devices[deviceIndex].lastLocation = newLocation;
            renderDevices(devices, API_KEY);
            updateForm.reset();
        }
    });
});


