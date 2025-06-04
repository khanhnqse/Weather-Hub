interface ErrorMessageProps {
  error: string;
}

export const ErrorMessage = ({ error }: ErrorMessageProps) => {
  if (!error) return null;

  return (
    <div className="mb-6 p-4 bg-red-500/20 backdrop-blur-lg border border-red-400/30 text-red-100 rounded-2xl animate-scaleIn">
      <div className="flex items-center gap-3">
        <svg
          className="w-5 h-5 text-red-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        {error}
      </div>
    </div>
  );
};
