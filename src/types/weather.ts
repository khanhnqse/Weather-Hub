export interface WeatherData {
  name: string;
  country?: string;
  weather: {
    description: string;
    main: string;
    icon: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
    temp_min: number;
    temp_max: number;
  };
  wind: {
    speed: number;
    deg?: number;
  };
  clouds: {
    all: number;
  };
  visibility: number;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };  coord: {
    lat: number;
    lon: number;
  };
  dt: number;
  timezone: number; // Timezone offset in seconds from UTC
}
