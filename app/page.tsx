import SearchCard from "@/components/home/SearchCard";
import Hero from "../components/home/Hero";

export default function Home() {
  return (
    <div className="container mx-auto relative">
      <Hero />
      <div className="relative z-10 -mt-32 pb-16">
        <SearchCard />
      </div>
    </div>
  );
}
