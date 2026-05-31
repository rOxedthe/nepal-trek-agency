import type { Metadata } from "next";
import {
  Playfair_Display,
  DM_Serif_Display,
  Montserrat,
  Lato,
} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import BackToTop from "@/components/ui/BackToTop";
import CookieNotice from "@/components/ui/CookieNotice";
import Preloader from "@/components/ui/Preloader";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});
const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-dm-serif",
  display: "swap",
});
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});
const lato = Lato({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-lato",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nepaltrekagency.com"),
  title: {
    default: "Nepal Trek Agency — Expert-Led Himalayan Expeditions Since 2010",
    template: "%s · Nepal Trek Agency",
  },
  description:
    "Kathmandu-based trekking company run by local expert guides. Everest Base Camp, Annapurna Circuit, Manaslu and beyond — small groups, safety first, since 2010.",
  keywords: [
    "Nepal trekking",
    "Everest Base Camp",
    "Annapurna Circuit",
    "Himalaya trek",
    "Kathmandu guides",
  ],
  openGraph: {
    title: "Nepal Trek Agency",
    description: "Expert-led Himalayan expeditions from Everest to Annapurna.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSerif.variable} ${montserrat.variable} ${lato.variable}`}
    >
      <body>
        <Preloader />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
        <BackToTop />
        <CookieNotice />
      </body>
    </html>
  );
}
