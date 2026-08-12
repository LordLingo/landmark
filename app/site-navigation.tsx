"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { serviceList } from "./service-data";
import SiteImage from "./site-image";

const phoneDisplay = "469-492-8450";
const phoneHref = "tel:+14694928450";
const locationLinks = [
  { slug: "north-dallas-landscaping", navLabel: "Landscaping in North Dallas" },
  { slug: "prosper-tx", navLabel: "Landscaping in Prosper, TX" },
  { slug: "frisco-tx", navLabel: "Landscaping in Frisco, TX" },
  { slug: "mckinney-tx", navLabel: "Landscaping in McKinney, TX" },
  { slug: "celina-tx", navLabel: "Landscaping in Celina, TX" },
  { slug: "the-colony-tx", navLabel: "Landscaping in The Colony, TX" },
];
const navigationServices = [
  {
    slug: "landscape-design",
    navLabel: "Landscape design + installation",
  },
  ...serviceList,
  ...locationLinks,
];

type SiteNavigationProps = {
  variant?: "home" | "inner";
  contactHref?: string;
  actionLabel?: string;
};

export default function SiteNavigation({
  variant = "inner",
  contactHref = "/contact",
  actionLabel = "Request an estimate",
}: SiteNavigationProps) {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const servicesCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const homeHref = variant === "home" ? "#top" : "/";
  const transformationHref =
    variant === "home" ? "#transformation" : "/#transformation";
  const processHref = variant === "home" ? "#process" : "/#process";

  useEffect(() => {
    function closeOnOutsideClick(event: PointerEvent) {
      if (!headerRef.current?.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setServicesOpen(false);
        setMobileOpen(false);
      }
    }

    function closeAfterResize() {
      if (window.innerWidth > 1100) {
        setMobileOpen(false);
      }
    }

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    window.addEventListener("resize", closeAfterResize);

    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("resize", closeAfterResize);
      if (servicesCloseTimer.current) {
        clearTimeout(servicesCloseTimer.current);
      }
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  function closeMenus() {
    if (servicesCloseTimer.current) {
      clearTimeout(servicesCloseTimer.current);
      servicesCloseTimer.current = null;
    }
    setServicesOpen(false);
    setMobileOpen(false);
  }

  function openServices() {
    if (servicesCloseTimer.current) {
      clearTimeout(servicesCloseTimer.current);
      servicesCloseTimer.current = null;
    }
    setServicesOpen(true);
  }

  function scheduleServicesClose() {
    servicesCloseTimer.current = setTimeout(() => {
      setServicesOpen(false);
      servicesCloseTimer.current = null;
    }, 350);
  }

  return (
    <>
      <header
        className={`global-header global-header-${variant}`}
        ref={headerRef}
      >
        <a
          className="brand"
          href={homeHref}
          aria-label="Landmark Landscapes home"
          onClick={closeMenus}
        >
          <span className="brand-mark">
            <SiteImage
              src="/images/landmark-logo.webp"
              alt="Landmark Landscapes"
              sizes="174px"
            />
          </span>
        </a>

        <nav className="desktop-nav global-desktop-nav" aria-label="Primary navigation">
          <a href={homeHref}>Home</a>
          <div
            className={`services-menu${servicesOpen ? " is-open" : ""}`}
            onMouseEnter={openServices}
            onMouseLeave={scheduleServicesClose}
          >
            <button
              type="button"
              aria-expanded={servicesOpen}
              aria-controls="desktop-services-menu"
              onClick={() => {
                if (servicesCloseTimer.current) {
                  clearTimeout(servicesCloseTimer.current);
                  servicesCloseTimer.current = null;
                }
                setServicesOpen((open) => !open);
              }}
            >
              Services
              <span aria-hidden="true">⌄</span>
            </button>
            <div
              className="services-menu-popover"
              id="desktop-services-menu"
            >
              <div>
                <span className="nav-menu-eyebrow">Services + service areas</span>
                <strong>Find the right improvement for your North Texas property.</strong>
              </div>
              <div className="services-menu-links">
                {navigationServices.map((service, index) => (
                  <a
                    href={`/${service.slug}`}
                    key={service.slug}
                    onClick={closeMenus}
                  >
                    <small>{String(index + 1).padStart(2, "0")}</small>
                    <span>{service.navLabel}</span>
                    <i aria-hidden="true">→</i>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <a href={transformationHref}>Our work</a>
          <a href={processHref}>How it works</a>
          <Link href="/plan-my-yard">Plan my yard</Link>
          <Link href="/water-restrictions">Water guide</Link>
          <a href="/contact">Contact</a>
        </nav>

        <div className="header-actions global-header-actions">
          <a className="phone-link" href={phoneHref}>
            {phoneDisplay}
          </a>
          <a className="button button-small" href={contactHref}>
            {actionLabel}
          </a>
        </div>

        <button
          className="mobile-menu-toggle"
          type="button"
          aria-expanded={mobileOpen}
          aria-controls="mobile-site-menu"
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setMobileOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
          <small>Menu</small>
        </button>
      </header>

      <div
        className={`mobile-nav-backdrop${mobileOpen ? " is-open" : ""}`}
        aria-hidden="true"
        onClick={closeMenus}
      />
      <nav
        className={`mobile-nav-panel${mobileOpen ? " is-open" : ""}`}
        id="mobile-site-menu"
        aria-label="Mobile navigation"
        aria-hidden={!mobileOpen}
        inert={mobileOpen ? undefined : true}
      >
        <div className="mobile-nav-top">
          <span>Landmark Landscapes</span>
          <button type="button" onClick={closeMenus} aria-label="Close menu">
            ×
          </button>
        </div>

        <a className="mobile-nav-main-link" href={homeHref} onClick={closeMenus}>
          Home <span>→</span>
        </a>

        <div className="mobile-service-list">
          <p>Explore services + locations</p>
          {navigationServices.map((service, index) => (
            <a
              href={`/${service.slug}`}
              key={service.slug}
              onClick={closeMenus}
            >
              <small>{String(index + 1).padStart(2, "0")}</small>
              <span>{service.navLabel}</span>
              <i aria-hidden="true">→</i>
            </a>
          ))}
        </div>

        <div className="mobile-secondary-links">
          <Link href="/plan-my-yard" onClick={closeMenus}>
            Plan my yard
          </Link>
          <a href={transformationHref} onClick={closeMenus}>
            See our work
          </a>
          <a href={processHref} onClick={closeMenus}>
            How it works
          </a>
          <Link href="/water-restrictions" onClick={closeMenus}>
            Water guide
          </Link>
          <a href="/contact" onClick={closeMenus}>
            Contact Landmark
          </a>
        </div>

        <div className="mobile-nav-actions">
          <a className="button" href={contactHref} onClick={closeMenus}>
            {actionLabel} <span>→</span>
          </a>
          <a href={phoneHref}>Call {phoneDisplay}</a>
        </div>
      </nav>
    </>
  );
}
