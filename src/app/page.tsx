"use client";

import { HydrationBoundary } from "@/hooks/useHydrated";
import MainContainer from "@/components/MainContainer";
import WeatherApp from "@/components/WeatherApp";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <HydrationBoundary
      fallback={
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
          <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-lg">
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-lg rounded-2xl mb-6 shadow-2xl">
                  <svg
                    className="w-10 h-10 text-white animate-spin"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </div>
                <h1 className="text-4xl font-black text-white mb-3 tracking-tight">
                  Weather<span className="text-blue-300">Hub</span>
                </h1>
                <p className="text-white/70 text-lg font-medium">
                  Đang khởi tạo ứng dụng...
                </p>
              </div>
            </div>
          </div>
        </div>
      }    >
      <div className="min-h-screen relative overflow-hidden flex flex-col bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
        <div className="flex-1">
          <MainContainer>
            <WeatherApp />
          </MainContainer>
        </div>
        <Footer />
      </div>
    </HydrationBoundary>
  );
}
