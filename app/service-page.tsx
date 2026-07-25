/* eslint-disable @next/next/no-html-link-for-pages */
import { serviceList, type ServicePageData } from "./service-data";
import SiteNavigation from "./site-navigation";

const phoneDisplay = "469-492-8450";
const phoneHref = "tel:+14694928450";
const email = "landmarklandscapesllc@outlook.com";

function Arrow() {
  return <span aria-hidden="true">→</span>;
}

export default function ServicePage({
  service,
}: {
  service: ServicePageData;
}) {
  const related = serviceList
    .filter((item) => item.slug !== service.slug)
    .slice(0, 3);
  const contactHref = `/contact/?service=${encodeURIComponent(service.navLabel)}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: service.navLabel,
        description: service.metaDescription,
        url: `https://landmarklandscapestx.com/${service.slug}/`,
        areaServed: [
          { "@type": "City", name: "Prosper" },
          { "@type": "City", name: "Celina" },
          { "@type": "City", name: "Frisco" },
          { "@type": "City", name: "McKinney" },
          { "@type": "City", name: "The Colony" },
        ],
        provider: {
          "@type": "LocalBusiness",
          name: "Landmark Landscape Services, LLC",
          telephone: "+14694928450",
          email,
          url: "https://landmarklandscapestx.com/",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: service.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <main className="service-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SiteNavigation
        contactHref={contactHref}
        actionLabel="Request an estimate"
      />

      <section className="service-hero">
        <div className="service-hero-copy">
          <div className="breadcrumbs" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span>/</span>
            <span>{service.shortLabel}</span>
          </div>
          <p className="eyebrow">{service.eyebrow}</p>
          <h1>{service.title}</h1>
          <p className="service-hero-intro">{service.intro}</p>
          <div className="hero-buttons">
            <a className="button" href={contactHref}>
              Start the conversation <Arrow />
            </a>
            <a className="text-link" href="#possibilities">
              See what is included <Arrow />
            </a>
          </div>
        </div>

        <div className="service-hero-media">
          <figure>
            <img
              src={service.heroImage}
              alt={service.heroAlt}
              style={{ objectPosition: service.imagePosition ?? "center" }}
            />
            <figcaption>
              <span>Landmark project</span>
              <strong>Prosper + North Dallas</strong>
            </figcaption>
          </figure>
          <div className="service-keywords" aria-label="Service highlights">
            {service.searchTerms.map((term, index) => (
              <span key={term}>
                <small>0{index + 1}</small>
                {term}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="service-trust-strip" aria-label="Why choose Landmark">
        <span>Residential landscapes</span>
        <i>✦</i>
        <span>Designed for North Texas</span>
        <i>✦</i>
        <span>Clear project direction</span>
        <i>✦</i>
        <span>Prosper-based</span>
      </section>

      <section className="service-problem" id="possibilities">
        <div>
          <p className="eyebrow">The opportunity</p>
          <h2>{service.problemTitle}</h2>
        </div>
        <p>{service.problemCopy}</p>
      </section>

      <section className="service-feature-grid">
        {service.features.map((feature, index) => (
          <article key={feature.title}>
            <span>0{index + 1}</span>
            <h3>{feature.title}</h3>
            <p>{feature.copy}</p>
          </article>
        ))}
      </section>

      <section className="service-outcome">
        <figure>
          <img
            src={service.detailImage}
            alt={service.detailAlt}
            style={{ objectPosition: service.detailPosition ?? "center" }}
          />
          <figcaption>Real work from Landmark Landscapes</figcaption>
        </figure>
        <div className="service-outcome-copy">
          <p className="eyebrow">What changes</p>
          <h2>{service.outcomeTitle}</h2>
          <p>{service.outcomeCopy}</p>
          <ul>
            {service.outcomePoints.map((point) => (
              <li key={point}>
                <span>✓</span>
                {point}
              </li>
            ))}
          </ul>
          {service.note && <small className="compliance-note">{service.note}</small>}
        </div>
      </section>

      <section className="service-process" id="approach">
        <div className="service-process-heading">
          <p className="eyebrow">A clear way forward</p>
          <h2>From “something feels off” to a finished plan.</h2>
          <p>
            You do not need the technical answer before you call. Start with
            what you see and how you want the property to feel.
          </p>
        </div>
        <div className="service-process-list">
          {service.process.map((step, index) => (
            <article key={step.title}>
              <span>0{index + 1}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="service-faq" id="questions">
        <div>
          <p className="eyebrow">Useful before you call</p>
          <h2>Questions Prosper homeowners ask.</h2>
        </div>
        <div className="faq-list">
          {service.faqs.map((faq) => (
            <details key={faq.question}>
              <summary>
                {faq.question}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="related-services">
        <div className="related-heading">
          <div>
            <p className="eyebrow">One yard, connected</p>
            <h2>Explore the next layer.</h2>
          </div>
          <a className="text-link" href="/#services">
            View all services <Arrow />
          </a>
        </div>
        <div className="related-grid">
          {related.map((item, index) => (
            <a href={`/${item.slug}/`} key={item.slug}>
              <span>0{index + 1}</span>
              <h3>{item.navLabel}</h3>
              <p>{item.metaDescription}</p>
              <i aria-hidden="true">→</i>
            </a>
          ))}
        </div>
      </section>

      <section className="service-estimate" id="estimate">
        <div>
          <p className="eyebrow">Begin with the property you have</p>
          <h2>Let&apos;s talk about what could feel better.</h2>
          <p>
            Tell Landmark what is not working, what you are imagining and where
            you live. We&apos;ll help define a practical next step.
          </p>
        </div>
        <div className="estimate-actions">
          <a className="button button-light" href={contactHref}>
            Request an estimate <Arrow />
          </a>
          <a className="estimate-email" href={phoneHref}>
            Prefer to talk? <strong>Call {phoneDisplay}</strong>
          </a>
        </div>
      </section>

      <footer className="service-footer">
        <div className="footer-main">
          <div className="footer-brand">
            <img src="/images/landmark-logo.webp" alt="Landmark Landscapes" />
            <p>
              Thoughtful outdoor spaces for the way North Texas families
              actually live.
            </p>
          </div>
          <div className="footer-contact">
            <p className="eyebrow">Begin the conversation</p>
            <a href={phoneHref}>{phoneDisplay}</a>
            <a href={`mailto:${email}`}>{email}</a>
            <span>Prosper, TX 75078</span>
          </div>
          <div className="footer-service-links">
            <p className="eyebrow">Residential services</p>
            {serviceList.map((item) => (
              <a href={`/${item.slug}/`} key={item.slug}>
                {item.navLabel}
              </a>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Landmark Landscape Services, LLC</span>
          <span>Prosper · McKinney · Frisco · The Colony · Celina</span>
        </div>
      </footer>
    </main>
  );
}
