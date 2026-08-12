"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { serviceList } from "./service-data";
import { locationPageList } from "./location-page-data";
import SiteNavigation from "./site-navigation";
import SiteImage from "./site-image";

const phoneDisplay = "469-492-8450";
const phoneHref = "tel:+14694928450";
const email = "landmarklandscapesllc@outlook.com";

const possibilities = [
  {
    id: "welcome",
    number: "01",
    title: "A warmer welcome",
    label: "Front entrances",
    copy: "Layered planting, stone borders and a clear sense of arrival.",
    image: "/images/texas-home-after.webp",
    position: "center",
  },
  {
    id: "walk",
    number: "02",
    title: "A path worth taking",
    label: "Walkways",
    copy: "Beautiful transitions that make the whole property feel connected.",
    image: "/images/backyard-life.webp",
    position: "center bottom",
  },
  {
    id: "color",
    number: "03",
    title: "Color that feels effortless",
    label: "Flowers + planters",
    copy: "Texas-ready layers chosen for beauty, rhythm and realistic care.",
    image: "/images/backyard-life.webp",
    position: "left center",
  },
  {
    id: "light",
    number: "04",
    title: "Evenings with a glow",
    label: "Uplighting",
    copy: "Warm, restrained lighting that lets your home shine after sunset.",
    image: "/images/uplighting-home.webp",
    position: "center",
  },
  {
    id: "lawn",
    number: "05",
    title: "Green without the guesswork",
    label: "Irrigation + turf",
    copy: "A healthy lawn supported by smarter watering and dependable repair.",
    image: "/images/texas-home-after.webp",
    position: "center",
  },
  {
    id: "quiet",
    number: "06",
    title: "Your everyday escape",
    label: "Backyard living",
    copy: "A calm, comfortable setting for slow mornings and easy gatherings.",
    image: "/images/backyard-life.webp",
    position: "center",
  },
];

const workGallery = [
  {
    image: "/images/front-yard-project.webp",
    alt: "Landmark Landscapes front yard installation with layered planting and stone borders",
    title: "Finished front-yard landscape",
    category: "Front yards",
    layout: "wide",
  },
  {
    image: "/images/flower-bed-stacked-stone.webp",
    alt: "Raised flower bed with stacked stone and colorful North Texas planting",
    title: "Stacked-stone planting bed",
    category: "Flower beds",
    layout: "standard",
  },
  {
    image: "/images/drainage-landscape-bed.webp",
    alt: "Front landscape bed with decorative river rock drainage",
    title: "Drainage worked into the design",
    category: "Drainage",
    layout: "standard",
  },
  {
    image: "/images/stone-walkway-project.webp",
    alt: "Stone backyard walkway installed beside a covered patio",
    title: "Backyard stone walkway",
    category: "Walkways",
    layout: "wide",
  },
  {
    image: "/images/lighting-warm-home.webp",
    alt: "North Texas home with warm architectural and landscape lighting",
    title: "Warm evening curb appeal",
    category: "Lighting",
    layout: "standard",
  },
  {
    image: "/images/front-yard-stone.webp",
    alt: "Front yard tree and landscape beds finished with natural stone edging",
    title: "Natural-stone borders",
    category: "Front yards",
    layout: "standard",
  },
  {
    image: "/images/drainage-rock-bed.webp",
    alt: "Decorative rock drainage bed installed in a North Texas side yard",
    title: "Decorative rock drainage",
    category: "Drainage",
    layout: "tall",
  },
  {
    image: "/images/irrigation-turf-project.webp",
    alt: "Geometric backyard turf and paver installation with seating",
    title: "Turf and paver courtyard",
    category: "Turf + irrigation",
    layout: "wide",
  },
  {
    image: "/images/lighting-landscape-bed.webp",
    alt: "Backyard raised landscape bed illuminated at night",
    title: "Garden lighting after dark",
    category: "Lighting",
    layout: "standard",
  },
  {
    image: "/images/flower-bed-front-entry.webp",
    alt: "Colorful low-maintenance flower bed beside a stone home entry",
    title: "Layered front-entry planting",
    category: "Flower beds",
    layout: "standard",
  },
  {
    image: "/images/lighting-blue-home.webp",
    alt: "Home exterior accented by blue landscape lighting",
    title: "Statement landscape lighting",
    category: "Lighting",
    layout: "standard",
  },
  {
    image: "/images/stone-border-entry.webp",
    alt: "Curved natural-stone flower bed with palms and seasonal color",
    title: "Curved stone flower bed",
    category: "Stone borders",
    layout: "standard",
  },
];

const goalOptions = [
  "A welcoming front yard",
  "More life in the backyard",
  "Beautiful color and planting",
  "A healthier, easier lawn",
];

const feelOptions = ["Soft + organic", "Classic Texas", "Clean + modern", "Not sure yet"];
const careOptions = ["Keep it simple", "Seasonal care is fine", "I enjoy the garden"];

const processSteps = [
  {
    number: "01",
    title: "Tell us what is not working",
    copy: "A conversation about your home, routines and priorities.",
    href: "#yard-plan",
  },
  {
    number: "02",
    title: "See what is possible",
    copy: "A cohesive direction for planting, pathways, light and water.",
    href: "#possibilities",
  },
  {
    number: "03",
    title: "Know what happens next",
    copy: "A clear proposal, realistic timing and room for questions.",
    href: "/landscape-design/#approach",
  },
  {
    number: "04",
    title: "Come home to the difference",
    copy: "Professional installation and a plan for keeping it beautiful.",
    href: "#transformation",
  },
];

export default function Home() {
  const [cards, setCards] = useState(possibilities);
  const [activeWorkIndex, setActiveWorkIndex] = useState<number | null>(null);
  const [goal, setGoal] = useState(goalOptions[0]);
  const [feel, setFeel] = useState(feelOptions[0]);
  const [care, setCare] = useState(careOptions[0]);
  const [note, setNote] = useState("");
  const [planReady, setPlanReady] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (activeWorkIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleGalleryKey(event: KeyboardEvent) {
      if (event.key === "Escape") setActiveWorkIndex(null);
      if (event.key === "ArrowLeft") {
        setActiveWorkIndex((current) =>
          current === null ? null : (current - 1 + workGallery.length) % workGallery.length,
        );
      }
      if (event.key === "ArrowRight") {
        setActiveWorkIndex((current) =>
          current === null ? null : (current + 1) % workGallery.length,
        );
      }
    }

    window.addEventListener("keydown", handleGalleryKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleGalleryKey);
    };
  }, [activeWorkIndex]);

  const planText = useMemo(
    () =>
      `Our Landmark yard brief\n\nWhat we want: ${goal}\nThe feeling: ${feel}\nMaintenance: ${care}${
        note.trim() ? `\nWhat we want Landmark to know: ${note.trim()}` : ""
      }\n\nPrepared at Landmark Landscapes — Prosper, Texas.`,
    [care, feel, goal, note],
  );

  const contactHref = useMemo(() => {
    const params = new URLSearchParams({
      project: goal,
      style: feel,
      care,
    });
    if (note.trim()) {
      params.set("notes", note.trim());
    }
    return `/contact?${params.toString()}`;
  }, [care, feel, goal, note]);

  function chooseCard(index: number) {
    if (index === 0) {
      setCards((current) => [...current.slice(1), current[0]]);
      return;
    }
    setCards((current) => [
      current[index],
      ...current.slice(0, index),
      ...current.slice(index + 1),
    ]);
  }

  function showPreviousCard() {
    setCards((current) => [
      current[current.length - 1],
      ...current.slice(0, -1),
    ]);
  }

  function showNextCard() {
    setCards((current) => [...current.slice(1), current[0]]);
  }

  function finishPlan(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPlanReady(true);
    window.setTimeout(() => {
      document.getElementById("plan-result")?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 80);
  }

  async function copyPlan() {
    await navigator.clipboard.writeText(planText);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <main>
      <SiteNavigation
        variant="home"
        contactHref="/plan-my-yard"
        actionLabel="Plan my yard"
      />

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Residential landscaping · Prosper + North Dallas</p>
          <h1>
            North Texas landscaping that feels like the{" "}
            <em>
              best part
              <svg viewBox="0 0 240 18" aria-hidden="true">
                <path d="M4 13C58 3 172 2 236 10" />
              </svg>
            </em>{" "}
            of home.
          </h1>
          <p className="hero-intro">
            Landmark is a Prosper-based landscaping company designing and
            installing planting, stone, lighting, drainage and irrigation
            around how you want to live—beautiful on day one, easier every day
            after.
          </p>
          <div className="hero-buttons">
            <Link className="button" href="/plan-my-yard">
              Plan my yard <span>✦</span>
            </Link>
            <a className="text-link" href="#transformation">
              See a transformation <span>→</span>
            </a>
          </div>
          <div className="hero-proof" aria-label="Service areas">
            <span className="proof-flower">✣</span>
            <p>
              Creating beautiful everyday life in{" "}
              <strong>Prosper, Frisco, McKinney, Celina</strong> and{" "}
              <strong>The Colony.</strong>
            </p>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-blob" aria-hidden="true" />
          <figure className="hero-photo">
            <SiteImage
              src="/images/texas-home-after-stone.webp"
              alt="Upscale Texas home with a richly layered front landscape, ornamental grasses, flowers and natural stone"
              sizes="(max-width: 820px) 100vw, 50vw"
              preload
            />
          </figure>
          <div className="little-note note-one">
            <svg
              className="callout-accent callout-flowers"
              viewBox="0 0 92 116"
              aria-hidden="true"
            >
              <g className="accent-grass">
                <path d="M38 110C40 77 32 41 15 8" />
                <path d="M44 111C46 72 43 35 40 4" />
                <path d="M48 111C50 75 58 38 70 12" />
                <path d="M42 110C34 80 23 55 4 37" />
                <path d="M51 111C58 82 70 59 88 42" />
                <path d="M47 110C48 75 52 49 58 25" />
                <path d="M40 110C35 82 34 60 33 27" />
              </g>
              <g className="accent-flowers">
                <g transform="translate(20 79)">
                  <circle cx="0" cy="-5" r="4" />
                  <circle cx="5" cy="0" r="4" />
                  <circle cx="0" cy="5" r="4" />
                  <circle cx="-5" cy="0" r="4" />
                  <circle className="flower-center" r="2.5" />
                </g>
                <g transform="translate(40 68) scale(.82)">
                  <circle cx="0" cy="-5" r="4" />
                  <circle cx="5" cy="0" r="4" />
                  <circle cx="0" cy="5" r="4" />
                  <circle cx="-5" cy="0" r="4" />
                  <circle className="flower-center" r="2.5" />
                </g>
                <g transform="translate(53 88) scale(.68)">
                  <circle cx="0" cy="-5" r="4" />
                  <circle cx="5" cy="0" r="4" />
                  <circle cx="0" cy="5" r="4" />
                  <circle cx="-5" cy="0" r="4" />
                  <circle className="flower-center" r="2.5" />
                </g>
              </g>
            </svg>
            <div className="callout-stone">
              <span>01</span>
              <strong>Warm welcomes</strong>
            </div>
          </div>
          <div className="little-note note-two">
            <div className="callout-stone">
              <span>02</span>
              <strong>Easy evenings</strong>
            </div>
            <svg
              className="callout-accent callout-planter"
              viewBox="0 0 86 124"
              aria-hidden="true"
            >
              <g className="accent-grass">
                <path d="M42 72C38 46 27 21 10 5" />
                <path d="M43 72C42 42 43 18 48 1" />
                <path d="M46 72C52 42 65 20 80 9" />
                <path d="M43 72C33 46 20 34 3 27" />
                <path d="M46 72C58 48 69 38 84 33" />
                <path d="M44 72C48 47 54 29 62 13" />
                <path d="M42 72C39 47 35 29 29 13" />
              </g>
              <path
                className="planter-rim"
                d="M20 66C20 61 26 58 44 58C62 58 68 61 68 66L65 74H23Z"
              />
              <path
                className="planter-pot"
                d="M24 73H64L59 115C58 121 31 121 30 115Z"
              />
              <path className="planter-highlight" d="M32 78L35 111" />
            </svg>
          </div>
          <div className="sun-stamp" aria-hidden="true">
            <span>Landmark · Landscapes ·</span>
            <i>✦</i>
          </div>
        </div>

        <a className="scroll-cue" href="#feeling" aria-label="Scroll to discover">
          <span />
          Discover
        </a>
      </section>

      <section className="feeling-strip" id="feeling">
        <p>Designed around a feeling</p>
        <div className="feeling-words" aria-label="Design qualities">
          <span>welcoming</span>
          <i>✦</i>
          <span>alive</span>
          <i>✦</i>
          <span>easy</span>
          <i>✦</i>
          <span>unmistakably yours</span>
        </div>
      </section>

      <section className="story-section">
        <div className="story-copy reveal">
          <p className="eyebrow">The real reason to redesign</p>
          <h2>It isn&apos;t about adding more. It&apos;s about enjoying more.</h2>
          <p>
            More dinners that drift past sunset. More barefoot mornings. More
            pride when you pull into the driveway. Landmark brings the pieces
            together so your outdoor space supports the life already happening
            inside your home.
          </p>
          <a className="text-link" href="#possibilities">
            Find your kind of beautiful <span>→</span>
          </a>
        </div>

        <figure className="life-photo reveal">
          <SiteImage
            src="/images/backyard-life.webp"
            alt="A family enjoying an elegant landscaped backyard in North Texas"
            sizes="(max-width: 820px) 100vw, 50vw"
          />
          <figcaption>
            <strong>Just a place everyone wants to be.</strong>
          </figcaption>
        </figure>

        <div className="soft-quote">
          <span>“</span>
          <p>Make home feel a little more like getting away.</p>
        </div>
      </section>

      <section className="possibilities-section" id="possibilities">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Choose the life you want outside</p>
            <h2>What would make home feel better?</h2>
          </div>
          <p className="section-note">
            Tap any card to bring that possibility forward.
          </p>
        </div>

        <div className="possibility-deck">
          {cards.slice(0, 4).map((card, index) => (
            <button
              className={`possibility-card card-${index + 1}`}
              key={card.id}
              type="button"
              onClick={() => chooseCard(index)}
              aria-label={`Show ${card.title}`}
            >
              <SiteImage
                src={card.image}
                alt=""
                sizes="(max-width: 820px) 82vw, 25vw"
                style={{ objectPosition: card.position }}
              />
              <span className="card-wash" />
              <span className="card-topline">
                <small>{card.number}</small>
                <small>{card.label}</small>
              </span>
              <span className="card-copy">
                <strong>{card.title}</strong>
                <small>{card.copy}</small>
              </span>
              <span className="card-action" aria-hidden="true">
                +
              </span>
            </button>
          ))}
        </div>

        <div className="mobile-deck-controls">
          <button
            type="button"
            onClick={showPreviousCard}
            aria-label="Show previous landscape idea"
          >
            ←
          </button>
          <p aria-live="polite">
            <span>{cards[0].number} / 06</span>
            Tap the photo or use the arrows
          </p>
          <button
            type="button"
            onClick={showNextCard}
            aria-label="Show next landscape idea"
          >
            →
          </button>
        </div>

        <div className="deck-progress" aria-hidden="true">
          <span />
          <small>{cards[0].number} / 06</small>
        </div>
      </section>

      <section className="transformation-section" id="transformation">
        <div className="section-heading transformation-heading">
          <div>
            <p className="eyebrow">Our work across North Dallas</p>
            <h2>Real yards. Thoughtful transformations.</h2>
          </div>
          <p className="section-note">
            Explore Landmark projects spanning planting, stonework, drainage,
            turf and outdoor lighting.
          </p>
        </div>

        <div className="work-gallery">
          {workGallery.map((project, index) => (
            <button
              className={`work-gallery-item work-gallery-item-${project.layout}`}
              type="button"
              key={project.image}
              onClick={() => setActiveWorkIndex(index)}
              aria-label={`View ${project.title}`}
            >
              <SiteImage
                src={project.image}
                alt={project.alt}
                sizes="(max-width: 680px) 100vw, (max-width: 1050px) 50vw, 25vw"
              />
              <span className="work-gallery-wash" />
              <span className="work-gallery-copy">
                <small>{project.category}</small>
                <strong>{project.title}</strong>
              </span>
              <span className="work-gallery-open" aria-hidden="true">↗</span>
            </button>
          ))}
        </div>

        <div className="work-gallery-footer">
          <p>Tap any project to see the details up close.</p>
          <Link className="text-link" href="/contact">
            Start your own transformation <span>→</span>
          </Link>
        </div>

        {activeWorkIndex !== null && (
          <div
            className="work-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="Landmark project gallery"
            onClick={(event) => {
              if (event.currentTarget === event.target) setActiveWorkIndex(null);
            }}
          >
            <button
              className="work-lightbox-close"
              type="button"
              onClick={() => setActiveWorkIndex(null)}
              aria-label="Close project gallery"
              autoFocus
            >
              ×
            </button>
            <button
              className="work-lightbox-arrow work-lightbox-previous"
              type="button"
              onClick={() =>
                setActiveWorkIndex(
                  (activeWorkIndex - 1 + workGallery.length) % workGallery.length,
                )
              }
              aria-label="View previous project"
            >
              ←
            </button>
            <figure>
              <div className="work-lightbox-image">
                <SiteImage
                  src={workGallery[activeWorkIndex].image}
                  alt={workGallery[activeWorkIndex].alt}
                  sizes="(max-width: 820px) 94vw, 84vw"
                  priority
                />
              </div>
              <figcaption>
                <span>{workGallery[activeWorkIndex].category}</span>
                <strong>{workGallery[activeWorkIndex].title}</strong>
                <small>{activeWorkIndex + 1} / {workGallery.length}</small>
              </figcaption>
            </figure>
            <button
              className="work-lightbox-arrow work-lightbox-next"
              type="button"
              onClick={() =>
                setActiveWorkIndex((activeWorkIndex + 1) % workGallery.length)
              }
              aria-label="View next project"
            >
              →
            </button>
          </div>
        )}
      </section>

      <section className="yard-tools-callout">
        <div className="yard-tools-heading">
          <div>
            <p className="eyebrow">A smarter way to begin</p>
            <h2>Don&apos;t just describe the yard. Show us where it could go.</h2>
          </div>
          <p>
            Build a useful project brief and turn a photo from your phone into
            a visual direction for your landscape.
          </p>
        </div>
        <div className="yard-tool-cards">
          <Link className="yard-tool-card yard-planner-card" href="/plan-my-yard">
            <div>
              <span>01 · Guided project builder</span>
              <h3>Plan My Yard</h3>
              <p>
                Choose the areas, features and style you want in one easy
                mobile experience, then share the result with Landmark.
              </p>
              <strong>
                Start my two-minute plan <i>→</i>
              </strong>
            </div>
            <SiteImage
              src="/images/stone-walkway-project.webp"
              alt="A finished North Texas stone walkway and landscape"
              sizes="(max-width: 820px) 100vw, 50vw"
            />
          </Link>
          <Link
            className="yard-tool-card yard-visualizer-card"
            href="/plan-my-yard#yard-planner"
          >
            <div>
              <span>02 · Built from your photo</span>
              <h3>See My Yard Reimagined</h3>
              <p>
                Upload the view you want to change and create a personalized AI
                inspiration concept.
              </p>
              <strong>
                Reimagine my yard <i>✦</i>
              </strong>
            </div>
            <SiteImage
              src="/images/texas-home-after-stone.webp"
              alt="A North Texas front yard reimagined with stone and layered planting"
              sizes="(max-width: 820px) 100vw, 50vw"
            />
          </Link>
        </div>
      </section>

      <section className="evening-section">
        <SiteImage
          src="/images/uplighting-home.webp"
          alt="Texas home with warm, subtle landscape uplighting"
          sizes="100vw"
        />
        <div className="evening-wash" />
        <div className="evening-copy">
          <p className="eyebrow">When the sun goes down</p>
          <h2>Your home gets a second first impression.</h2>
          <p>
            Thoughtful uplighting makes arrivals feel warmer, walkways feel
            safer and the landscape feel alive long after dinner.
          </p>
          <Link className="button button-light" href="/plan-my-yard">
            Plan an evening look <span>→</span>
          </Link>
        </div>
      </section>

      <section className="process-section" id="process">
        <div className="process-intro">
          <p className="eyebrow">A calmer way to make a big change</p>
          <h2>Clear enough to feel easy. Personal enough to feel yours.</h2>
          <p>
            You don&apos;t need to know plant names or arrive with a finished
            plan. Start with how you want home to feel—we&apos;ll help translate
            that into a landscape.
          </p>
        </div>

        <div className="process-list">
          {processSteps.map((step) => (
            <Link href={step.href} key={step.number}>
              <span>{step.number}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </div>
              <i aria-hidden="true">→</i>
            </Link>
          ))}
        </div>
      </section>

      <section className="trust-section">
        <div className="trust-heading">
          <p className="eyebrow">Confidence looks good on a project</p>
          <h2>The details that make choosing feel easier.</h2>
        </div>
        <div className="trust-grid">
          <article>
            <span>✦</span>
            <h3>Designed for North Texas</h3>
            <p>Planting and watering choices grounded in the place you live.</p>
          </article>
          <article>
            <span>✦</span>
            <h3>One connected plan</h3>
            <p>Landscape, pathways, lighting, drainage and irrigation working together.</p>
          </article>
          <article>
            <span>✦</span>
            <h3>Communication you can feel</h3>
            <p>Know what comes next, who to call and where your project stands.</p>
          </article>
          <article>
            <span>✦</span>
            <h3>Built around your care level</h3>
            <p>A beautiful result that still makes sense on an ordinary Tuesday.</p>
          </article>
        </div>
      </section>

      <section className="water-resource-callout">
        <div className="water-callout-icon" aria-hidden="true">
          <svg viewBox="0 0 80 98">
            <path d="M40 4C35 18 9 46 9 66c0 18 14 28 31 28s31-10 31-28C71 46 45 18 40 4Z" />
            <path d="M24 67c1 8 7 13 16 14" />
          </svg>
        </div>
        <div className="water-callout-copy">
          <p className="eyebrow">A Landmark community resource</p>
          <h2>Know when to water. Protect what you&apos;ve planted.</h2>
          <p>
            Find local watering schedules and practical landscape-care advice
            for Prosper, Frisco, McKinney, Celina and The Colony.
          </p>
        </div>
        <div className="water-callout-action">
          <span>City rules + official links</span>
          <div className="water-callout-links">
            <Link
              className="button button-light"
              href="/water-restrictions#watering-day-checker"
            >
              Check my watering day <span>→</span>
            </Link>
            <Link href="/water-restrictions#yard-health-check">
              Why is my yard struggling? <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="yard-plan-section" id="yard-plan">
        <div className="plan-copy">
          <p className="eyebrow">Your two-minute yard brief</p>
          <h2>Start with what you want life outside to feel like.</h2>
          <p>
            Choose a few things that matter. We&apos;ll turn them into a simple
            brief you can share at home or send directly to Landmark.
          </p>
          <div className="plan-side-note">
            <span>Designed to be shared</span>
            <p>
              Put the idea into words, invite someone into the decision and
              arrive at the first conversation already aligned.
            </p>
          </div>
        </div>

        <form className="yard-plan" onSubmit={finishPlan}>
          <fieldset>
            <legend>
              <span>01</span> What would change home the most?
            </legend>
            <div className="choice-grid">
              {goalOptions.map((option) => (
                <label className={goal === option ? "selected" : ""} key={option}>
                  <input
                    type="radio"
                    name="goal"
                    value={option}
                    checked={goal === option}
                    onChange={() => setGoal(option)}
                  />
                  <span>{option}</span>
                  <i>✓</i>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend>
              <span>02</span> Which feeling is closest?
            </legend>
            <div className="pill-choices">
              {feelOptions.map((option) => (
                <label className={feel === option ? "selected" : ""} key={option}>
                  <input
                    type="radio"
                    name="feel"
                    value={option}
                    checked={feel === option}
                    onChange={() => setFeel(option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend>
              <span>03</span> How much care feels right?
            </legend>
            <div className="pill-choices">
              {careOptions.map((option) => (
                <label className={care === option ? "selected" : ""} key={option}>
                  <input
                    type="radio"
                    name="care"
                    value={option}
                    checked={care === option}
                    onChange={() => setCare(option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </fieldset>

          <label className="note-field">
            <span>Anything else you already know?</span>
            <textarea
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="We love our trees, the front beds feel empty, the sprinklers need attention..."
              rows={3}
            />
          </label>

          <button className="button plan-button" type="submit">
            Create my yard brief <span>→</span>
          </button>
        </form>

        {planReady && (
          <div className="plan-result" id="plan-result" aria-live="polite">
            <div>
              <p className="eyebrow">Your starting point</p>
              <h3>{goal}</h3>
              <p>
                <strong>Feeling:</strong> {feel} · <strong>Care:</strong> {care}
              </p>
              {note.trim() && <p className="result-note">{note}</p>}
            </div>
            <div className="result-actions">
              <button type="button" className="text-link" onClick={copyPlan}>
                {copied ? "Copied ✓" : "Copy to share"} <span>→</span>
              </button>
              <a className="button" href={contactHref}>
                Continue to request form <span>→</span>
              </a>
            </div>
          </div>
        )}
      </section>

      <section className="service-ribbon" id="services">
        <p>Already know what you need?</p>
        <div>
          {serviceList.map((service) => (
            <a href={`/${service.slug}`} key={service.slug}>
              {service.navLabel}
            </a>
          ))}
          {locationPageList.map((location) => (
            <a href={`/${location.slug}`} key={location.slug}>
              Landscaping in {location.shortLabel}
            </a>
          ))}
        </div>
        <a href="/contact">Request an estimate →</a>
      </section>

      <footer>
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
          <div className="footer-cta">
            <h2>Ready to love the view from home?</h2>
            <a className="button button-light" href="/contact">
              Request an estimate <span>→</span>
            </a>
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
