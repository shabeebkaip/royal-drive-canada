import { Metadata } from "next";
import CarSubmissionForm from "@/components/sell-car/CarSubmissionForm";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Sell Your Car Toronto - Get Cash for Your Vehicle | Royal Drive Canada",
  description: "Sell your car quickly and easily in Toronto. Get a fair cash offer for your vehicle within 24 hours. Free appraisal, instant payment, and hassle-free process at Royal Drive Canada.",
  keywords: ["cash for cars Toronto", "free car appraisal", "instant payment", "vehicle trade-in value"],
  path: "/sell-your-car",
});

export default function SellYourCarPage() {
  return (
    <div className="min-h-screen bg-white pt-24 sm:pt-28 pb-12 sm:pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <CarSubmissionForm />
      </div>
    </div>
  );
}

