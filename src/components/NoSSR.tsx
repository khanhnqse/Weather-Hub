"use client";

import dynamic from "next/dynamic";
import { ComponentType } from "react";

/**
 * NoSSR component wrapper that disables server-side rendering for wrapped components.
 * This is useful for components that might be affected by browser extensions
 * or other client-side features that can cause hydration mismatches.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function NoSSRWrapper<T extends Record<string, any>>(
  Component: ComponentType<T>
): ComponentType<T> {
  return dynamic(() => Promise.resolve(Component), {
    ssr: false,
    loading: () => (
      <div className="animate-pulse bg-white/5 rounded-lg h-8 w-full"></div>
    ),
  });
}

export default NoSSRWrapper;
