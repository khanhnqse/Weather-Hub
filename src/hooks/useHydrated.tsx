"use client";

import { useEffect, useState } from "react";

/**
 * Custom hook to ensure components only render after hydration is complete.
 * This prevents hydration mismatches caused by browser extensions or other
 * client-side modifications that happen after the initial server render.
 */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Wait for the next tick to ensure all browser extensions have run
    const timer = setTimeout(() => {
      setHydrated(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return hydrated;
}

/**
 * Component wrapper that only renders children after hydration is complete
 */
interface HydrationBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function HydrationBoundary({
  children,
  fallback,
}: HydrationBoundaryProps) {
  const hydrated = useHydrated();

  if (!hydrated) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
