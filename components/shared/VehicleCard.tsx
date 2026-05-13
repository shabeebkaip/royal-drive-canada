"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import ImageSlider from "./ImageSlider";
import { CheckCircle, Fuel, Gauge, Settings, Shield, User, Zap, Star } from "lucide-react";
import { VehicleCardProps } from "@/types/vehicleCard";

const formatPrice = (price: number | null | undefined) => {
  if (price === null || price === undefined || isNaN(price)) return "Contact for Price";
  return new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", minimumFractionDigits: 0 }).format(price);
};

const formatMileage = (mileage: number | null | undefined) => {
  if (mileage === null || mileage === undefined || isNaN(mileage)) return null;
  return `${mileage.toLocaleString("en-CA")} km`;
};

const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  showFeaturedBadge = false,
  className = "",
  isHorizontal = false,
}) => {
  const vehicleImages =
    vehicle.status?.slug === "coming-soon" ? ["/coming-soon.jpeg"] : vehicle.images;

  const isSold = vehicle.status?.name?.toLowerCase() === "sold";
  const href = `/vehicles/${vehicle.slug || vehicle.id}`;

  const PRICE_BADGE_CONFIG = {
    great_price: { label: "Great Price", bg: "bg-green-600", text: "text-white" },
    good_price:  { label: "Good Price",  bg: "bg-emerald-500", text: "text-white" },
    fair_price:  { label: "Fair Price",  bg: "bg-blue-600", text: "text-white" },
  };
  const priceBadgeCfg = vehicle.priceBadge ? PRICE_BADGE_CONFIG[vehicle.priceBadge as keyof typeof PRICE_BADGE_CONFIG] : null;

  // ── Trust badge row ──────────────────────────────────────────────────────────
  const BadgeRow = () => (
    <div className="flex flex-wrap items-center gap-1.5">
      {vehicle.carfax?.hasCleanHistory && (
        vehicle.carfax.reportUrl ? (
          <a href={vehicle.carfax.reportUrl} target="_blank" rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 px-2 py-0.5 border border-green-400 rounded text-[10px] font-semibold text-green-700 bg-white hover:bg-green-50 transition-colors">
            <Image src="/certifications/carfax.png" alt="CARFAX" width={40} height={12} className="object-contain" />
            <CheckCircle className="w-3 h-3 text-green-600" />
          </a>
        ) : (
          <div className="inline-flex items-center gap-1 px-2 py-0.5 border border-green-400 rounded text-[10px] font-semibold text-green-700 bg-white">
            <Image src="/certifications/carfax.png" alt="CARFAX" width={40} height={12} className="object-contain" />
            <CheckCircle className="w-3 h-3 text-green-600" />
          </div>
        )
      )}
      {vehicle.numberOfPreviousOwners !== undefined && vehicle.numberOfPreviousOwners <= 1 && (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 border border-blue-200 rounded text-[10px] font-semibold text-blue-700 bg-blue-50">
          <User className="w-2.5 h-2.5" />
          {vehicle.numberOfPreviousOwners === 0 ? "1st Owner" : "1 Owner"}
        </span>
      )}
      {!vehicle.accidentHistory && (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 border border-emerald-200 rounded text-[10px] font-semibold text-emerald-700 bg-emerald-50">
          <Shield className="w-2.5 h-2.5" />
          No Accidents
        </span>
      )}
    </div>
  );

  // ── Key spec inline row ──────────────────────────────────────────────────────
  const SpecRow = ({ compact = false }: { compact?: boolean }) => {
    const specs = [
      vehicle.mileage != null && { icon: <Gauge className="w-3 h-3" />, value: formatMileage(vehicle.mileage) },
      vehicle.fuelType && { icon: <Fuel className="w-3 h-3" />, value: vehicle.fuelType },
      vehicle.transmission && { icon: <Settings className="w-3 h-3" />, value: vehicle.transmission },
      vehicle.drivetrain && { icon: <Zap className="w-3 h-3" />, value: vehicle.drivetrain },
    ].filter(Boolean) as { icon: React.ReactNode; value: string }[];

    return (
      <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 ${compact ? "text-[11px]" : "text-xs"}`}>
        {specs.map(({ icon, value }, i) => (
          <React.Fragment key={i}>
            {i > 0 && <span className="text-gray-200">·</span>}
            <span className="flex items-center gap-1 text-gray-500">
              <span className="text-gray-400">{icon}</span>
              <span className="font-semibold text-gray-700">{value}</span>
            </span>
          </React.Fragment>
        ))}
      </div>
    );
  };

  // ── Extra detail chips (eye-catching) ────────────────────────────────────────
  const DetailChips = () => {
    const chips = [
      vehicle.engineSize && vehicle.cylinders && {
        label: `${vehicle.engineSize}L ${vehicle.cylinders}-Cyl`,
        icon: "⚙",
        color: "bg-gray-100 text-gray-600",
      },
      vehicle.exteriorColor && {
        label: vehicle.exteriorColor,
        icon: "●",
        color: "bg-gray-100 text-gray-600",
      },
      vehicle.bodyType && {
        label: vehicle.bodyType,
        icon: null,
        color: "bg-gray-100 text-gray-600",
      },
      vehicle.seatingCapacity && {
        label: `${vehicle.seatingCapacity} Seats`,
        icon: null,
        color: "bg-gray-100 text-gray-600",
      },
      vehicle.safetyCertified && {
        label: "Safety Certified",
        icon: "✓",
        color: "bg-emerald-50 text-emerald-700",
      },
    ].filter(Boolean) as { label: string; icon: string | null; color: string }[];

    if (chips.length === 0) return null;
    return (
      <div className="flex flex-wrap gap-1.5">
        {chips.map(({ label, icon, color }) => (
          <span key={label} className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${color}`}>
            {icon && <span className="text-[8px]">{icon}</span>}
            {label}
          </span>
        ))}
      </div>
    );
  };

  // ════════════════════════════════════════════════════════════════════
  // HORIZONTAL / LIST VIEW  (AutoTrader.ca style)
  // ════════════════════════════════════════════════════════════════════
  if (isHorizontal) {
    return (
      <div className={`group bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 hover:shadow-md transition-all duration-200 ${className}`}>
        <div className="flex flex-col sm:flex-row">

          {/* Image */}
          <Link href={href} className="relative sm:w-72 lg:w-80 xl:w-80 flex-shrink-0 block">
            <div className="relative w-full overflow-hidden bg-gray-100" style={{ aspectRatio: "16/10", minHeight: "200px" }}>
              <ImageSlider images={vehicleImages} alt={vehicle.name} className="w-full h-full" />
              {showFeaturedBadge && vehicle.featured && (
                <div className="absolute top-3 left-3 flex items-center gap-1 bg-amber-500 text-white px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide z-10 shadow">
                  <Star className="w-2.5 h-2.5 fill-current" /> Featured
                </div>
              )}
              {isSold && (
                <div className="absolute inset-0 bg-gray-900/60 flex items-center justify-center z-10">
                  <span className="bg-red-600 text-white px-4 py-1.5 rounded font-bold uppercase tracking-widest text-sm">Sold</span>
                </div>
              )}
              {vehicle.status?.slug === "coming-soon" && (
                <div className="absolute top-3 right-3 bg-orange-500 text-white px-2 py-1 rounded text-[10px] font-bold uppercase z-10">Coming Soon</div>
              )}
            </div>
          </Link>

          {/* Content */}
          <div className="flex-1 flex flex-col p-4 sm:p-5 min-w-0">
            {/* Title + price */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex-1 min-w-0">
                <Link href={href}>
                  <h3 className="font-bold text-gray-900 text-base sm:text-lg leading-snug hover:text-red-600 transition-colors line-clamp-1">
                    {vehicle.name}
                  </h3>
                </Link>
                <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-0.5 flex-wrap">
                  <span>{vehicle.brand}</span>
                  <span>·</span>
                  <span>{vehicle.year}</span>
                  {vehicle.condition && <><span>·</span><span className="capitalize">{vehicle.condition}</span></>}
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                {priceBadgeCfg && (
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold mb-1 ${priceBadgeCfg.bg} ${priceBadgeCfg.text}`}>
                    {priceBadgeCfg.label}
                  </span>
                )}
                <div className="text-xl sm:text-2xl font-extrabold text-gray-900">{formatPrice(vehicle.price)}</div>
                <div className="text-[10px] text-gray-400 mt-0.5">+ HST &amp; Lic.</div>
              </div>
            </div>

            {/* Trust badges */}
            <div className="mb-2.5"><BadgeRow /></div>

            {/* Key specs */}
            <div className="mb-2.5"><SpecRow /></div>

            {/* Extra detail chips */}
            <div className="mb-auto"><DetailChips /></div>

            {/* CTA */}
            <div className="flex items-center justify-between gap-3 pt-3 mt-4 border-t border-gray-100">
              {vehicle.daysInInventory != null && vehicle.daysInInventory > 0 && (
                <span className="text-[10px] text-amber-600 font-semibold bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                  {vehicle.daysInInventory}d listed
                </span>
              )}
              <Link href={href}
                className="ml-auto inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap">
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ════════════════════════════════════════════════════════════════════
  // GRID VIEW
  // ════════════════════════════════════════════════════════════════════
  return (
    <div className={`group bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 hover:shadow-md transition-all duration-200 ${className}`}>
      {/* Image */}
      <Link href={href} className="block relative">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
          <ImageSlider images={vehicleImages} alt={vehicle.name} className="w-full h-full" />
          {showFeaturedBadge && vehicle.featured && (
            <div className="absolute top-2.5 left-2.5 flex items-center gap-1 bg-amber-500 text-white px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide z-10 shadow">
              <Star className="w-2.5 h-2.5 fill-current" /> Featured
            </div>
          )}
          {isSold && (
            <div className="absolute inset-0 bg-gray-900/60 flex items-center justify-center z-10">
              <span className="bg-red-600 text-white px-4 py-1.5 rounded font-bold uppercase tracking-widest text-sm">Sold</span>
            </div>
          )}
          {vehicle.status?.slug === "coming-soon" && (
            <div className="absolute top-2.5 right-2.5 bg-orange-500 text-white px-2 py-1 rounded text-[10px] font-bold uppercase z-10">Coming Soon</div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        <Link href={href}>
          <h3 className="font-bold text-gray-900 text-sm sm:text-base leading-snug hover:text-red-600 transition-colors line-clamp-1 mb-0.5">
            {vehicle.name}
          </h3>
        </Link>
        <div className="flex items-center gap-1.5 text-[11px] text-gray-400 mb-3 flex-wrap">
          <span>{vehicle.brand}</span>
          <span>·</span>
          <span>{vehicle.year}</span>
          {vehicle.condition && <><span>·</span><span className="capitalize">{vehicle.condition}</span></>}
        </div>

        <div className="mb-2"><BadgeRow /></div>
        <div className="mb-2"><SpecRow compact /></div>
        <div className="mb-3"><DetailChips /></div>

        <div className="pt-3 border-t border-gray-100">
          {priceBadgeCfg && (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold mb-1.5 ${priceBadgeCfg.bg} ${priceBadgeCfg.text}`}>
              {priceBadgeCfg.label}
            </span>
          )}
          <div className="flex items-end justify-between gap-2">
            <div>
              <div className="text-lg font-extrabold text-gray-900">{formatPrice(vehicle.price)}</div>
              <div className="text-[10px] text-gray-400">+ HST &amp; Lic.</div>
            </div>
            <Link href={href}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap">
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
