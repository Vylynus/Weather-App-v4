// API key and base URL
const API_KEY = '96a0ca90de79fb3b9ba220c40d9109ac';  // Your API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const DEFAULT_CITY = 'Berlin';

// DOM elements
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const loadingDiv = document.getElementById('loading');
const errorDiv = document.getElementById('error');
const weatherInfo = document.getElementById('weather-info');
const cityName = document.getElementById('city-name');
const dateTime = document.getElementById('date-time');
const temperature = document.getElementById('temperature');
const weatherDescription = document.getElementById('weather-description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const tempToggle = document.getElementById('temp-toggle');
const celsiusUnit = tempToggle.querySelector('.celsius');
const fahrenheitUnit = tempToggle.querySelector('.fahrenheit');

// Temperature unit state
let isCelsius = true;
let currentTemp = 0;

// Event listeners
searchBtn.addEventListener('click', getWeather);
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        getWeather();
    }
});

tempToggle.addEventListener('click', () => {
    isCelsius = !isCelsius;
    updateTemperatureDisplay();
    updateUnitToggleUI();
});

// Load default city weather on page load
document.addEventListener('DOMContentLoaded', () => {
    cityInput.value = DEFAULT_CITY;
    getWeather();
});

// Function to fetch weather data
async function getWeather() {
    const city = cityInput.value.trim() || DEFAULT_CITY;
    
    if (!city) {
        showError('Please enter a city name');
        return;
    }

    showLoading();
    hideError();
    hideWeatherInfo();

    try {
        const response = await fetch(`${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch weather data');
        }

        displayWeatherData(data);
    } catch (error) {
        showError(error.message);
        console.error('Weather API Error:', error);
    } finally {
        hideLoading();
    }
}

// Function to update temperature display
function updateTemperatureDisplay() {
    const displayTemp = isCelsius ? currentTemp : (currentTemp * 9/5) + 32;
    temperature.textContent = `${Math.round(displayTemp)}°${isCelsius ? 'C' : 'F'}`;
}

// Function to update unit toggle UI
function updateUnitToggleUI() {
    if (isCelsius) {
        celsiusUnit.classList.add('active');
        fahrenheitUnit.classList.remove('active');
    } else {
        celsiusUnit.classList.remove('active');
        fahrenheitUnit.classList.add('active');
    }
}

// Function to display weather data
function displayWeatherData(data) {
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    dateTime.textContent = new Date().toLocaleString();
    currentTemp = data.main.temp;
    updateTemperatureDisplay();
    updateUnitToggleUI();
    weatherDescription.textContent = data.weather[0].description;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;

    weatherInfo.style.display = 'block';
}

// Utility functions
function showLoading() {
    loadingDiv.style.display = 'block';
}

function hideLoading() {
    loadingDiv.style.display = 'none';
}

function showError(message) {
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
}

function hideError() {
    errorDiv.style.display = 'none';
}

function hideWeatherInfo() {
    weatherInfo.style.display = 'none';
} 