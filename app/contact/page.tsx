/* eslint-disable @next/next/no-html-link-for-pages */
import type { Metadata } from "next";
import ContactForm from "./contact-form";
import SiteNavigation from "../site-navigation";
import { absoluteUrl } from "../site-url";

export const metadata: Metadata = {
  title: {
    absolute: "Landscaping Estimate Prosper, TX | Landmark Landscapes",
  },
  description:
    "Tell Landmark Landscapes about your residential landscaping, drainage, lighting, stonework or sprinkler project in Prosper and North Dallas.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Request a Landscaping Estimate | Landmark Landscapes",
    description:
      "Tell Landmark about your residential landscaping project in Prosper or North Dallas.",
    url: "/contact",
    type: "website",
    images: [
      {
        url: "/images/texas-home-after-stone.webp",
        alt: "A completed North Texas residential landscape",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Request a Landscaping Estimate | Landmark Landscapes",
    description:
      "Tell Landmark about your residential landscaping project in Prosper or North Dallas.",
    images: ["/images/texas-home-after-stone.webp"],
  },
};

const phoneDisplay = "469-492-8450";
const phoneHref = "tel:+14694928450";
const email = "landmarklandscapesllc@outlook.com";

export default function ContactPage() {
  const pageUrl = absoluteUrl("/contact");
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": pageUrl,
        url: pageUrl,
        name: "Request a Landscaping Estimate",
        description:
          "Contact Landmark Landscapes about a residential landscaping project in Prosper or North Dallas.",
        isPartOf: {
          "@id": absoluteUrl("/#website"),
        },
        about: {
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
            name: "Request an estimate",
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <main className="contact-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteNavigation
        contactHref="/contact"
        actionLabel="Request an estimate"
      />

      <section className="contact-hero">
        <div>
          <div className="breadcrumbs" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span>/</span>
            <span>Request an estimate</span>
          </div>
          <p className="eyebrow">A simple place to begin</p>
          <h1>Tell us what you want home to feel like.</h1>
          <p>
            You do not need plant names, measurements or a finished plan. Share
            what is not working and what you would love to change.
          </p>
        </div>
        <aside>
          <span>Prefer a conversation?</span>
          <a href={phoneHref}>{phoneDisplay}</a>
          <a href={`mailto:${email}`}>{email}</a>
          <p>Serving Prosper, Celina, Frisco, McKinney and The Colony.</p>
        </aside>
      </section>

      <section className="contact-form-section">
        <ContactForm />
      </section>

      <footer className="service-footer contact-footer">
        <div className="footer-bottom">
          <span>© 2026 Landmark Landscape Services, LLC</span>
          <span>Prosper · McKinney · Frisco · The Colony · Celina</span>
        </div>
      </footer>
    </main>
  );
}
