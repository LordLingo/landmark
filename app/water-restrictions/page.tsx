/* eslint-disable @next/next/no-html-link-for-pages */
import type { Metadata } from "next";
import SiteNavigation from "../site-navigation";
import { absoluteUrl } from "../site-url";
import {
  lastVerified,
  waterRestrictionCities,
} from "./water-restriction-data";
import {
  WaterDrop,
  WaterResourceFooter,
} from "./water-resource-shared";

export const metadata: Metadata = {
  title: "North Texas Watering Restrictions & Landscape Care Guide",
  description:
    "Plain-English watering schedules, official city links and practical landscape care for Prosper, Frisco, McKinney, Celina and The Colony, Texas.",
  alternates: {
    canonical: "/water-restrictions/",
  },
  openGraph: {
    title: "North Texas Watering Restrictions & Landscape Care Guide",
    description:
      "Local watering schedules and practical advice to protect North Texas lawns, trees and landscaping.",
    url: "/water-restrictions/",
    type: "website",
  },
};

const careTips = [
  {
    number: "01",
    title: "Water only when the yard needs it",
    copy:
      "Allowed days are opportunities, not requirements. Skip a cycle after useful rain or when the soil below the surface is still moist.",
  },
  {
    number: "02",
    title: "Use cycle and soak",
    copy:
      "Split one long sprinkler run into shorter cycles with pauses between them. North Texas clay gets time to absorb the water instead of sending it into the street.",
  },
  {
    number: "03",
    title: "Protect roots, not pavement",
    copy:
      "Aim spray heads away from sidewalks, repair leaks and use drip or soaker hoses for trees and beds where city rules allow.",
  },
  {
    number: "04",
    title: "Help the soil hold moisture",
    copy:
      "Use mulch in beds, mow at an appropriate height and avoid removing more than one-third of the grass blade at a time.",
  },
];

export default function WaterRestrictionsPage() {
  const pageUrl = absoluteUrl("/water-restrictions/");
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#guide`,
        url: pageUrl,
        name: "North Texas Watering Restrictions & Landscape Care Guide",
        description:
          "A community guide to watering schedules and water-conscious landscape care in five North Texas cities.",
        dateModified: "2026-07-26",
        about: waterRestrictionCities.map((city) => ({
          "@type": "City",
          name: `${city.city}, Texas`,
        })),
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
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <main className="water-resource-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteNavigation
        variant="inner"
        contactHref="/contact/?service=Water-conscious%20landscape%20design"
      />

      <section className="water-guide-hero">
        <div className="water-guide-copy">
          <div className="breadcrumbs">
            <a href="/">Home</a>
            <span>›</span>
            <span>Community water guide</span>
          </div>
          <p className="eyebrow">A community resource from Landmark</p>
          <h1>
            Water wisely.
            <em> Protect what you planted.</em>
          </h1>
          <p className="water-guide-intro">
            Find the current watering framework for five North Texas
            communities, then make every allowed watering day work harder for
            your lawn, trees and landscape.
          </p>
          <div className="water-guide-actions">
            <a className="button" href="#city-guides">
              Find your city <span>↓</span>
            </a>
            <span>Last verified {lastVerified}</span>
          </div>
        </div>
        <div className="water-guide-art" aria-hidden="true">
          <span className="water-ring water-ring-one" />
          <span className="water-ring water-ring-two" />
          <span className="water-ring water-ring-three" />
          <WaterDrop />
          <p>North Texas</p>
        </div>
      </section>

      <section className="water-guide-note">
        <span>✦</span>
        <p>
          City rules can change with the season, drought stage or water supply.
          Landmark summarizes the information in plain English; the linked
          official city source is always the final authority.
        </p>
      </section>

      <section className="city-guide-section" id="city-guides">
        <div className="water-section-heading">
          <div>
            <p className="eyebrow">Start with where you live</p>
            <h2>Five cities. Five different schedules.</h2>
          </div>
          <p>
            Choose your city for watering days, restricted hours, new-landscape
            guidance and a direct link to the official rules.
          </p>
        </div>

        <div className="city-water-grid">
          {waterRestrictionCities.map((city, index) => (
            <a href={`/water-restrictions/${city.slug}/`} key={city.slug}>
              <div className="city-water-top">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <WaterDrop small />
              </div>
              <h3>{city.city}</h3>
              <strong className={city.statusTone === "watch" ? "is-watch" : ""}>
                {city.status}
              </strong>
              <p>{city.scheduleDetail}</p>
              <i>
                View {city.city} guide <span>→</span>
              </i>
            </a>
          ))}
        </div>
      </section>

      <section className="water-care-section">
        <div className="water-section-heading">
          <div>
            <p className="eyebrow">Make the allowed water count</p>
            <h2>A healthier landscape does not begin with a longer runtime.</h2>
          </div>
          <p>
            Start with the city schedule. Then focus on absorption, root depth
            and delivering water only where it helps.
          </p>
        </div>
        <div className="water-care-grid">
          {careTips.map((tip) => (
            <article key={tip.number}>
              <span>{tip.number}</span>
              <h3>{tip.title}</h3>
              <p>{tip.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cycle-soak-section">
        <div>
          <p className="eyebrow">The North Texas clay-soil habit</p>
          <h2>Short run. Quiet pause. Repeat.</h2>
          <p>
            If a zone normally runs for 18 minutes, try three 6-minute cycles
            with enough time between them for the soil to absorb the water.
            Exact timing depends on slope, soil, plant type and sprinkler
            output, but the principle is simple: stop before runoff starts.
          </p>
        </div>
        <ol aria-label="Cycle and soak example">
          <li>
            <span>01</span>
            <strong>Run</strong>
            <small>Apply a short cycle</small>
          </li>
          <li>
            <span>02</span>
            <strong>Soak</strong>
            <small>Let clay absorb it</small>
          </li>
          <li>
            <span>03</span>
            <strong>Repeat</strong>
            <small>Reach roots without runoff</small>
          </li>
        </ol>
      </section>

      <section className="new-landscape-note">
        <div>
          <p className="eyebrow">Installing sod or new plants?</p>
          <h2>Check the city before the first shovel goes in.</h2>
        </div>
        <div>
          <p>
            Establishment rules are not the same across the service area.
            Prosper and McKinney offer approval-based variances in some
            situations, Frisco has seasonal limits, and Celina’s current Stage
            2 rules prohibit establishing new sod or plants in existing
            landscapes.
          </p>
          <a className="text-link" href="#city-guides">
            Review your city first <span>↑</span>
          </a>
        </div>
      </section>

      <section className="service-estimate water-estimate">
        <div>
          <p className="eyebrow">Beautiful can also be water-conscious</p>
          <h2>Plan a landscape made for North Texas.</h2>
          <p>
            Landmark brings appropriate plants, efficient irrigation, drainage
            and thoughtful soil preparation into one connected plan.
          </p>
        </div>
        <div className="estimate-actions">
          <a
            className="button button-light"
            href="/contact/?service=Water-conscious%20landscape%20design"
          >
            Start a conversation <span>→</span>
          </a>
          <a className="estimate-email" href="/landscape-design/">
            Explore the approach
            <strong>Landscape design + installation →</strong>
          </a>
        </div>
      </section>

      <WaterResourceFooter />
    </main>
  );
}
