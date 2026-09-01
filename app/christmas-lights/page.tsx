import type { Metadata } from "next";
import Image from "next/image";
import HolidayQuoteForm from "./quote-form";
import styles from "./christmas-lights.module.css";
import { absoluteUrl } from "../site-url";

export const metadata: Metadata = {
  title: {
    absolute: "Christmas Light Installation in Celina & Prosper, TX | Landmark Landscapes",
  },
  description:
    "Professional Christmas light installation in Celina and Prosper, TX. Landmark handles the custom design, installation, take-down and storage planning for North Texas homes.",
  alternates: {
    canonical: "/christmas-lights",
  },
  openGraph: {
    title: "Christmas Light Installation in Celina & Prosper, TX | Landmark Landscapes",
    description:
      "A custom holiday display without the ladder, tangled lights or seasonal stress. Serving Celina, Prosper and North Dallas.",
    url: "/christmas-lights",
    type: "website",
    images: [
      {
        url: "/images/christmas-lights-celina-hero.webp",
        width: 1440,
        height: 810,
        alt: "Professionally installed warm-white Christmas lights on a North Texas home",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Christmas Light Installation in Celina & Prosper, TX | Landmark Landscapes",
    description:
      "Custom holiday-lighting design, installation, take-down and storage planning for North Texas homes.",
    images: ["/images/christmas-lights-celina-hero.webp"],
  },
};

const phoneDisplay = "469-492-8450";
const phoneHref = "tel:+14694928450";
const textHref = "sms:+14694928450";
const email = "landmarklandscapesllc@outlook.com";

const process = [
  {
    number: "01",
    title: "Share your vision",
    copy: "Tell us what you love—classic warm white, a festive entry, wrapped trees or a complete estate display. We start with the property, not a one-size-fits-all box.",
  },
  {
    number: "02",
    title: "Approve your custom plan",
    copy: "We organize the lighting areas, style and timing into a clear recommendation so you know what your home will look like before installation day.",
  },
  {
    number: "03",
    title: "Enjoy a polished installation",
    copy: "Our team installs a measured, professional display designed to complement your home—not overwhelm it. You get the glow without the ladder work.",
  },
  {
    number: "04",
    title: "We close the season neatly",
    copy: "When the holidays are over, your service plan can include careful take-down and organized storage so next year starts even easier.",
  },
];

const packages = [
  {
    name: "Standard",
    kicker: "Classic curb appeal",
    description: "A clean, beautiful holiday welcome designed around the front of your home.",
    features: ["Warm-white roofline lighting", "Professional-grade LED materials", "Custom-fit installation", "Seasonal take-down option"],
  },
  {
    name: "Premium",
    kicker: "The full front elevation",
    description: "Our most requested direction for homes that deserve a little more glow and texture.",
    features: ["Everything in Standard", "Entry, columns or wreath styling", "Tree, shrub or walkway accents", "Priority seasonal service plan"],
    featured: true,
  },
  {
    name: "Estate",
    kicker: "A property-wide moment",
    description: "A layered, architectural display for larger homes, entries and landscape focal points.",
    features: ["Whole-property lighting plan", "Feature tree and landscape wrapping", "Custom design consultation", "Coordinated take-down + storage plan"],
  },
];

const gallery = [
  {
    src: "/images/christmas-lights-celina-hero.webp",
    alt: "Christmas lighting design visualization with warm-white roofline lights and wrapped live oaks for a Celina-style home",
    label: "Roofline + live oaks",
    location: "Celina-style design",
  },
  {
    src: "/images/christmas-lights-prosper-gallery.webp",
    alt: "Christmas lighting design visualization with a warm-white roofline, lit columns and landscape accents for a Prosper-style home",
    label: "Entry + landscape layers",
    location: "Prosper-style design",
  },
  {
    src: "/images/christmas-lights-estate-gallery.webp",
    alt: "Estate Christmas lighting design visualization with tree wraps and warm-white roofline accents in North Texas",
    label: "Estate tree wrapping",
    location: "North Dallas design",
  },
];

const testimonials = [
  { city: "Celina, TX", name: "Celina homeowner", copy: "A verified customer review for this section will be added as Landmark holiday-lighting clients share their experience." },
  { city: "Prosper, TX", name: "Prosper homeowner", copy: "A verified customer review for this section will be added as Landmark holiday-lighting clients share their experience." },
  { city: "Frisco, TX", name: "Frisco homeowner", copy: "A verified customer review for this section will be added as Landmark holiday-lighting clients share their experience." },
];

const faqs = [
  {
    question: "How much does professional Christmas light installation cost?",
    answer:
      "Each Landmark holiday-lighting quote is custom because the home, roofline, access, display areas and selected materials are different. Share your address and preferred timing, and we will prepare a clear recommendation for your property.",
  },
  {
    question: "When should I book Christmas light installation in Celina or Prosper?",
    answer:
      "The earlier you reserve your preferred season, the more date flexibility you will have. Late summer and early fall are ideal for homeowners who want their display ready before holiday gatherings begin.",
  },
  {
    question: "Do you take the Christmas lights down after the season?",
    answer:
      "Yes. Landmark can organize a holiday service plan that includes careful removal after the season, along with an optional storage plan for a simpler return next year.",
  },
  {
    question: "Do I need to buy or install the lights myself?",
    answer:
      "No. Landmark can recommend professional-grade LED materials and plans the display around your home. Your final quote will clearly outline the selected lighting, installation and seasonal-service details.",
  },
  {
    question: "What happens if part of the display needs attention?",
    answer:
      "If an area included in your seasonal service plan needs attention, contact Landmark so the team can review the issue and coordinate the appropriate next step.",
  },
  {
    question: "Which cities do you serve for holiday lighting?",
    answer:
      "Landmark serves Celina, Prosper, Frisco, McKinney, Plano, Little Elm, The Colony and nearby North Dallas communities, subject to project scope and seasonal scheduling.",
  },
];

function Sparkle() {
  return <span className={styles.sparkle} aria-hidden="true">✦</span>;
}

export default function ChristmasLightsPage() {
  const pageUrl = absoluteUrl("/christmas-lights");
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
        areaServed: ["Celina", "Prosper", "Frisco", "McKinney", "Plano", "Little Elm", "The Colony"].map((city) => ({
          "@type": "City",
          name: `${city}, Texas`,
        })),
        sameAs: [
          "https://www.facebook.com/landmarklandscapeservices/",
          "https://nextdoor.com/pages/landmark-landscape-prosper-texas/",
        ],
        // Add AggregateRating only when Landmark has a verified, current rating and review count for this service.
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: "Christmas Light Installation",
        serviceType: "Residential Christmas light installation and holiday lighting design",
        description:
          "Custom Christmas light installation, seasonal take-down and storage planning for homes in Celina, Prosper and North Dallas, Texas.",
        url: pageUrl,
        provider: { "@id": `${pageUrl}#business` },
        areaServed: ["Celina", "Prosper", "Frisco", "McKinney", "Plano", "Little Elm", "The Colony"].map((city) => ({
          "@type": "City",
          name: `${city}, Texas`,
        })),
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
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Christmas lights", item: pageUrl },
        ],
      },
    ],
  };

  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className={styles.header}>
        <a className={styles.brand} href="/" aria-label="Landmark Landscapes home">
          <Image src="/images/landmark-logo.webp" alt="Landmark Landscapes" width={941} height={240} priority />
          <span>Holiday Lighting</span>
        </a>
        <nav className={styles.nav} aria-label="Christmas lights navigation">
          <a href="#how-it-works">How it works</a>
          <a href="#packages">Packages</a>
          <a href="#gallery">Gallery</a>
          <a href="#faq">FAQ</a>
        </nav>
        <div className={styles.headerActions}>
          <a className={styles.headerPhone} href={phoneHref}>{phoneDisplay}</a>
          <a className={styles.headerQuote} href="#quote">Get a free quote <span aria-hidden="true">→</span></a>
        </div>
      </header>

      <section className={styles.hero} aria-labelledby="hero-title">
        <Image
          src="/images/christmas-lights-celina-hero.webp"
          alt="Professionally installed warm-white Christmas lights on a North Texas home"
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay} />
        <div className={styles.heroLights} aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /></div>
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}><Sparkle /> Celina · Prosper · North Dallas</p>
          <h1 id="hero-title">Your brightest season.<br /><em>None of the ladder work.</em></h1>
          <p className={styles.heroLead}>
            Professional Christmas light installation designed around your home, then handled from custom design through take-down and storage planning.
          </p>
          <div className={styles.heroButtons}>
            <a className={styles.primaryButton} href="#quote">Get my free quote <span aria-hidden="true">→</span></a>
            <a className={styles.textButton} href={textHref}>Call or text now <span aria-hidden="true">↗</span></a>
          </div>
          <p className={styles.heroNote}>Warm-white rooflines · wreaths · trees · walkways · estate displays</p>
        </div>
        <a className={styles.scrollCue} href="#how-it-works"><span>Scroll to explore</span><i aria-hidden="true">↓</i></a>
      </section>

      <section className={styles.trustBar} aria-label="Holiday lighting highlights">
        <div><Sparkle /><strong>Local by design</strong><span>Celina, Prosper + North Dallas</span></div>
        <div><Sparkle /><strong>Professional installation</strong><span>Measured for your home</span></div>
        <div><Sparkle /><strong>Full-season planning</strong><span>Design, take-down + storage options</span></div>
        <div><Sparkle /><strong>Insured install team</strong><span>Peace of mind from start to finish</span></div>
      </section>

      <section className={styles.introSection} id="how-it-works">
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>A simpler way to shine</p>
          <h2>We make the holiday display feel effortless.</h2>
        </div>
        <p className={styles.introCopy}>The best displays look personal, not packaged. Landmark brings the same attention to the details of your property—architecture, landscape focal points and arrival—to every holiday-lighting plan.</p>
      </section>

      <section className={styles.processGrid} aria-label="How Christmas light installation works">
        {process.map((step) => (
          <article key={step.number}>
            <span>{step.number}</span>
            <div><Sparkle /><h3>{step.title}</h3><p>{step.copy}</p></div>
          </article>
        ))}
      </section>

      <section className={styles.packagesSection} id="packages">
        <div className={styles.packagesHeading}>
          <div>
            <p className={styles.eyebrow}>Made for your home</p>
            <h2>A holiday display at the scale that feels right.</h2>
          </div>
          <p>Every display is quoted around your property, access and the lighting areas you choose. Start with a direction; we will make the details clear.</p>
        </div>
        <div className={styles.packageGrid}>
          {packages.map((pkg) => (
            <article className={pkg.featured ? styles.featuredPackage : ""} key={pkg.name}>
              {pkg.featured && <b>Most popular</b>}
              <p>{pkg.kicker}</p>
              <h3>{pkg.name}</h3>
              <span className={styles.customPricing}>Custom quote</span>
              <p className={styles.packageDescription}>{pkg.description}</p>
              <ul>{pkg.features.map((feature) => <li key={feature}><i aria-hidden="true">✓</i>{feature}</li>)}</ul>
              <a href="#quote">Build my {pkg.name.toLowerCase()} plan <span aria-hidden="true">→</span></a>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.gallerySection} id="gallery">
        <div className={styles.galleryHeading}>
          <p className={styles.eyebrow}>A little holiday magic, beautifully measured</p>
          <h2>Picture the warm light that lets your home be the star.</h2>
        </div>
        <div className={styles.galleryGrid}>
          {gallery.map((photo, index) => (
            <figure className={`${styles.galleryCard} ${index === 0 ? styles.galleryLarge : ""}`} key={photo.src}>
              <Image src={photo.src} alt={photo.alt} fill sizes={index === 0 ? "(max-width: 800px) 100vw, 58vw" : "(max-width: 800px) 100vw, 35vw"} />
              <figcaption><span>{photo.label}</span><strong>{photo.location}</strong></figcaption>
            </figure>
          ))}
          <aside className={styles.galleryCallout}><Sparkle /><p>Every home deserves its own holiday signature.</p><a href="#quote">Start your display <span aria-hidden="true">→</span></a></aside>
        </div>
      </section>

      <section className={styles.whySection}>
        <div className={styles.whyVisual}><Image src="/images/christmas-lights-estate-gallery.webp" alt="Elegant North Texas estate with warm-white holiday roofline lights and tree wrapping" fill sizes="(max-width: 880px) 100vw, 48vw" /></div>
        <div className={styles.whyContent}>
          <p className={styles.eyebrow}>The Landmark difference</p>
          <h2>For a display that feels polished from the street to the front door.</h2>
          <ul>
            <li><Sparkle /><div><h3>A design that belongs with your home</h3><p>We consider your roofline, entries, trees and landscaping to create a finished look with the right amount of glow.</p></div></li>
            <li><Sparkle /><div><h3>One local team for the full season</h3><p>From the first conversation through removal, you have a simple, coordinated process and a familiar North Texas team.</p></div></li>
            <li><Sparkle /><div><h3>Professional materials + thoughtful details</h3><p>Quality LED lighting, clean lines and careful spacing give the display a refined, welcoming finish.</p></div></li>
            <li><Sparkle /><div><h3>Service that respects your property</h3><p>We plan the installation around the home and landscape you have already invested in, with care at every step.</p></div></li>
          </ul>
        </div>
      </section>

      <section className={styles.testimonialSection} aria-labelledby="testimonial-title">
        <div className={styles.testimonialHeading}><p className={styles.eyebrow}>Kind words, coming soon</p><h2 id="testimonial-title">The kind of holiday tradition homeowners want to repeat.</h2><p>We have left this space ready for verified Landmark holiday-lighting reviews as they come in—because the best proof should always be real.</p></div>
        <div className={styles.testimonialGrid}>
          {testimonials.map((testimonial) => (
            <article key={testimonial.city}><div aria-label="Five-star review placeholder" className={styles.stars}>★★★★★</div><blockquote>“{testimonial.copy}”</blockquote><footer><strong>{testimonial.name}</strong><span>{testimonial.city}</span></footer></article>
          ))}
        </div>
      </section>

      <section className={styles.serviceAreaSection}>
        <p className={styles.eyebrow}>Holiday lighting near you</p>
        <h2>Serving Celina, Prosper and the North Dallas communities we call home.</h2>
        <div className={styles.cities}><strong>Celina, TX</strong><strong>Prosper, TX</strong><span>Frisco</span><span>McKinney</span><span>Plano</span><span>Little Elm</span><span>The Colony</span><span>North Dallas</span></div>
      </section>

      <section className={styles.faqSection} id="faq">
        <div className={styles.faqHeading}><p className={styles.eyebrow}>Before you book</p><h2>Questions homeowners ask before the season begins.</h2><p>Still wondering about your home? Call or text Landmark at <a href={phoneHref}>{phoneDisplay}</a>.</p></div>
        <div className={styles.faqList}>
          {faqs.map((faq) => <details key={faq.question}><summary>{faq.question}<span aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}
        </div>
      </section>

      <section className={styles.quoteSection} id="quote">
        <div className={styles.quoteIntro}>
          <p className={styles.eyebrow}><Sparkle /> Reserve your season</p>
          <h2>Let&apos;s make this the year your home shines.</h2>
          <p>Holiday install dates are limited. Send a few details and Landmark will follow up with a custom recommendation for your Celina, Prosper or North Dallas home.</p>
          <div className={styles.quoteContact}><a href={phoneHref}>{phoneDisplay}</a><a href={textHref}>Text Landmark <span aria-hidden="true">↗</span></a></div>
        </div>
        <div className={styles.formShell}><p>Free design consultation</p><h3>Request your holiday-lighting quote.</h3><HolidayQuoteForm /></div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <div><a href="/" className={styles.footerBrand}><Image src="/images/landmark-logo.webp" alt="Landmark Landscapes" width={941} height={240} /></a><p>Custom Christmas light installation for Celina, Prosper and North Dallas homes.</p></div>
          <div><p className={styles.footerLabel}>Quick links</p><a href="#how-it-works">How it works</a><a href="#packages">Packages</a><a href="#gallery">Gallery</a><a href="#faq">FAQ</a></div>
          <div><p className={styles.footerLabel}>Contact Landmark</p><a href={phoneHref}>{phoneDisplay}</a><a href={`mailto:${email}`}>{email}</a><a href="https://www.facebook.com/landmarklandscapeservices/" target="_blank" rel="noreferrer">Facebook <span aria-hidden="true">↗</span></a><a href="https://nextdoor.com/pages/landmark-landscape-prosper-texas/" target="_blank" rel="noreferrer">Nextdoor <span aria-hidden="true">↗</span></a></div>
          <div><p className={styles.footerLabel}>Service area</p><p>Celina, TX · Prosper, TX · Frisco · McKinney · Plano · Little Elm · The Colony</p><a href="#quote">Get a free quote <span aria-hidden="true">→</span></a></div>
        </div>
        <div className={styles.footerBottom}><span>© 2026 Landmark Landscape Services, LLC</span><span>Prosper, TX · 469-492-8450</span></div>
      </footer>
    </main>
  );
}
