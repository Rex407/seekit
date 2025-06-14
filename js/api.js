export async function fetchWeather(city, apiKey) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        if (!response.ok) throw new Error(`Weather API error: ${response.status}`);
        const data = await response.json();
        return {
            temp: data.main.temp,
            description: data.weather[0].description,
            country: data.sys.country
        };
    } catch (error) {
        console.error('Weather fetch error:', error);
        return null;
    }
}

export async function fetchCountryInfo(countryCode) {
    try {
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
        if (!response.ok) throw new Error(`Country API error: ${response.status}`);
        const [data] = await response.json();
        return {
            name: data.name.common,
            capital: data.capital?.[0] || 'N/A',
            flag: data.flags.png
        };
    } catch (error) {
        console.error('Country fetch error:', error);
        return null;
    }
}