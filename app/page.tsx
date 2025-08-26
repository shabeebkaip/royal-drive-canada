import Hero from "../components/home/Hero";
import BrowseByType from "@/components/home/BrowseByType";
import BrandLogos from "@/components/home/BrandLogos";
import BuyingSelling from "@/components/home/BuyingSelling";
import FeaturedVehicles from "@/components/home/FeaturedVehicles";
import VehicleGrid from "@/components/home/VehicleGrid";
import WhyChooseUs from "@/components/home/WhyChooseUs";

export default function Home() {
  return (
    <div className="relative">
      <Hero />
      <BrowseByType />
      <BrandLogos />
      <BuyingSelling />
      <FeaturedVehicles />
      <VehicleGrid />
      <WhyChooseUs />
    </div>
  );
}
