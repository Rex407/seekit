#seekit

Project: SeekIt - Lost Device Tracker
Overview
SeekIt tracks lost mobiles (via IMEI) and computers (via MAC address), displaying locations, simulating SIM changes and call logs for mobiles, and showing all devices on a map. It supports Malawi and global locations with weather and country data.
Technology Stack
HTML: Forms and map container.

CSS: Bootstrap with animations.

Vanilla JavaScript: ES Modules, Web Audio API, Leaflet for maps.

APIs: OpenWeatherMap, REST Countries, OpenStreetMap (via Leaflet).

Libraries: Leaflet.js for mapping.

Project Structure

seekit/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── main.js
│   ├── api.js
│   ├── dom.js
│   └── deviceTracker.js
├── images/
│   └── tracker-icon.png
├── sounds/
│   └── ping.mp3 (optional)
├── .eslintrc.json
└── README.md

# SeekIt - Device Location Tracker

## Overview
SeekIt is a web application to track lost mobile devices (via IMEI) and computers (via MAC addresses), displaying exact locations (latitude/longitude, eastings/northings) and call logs for mobiles. It includes remote wipe and activity monitoring for computers.

## Features
- Display device locations with coordinates and map.
- Real call logs for mobiles (user-provided).
- Remote wipe and activity monitoring for computers.
- Supports Malawi and global locations.

## Technologies
- **HTML5**: Semantic structure.
- **CSS**: Tailwind CSS for styling.
- **JavaScript**: ES Modules, Leaflet for mapping.
- **APIs**: OpenWeatherMap, REST Countries.

## Installation
1. Clone the repository: `git clone <repository-url>`.
2. Navigate to the project folder: `cd seekit`.
3. Install a local server (e.g., `npx http-server`) and run it.
4. Open `http://localhost:8080` in your browser.

## Usage
- Add devices with name, type, ID, and location.
- Update locations or SIM details manually.
- Use remote wipe or monitor activity for computers.

## API Key
Replace `YOUR_API_KEY` in `js/main.js` with your OpenWeatherMap API key.

## Deployment
- Push to GitHub and deploy on Netlify.

## License
© 2025 SeekIt. All rights reserved.