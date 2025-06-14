export class DeviceTracker {
    constructor(name, type, id, status, lastLocation, network = '', simNumber = '', callLogs = []) {
        this.name = name;
        this.type = type; // 'mobile' or 'computer'
        this.id = id; // IMEI or MAC
        this.status = status; // 'in-range' or 'lost'
        this.lastLocation = lastLocation;
        this.network = network; // Tower or Wi-Fi
        this.simNumber = simNumber; // For mobiles
        this.callLogs = callLogs; // Call details
        this.latitude = this.type === 'mobile' ? -13.2543 : 35.6762; // Mock coords
        this.longitude = this.type === 'mobile' ? 34.3015 : -78.6336;
    }

    ping() {
        return this.status === 'in-range'
            ? `${this.name} (${this.type === 'mobile' ? 'IMEI' : 'MAC'} ${this.id}) is nearby at ${this.lastLocation}!`
            : `${this.name} (${this.type === 'mobile' ? 'IMEI' : 'MAC'} ${this.id}) is lost. Last seen at ${this.lastLocation}.`;
    }

    updateSim(simNumber) {
        if (this.type === 'mobile') {
            this.simNumber = simNumber;
            this.callLogs = this.generateCallLogs();
        }
    }

    generateCallLogs() {
        if (this.type === 'mobile') {
            const logs = [];
            const callCount = Math.floor(Math.random() * 10) + 1; // 1-10 calls
            for (let i = 0; i < callCount; i++) {
                logs.push({
                    number: `+265${Math.floor(10000000 + Math.random() * 90000000)}`,
                    date: new Date(Date.now() - i * 3600000).toISOString().slice(0, 19).replace('T', ' '),
                    duration: `${Math.floor(Math.random() * 60)}s`
                });
            }
            return logs;
        }
        return [];
    }

    getCallCount() {
        return this.callLogs.length;
    }
}