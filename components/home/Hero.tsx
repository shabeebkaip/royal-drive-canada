import Link from 'next/link'
import Image from 'next/image'
import SearchCard from '@/components/home/SearchCard'
import { ShieldCheck, BadgeDollarSign, Banknote, Star } from 'lucide-react'


const POPULAR_SEARCHES = ['SUV', 'Truck', 'Sedan', 'BMW', 'Honda', 'Toyota', 'Audi']

const TRUST_STATS = [
  { icon: <ShieldCheck className="w-5 h-5 text-blue-400" />, value: '500+', label: 'Vehicles in Stock' },
  { icon: <Star className="w-5 h-5 text-yellow-400" />,      value: '4.8★', label: '300+ Reviews' },
  { icon: <BadgeDollarSign className="w-5 h-5 text-green-400" />, value: 'No-Haggle', label: 'Transparent Pricing' },
  { icon: <Banknote className="w-5 h-5 text-blue-400" />,    value: 'Financing', label: 'Pre-Approved Options' },
]

const Hero = async () => {
  return (
    <div>
      {/* ══════════════════════════════════════════
          HERO — full-bleed background, centered CTA
          ══════════════════════════════════════════ */}
      <section className="relative min-h-[88vh] flex flex-col">

        {/* Background */}
        <Image
          src="/hero-background.png"
          alt="Royal Drive Canada — Used Cars Toronto"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Dark scrim — enough contrast, image still vivid */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/65" />

        {/* Navbar height spacer */}
        <div className="h-[130px] lg:h-[155px] flex-shrink-0" />

        {/* ── Centered content ── */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 pb-10">

          {/* Trust badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">
            <span className="text-base leading-none">🇨🇦</span>
            <span className="text-xs font-bold text-white/90 uppercase tracking-widest">
              Toronto's Trusted Used Car Dealership
            </span>
          </div>

          {/* Headline — instantly communicates purpose */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tight max-w-4xl mb-4">
            Find Your Next<br className="hidden sm:block" /> Used Car in Toronto
          </h1>

          {/* Subheadline with inventory count — key buying signal */}
          <p className="text-lg sm:text-xl text-white/75 mb-10 max-w-xl">
            Browse <span className="text-white font-bold">500+ quality pre-owned vehicles</span> — safety certified, no-haggle pricing.
          </p>

          {/* ── Search bar — the primary CTA ── */}
          <div className="w-full max-w-5xl">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-white/20">
              <SearchCard />
            </div>

            {/* Popular searches */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
              <span className="text-[11px] font-semibold text-white/50 uppercase tracking-wider">Popular:</span>
              {POPULAR_SEARCHES.map((tag) => (
                <Link
                  key={tag}
                  href={`/vehicles?search=${encodeURIComponent(tag)}`}
                  className="px-3 py-1 bg-white/10 hover:bg-white/20 border border-white/15 rounded-full text-xs font-semibold text-white/80 hover:text-white transition-all backdrop-blur-sm"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>

        </div>

        {/* ── Trust stats strip — bottom of hero ── */}
        <div className="relative z-10 border-t border-white/10 bg-black/30 backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10">
              {TRUST_STATS.map((s) => (
                <div key={s.label} className="flex items-center gap-3 py-4 px-4 sm:px-6">
                  <div className="flex-shrink-0">{s.icon}</div>
                  <div className="text-left">
                    <p className="text-sm font-extrabold text-white leading-none">{s.value}</p>
                    <p className="text-[11px] text-white/55 mt-0.5">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>

    </div>
  )
}

export default Hero
