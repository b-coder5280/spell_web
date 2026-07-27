import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import { defaultSiteSettings, SiteSettings, withDefaults } from "@/lib/site-content";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = withDefaults(defaultSiteSettings, await client.fetch<Partial<SiteSettings>>(siteSettingsQuery))

  return {
    title: settings.metadataTitle,
    description: settings.metadataDescription,
    icons: {
      icon: settings.faviconUrl,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteSettings = withDefaults(defaultSiteSettings, await client.fetch<Partial<SiteSettings>>(siteSettingsQuery))

  return (
    <html lang="en" className={`${inter.variable} overflow-x-hidden`}>
      <body
        className="antialiased min-h-screen flex flex-col overflow-x-hidden max-w-[100vw]"
      >
        <AnimatedBackground />
        <Header settings={siteSettings} />
        <main className="flex-1 overflow-x-hidden w-full max-w-[100vw]">
          {children}
        </main>
        <Footer settings={siteSettings} />
      </body>
    </html>
  );
}
