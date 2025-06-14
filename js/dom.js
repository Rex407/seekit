import { fetchWeather, fetchCountryInfo } from './api.js';
import { createNewDevice } from './main.js';

let map;

export async function renderDevices(devices, apiKey) {
    const deviceList = document.getElementById('device-list');
    deviceList.innerHTML = '';

    const sortedDevices = [...devices].sort((a, b) =>
        a.status === 'in-range' ? -1 : b.status === 'in-range' ? 1 : 0
    );

    for (const device of sortedDevices) {
        const weather = await fetchWeather(device.lastLocation, apiKey);
        const country = weather ? await fetchCountryInfo(weather.country) : { name: 'Unknown', capital: 'N/A', flag: '' };

        const card = document.createElement('div');
        card.className = `col-md-4 item-card ${device.status === 'in-range' ? 'in-range' : ''} fade-in`;
        card.setAttribute('role', 'listitem');
        card.innerHTML = `
            <h3>${device.name}</h3>
            <p>Type: ${device.type === 'mobile' ? 'Mobile (IMEI)' : 'Computer (MAC)'}</p>
            <p>ID: ${device.id}</p>
            <p>Status: ${device.status === 'in-range' ? 'In Range' : 'Lost'}</p>
            <p>Last Location: ${device.lastLocation} (Network: ${device.network})</p>
            ${device.type === 'mobile' ? `<p>SIM: ${device.simNumber || 'None'}</p>` : ''}
            ${device.type === 'mobile' ? `<p>Call Count: ${device.getCallCount()}</p>` : ''}
            ${device.type === 'mobile' && device.callLogs.length ? `<p>Recent Calls: ${device.callLogs.map(log => `${log.number} (${log.duration} at ${log.date})`).join(', ')}</p>` : ''}
            ${weather ? `<p>Weather: ${weather.temp}°C, ${weather.description}</p>` : '<p>Weather: Unavailable</p>'}
            <p>Country: ${country.name} <img src="${country.flag}" alt="Flag of ${country.name}" width="20" height="auto"></p>
            <button class="btn btn-primary ping-btn" data-device-id="${devices.indexOf(device)}" aria-label="Ping ${device.name} (${device.id})">Ping Device</button>
            ${device.type === 'mobile' ? '<button class="btn btn-secondary update-sim-btn mt-2" data-device-id="${devices.indexOf(device)}">Update SIM</button>' : ''}
        `;
        deviceList.appendChild(card);

        const pingBtn = card.querySelector('.ping-btn');
        pingBtn.addEventListener('click', () => pingDevice(card, device));

        if (device.type === 'mobile') {
            const simBtn = card.querySelector('.update-sim-btn');
            simBtn.addEventListener('click', () => showSimUpdateForm(device));
        }
    }

    const updateSelect = document.getElementById('update-device-select');
    updateSelect.innerHTML = '<option value="">Select a device...</option>';
    devices.forEach((device, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `${device.name} (${device.type === 'mobile' ? 'IMEI' : 'MAC'} ${device.id})`;
        updateSelect.appendChild(option);
    });

    updateMap(devices);
}

function showSimUpdateForm(device) {
    const simForm = document.getElementById('sim-update-form');
    simForm.style.display = 'block';
    const simInput = document.getElementById('new-sim-number');
    simInput.value = device.simNumber || '';

    simForm.onsubmit = (e) => {
        e.preventDefault();
        device.updateSim(document.getElementById('new-sim-number').value);
        renderDevices(devices, API_KEY);
        simForm.style.display = 'none';
    };
}

function pingDevice(card, device) {
    card.classList.add('blink');
    playPingSound();
    setTimeout(() => card.classList.remove('blink'), 2000);
}

function playPingSound() {
    const audio = new Audio('sounds/ping.mp3');
    audio.play().catch(error => console.error('Audio play failed:', error));
}

function updateMap(devices) {
    if (!map) {
        map = L.map('map').setView([-13.2543, 34.3015], 6); // Default to Malawi
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
        }).addTo(map);
    }

    map.eachLayer(layer => {
        if (layer instanceof L.Marker) map.removeLayer(layer);
    });

    devices.forEach(device => {
        L.marker([device.latitude, device.longitude]).addTo(map)
            .bindPopup(`<b>${device.name}</b><br>${device.type}: ${device.id}<br>Location: ${device.lastLocation}<br>Network: ${device.network}`);
    });
}