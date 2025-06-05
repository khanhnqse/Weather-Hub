# Weather App

A beautiful weather application built with Next.js and TailwindCSS that allows users to check current weather conditions for any city worldwide.

## Features

- 🌤️ Real-time weather data from OpenWeatherMap API
- 🎨 Beautiful, responsive UI with TailwindCSS and Framer Motion animations
- 🌍 Support for cities worldwide
- 📱 Mobile-friendly design
- ⚡ Fast and efficient with Next.js
- 🇻🇳 Vietnamese language support
- 🌡️ **Temperature Unit Toggle** - Switch between Celsius (°C) and Fahrenheit (°F)
- 📊 **5-Day Weather Forecast** - Interactive chart with daily temperature trends
- 🔍 **Recent Searches** - Store and quickly access previously searched cities
- 💾 **Local Storage** - Persistent recent searches across browser sessions
- 🎯 **Smart Data Management** - Optimized API calls and data processing
- 🔍 Detailed weather information including:
  - Current temperature (with unit conversion)
  - Weather description
  - "Feels like" temperature
  - Humidity percentage
  - Wind speed
  - Temperature ranges (min/max)
  - 5-day forecast with charts
  - Weather condition icons

## Key Features Explained

### 🌡️ Temperature Unit Toggle

- Seamless switching between Celsius and Fahrenheit
- Real-time conversion of all temperature displays
- Persists user preference throughout the session
- Updates charts, forecasts, and current weather simultaneously

### 📊 Interactive 5-Day Forecast

- Beautiful Chart.js powered weather charts
- Daily temperature trends with min/max ranges
- Humidity and precipitation data visualization
- Responsive design that works on all devices
- Hover tooltips for detailed information

### 🔍 Smart Recent Searches

- Automatically saves successful city searches
- Stores up to 5 recent searches in localStorage
- Quick-click access to previously searched cities
- Persistent across browser sessions
- Easy clear functionality

### ⚡ Performance Optimizations

- Smart API call management (prevents unnecessary requests)
- Separated data fetching from data processing
- useMemo and useCallback for optimal re-renders
- Lazy loading and efficient state management

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- OpenWeatherMap API key

### Installation

1. Clone the repository or download the project files

2. Install dependencies:

```bash
npm install
```

3. Get your free API key from [OpenWeatherMap](https://openweathermap.org/api)

4. Create a `.env.local` file in the root directory and add your API key:

```
NEXT_PUBLIC_WEATHER_API_KEY=your_api_key_here
```

5. Run the development server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. **Search for Weather:**

   - Enter the name of any city in the search box
   - Click the "Tìm" (Search) button or press Enter
   - View the current weather information for that city

2. **Switch Temperature Units:**

   - Use the toggle button at the top to switch between Celsius (°C) and Fahrenheit (°F)
   - All temperatures throughout the app will update instantly

3. **View 5-Day Forecast:**

   - After searching for a city, scroll down to see the interactive forecast chart
   - View daily temperature trends, humidity, and precipitation chances
   - Hover over chart points for detailed information

4. **Recent Searches:**

   - Previously searched cities are automatically saved
   - Click on any recent search to quickly load that city's weather
   - Use "Xóa tất cả" (Clear All) to remove recent searches

5. **Error Handling:**
   - If a city is not found, an error message will be displayed
   - Check your internet connection if data fails to load

## API

This application uses the OpenWeatherMap API to fetch weather data:

- **Current Weather Endpoint:** `https://api.openweathermap.org/data/2.5/weather`
- **5-Day Forecast Endpoint:** `https://api.openweathermap.org/data/2.5/forecast`
- **Parameters:** city name, API key, metric units, Vietnamese language
- **Response:** JSON with comprehensive weather data including temperature, description, humidity, wind speed, forecast data, etc.
- **Rate Limiting:** Optimized to minimize API calls with smart caching and data processing

## Technologies Used

- **Next.js 15** - React framework for production
- **React 19** - JavaScript library for building user interfaces
- **TypeScript** - Typed JavaScript for better development experience
- **TailwindCSS 4** - Utility-first CSS framework
- **Framer Motion** - Animation library for smooth transitions and interactions
- **Chart.js** - Interactive charts for weather data visualization
- **React Chart.js 2** - React wrapper for Chart.js
- **OpenWeatherMap API** - Weather data provider
- **LocalStorage API** - Browser storage for recent searches persistence

## Project Structure

```
my-weather/
├── src/
│   ├── app/
│   │   ├── page.tsx           # Main page component
│   │   ├── layout.tsx         # App layout
│   │   └── globals.css        # Global styles
│   ├── components/
│   │   ├── WeatherApp.tsx     # Main weather app container
│   │   ├── SearchForm.tsx     # Search input with recent searches
│   │   ├── WeatherDisplay.tsx # Current weather display
│   │   ├── ForecastChart.tsx  # 5-day forecast chart
│   │   ├── TemperatureToggle.tsx # Celsius/Fahrenheit toggle
│   │   ├── RecentSearches.tsx # Recent searches component
│   │   ├── DynamicBackground.tsx # Animated weather backgrounds
│   │   └── ...               # Other UI components
│   ├── hooks/
│   │   ├── useRecentSearches.ts # Recent searches logic
│   │   └── ...               # Other custom hooks
│   ├── utils/
│   │   ├── temperature.ts    # Temperature conversion utilities
│   │   └── ...               # Other utility functions
│   └── types/
│       └── weather.ts        # TypeScript type definitions
├── public/                   # Static files and icons
├── .env.local               # Environment variables (API key)
├── package.json             # Dependencies and scripts
└── README.md               # This file
```

## Environment Variables

Create a `.env.local` file with the following variables:

```
NEXT_PUBLIC_WEATHER_API_KEY=your_openweathermap_api_key
```

**Note:** The API key must be prefixed with `NEXT_PUBLIC_` to be accessible in the browser environment.

## Build for Production

```bash
npm run build
npm start
```

## Development Commands

```bash
# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## Known Issues & Solutions

### API Key Issues

- Ensure your OpenWeatherMap API key is valid and active
- Check that the `.env.local` file is in the root directory
- Verify the API key is prefixed with `NEXT_PUBLIC_`

### Chart Display Issues

- Charts require JavaScript to be enabled
- Some ad blockers may interfere with Chart.js
- Clear browser cache if charts don't appear

### Recent Searches Not Saving

- Ensure localStorage is enabled in your browser
- Private/Incognito mode may prevent localStorage persistence
- Check browser storage settings

## Contributing

Feel free to submit issues and pull requests to improve the application.

## License

This project is open source and available under the MIT License.
