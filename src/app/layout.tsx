import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { Metadata } from "next";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { client } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import { defaultSiteSettings, SiteSettings, withDefaults } from "@/lib/site-content";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export async function generateMetadata(): Promise<Metadata> {
  let fetchedSettings: Partial<SiteSettings> | null = null

  try {
    fetchedSettings = await client.fetch<Partial<SiteSettings>>(siteSettingsQuery)
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("Failed to load site metadata settings. Using defaults.", error)
    }
  }

  const settings = withDefaults(defaultSiteSettings, fetchedSettings)

  return {
    title: {
      default: settings.metadataTitle,
      template: "%s | SPELL",
    },
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
  let fetchedSettings: Partial<SiteSettings> | null = null

  try {
    fetchedSettings = await client.fetch<Partial<SiteSettings>>(siteSettingsQuery)
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("Failed to load site settings. Using defaults.", error)
    }
  }

  const siteSettings = withDefaults(defaultSiteSettings, fetchedSettings)
  const draft = await draftMode()

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
        {draft.isEnabled ? <VisualEditing /> : null}
      </body>
    </html>
  );
}
