export default function Footer() {
  return (
    <footer className="relative z-10 text-center py-6 px-4 mt-auto">
      <p className="text-white/60 text-sm font-medium">
        Dữ liệu thời tiết được cung cấp bởi{" "}
        <a 
          href="https://openweathermap.org/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-300 font-semibold hover:text-blue-200 transition-colors duration-200"
        >
          OpenWeatherMap
        </a>
      </p>
      <p className="text-white/40 text-xs mt-2">
        © 2025 WeatherHub - Khám phá thời tiết toàn cầu
      </p>
    </footer>
  );
}
