import { ReactNode } from "react";

interface MainContainerProps {
  children: ReactNode;
}

export default function MainContainer({ children }: MainContainerProps) {
  return (
    <div className="relative z-10 flex-1 flex items-center justify-center p-4">
      <div className="w-full max-w-7xl">{children}</div>
    </div>
  );
}
