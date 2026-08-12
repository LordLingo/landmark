/* eslint-disable @next/next/no-html-link-for-pages */
import type { Metadata } from "next";
import SiteImage from "../site-image";

export const metadata: Metadata = {
  title: {
    absolute: "Thank You | Landmark Landscapes",
  },
  description: "Your Landmark Landscapes estimate request has been sent.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThankYouPage() {
  return (
    <main className="thank-you-page">
      <section>
        <a className="thank-you-logo" href="/">
          <SiteImage
            src="/images/landmark-logo.webp"
            alt="Landmark Landscapes"
            sizes="170px"
          />
        </a>
        <p className="eyebrow">Your request is on its way</p>
        <h1>Thank you for inviting Landmark into the conversation.</h1>
        <p>
          We received your project details. Landmark will use the contact
          preference you selected to follow up and discuss the property.
        </p>
        <div>
          <a className="button" href="/">
            Return to the website <span>→</span>
          </a>
          <a className="text-link" href="tel:+14694928450">
            Call 469-492-8450 <span>→</span>
          </a>
        </div>
      </section>
    </main>
  );
}
