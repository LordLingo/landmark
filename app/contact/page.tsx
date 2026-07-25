/* eslint-disable @next/next/no-html-link-for-pages */
import type { Metadata } from "next";
import ContactForm from "./contact-form";
import SiteNavigation from "../site-navigation";

export const metadata: Metadata = {
  title: "Request a Landscaping Estimate in Prosper, TX",
  description:
    "Tell Landmark Landscapes about your residential landscaping, drainage, lighting, stonework or sprinkler project in Prosper and North Dallas.",
  alternates: {
    canonical: "/contact/",
  },
};

const phoneDisplay = "469-492-8450";
const phoneHref = "tel:+14694928450";
const email = "landmarklandscapesllc@outlook.com";

export default function ContactPage() {
  return (
    <main className="contact-page">
      <SiteNavigation
        contactHref="/contact/"
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
