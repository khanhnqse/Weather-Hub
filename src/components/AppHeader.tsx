export const AppHeader = () => {
  return (
    <div className="text-center mb-12 animate-fadeInUp">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-lg rounded-2xl mb-6 shadow-2xl animate-float">
        <svg
          className="w-10 h-10 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.002 4.002 0 003 15z"
          />
        </svg>
      </div>
      <h1 className="text-4xl font-black text-white mb-3 tracking-tight">
        Weather<span className="text-blue-300">Hub</span>
      </h1>
      <p className="text-white/70 text-lg font-medium">
        Khám phá thời tiết toàn cầu
      </p>
    </div>
  );
};
