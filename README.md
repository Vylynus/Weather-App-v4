# Atmospheric Monitoring System

A futuristic weather application that displays current weather conditions with a space-themed interface.

## Features

- Real-time weather data from OpenWeatherMap API
- Temperature display in both Celsius and Fahrenheit
- Humidity and wind speed information
- Futuristic space theme with animated stars
- Responsive design for all devices

## Setup

1. Clone the repository
```bash
git clone <your-repo-url>
cd weather-app
```

2. Set up API key
- Copy `config.example.js` to `config.js`
- Replace `YOUR_API_KEY_HERE` with your OpenWeatherMap API key

```bash
cp config.example.js config.js
```

## Deployment on Netlify

1. Create a Netlify account at [netlify.com](https://www.netlify.com)

2. Deploy using Netlify UI:
   - Go to [app.netlify.com](https://app.netlify.com)
   - Drag and drop your project folder
   - Or connect your GitHub repository

3. Set up environment variables:
   - Go to Site settings > Build & deploy > Environment
   - Add environment variable:
     - Key: `WEATHER_API_KEY`
     - Value: Your OpenWeatherMap API key

## Local Development

1. Install a local server (e.g., Live Server for VS Code)
2. Create `config.js` with your API key
3. Open `index.html` with your local server

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- OpenWeatherMap API

## License

MIT
