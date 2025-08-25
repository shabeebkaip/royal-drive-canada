import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";
import Header from "../components/shared/Header";

const kanit = Kanit({
  variable: "--font-kanit",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Royal Drive - Car Dealership",
  description: "Find the right car guaranteed at Royal Drive",
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
        </div>
      </body>
    </html>
  );
}
