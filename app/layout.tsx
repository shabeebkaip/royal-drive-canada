import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";
import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";

const kanit = Kanit({
  variable: "--font-kanit",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Royal Drive Canada - Premium Used Cars Toronto | OMVIC Licensed Dealer",
  description: "Discover quality pre-owned vehicles at Royal Drive Canada. OMVIC licensed dealer in Toronto offering safety-certified cars, financing options, and exceptional customer service. Browse our extensive inventory today.",
  keywords: "used cars Toronto, pre-owned vehicles, car dealership Toronto, OMVIC licensed, safety certified cars, car financing Toronto, Royal Drive Canada, quality used cars, auto sales Toronto",
  authors: [{ name: "Royal Drive Canada" }],
  creator: "Royal Drive Canada",
  publisher: "Royal Drive Canada",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://royaldrivecanada.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Royal Drive Canada - Premium Used Cars Toronto",
    description: "Discover quality pre-owned vehicles at Toronto's trusted OMVIC licensed dealer. Safety-certified cars with financing options available.",
    url: 'https://royaldrivecanada.com',
    siteName: 'Royal Drive Canada',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Royal Drive Canada - Premium Used Cars Toronto',
      },
    ],
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Royal Drive Canada - Premium Used Cars Toronto",
    description: "Discover quality pre-owned vehicles at Toronto's trusted OMVIC licensed dealer.",
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  icons: {
    icon: [
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
        sizes: '32x32',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
        sizes: '64x64',
      }
    ],
    apple: [
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
        sizes: '180x180',
      }
    ],
    shortcut: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${kanit.variable} antialiased relative overflow-x-hidden font-kanit`}
      >
        {/* Global animated background elements */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-20 right-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob"></div>
          <div className="absolute top-40 left-10 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-4000"></div>
          <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-yellow-100 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-6000"></div>
        </div>

        {/* Content with relative positioning to appear above background */}
        <div className="relative z-10">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
