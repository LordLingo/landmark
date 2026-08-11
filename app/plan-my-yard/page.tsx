import type { Metadata } from "next";
import Link from "next/link";
import SiteNavigation from "../site-navigation";
import { absoluteUrl } from "../site-url";
import { WaterResourceFooter } from "../water-restrictions/water-resource-shared";
import YardPlanner from "./yard-planner";

export const metadata: Metadata = {
  title: "Plan My Yard | North Texas Landscape Planner & AI Visualizer",
  description:
    "Build a personalized North Texas landscaping brief, upload a yard photo and see your yard reimagined with native plants.",
  alternates: {
    canonical: "/plan-my-yard/",
  },
  openGraph: {
    title: "Plan My Yard | Landmark Landscapes",
    description:
      "Get landscape ideas and an AI inspiration concept built around your North Texas yard and native plants.",
    url: "/plan-my-yard/",
    type: "website",
    images: [
      {
        url: "/images/texas-home-after-stone.webp",
        alt: "A North Texas front yard reimagined with layered planting and natural stone",
      },
    ],
  },
};

export default function PlanMyYardPage() {
  const pageUrl = absoluteUrl("/plan-my-yard/");
  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL ?? "";
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `${pageUrl}#planner`,
        name: "Landmark Plan My Yard",
        description:
          "A guided residential landscaping planner and inspiration visualizer for North Texas homeowners.",
        applicationCategory: "DesignApplication",
        operatingSystem: "Web",
        url: pageUrl,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        provider: {
          "@id": absoluteUrl("/#business"),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: absoluteUrl("/"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Plan My Yard",
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <main className="planner-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteNavigation
        variant="inner"
        contactHref="/plan-my-yard/"
        actionLabel="Plan my yard"
      />

      <section className="planner-hero">
        <div className="planner-hero-copy">
          <div className="breadcrumbs">
            <Link href="/">Home</Link>
            <span>›</span>
            <span>Plan my yard</span>
          </div>
          <p className="eyebrow">Ideas + native plants + your own yard photo</p>
          <h1>
            Your yard has more
            <em> possibility</em> than you can see today.
          </h1>
          <p>
            Tell us what you want, choose the look that feels like home and
            upload a photo. In a few minutes, you&apos;ll have a useful project
            brief and the option to see your yard reimagined.
          </p>
          <div className="planner-hero-actions">
            <a className="button" href="#yard-planner">
              Start with my yard <span>↓</span>
            </a>
            <span>No plant knowledge required · Mobile friendly</span>
          </div>
        </div>
        <div className="planner-hero-visual">
          <figure className="planner-before-card">
            <img
              src="/images/texas-home-before.jpg"
              alt="A North Texas home before a landscape redesign"
            />
            <figcaption>What you see today</figcaption>
          </figure>
          <figure className="planner-after-card">
            <img
              src="/images/texas-home-after-stone.webp"
              alt="The same North Texas home after a landscape redesign"
            />
            <figcaption>What could be possible</figcaption>
          </figure>
          <span className="planner-idea-mark" aria-hidden="true">
            ✦
          </span>
        </div>
      </section>

      <section className="planner-promise">
        <span>01 · A useful yard brief</span>
        <span>02 · North Texas native plants</span>
        <span>03 · A concept made from your photo</span>
        <span>04 · A better first conversation</span>
      </section>

      <YardPlanner bookingUrl={bookingUrl} />

      <section className="planner-expectation">
        <div>
          <p className="eyebrow">Inspiration with a responsible next step</p>
          <h2>A concept image starts the conversation. Landmark makes it real.</h2>
        </div>
        <div>
          <p>
            AI can help you see a direction that is hard to imagine from words
            alone. It cannot see drainage elevations, utility locations, plant
            availability, mature sizes or construction details.
          </p>
          <p>
            Every visual is labeled as inspiration. A Landmark consultation
            turns the look you love into a practical, buildable plan for your
            property.
          </p>
        </div>
      </section>

      <WaterResourceFooter />
    </main>
  );
}
