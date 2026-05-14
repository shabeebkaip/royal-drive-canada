import React from "react";
import { notFound, redirect } from "next/navigation";
import { Metadata } from "next";
import {
  Gauge, Fuel, Settings, Car, MapPin, Phone, Mail,
  Zap, Check, ChevronRight, Clock, Shield, CalendarDays,
  Fingerprint, ShieldCheck,
} from "lucide-react";
import {
  ImageGallery,
  FavoriteButton,
  BackButton,
  ShareButton,
} from "@/components/vehicles/detailPage/VehicleDetailClient";
import VehicleEnquiryDialog from "@/components/vehicles/VehicleEnquiryDialog";
import { VehicleDetail } from "@/types/vehicle";
import "./vehicle-description.css";
import Specifications from "@/components/vehicles/detailPage/Specifications";
import VehicleHistory from "@/components/vehicles/detailPage/VehicleHistory";
import { SITE_CONFIG, createMetadata } from "@/lib/metadata";

const formatMileage = (v: number) => new Intl.NumberFormat("en-CA").format(v);
const formatPrice = (v: number) =>
  new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", minimumFractionDigits: 0 }).format(v);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const { slug } = await params;
  try {
    const res = await fetch(`${apiBaseUrl}/vehicles/${slug}`, { next: { revalidate: 300, tags: [`vehicle-${slug}`] } });
    const data = await res.json();
    if (data.success && data.data) {
      const v = data.data;
      const name = `${v.year} ${v.make.name} ${v.model.name}${v.trim ? ` ${v.trim}` : ""}`;
      const images = v.media.images.length > 0 ? v.media.images : [SITE_CONFIG.images.defaultVehicleImage];
      return createMetadata({
        title: `${name} for Sale in Toronto`,
        description: v.marketing.description?.replace(/<[^>]*>/g, "").substring(0, 160) || `${name} at Royal Drive Canada. OMVIC licensed dealer in Toronto.`,
        keywords: [`${v.year} ${v.make.name} ${v.model.name}`, `${v.make.name} for sale Toronto`, v.type?.name, v.engine?.fuelType?.name],
        path: `/vehicles/${slug}`,
        images: images.slice(0, 4),
      });
    }
  } catch { /* ignore */ }
  return createMetadata({ title: "Vehicle Details", description: "Royal Drive Canada — Toronto's OMVIC licensed dealer.", path: "/vehicles" });
}

async function getVehicle(slug: string): Promise<VehicleDetail | null> {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  try {
    const res = await fetch(`${apiBaseUrl}/vehicles/${slug}`, {
      next: { revalidate: 300, tags: [`vehicle-${slug}`] },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.success && data.data ? data.data : null;
  } catch { return null; }
}

function FeatureCheck({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
        <Check className="w-2.5 h-2.5 text-emerald-600 stroke-[3]" />
      </div>
      <span className="text-sm text-gray-700">{label}</span>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-3 text-lg font-bold text-gray-900 mb-5">
      <span className="w-1 h-6 bg-red-600 rounded-full" />
      {children}
    </h2>
  );
}

export default async function VehicleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const vehicle = await getVehicle(slug);
  if (!vehicle) notFound();

  // Don't show detail pages for sold or draft vehicles
  const statusName = vehicle.status?.name?.toLowerCase();
  const statusSlug = vehicle.status?.slug?.toLowerCase();
  if (['sold', 'draft'].includes(statusName ?? '') || ['sold', 'draft'].includes(statusSlug ?? '')) {
    redirect('/vehicles');
  }

  const vehicleName = `${vehicle.year} ${vehicle.make.name} ${vehicle.model.name}`;
  const stockRef = (vehicle.stockNumber ?? vehicle.marketing?.slug ?? vehicle._id ?? "").toString().toUpperCase();
  const conditionLabel = vehicle.condition === "certified-pre-owned" ? "Certified Pre-Owned" : vehicle.condition === "new" ? "New" : "Used";
  const isAvailable = vehicle.availability?.inStock;

  return (
    <div className="min-h-screen bg-white pt-20" suppressHydrationWarning>

      {/* ── Breadcrumb ─────────────────────────────────────────────── */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10 py-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-sm text-gray-500 flex-wrap">
            <BackButton />
            <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
            <span>{vehicle.make.name}</span>
            <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
            <span className="text-gray-900 font-medium">{vehicleName}</span>
          </div>
          {stockRef && (
            <span className="text-xs text-gray-400 hidden md:block">
              Stock # <span className="font-semibold text-gray-700">{stockRef}</span>
            </span>
          )}
        </div>
      </div>

      {/* ── Full-bleed gallery ─────────────────────────────────────── */}
      <div className="w-full relative">
        <div className="max-w-screen-2xl mx-auto">
          <div className="relative w-full" style={{ aspectRatio: "16/7" }}>
            {vehicle.media.images.length > 0 ? (
              <ImageGallery images={vehicle.media.images} vehicleName={vehicleName} />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-900">
                <Car className="w-24 h-24 text-gray-600" />
              </div>
            )}
            {/* Overlay badges */}
            <div className="absolute top-4 left-4 flex gap-2 z-10">
              <span className={`text-xs font-bold px-3 py-1.5 rounded-full shadow-lg uppercase tracking-wide ${isAvailable ? "bg-emerald-500 text-white" : "bg-red-500 text-white"}`}>
                {vehicle.status?.name}
              </span>
              <span className="text-xs font-bold px-3 py-1.5 rounded-full shadow-lg uppercase tracking-wide bg-gray-900/80 text-white backdrop-blur-sm">
                {conditionLabel}
              </span>
            </div>
            <FavoriteButton />
          </div>
        </div>
      </div>

      {/* ── Title + price bar (full width) ─────────────────────────── */}
      <div className="w-full border-b border-gray-200 bg-white shadow-sm">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10 py-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Title block */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-3">
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight leading-none">
                  {vehicle.year} {vehicle.make.name} {vehicle.model.name}
                </h1>
                {vehicle.trim && (
                  <p className="text-base text-gray-500 font-medium mt-1">{vehicle.trim}</p>
                )}
                <div className="flex flex-wrap items-center gap-2 mt-2.5">
                  {vehicle.type?.name && (
                    <span className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-100 rounded-full px-2.5 py-1">
                      <Car className="w-3 h-3" /> {vehicle.type.name}
                    </span>
                  )}
                  {vehicle.vin && (
                    <span className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-100 rounded-full px-2.5 py-1 font-mono">
                      <Fingerprint className="w-3 h-3" /> {vehicle.vin}
                    </span>
                  )}
                  {(vehicle.internal?.daysInInventory ?? 0) > 0 && (
                    <span className="inline-flex items-center gap-1 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-2.5 py-1">
                      <Clock className="w-3 h-3" /> {vehicle.internal?.daysInInventory} days listed
                    </span>
                  )}
                </div>
              </div>
              <ShareButton />
            </div>
          </div>

          {/* Price block */}
          <div className="flex items-center gap-6 lg:gap-8 flex-shrink-0">
            <div className="text-right">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Asking Price</p>
              <p className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-none mt-0.5">
                {formatPrice(vehicle.pricing.listPrice)}
              </p>
              <p className="text-xs text-gray-400 mt-1">+ HST &amp; Licensing</p>
            </div>
            <div className="hidden lg:flex flex-col gap-2 min-w-[180px]">
              <VehicleEnquiryDialog
                vehicle={{
                  id: vehicle._id,
                  slug: vehicle.marketing?.slug ?? vehicle._id,
                  year: vehicle.year,
                  make: vehicle.make,
                  model: vehicle.model,
                  stockNumber: stockRef,
                  price: vehicle.pricing.listPrice,
                }}
              />
              <a href="tel:+16476222202"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border-2 border-gray-200 text-gray-800 font-semibold text-sm hover:border-gray-900 hover:bg-gray-900 hover:text-white transition-all">
                <Phone className="w-4 h-4" /> (647) 622-2202
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Key specs strip ────────────────────────────────────────── */}
      <div className="w-full bg-white border-b border-gray-200">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-gray-100">
            {[
              { icon: <Gauge className="w-4 h-4" />, label: "Mileage", value: vehicle.odometer?.value ? `${formatMileage(vehicle.odometer.value)} km` : "—" },
              { icon: <Fuel className="w-4 h-4" />, label: "Fuel", value: vehicle.engine?.fuelType?.name ?? "—" },
              { icon: <Settings className="w-4 h-4" />, label: "Transmission", value: vehicle.transmission?.type?.name ?? "—" },
              { icon: <Zap className="w-4 h-4" />, label: "Drivetrain", value: vehicle.drivetrain?.name ?? "—" },
            ].map(({ icon, label, value }) => (
              <div key={label} className="flex items-center gap-3 px-4 sm:px-6 py-4 sm:py-5">
                <div className="text-red-600 flex-shrink-0">{icon}</div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">{label}</p>
                  <p className="text-sm sm:text-base font-bold text-gray-900 mt-0.5">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main content (full width, 2-col) ──────────────────────── */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10 py-8 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_380px] gap-8 lg:gap-12 items-start">

          {/* ── LEFT: all content ──────────────────────────────────── */}
          <div className="space-y-10 min-w-0">

            {/* Description */}
            {vehicle.marketing?.description && (
              <section>
                <SectionTitle>Seller&rsquo;s Description</SectionTitle>
                <div className="vehicle-description-content text-sm leading-7 text-gray-600"
                  dangerouslySetInnerHTML={{ __html: vehicle.marketing.description }} />
              </section>
            )}

            {/* Features */}
            {vehicle.features && Object.values(vehicle.features).some((a: string[]) => a?.length > 0) && (
              <section>
                <SectionTitle>Features &amp; Options</SectionTitle>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-8">
                  {[
                    { key: "safety", label: "Safety", accent: "text-emerald-600", bg: "bg-emerald-50" },
                    { key: "interior", label: "Interior", accent: "text-blue-600", bg: "bg-blue-50" },
                    { key: "technology", label: "Technology", accent: "text-violet-600", bg: "bg-violet-50" },
                    { key: "exterior", label: "Exterior", accent: "text-orange-600", bg: "bg-orange-50" },
                    { key: "convenience", label: "Convenience", accent: "text-gray-600", bg: "bg-gray-100" },
                  ].map(({ key, label, accent, bg }) => {
                    const items = vehicle.features[key as keyof typeof vehicle.features];
                    if (!items?.length) return null;
                    return (
                      <div key={key}>
                        <div className={`inline-flex items-center px-2.5 py-1 rounded-md ${bg} ${accent} text-xs font-bold uppercase tracking-wider mb-3`}>
                          {label}
                        </div>
                        <div className="space-y-2">
                          {items.map((f: string) => <FeatureCheck key={f} label={f} />)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Specifications */}
            <section>
              <SectionTitle>Specifications</SectionTitle>
              <Specifications vehicle={vehicle} />
            </section>

            {/* Vehicle History */}
            <section>
              <SectionTitle>Vehicle History &amp; Certification</SectionTitle>
              <VehicleHistory vehicle={vehicle} />
            </section>
          </div>

          {/* ── RIGHT: sticky sidebar ──────────────────────────────── */}
          <div className="lg:sticky lg:top-24 space-y-5">

            {/* Price card */}
            <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
              {/* Dark price header */}
              <div className="bg-gray-950 px-6 py-5">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Asking Price</p>
                <p className="text-4xl font-extrabold text-white tracking-tight">{formatPrice(vehicle.pricing.listPrice)}</p>
                <p className="text-xs text-gray-500 mt-1.5">+ HST &amp; Licensing</p>
                <div className="flex items-center gap-1.5 mt-3">
                  <span className={`w-1.5 h-1.5 rounded-full ${isAvailable ? "bg-emerald-400" : "bg-red-400"} animate-pulse`} />
                  <span className="text-xs text-gray-400">{isAvailable ? "In Stock — Ready for Pickup" : "Currently Unavailable"}</span>
                </div>
              </div>

              {/* Financing */}
              {vehicle.pricing?.financing?.available && (
                <div className="flex items-center gap-3 px-5 py-3.5 bg-blue-50 border-b border-blue-100">
                  <Shield className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-blue-900">Financing Available</p>
                    <p className="text-xs text-blue-600">Competitive rates — ask us today</p>
                  </div>
                </div>
              )}

              {/* CTAs */}
              <div className="px-5 py-5 space-y-3">
                <VehicleEnquiryDialog
                  vehicle={{
                    id: vehicle._id,
                    slug: vehicle.marketing?.slug ?? vehicle._id,
                    year: vehicle.year,
                    make: vehicle.make,
                    model: vehicle.model,
                    stockNumber: stockRef,
                    price: vehicle.pricing.listPrice,
                  }}
                />
                <a href="tel:+16476222202"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border-2 border-gray-200 text-gray-900 font-semibold text-sm hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-200">
                  <Phone className="w-4 h-4" /> (647) 622-2202
                </a>
              </div>

              {/* Dealer contact */}
              <div className="border-t border-gray-100 px-5 py-4 space-y-3.5 bg-gray-50">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Royal Drive Canada</p>
                <a href="mailto:royaldrivemotor@gmail.com" className="flex items-center gap-3 group">
                  <div className="w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center flex-shrink-0 group-hover:border-red-200 transition-colors">
                    <Mail className="w-3.5 h-3.5 text-gray-400 group-hover:text-red-600 transition-colors" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-gray-400">Email</p>
                    <p className="text-xs font-semibold text-gray-800 group-hover:text-red-600 transition-colors truncate">royaldrivemotor@gmail.com</p>
                  </div>
                </a>
                <a href="https://www.google.com/maps/search/?api=1&query=751+Danforth+Rd+Toronto+ON" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                  <div className="w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center flex-shrink-0 group-hover:border-red-200 transition-colors">
                    <MapPin className="w-3.5 h-3.5 text-gray-400 group-hover:text-red-600 transition-colors" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400">Location</p>
                    <p className="text-xs font-semibold text-gray-800 group-hover:text-red-600 transition-colors">751 Danforth Rd, Toronto, ON</p>
                  </div>
                </a>
              </div>
            </div>

            {/* At a glance */}
            <div className="border border-gray-200 rounded-2xl overflow-hidden">
              <div className="px-5 py-4 bg-gray-50 border-b border-gray-200">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">At a Glance</p>
              </div>
              <div className="divide-y divide-gray-100">
                {[
                  { label: "Year", value: vehicle.year },
                  { label: "Condition", value: conditionLabel },
                  { label: "Exterior", value: vehicle.specifications?.exteriorColor },
                  { label: "Interior", value: vehicle.specifications?.interiorColor },
                  { label: "Engine", value: vehicle.engine?.size ? `${vehicle.engine.size}L${vehicle.engine.cylinders ? ` ${vehicle.engine.cylinders}-cyl` : ""}` : undefined },
                  { label: "Mileage", value: vehicle.odometer?.value ? `${formatMileage(vehicle.odometer.value)} km` : undefined },
                  { label: "Doors", value: vehicle.specifications?.doors },
                  { label: "Seats", value: vehicle.specifications?.seatingCapacity ? `${vehicle.specifications.seatingCapacity} passengers` : undefined },
                ].filter(r => r.value !== undefined && r.value !== null && r.value !== "").map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center px-5 py-3 text-sm">
                    <span className="text-gray-500">{label}</span>
                    <span className="font-semibold text-gray-900 capitalize">{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* OMVIC trust badge */}
            <div className="flex items-start gap-3 px-4 py-4 rounded-2xl border border-gray-200 bg-gray-50">
              <ShieldCheck className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-gray-500 leading-relaxed">
                <span className="font-semibold text-gray-700">OMVIC Registered Dealer.</span> All vehicles sold under Ontario's Motor Vehicle Dealers Act.
              </p>
            </div>

            {/* Updated timestamp */}
            {vehicle.availability?.lastUpdated && (
              <div className="flex items-center gap-1.5 text-xs text-gray-400 px-1">
                <CalendarDays className="w-3.5 h-3.5" />
                Updated {new Date(vehicle.availability.lastUpdated).toLocaleDateString("en-CA", { year: "numeric", month: "short", day: "numeric" })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Mobile CTA bar (fixed bottom) ─────────────────────────── */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-white border-t border-gray-200 px-4 py-3 flex gap-3 shadow-2xl">
        <a href="tel:+16476222202"
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-gray-200 text-gray-900 font-semibold text-sm">
          <Phone className="w-4 h-4" /> Call
        </a>
        <div className="flex-[2]">
          <VehicleEnquiryDialog
            vehicle={{
              id: vehicle._id,
              slug: vehicle.marketing?.slug ?? vehicle._id,
              year: vehicle.year,
              make: vehicle.make,
              model: vehicle.model,
              stockNumber: stockRef,
              price: vehicle.pricing.listPrice,
            }}
          />
        </div>
      </div>
    </div>
  );
}
