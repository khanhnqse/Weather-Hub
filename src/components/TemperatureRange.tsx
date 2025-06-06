import { TemperatureUnit, formatTemperature } from "../utils/temperature";

interface TemperatureRangeProps {
  tempMin: number;
  tempMax: number;
  temperatureUnit: TemperatureUnit;
}

export const TemperatureRange = ({
  tempMin,
  tempMax,
  temperatureUnit,
}: TemperatureRangeProps) => {
  return (
    <div className="mb-6 bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
      <div className="flex items-center justify-between">
        <div className="text-center">
          <p className="text-white/70 text-sm font-medium mb-1">Thấp nhất</p>
          <p className="text-lg font-bold text-blue-300">
            {formatTemperature(tempMin, temperatureUnit, false)}
          </p>
        </div>
        <div className="flex-1 mx-4">
          <div className="h-2 bg-gradient-to-r from-blue-400 to-red-400 rounded-full"></div>
        </div>
        <div className="text-center">
          <p className="text-white/70 text-sm font-medium mb-1">Cao nhất</p>
          <p className="text-lg font-bold text-red-300">
            {formatTemperature(tempMax, temperatureUnit, false)}
          </p>
        </div>
      </div>
    </div>
  );
};
