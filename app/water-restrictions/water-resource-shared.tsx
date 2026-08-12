/* eslint-disable @next/next/no-html-link-for-pages */
import SiteImage from "../site-image";

const phoneDisplay = "469-492-8450";
const phoneHref = "tel:+14694928450";
const email = "landmarklandscapesllc@outlook.com";

export function WaterDrop({ small = false }: { small?: boolean }) {
  return (
    <svg
      className={small ? "water-drop water-drop-small" : "water-drop"}
      viewBox="0 0 80 98"
      aria-hidden="true"
    >
      <path d="M40 4C35 18 9 46 9 66c0 18 14 28 31 28s31-10 31-28C71 46 45 18 40 4Z" />
      <path d="M24 67c1 8 7 13 16 14" />
    </svg>
  );
}

export function WaterResourceFooter() {
  return (
    <footer className="service-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <SiteImage
            src="/images/landmark-logo.webp"
            alt="Landmark Landscapes"
            sizes="174px"
          />
          <p>
            Thoughtful outdoor spaces for the way North Texas families actually
            live.
          </p>
        </div>
        <div className="footer-contact">
          <p className="eyebrow">Begin the conversation</p>
          <a href={phoneHref}>{phoneDisplay}</a>
          <a href={`mailto:${email}`}>{email}</a>
          <span>Prosper, TX 75078</span>
        </div>
        <div className="footer-service-links">
          <p className="eyebrow">Helpful next steps</p>
          <a href="/water-restrictions">Local watering guide</a>
          <a href="/landscape-design">Landscape design</a>
          <a href="/sprinkler-repair-prosper-tx">Sprinkler repair</a>
          <a href="/yard-drainage-prosper-tx">Yard drainage</a>
          <a href="/contact">Request an estimate</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Landmark Landscape Services, LLC</span>
        <span>Prosper · McKinney · Frisco · The Colony · Celina</span>
      </div>
    </footer>
  );
}
