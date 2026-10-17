/* eslint-disable @next/next/no-html-link-for-pages */
import SiteNavigation from '../site-navigation';
import SiteImage from '../site-image';
import { absoluteUrl } from '../site-url';
import { lightingPages, lightingPath, lightingContact, type LightingPageData } from './data';
import styles from './lighting.module.css';

export default function LightingPage({ page }: { page: LightingPageData }) {
  const path = lightingPath(page);
  const url = absoluteUrl(path);
  const cities = lightingPages.filter(item => item.city);
  const related = page.related.map(slug => lightingPages.find(item => item.slug === slug)!);
  const contact = lightingContact(page);
  const crumbs = [{ '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
    { '@type': 'ListItem', position: 2, name: 'Outdoor lighting', item: absoluteUrl('/landscape-lighting') },
    ...(page.slug ? [{ '@type': 'ListItem', position: 3, name: page.label, item: url }] : [])];
  const schema = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'WebPage', '@id': url, url, name: page.title, description: page.description,
      isPartOf: { '@id': absoluteUrl('/#website') }, breadcrumb: { '@id': `${url}#breadcrumb` },
      about: { '@id': page.slug === 'cost' ? absoluteUrl('/landscape-lighting#service') : `${url}#service` } },
    ...(page.slug === 'cost' ? [] : [{ '@type': 'Service', '@id': `${url}#service`, name: page.label,
      serviceType: page.city ? 'Landscape lighting design and installation' : page.label, url,
      description: page.description, provider: { '@id': absoluteUrl('/#business') },
      areaServed: (page.city ? [page.city] : cities.map(item => item.city!)).map(city => ({ '@type': 'City', name: `${city}, Texas` })) }]),
    { '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`, itemListElement: crumbs },
  ] };
  return <main className={styles.page}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    <a className={styles.skip} href="#lighting-content">Skip to lighting details</a>
    <SiteNavigation contactHref={contact} actionLabel="Lighting estimate" />
    <section className={styles.hero}>
      <div className={styles.heroCopy}>
        <nav aria-label="Breadcrumb" className={styles.breadcrumb}><a href="/">Home</a><span>/</span>{page.slug ? <><a href="/landscape-lighting">Outdoor lighting</a><span>/</span><span aria-current="page">{page.label}</span></> : <span aria-current="page">Outdoor lighting</span>}</nav>
        <p className={styles.location}>{page.city ? `${page.city}, Texas · Year-round landscape lighting` : 'Prosper-based · Serving five North Texas cities'}</p>
        <h1>{page.title}</h1><p className={styles.intro}>{page.intro}</p>
        <div className={styles.actions}><a className={styles.button} href={contact}>Request a lighting estimate <span aria-hidden="true">↗</span></a><a className={styles.phone} href="tel:+14694928450">Call 469-492-8450</a></div>
        <p className={styles.caption}>For everyday evenings. <a href="/christmas-lights">Looking for Christmas lighting?</a></p>
      </div>
      <figure className={styles.photo}><SiteImage src={page.image} alt={page.alt} sizes="(max-width: 820px) 100vw, 48vw" preload /><figcaption>From the Landmark North Texas project gallery</figcaption></figure>
    </section>
    <div className={styles.content} id="lighting-content">
      <nav className={styles.jump} aria-label="On this lighting page"><a href="#planning">Plan the light</a><a href="#lighting-options">Lighting options</a><a href="#lighting-questions">Questions</a><a href="#lighting-cities">Service areas</a></nav>
      <div className={styles.editorial} id="planning">{page.sections.map((section, index) => <section key={section.title} className={index === 0 ? styles.leadSection : undefined}><h2>{section.title}</h2><div><p>{section.copy}</p>{section.points && <ul>{section.points.map(point => <li key={point}>{point}</li>)}</ul>}</div></section>)}</div>
      <section className={styles.options} id="lighting-options"><h2>{page.slug ? 'Bring the layers together.' : 'Choose the part of home you want to see differently.'}</h2><div className={styles.linkList}>{related.map(item => <a href={lightingPath(item)} key={item.slug}><h3>{item.label}</h3><p>{item.description}</p><span aria-hidden="true">↗</span></a>)}</div>{page.slug && <a className={styles.allLink} href="/landscape-lighting">Explore the complete outdoor-lighting plan →</a>}</section>
      <section className={styles.faq} id="lighting-questions"><h2>{page.city ? `Planning lighting in ${page.city}?` : 'Useful before you call.'}</h2><div>{page.faqs.map(faq => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div></section>
      <section className={styles.areas} id="lighting-cities"><h2>One Prosper-based team. Five communities.</h2><p>Landmark serves residential properties in Prosper, Celina, Frisco, McKinney and The Colony. Select your city for a useful starting point, then tell us about your own property.</p><ul>{cities.map(city => <li key={city.slug}>{city.slug === page.slug ? <span aria-current="page">{city.city} lighting</span> : <a href={lightingPath(city)}>{city.city} lighting <span aria-hidden="true">→</span></a>}</li>)}</ul>{page.city && <p>Planning planting or paths at the same time? <a href={`/${page.slug}`}>Explore Landmark’s landscaping services in {page.city}.</a></p>}</section>
      <section className={styles.estimate}><div><h2>Show us where the evening disappears.</h2><p>Share your city, a few photos and the areas you want to enjoy after dark. Landmark will confirm project scope, pricing and availability with you.</p></div><a className={styles.button} href={contact}>Plan my lighting project ↗</a></section>
    </div>
    <nav className={styles.mobileActions} aria-label="Lighting quick actions"><a href={contact}>Lighting estimate ↗</a><a href="tel:+14694928450">Call Landmark</a></nav>
    <footer className={styles.footer}><a href="/">Landmark Landscapes</a><p>Landmark Landscape Services, LLC · Prosper, TX 75078</p><a href="tel:+14694928450">469-492-8450</a><a href="mailto:landmarklandscapesllc@outlook.com">landmarklandscapesllc@outlook.com</a><p><a href="/contact">Contact</a> · <a href="/privacy">Privacy</a> · <a href="/christmas-lights">Seasonal Christmas lighting</a></p></footer>
  </main>;
}
