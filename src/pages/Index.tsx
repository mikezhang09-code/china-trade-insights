import HeroSection from "@/components/HeroSection";
import TimelineChart from "@/components/TimelineChart";
import DriversSection from "@/components/DriversSection";
import NewThreeSection from "@/components/NewThreeSection";
import GeographicPivot from "@/components/GeographicPivot";
import OutlookSection from "@/components/OutlookSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <HeroSection />
      <TimelineChart />
      <DriversSection />
      <NewThreeSection />
      <GeographicPivot />
      <OutlookSection />
      <Footer />
    </main>
  );
};

export default Index;
