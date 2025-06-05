import { WeatherData } from "../types/weather";
import { WeatherCard } from "./WeatherCard";
import { TemperatureRange } from "./TemperatureRange";
import { WeatherIcons } from "./WeatherIcons";
import { RealTimeClock } from "./RealTimeClock";
import {
  TemperatureUnit,
  getTemperatureInUnit,
  formatTemperature,
} from "../utils/temperature";

interface WeatherDisplayProps {
  weather: WeatherData;
  temperatureUnit: TemperatureUnit;
}

export const WeatherDisplay = ({
  weather,
  temperatureUnit,
}: WeatherDisplayProps) => {
  // Convert temperatures from Celsius (API default) to the selected unit
  const currentTemp = getTemperatureInUnit(weather.main.temp, temperatureUnit);
  const feelsLikeTemp = getTemperatureInUnit(
    weather.main.feels_like,
    temperatureUnit
  );
  const minTemp = getTemperatureInUnit(weather.main.temp_min, temperatureUnit);
  const maxTemp = getTemperatureInUnit(weather.main.temp_max, temperatureUnit);

  return (
    <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/20 animate-scaleIn">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <svg
            className="w-6 h-6 text-white/80"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <h2 className="text-2xl font-bold text-white">{weather.name}</h2>
        </div>{" "}
        <div className="mb-6">
          <div className="text-7xl font-black text-white mb-2 drop-shadow-lg animate-fadeInUp">
            {formatTemperature(currentTemp, temperatureUnit, false)}
          </div>
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-lg px-4 py-2 rounded-full">
            <div className="w-2 h-2 bg-blue-300 rounded-full animate-pulse"></div>
            <p className="text-white/90 capitalize text-lg font-medium">
              {weather.weather[0].description}
            </p>
          </div>
        </div>
        <RealTimeClock timezone={weather.timezone} cityName={weather.name} />
        <TemperatureRange
          tempMin={minTemp}
          tempMax={maxTemp}
          temperatureUnit={temperatureUnit}
        />
        <div className="grid grid-cols-2 gap-4 mb-6">
          {" "}
          <WeatherCard
            icon={<WeatherIcons.FeelsLike />}
            label="Cảm giác như"
            value={formatTemperature(feelsLikeTemp, temperatureUnit)}
          />
          <WeatherCard
            icon={<WeatherIcons.Humidity />}
            label="Độ ẩm"
            value={`${weather.main.humidity}%`}
          />
          <WeatherCard
            icon={<WeatherIcons.Wind />}
            label="Tốc độ gió"
            value={`${weather.wind.speed} m/s`}
          />
          <WeatherCard
            icon={<WeatherIcons.Pressure />}
            label="Áp suất"
            value={`${weather.main.pressure} hPa`}
          />
          <WeatherCard
            icon={<WeatherIcons.Visibility />}
            label="Tầm nhìn"
            value={
              weather.visibility
                ? `${(weather.visibility / 1000).toFixed(1)} km`
                : "N/A"
            }
          />
          <WeatherCard
            icon={<WeatherIcons.Clouds />}
            label="Độ phủ mây"
            value={`${weather.clouds.all}%`}
          />
        </div>
        {/* Sunrise and Sunset */}
        <div className="grid grid-cols-2 gap-4">
          <WeatherCard
            icon={<WeatherIcons.Sunrise />}
            label="Bình minh"
            value={new Date(weather.sys.sunrise * 1000).toLocaleTimeString(
              "vi-VN",
              {
                hour: "2-digit",
                minute: "2-digit",
              }
            )}
            iconColor="text-yellow-300"
          />

          <WeatherCard
            icon={<WeatherIcons.Sunset />}
            label="Hoàng hôn"
            value={new Date(weather.sys.sunset * 1000).toLocaleTimeString(
              "vi-VN",
              {
                hour: "2-digit",
                minute: "2-digit",
              }
            )}
            iconColor="text-orange-300"
          />
        </div>
      </div>
    </div>
  );
};
