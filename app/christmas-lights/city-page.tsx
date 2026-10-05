import Image from "next/image";
import Link from "next/link";
import HolidayQuoteForm from "./quote-form";
import styles from "./christmas-lights.module.css";
import { absoluteUrl } from "../site-url";
import { christmasCities, type ChristmasCity } from "./city-data";

const phoneDisplay = "469-492-8450";
const phoneHref = "tel:+14694928450";
const textHref = "sms:+14694928450";
const email = "landmarklandscapesllc@outlook.com";

function Sparkle() {
  return (
    <span className={styles.sparkle} aria-hidden="true">
      ✦
    </span>
  );
}

export default function ChristmasCityPage({ city }: { city: ChristmasCity }) {
  const route = `/christmas-lights/${city.slug}`;
  const pageUrl = absoluteUrl(route);
  const faqs = [
    {
      question: `How much does Christmas light installation cost in ${city.city}?`,
      answer: `Every ${city.city} quote is custom because roofline length, access, lighting areas and material needs vary by home. Share the property address and desired display, and Landmark will prepare a clear recommendation.`,
    },
    {
      question: `When should I schedule Christmas light installation in ${city.city}?`,
      answer:
        "Late summer and early fall provide the best date flexibility. Holiday installation appointments are limited, so reserving early helps secure the timing that works for your household.",
    },
    {
      question: "Does Landmark provide the Christmas lights?",
      answer:
        "Landmark can recommend professional-grade LED materials and custom-fit the display to your home. The quote will outline the selected lighting, installation and seasonal-service details.",
    },
    {
      question: "Can take-down and storage be included?",
      answer:
        "Yes. Your service plan can include careful post-season removal and organized storage planning so next year's installation is simpler.",
    },
    {
      question: `Which ${city.city} neighborhoods do you serve?`,
      answer: `Landmark serves homes throughout ${city.city}, including ${city.neighborhoods.join(", ")}, and nearby North Dallas communities, subject to project scope and seasonal availability.`,
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `${pageUrl}#business`,
        name: "Landmark Landscape Services, LLC",
        alternateName: "Landmark Landscapes",
        url: pageUrl,
        image: absoluteUrl("/images/christmas-lights-celina-hero.webp"),
        logo: absoluteUrl("/images/landmark-logo.webp"),
        telephone: "+14694928450",
        email,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Prosper",
          addressRegion: "TX",
          postalCode: "75078",
          addressCountry: "US",
        },
        areaServed: { "@type": "City", name: `${city.city}, Texas` },
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: `Christmas Light Installation in ${city.city}, TX`,
        serviceType:
          "Residential Christmas light installation and holiday lighting design",
        description: city.intro,
        url: pageUrl,
        provider: { "@id": `${pageUrl}#business` },
        areaServed: { "@type": "City", name: `${city.city}, Texas` },
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
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
            name: "Christmas lights",
            item: absoluteUrl("/christmas-lights"),
          },
          { "@type": "ListItem", position: 3, name: city.city, item: pageUrl },
        ],
      },
    ],
  };

  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className={styles.header}>
        <Link
          className={styles.brand}
          href="/"
          aria-label="Landmark Landscapes home"
        >
          <Image
            src="/images/landmark-logo.webp"
            alt="Landmark Landscapes"
            width={941}
            height={240}
            priority
          />
          <span>Holiday Lighting</span>
        </Link>
        <nav
          className={styles.nav}
          aria-label={`${city.city} Christmas lights navigation`}
        >
          <a href="#local-service">Local service</a>
          <a href="#how-it-works">How it works</a>
          <a href="#faq">FAQ</a>
        </nav>
        <div className={styles.headerActions}>
          <a className={styles.headerPhone} href={phoneHref}>
            {phoneDisplay}
          </a>
          <a className={styles.headerQuote} href="#quote">
            Get a free quote <span aria-hidden="true">→</span>
          </a>
        </div>
      </header>

      <section className={styles.hero} aria-labelledby="hero-title">
        <Image
          src="/images/christmas-lights-celina-hero.webp"
          alt={`Christmas light installation design for a ${city.city}, Texas home`}
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
          style={{ objectPosition: city.heroPosition }}
        />
        <div className={styles.heroOverlay} />
        <div className={styles.heroLights} aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>
            <Sparkle /> {city.city}, Texas holiday lighting
          </p>
          <h1 id="hero-title">
            Christmas light installation in <em>{city.city}, TX.</em>
          </h1>
          <p className={styles.heroLead}>{city.intro}</p>
          <div className={styles.heroButtons}>
            <a className={styles.primaryButton} href="#quote">
              Get my free quote <span aria-hidden="true">→</span>
            </a>
            <a className={styles.textButton} href={textHref}>
              Call or text now <span aria-hidden="true">↗</span>
            </a>
          </div>
          <p className={styles.heroNote}>
            Custom design · professional installation · take-down · storage
            planning
          </p>
        </div>
      </section>

      <section
        className={styles.trustBar}
        aria-label="Holiday lighting service highlights"
      >
        <div>
          <Sparkle />
          <strong>Local service</strong>
          <span>{city.city} + nearby communities</span>
        </div>
        <div>
          <Sparkle />
          <strong>Custom-fit lights</strong>
          <span>Measured for your home</span>
        </div>
        <div>
          <Sparkle />
          <strong>Full-season planning</strong>
          <span>Install, take-down + storage</span>
        </div>
        <div>
          <Sparkle />
          <strong>Insured install team</strong>
          <span>Peace of mind all season</span>
        </div>
      </section>

      <section className={styles.introSection} id="local-service">
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Designed for {city.city} homes</p>
          <h2>
            A holiday display that fits the property—not a one-size-fits-all
            package.
          </h2>
        </div>
        <p className={styles.introCopy}>
          {city.propertyNote} Landmark serves {city.city} and surrounding{" "}
          {city.county} communities.
        </p>
      </section>

      <section
        className={`${styles.processGrid} ${styles.cityFeatureGrid}`}
        aria-label={`Christmas light options in ${city.city}`}
      >
        {city.localDetails.map((item, index) => (
          <article key={item.title}>
            <span>0{index + 1}</span>
            <div>
              <Sparkle />
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </div>
          </article>
        ))}
      </section>

      <section className={styles.whySection} id="how-it-works">
        <div className={styles.whyVisual}>
          <Image
            src="/images/christmas-lights-estate-gallery.webp"
            alt={`Warm-white roofline and tree lighting design for a ${city.city} home`}
            fill
            sizes="(max-width: 880px) 100vw, 48vw"
          />
        </div>
        <div className={styles.whyContent}>
          <p className={styles.eyebrow}>One team for the season</p>
          <h2>Beautiful at night. Simple from start to finish.</h2>
          <ul>
            <li>
              <Sparkle />
              <div>
                <h3>Share the home + your vision</h3>
                <p>
                  Tell us which areas matter most and send a front-of-home photo
                  with your quote request.
                </p>
              </div>
            </li>
            <li>
              <Sparkle />
              <div>
                <h3>Approve a custom plan</h3>
                <p>
                  Landmark organizes the lighting style, display areas and
                  service details around the property.
                </p>
              </div>
            </li>
            <li>
              <Sparkle />
              <div>
                <h3>Enjoy professional installation</h3>
                <p>
                  The display is installed with clean spacing and careful
                  attention to the home and landscape.
                </p>
              </div>
            </li>
            <li>
              <Sparkle />
              <div>
                <h3>Close the season neatly</h3>
                <p>
                  Your plan can include take-down and organized storage so next
                  season begins more easily.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section className={styles.serviceAreaSection}>
        <p className={styles.eyebrow}>Holiday lighting around North Dallas</p>
        <h2>
          Local Christmas light installation in {city.city} and nearby
          communities.
        </h2>
        <div className={styles.cities}>
          {christmasCities.map((item) =>
            item.slug === city.slug ? (
              <strong key={item.slug}>{item.city}, TX</strong>
            ) : (
              <Link key={item.slug} href={`/christmas-lights/${item.slug}`}>
                {item.city}, TX
              </Link>
            ),
          )}
        </div>
        <Link className={styles.areaTextLink} href="/christmas-lights">
          Explore Landmark&apos;s complete Christmas lighting service{" "}
          <span aria-hidden="true">→</span>
        </Link>
      </section>

      <section className={styles.faqSection} id="faq">
        <div className={styles.faqHeading}>
          <p className={styles.eyebrow}>{city.city} holiday-lighting FAQ</p>
          <h2>Questions before you reserve the season.</h2>
          <p>
            Call or text Landmark at <a href={phoneHref}>{phoneDisplay}</a> for
            a property-specific answer.
          </p>
        </div>
        <div className={styles.faqList}>
          {faqs.map((faq) => (
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

      <section className={styles.quoteSection} id="quote">
        <div className={styles.quoteIntro}>
          <p className={styles.eyebrow}>
            <Sparkle /> Reserve your {city.city} install
          </p>
          <h2>Make this the year your home shines.</h2>
          <p>
            Holiday install dates are limited. Send a few details and Landmark
            will follow up with a custom recommendation for your {city.city}{" "}
            home.
          </p>
          <div className={styles.quoteContact}>
            <a href={phoneHref}>{phoneDisplay}</a>
            <a href={textHref}>
              Text Landmark <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
        <div className={styles.formShell}>
          <p>Free design consultation</p>
          <h3>Request your holiday-lighting quote.</h3>
          <HolidayQuoteForm city={`${city.city}, TX`} />
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <div>
            <Link href="/" className={styles.footerBrand}>
              <Image
                src="/images/landmark-logo.webp"
                alt="Landmark Landscapes"
                width={941}
                height={240}
              />
            </Link>
            <p>
              Custom Christmas light installation for {city.city} and North
              Dallas homes.
            </p>
          </div>
          <div>
            <p className={styles.footerLabel}>Holiday lighting</p>
            <Link href="/christmas-lights">Service overview</Link>
            <a href="#how-it-works">How it works</a>
            <a href="#faq">FAQ</a>
          </div>
          <div>
            <p className={styles.footerLabel}>Contact Landmark</p>
            <a href={phoneHref}>{phoneDisplay}</a>
            <a href={`mailto:${email}`}>{email}</a>
          </div>
          <div>
            <p className={styles.footerLabel}>{city.city} service</p>
            <p>{city.neighborhoods.join(" · ")}</p>
            <a href="#quote">
              Get a free quote <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <span>© 2026 Landmark Landscape Services, LLC</span>
          <span>Prosper, TX · 469-492-8450</span>
        </div>
      </footer>
    </main>
  );
}
