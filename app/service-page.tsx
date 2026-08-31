/* eslint-disable @next/next/no-html-link-for-pages */
import { serviceList, type ServicePageData } from "./service-data";
import { locationPageList } from "./location-page-data";
import SiteNavigation from "./site-navigation";
import { absoluteUrl } from "./site-url";
import SiteImage from "./site-image";

const phoneDisplay = "469-492-8450";
const phoneHref = "tel:+14694928450";
const email = "landmarklandscapesllc@outlook.com";
const defaultServiceAreas = ["Prosper", "Celina", "Frisco", "McKinney", "The Colony"];
const navigationServices = [
  {
    slug: "landscape-design",
    navLabel: "Landscape design + installation",
  },
  ...serviceList,
];

function Arrow() {
  return <span aria-hidden="true">→</span>;
}

export default function ServicePage({
  service,
  relatedServices,
  areaServed = defaultServiceAreas,
  faqTitle = "Questions Prosper homeowners ask.",
  relatedEyebrow = "One yard, connected",
  relatedTitle = "Explore the next layer.",
  projectCaption = "Prosper + North Dallas",
}: {
  service: ServicePageData;
  relatedServices?: ServicePageData[];
  areaServed?: string[];
  faqTitle?: string;
  relatedEyebrow?: string;
  relatedTitle?: string;
  projectCaption?: string;
}) {
  const related = relatedServices
    ? relatedServices.filter((item) => item.slug !== service.slug)
    : serviceList.filter((item) => item.slug !== service.slug).slice(0, 3);
  const contactHref = `/contact?service=${encodeURIComponent(service.navLabel)}`;
  const pageUrl = absoluteUrl(`/${service.slug}`);
  const breadcrumbId = `${pageUrl}#breadcrumb`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": pageUrl,
        url: pageUrl,
        name: service.metaTitle,
        description: service.metaDescription,
        isPartOf: {
          "@id": absoluteUrl("/#website"),
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: absoluteUrl(service.heroImage),
        },
        inLanguage: "en-US",
        breadcrumb: {
          "@id": breadcrumbId,
        },
        about: {
          "@id": `${pageUrl}#service`,
        },
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: service.navLabel,
        serviceType: service.navLabel,
        description: service.metaDescription,
        url: pageUrl,
        areaServed: areaServed.map((city) => ({
          "@type": "City",
          name: city,
        })),
        provider: {
          "@id": absoluteUrl("/#business"),
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": breadcrumbId,
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
            name: service.shortLabel,
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
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
            <SiteImage
              src={service.heroImage}
              alt={service.heroAlt}
              sizes="(max-width: 820px) 100vw, 50vw"
              preload
              style={{ objectPosition: service.imagePosition ?? "center" }}
            />
            <figcaption>
              <span>Landmark project</span>
              <strong>{projectCaption}</strong>
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
          <SiteImage
            src={service.detailImage}
            alt={service.detailAlt}
            sizes="(max-width: 820px) 100vw, 52vw"
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

      {service.localSection && (
        <>
          <section className="service-problem service-local-intro">
            <div>
              <p className="eyebrow">{service.localSection.eyebrow}</p>
              <h2>{service.localSection.title}</h2>
            </div>
            <p>{service.localSection.intro}</p>
          </section>
          <section
            className="service-feature-grid service-local-grid"
            aria-label={`${service.shortLabel} local project guidance`}
          >
            {service.localSection.items.map((item, index) => (
              <article key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </section>
        </>
      )}

      {service.localResources && (
        <section className="service-local-resources" aria-labelledby="local-resources-title">
          <div className="service-local-resources-heading">
            <p className="eyebrow">{service.localResources.eyebrow}</p>
            <h2 id="local-resources-title">{service.localResources.title}</h2>
            <p>{service.localResources.intro}</p>
          </div>
          <div className="service-local-resource-links">
            {service.localResources.links.map((resource, index) => (
              <a href={resource.href} key={resource.href}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{resource.title}</h3>
                  <p>{resource.copy}</p>
                </div>
                <i aria-hidden="true">→</i>
              </a>
            ))}
          </div>
        </section>
      )}

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
          <h2>{faqTitle}</h2>
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
            <p className="eyebrow">{relatedEyebrow}</p>
            <h2>{relatedTitle}</h2>
          </div>
          <a className="text-link" href="/#services">
            View all services <Arrow />
          </a>
        </div>
        <div className="related-grid">
          {related.map((item, index) => (
            <a href={`/${item.slug}`} key={item.slug}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.navLabel}</h3>
              <p>{item.relatedDescription ?? item.metaDescription}</p>
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
            <SiteImage
              src="/images/landmark-logo.webp"
              alt="Landmark Landscapes"
              sizes="174px"
            />
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
            {navigationServices.map((item) => (
              <a href={`/${item.slug}`} key={item.slug}>
                {item.navLabel}
              </a>
            ))}
            <p className="eyebrow">Landscaping service areas</p>
            {locationPageList.map((location) => (
              <a href={`/${location.slug}`} key={location.slug}>
                Landscaping in {location.shortLabel}
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
