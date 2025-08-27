import Hero from "../components/home/Hero";
import BrowseSection from "@/components/home/BrowseSection";
import BuyingSelling from "@/components/home/BuyingSelling";
import FeaturedVehicles from "@/components/home/FeaturedVehicles";
import VehicleGrid from "@/components/home/VehicleGrid";
import WhyChooseUs from "@/components/home/WhyChooseUs";

export default function Home() {
  return (
    <div className="relative">
      <Hero />
      <BrowseSection />
      <BuyingSelling />
      <FeaturedVehicles />
      <VehicleGrid />
      <WhyChooseUs />
    </div>
  );
}
