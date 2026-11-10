import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NavLinks from "@/components/NavLinks";

// next/font downloads the fonts at build time and serves them with the site.
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const jetbrainsMono = JetBrains_Mono({ variable: "--font-jetbrains-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: site.name, template: `%s — ${site.name}` },
  description:
    "An AI job-matching system that uses South African credentials, equivalence rules and location to recommend fairer, more relevant jobs and training to job seekers in Limpopo.",
};

// The shared frame around every page: header, sidebar, page content, footer.
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
      <body className="flex min-h-screen flex-col font-sans">
        <Header />
        <div className="mx-auto flex w-full max-w-[1440px] flex-1 items-start">
          <nav aria-label="Site" className="hidden w-[280px] flex-none py-8 pl-8 pr-6 text-sm lg:block">
            <NavLinks variant="sidebar" />
          </nav>
          <main className="min-w-0 flex-1 self-stretch px-4 pb-12 pt-7 lg:border-l lg:border-line lg:px-8 lg:pb-16 lg:pt-10">
            {children}
          </main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
