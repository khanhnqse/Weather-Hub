import MainContainer from "@/components/MainContainer";
import WeatherApp from "@/components/WeatherApp";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <MainContainer>
        <WeatherApp />
        <Footer />
      </MainContainer>
    </div>
  );
}
