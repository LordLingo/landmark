import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { absoluteUrl, siteUrl } from "./site-url";
import MobileActionBar from "./mobile-action-bar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Landmark Landscapes | Residential Landscaping in Prosper, TX",
    template: "%s | Landmark Landscapes",
  },
  description:
    "Thoughtful residential landscaping, lighting, irrigation and drainage for Prosper, Frisco, McKinney, Celina and The Colony.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Landmark Landscapes | A Yard Made for Life",
    description:
      "Thoughtful residential landscaping, lighting, irrigation and drainage for Prosper and North Dallas.",
    url: "/",
    siteName: "Landmark Landscapes",
    type: "website",
    images: [
      {
        url: "/images/texas-home-after.webp",
        alt: "A beautifully landscaped Texas home",
      },
    ],
  },
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const businessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": absoluteUrl("/#business"),
    name: "Landmark Landscape Services, LLC",
    alternateName: "Landmark Landscapes",
    url: absoluteUrl("/"),
    logo: absoluteUrl("/images/landmark-logo.webp"),
    image: absoluteUrl("/images/texas-home-after.webp"),
    telephone: "+14694928450",
    email: "landmarklandscapesllc@outlook.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Prosper",
      addressRegion: "TX",
      postalCode: "75078",
      addressCountry: "US",
    },
    areaServed: ["Prosper", "Celina", "Frisco", "McKinney", "The Colony"],
    sameAs: [
      "https://nextdoor.com/pages/landmark-landscape-prosper-texas/",
    ],
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
        />
        {children}
        <MobileActionBar />
      </body>
    </html>
  );
}
