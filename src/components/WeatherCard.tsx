interface WeatherCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  iconColor?: string;
}

export const WeatherCard = ({
  icon,
  label,
  value,
  iconColor = "text-blue-300",
}: WeatherCardProps) => {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 group">
      <div className="flex items-center gap-2 mb-2">
        <div
          className={`w-4 h-4 ${iconColor} group-hover:text-blue-200 transition-colors`}
        >
          {icon}
        </div>
        <p className="text-white/70 text-sm font-medium">{label}</p>
      </div>
      <p className="text-xl font-bold text-white">{value}</p>
    </div>
  );
};
