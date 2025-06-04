import { BackgroundAnimation } from "@/components/BackgroundAnimation";
import MainContainer from "@/components/MainContainer";
import WeatherApp from "@/components/WeatherApp";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden">
      <BackgroundAnimation />

      <MainContainer>
        <WeatherApp />
        <Footer />
      </MainContainer>
    </div>
  );
}
