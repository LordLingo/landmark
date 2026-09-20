"use client";

import { type CSSProperties, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./christmas-home-hero.module.css";

const bulbPoints: readonly (readonly [number, number])[] = [[53.971,26.172],[54.622,30.078],[36.328,34.082],[56.51,34.766],[72.201,36.328],[33.724,37.5],[66.536,37.695],[52.865,37.988],[73.893,38.574],[31.641,38.867],[74.479,39.355],[70.768,39.746],[32.357,39.844],[50.977,40.234],[57.031,40.723],[32.357,40.918],[81.901,41.895],[72.396,42.383],[21.224,42.871],[32.292,43.164],[89.388,44.727],[54.883,45.703],[40.56,46.387],[38.607,46.484],[91.602,47.754],[55.599,48.242],[53.646,48.73],[71.029,48.73],[56.641,49.023],[60.156,49.023],[51.628,49.121],[15.299,49.512],[72.135,49.609],[76.302,49.707],[55.664,53.711],[64.128,54.883],[55.078,56.152],[55.143,57.617],[55.729,59.277],[76.562,60.547],[55.534,61.328],[96.615,61.914],[91.927,62.598],[17.708,62.695],[35.417,62.891],[23.307,63.086],[66.602,63.086],[17.057,63.379],[54.492,64.648],[54.883,65.43],[55.599,65.918],[65.951,66.992]];

const motionQuery = "(prefers-reduced-motion: reduce)";

function subscribeToMotionPreference(onChange: () => void) {
  const query = window.matchMedia(motionQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function getMotionPreference() {
  return window.matchMedia(motionQuery).matches;
}

function getServerMotionPreference() {
  return false;
}

export default function ChristmasHomeHero() {
  const reducedMotion = useSyncExternalStore(
    subscribeToMotionPreference,
    getMotionPreference,
    getServerMotionPreference,
  );
  const [motionOverride, setMotionOverride] = useState<boolean | null>(null);
  const playing = motionOverride ?? !reducedMotion;

  return (
    <div
      className={`${styles.root}${!playing ? ` ${styles.paused}` : ""}${motionOverride === true ? ` ${styles.userPlay}` : ""}`}
    >
      <section className={styles.hero} id="top" aria-labelledby="holiday-title">
        <div className={styles.copy}>
          <p className={styles.eyebrow}>
            <span aria-hidden="true">✦</span> A little Landmark holiday magic
          </p>
          <h1 id="holiday-title">
            Make coming<br />home feel like<br /><em>Christmas.</em>
          </h1>
          <p className={styles.intro}>
            Beautiful lights. A warmer welcome. Let us bring the holiday glow to
            your home with custom Christmas light installation.
          </p>
          <div className={styles.actions}>
            <Link className={styles.primary} href="/christmas-lights#quote">
              Get my free Christmas quote <span aria-hidden="true">↗</span>
            </Link>
            <Link className={styles.secondary} href="/christmas-lights">
              Explore Christmas lighting <span aria-hidden="true">→</span>
            </Link>
          </div>
          <p className={styles.location}>
            Lighting up <strong>Prosper, Celina &amp; North Dallas.</strong>
          </p>
        </div>
        <div className={styles.visual}>
          <div className={styles.blob} aria-hidden="true" />
          <div className={styles.scene}>
            <Image
              className={styles.house}
              src="/images/texas-home-christmas.webp"
              width={1536}
              height={1024}
              sizes="(max-width: 620px) 100vw, 65vw"
              preload
              alt="Christmas design concept showing the Landmark homepage house at night with warm-white roofline lights, a glowing tree and a wreath at the entry."
            />
            <div className={styles.lights} aria-hidden="true">
              {bulbPoints.map(([x, y], index) => (
                <span
                  key={`${x}-${y}`}
                  className={styles.bulb}
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    "--duration": `${2.7 + (index % 9) * 0.19}s`,
                    "--delay": `${(-(index * 0.43)) % 5}s`,
                  } as CSSProperties}
                />
              ))}
            </div>
          </div>
          <div className={`${styles.note} ${styles.noteOne}`}>
            <span>01 · THE HOLIDAY GLOW</span>
            <strong>Your home. Holiday ready.</strong>
          </div>
          <div className={`${styles.note} ${styles.noteTwo}`}>
            <span>02 · LEAVE THE LADDER TO US</span>
            <strong>We hang. You enjoy.</strong>
          </div>
          <button
            className={styles.motion}
            type="button"
            aria-pressed={playing}
            aria-label={playing ? "Pause Christmas light animation" : "Play Christmas light animation"}
            onClick={() => setMotionOverride(!playing)}
          >
            <span className={styles.motionDot} aria-hidden="true" />
            <span>{playing ? "Pause twinkle" : "Play twinkle"}</span>
          </button>
        </div>
      </section>
      <div className={styles.serviceStrip} aria-label="Christmas lighting services">
        <span>Custom-fit rooflines</span><b aria-hidden="true">✦</b>
        <span>Trees &amp; entryways</span><b aria-hidden="true">✦</b>
        <span>Professional installation</span>
      </div>
    </div>
  );
}
