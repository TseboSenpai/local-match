import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// next/font downloads the fonts at build time and serves them with the site.
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const jetbrainsMono = JetBrains_Mono({ variable: "--font-jetbrains-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: site.name, template: `%s — ${site.name}` },
  description:
    "An AI job-matching system that uses South African credentials, equivalence rules and location to recommend fairer, more relevant jobs and training to job seekers in Limpopo.",
};

// Around every page: header on top, footer at the bottom.
// Pages add the sidebar themselves with <PageFrame>.
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
      <body className="flex min-h-screen flex-col font-sans">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
