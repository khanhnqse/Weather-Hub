# Weather App

A beautiful weather application built with Next.js and TailwindCSS that allows users to check current weather conditions for any city worldwide.

## Features

- 🌤️ Real-time weather data from OpenWeatherMap API
- 🎨 Beautiful, responsive UI with TailwindCSS
- 🌍 Support for cities worldwide
- 📱 Mobile-friendly design
- ⚡ Fast and efficient with Next.js
- 🇻🇳 Vietnamese language support
- 🔍 Detailed weather information including:
  - Current temperature
  - Weather description
  - "Feels like" temperature
  - Humidity
  - Wind speed
  - Weather conditions

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

1. Enter the name of any city in the search box
2. Click the "Tìm kiếm" (Search) button
3. View the current weather information for that city
4. If the city is not found, an error message will be displayed

## API

This application uses the OpenWeatherMap API to fetch weather data:

- Endpoint: `https://api.openweathermap.org/data/2.5/weather`
- Parameters: city name, API key, metric units, Vietnamese language
- Response: JSON with weather data including temperature, description, humidity, wind speed, etc.

## Technologies Used

- **Next.js 15** - React framework for production
- **React 19** - JavaScript library for building user interfaces
- **TypeScript** - Typed JavaScript for better development experience
- **TailwindCSS 4** - Utility-first CSS framework
- **OpenWeatherMap API** - Weather data provider

## Project Structure

```
my-weather/
├── src/
│   └── app/
│       ├── page.tsx          # Main weather app component
│       ├── layout.tsx         # App layout
│       └── globals.css        # Global styles
├── public/                    # Static files
├── .env.local                 # Environment variables (API key)
├── package.json              # Dependencies and scripts
└── README.md                 # This file
```

## Environment Variables

Create a `.env.local` file with the following variables:

```
NEXT_PUBLIC_WEATHER_API_KEY=your_openweathermap_api_key
```

## Build for Production

```bash
npm run build
npm start
```

## Contributing

Feel free to submit issues and pull requests to improve the application.

## License

This project is open source and available under the MIT License.
