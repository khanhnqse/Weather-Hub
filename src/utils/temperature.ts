// Temperature conversion utilities

export type TemperatureUnit = "celsius" | "fahrenheit";

/**
 * Convert Celsius to Fahrenheit
 */
export const celsiusToFahrenheit = (celsius: number): number => {
  return (celsius * 9/5) + 32;
};

/**
 * Convert Fahrenheit to Celsius
 */
export const fahrenheitToCelsius = (fahrenheit: number): number => {
  return (fahrenheit - 32) * 5/9;
};

/**
 * Convert temperature from one unit to another
 */
export const convertTemperature = (
  temperature: number,
  fromUnit: TemperatureUnit,
  toUnit: TemperatureUnit
): number => {
  if (fromUnit === toUnit) return temperature;
  
  if (fromUnit === "celsius" && toUnit === "fahrenheit") {
    return celsiusToFahrenheit(temperature);
  }
  
  if (fromUnit === "fahrenheit" && toUnit === "celsius") {
    return fahrenheitToCelsius(temperature);
  }
  
  return temperature;
};

/**
 * Format temperature with unit symbol
 */
export const formatTemperature = (
  temperature: number,
  unit: TemperatureUnit,
  showUnit: boolean = true
): string => {
  const rounded = Math.round(temperature);
  const symbol = unit === "celsius" ? "°C" : "°F";
  return showUnit ? `${rounded}${symbol}` : `${rounded}°`;
};

/**
 * Get temperature with appropriate unit from API data (which is always in Celsius)
 */
export const getTemperatureInUnit = (
  celsiusTemp: number,
  targetUnit: TemperatureUnit
): number => {
  return convertTemperature(celsiusTemp, "celsius", targetUnit);
};
