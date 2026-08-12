/* eslint-disable @next/next/no-html-link-for-pages */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteNavigation from "../../site-navigation";
import { absoluteUrl } from "../../site-url";
import {
  getWaterRestrictionCity,
  lastVerified,
  waterRestrictionCities,
} from "../water-restriction-data";
import {
  WaterDrop,
  WaterResourceFooter,
} from "../water-resource-shared";

type CityWaterPageProps = {
  params: Promise<{ city: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return waterRestrictionCities.map((city) => ({ city: city.slug }));
}

export async function generateMetadata({
  params,
}: CityWaterPageProps): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getWaterRestrictionCity(slug);

  if (!city) {
    return {};
  }

  return {
    title: {
      absolute: `${city.city} Watering Restrictions | Landmark Landscapes`,
    },
    description: `${city.city}, Texas watering days, restricted hours, new-landscape guidance and practical tips, with a direct link to the official city source.`,
    alternates: {
      canonical: `/water-restrictions/${city.slug}`,
    },
    openGraph: {
      title: `${city.city}, TX Watering Restrictions & Schedule`,
      description: city.intro,
      url: `/water-restrictions/${city.slug}`,
      type: "article",
      images: [
        {
          url: "/images/irrigation-turf-project.webp",
          alt: `Healthy residential landscape in ${city.city}, Texas`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${city.city} Watering Restrictions | Landmark Landscapes`,
      description: city.intro,
      images: ["/images/irrigation-turf-project.webp"],
    },
  };
}

export default async function CityWaterRestrictionPage({
  params,
}: CityWaterPageProps) {
  const { city: slug } = await params;
  const city = getWaterRestrictionCity(slug);

  if (!city) {
    notFound();
  }

  const pageUrl = absoluteUrl(`/water-restrictions/${city.slug}`);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${pageUrl}#article`,
        headline: `${city.city}, TX Watering Restrictions & Schedule`,
        description: city.intro,
        datePublished: "2026-07-26",
        dateModified: "2026-08-12",
        image: absoluteUrl("/images/irrigation-turf-project.webp"),
        mainEntityOfPage: pageUrl,
        isPartOf: {
          "@id": absoluteUrl("/#website"),
        },
        author: {
          "@id": absoluteUrl("/#business"),
        },
        publisher: {
          "@id": absoluteUrl("/#business"),
        },
        about: {
          "@type": "City",
          name: `${city.city}, Texas`,
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
            name: "Watering Restrictions",
            item: absoluteUrl("/water-restrictions"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: city.city,
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <main className="water-resource-page city-water-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteNavigation
        variant="inner"
        contactHref={`/contact?service=${encodeURIComponent(
          `Water-conscious landscaping in ${city.city}`,
        )}`}
      />

      <section className="city-water-hero">
        <div className="city-water-hero-copy">
          <div className="breadcrumbs">
            <a href="/">Home</a>
            <span>›</span>
            <a href="/water-restrictions">Watering guide</a>
            <span>›</span>
            <span>{city.city}</span>
          </div>
          <p className="eyebrow">{city.city}, Texas community guide</p>
          <h1>
            {city.city} watering
            <em> restrictions & schedule.</em>
          </h1>
          <p>{city.intro}</p>
          <div className="city-status-row">
            <strong className={city.statusTone === "watch" ? "is-watch" : ""}>
              <span />
              {city.status}
            </strong>
            <small>Verified {lastVerified}</small>
          </div>
        </div>
        <div className="city-water-source">
          <WaterDrop />
          <p>Official information</p>
          <h2>Always confirm before you water.</h2>
          <span>
            City schedules and drought stages can change. Landmark’s summary is
            designed to help; the city source controls.
          </span>
          <a href={city.officialUrl} target="_blank" rel="noreferrer">
            Open {city.officialLabel} <i>↗</i>
          </a>
        </div>
      </section>

      <section className="city-quick-facts">
        <article>
          <span>01</span>
          <p>Watering schedule</p>
          <h2>{city.scheduleLabel}</h2>
          <small>{city.scheduleDetail}</small>
        </article>
        <article>
          <span>02</span>
          <p>Time-of-day rule</p>
          <h2>{city.timeRule}</h2>
          <small>
            Early morning usually reduces evaporation and wind interference.
          </small>
        </article>
        <article>
          <span>03</span>
          <p>New sod + plants</p>
          <h2>Check before installing</h2>
          <small>{city.newLandscapeRule}</small>
        </article>
      </section>

      <section className="city-schedule-section">
        <div className="city-rules-copy">
          <p className="eyebrow">The plain-English version</p>
          <h2>What {city.city} homeowners should know.</h2>
          <ul>
            {city.rules.map((rule) => (
              <li key={rule}>
                <span>✓</span>
                {rule}
              </li>
            ))}
          </ul>
        </div>
        <div className="city-schedule-card">
          <div>
            <p>Current schedule reference</p>
            <span>Last checked {lastVerified}</span>
          </div>
          <dl>
            {city.schedule.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
          <a href={city.officialUrl} target="_blank" rel="noreferrer">
            Verify on the official city website <span>↗</span>
          </a>
        </div>
      </section>

      <section className="city-landscape-care">
        <div>
          <p className="eyebrow">Protect the landscape within the rules</p>
          <h2>Make each watering day work harder.</h2>
          <p>
            The goal is not to run every zone as long as possible. It is to
            reach roots while limiting evaporation, overspray and runoff.
          </p>
        </div>
        <div className="city-care-list">
          {city.landscapeAdvice.map((advice, index) => (
            <article key={advice}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{advice}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="city-cycle-note">
        <div>
          <span>Cycle</span>
          <i>→</i>
          <span>Soak</span>
          <i>→</i>
          <span>Repeat</span>
        </div>
        <p>
          Break a long run into shorter cycles. Pause between cycles so clay
          soil can absorb water before it becomes runoff.
        </p>
      </section>

      <section className="service-estimate water-estimate">
        <div>
          <p className="eyebrow">Planning a landscape in {city.city}?</p>
          <h2>Build beauty around North Texas reality.</h2>
          <p>
            Landmark can connect planting, soil preparation, irrigation and
            drainage around a plan that respects the way water is managed here.
          </p>
        </div>
        <div className="estimate-actions">
          <a
            className="button button-light"
            href={`/contact?service=${encodeURIComponent(
              `Landscaping in ${city.city}`,
            )}`}
          >
            Discuss your property <span>→</span>
          </a>
          <a className="estimate-email" href={city.serviceUrl}>
            Explore local landscaping
            <strong>Landscaping in {city.city}, TX →</strong>
          </a>
        </div>
      </section>

      <section className="other-city-guides">
        <p>Watering guides for nearby communities</p>
        <div>
          {waterRestrictionCities
            .filter((item) => item.slug !== city.slug)
            .map((item) => (
              <a
                href={`/water-restrictions/${item.slug}`}
                key={item.slug}
              >
                {item.city} <span>→</span>
              </a>
            ))}
        </div>
      </section>

      <WaterResourceFooter />
    </main>
  );
}
