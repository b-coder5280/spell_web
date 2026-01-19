import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Semiconductor Photonics and Electronics Lab | GIST",
  description: "Pioneering semiconductor photonics and electronics for a sustainable future. Gwangju Institute of Science and Technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} overflow-x-hidden`}>
      <body
        className="antialiased min-h-screen flex flex-col overflow-x-hidden max-w-[100vw]"
      >
        <AnimatedBackground />
        <Header />
        <main className="flex-1 overflow-x-hidden w-full max-w-[100vw]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
