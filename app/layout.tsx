import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { absoluteUrl, siteUrl } from "./site-url";
import MobileActionBar from "./mobile-action-bar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "North Texas Residential Landscaping | Landmark Landscapes",
    template: "%s | Landmark Landscapes",
  },
  description:
    "Prosper-based residential landscaping company serving Prosper, Frisco, McKinney, Celina and The Colony with design, planting, stone, drainage and lighting.",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "North Texas Residential Landscaping | Landmark Landscapes",
    description:
      "Residential landscape design and installation for Prosper and nearby North Texas communities.",
    url: "/",
    siteName: "Landmark Landscapes",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/texas-home-after.webp",
        width: 1200,
        height: 800,
        alt: "A beautifully landscaped Texas home",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "North Texas Residential Landscaping | Landmark Landscapes",
    description:
      "Residential landscape design and installation for Prosper and nearby North Texas communities.",
    images: ["/images/texas-home-after.webp"],
  },
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/favicon-32.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": absoluteUrl("/#website"),
        url: absoluteUrl("/"),
        name: "Landmark Landscapes",
        inLanguage: "en-US",
        publisher: {
          "@id": absoluteUrl("/#business"),
        },
      },
      {
        "@type": "HomeAndConstructionBusiness",
        "@id": absoluteUrl("/#business"),
        name: "Landmark Landscape Services, LLC",
        alternateName: "Landmark Landscapes",
        description:
          "Prosper-based residential landscaping company providing landscape design, installation, planting, stonework, drainage solutions and landscape lighting in North Texas.",
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
        areaServed: ["Prosper", "Celina", "Frisco", "McKinney", "The Colony"].map(
          (city) => ({
            "@type": "City",
            name: `${city}, Texas`,
          }),
        ),
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+14694928450",
          contactType: "customer service",
          areaServed: "US-TX",
          availableLanguage: "English",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Residential landscaping services",
          itemListElement: [
            "Landscape design and installation",
            "Front-yard landscaping",
            "Flower-bed design and installation",
            "Yard drainage solutions",
            "Stone borders and walkways",
            "Landscape lighting",
            "Sprinkler troubleshooting",
          ].map((name) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name,
            },
          })),
        },
        sameAs: [
          "https://nextdoor.com/pages/landmark-landscape-prosper-texas/",
        ],
      },
    ],
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
        <MobileActionBar />
      </body>
    </html>
  );
}
