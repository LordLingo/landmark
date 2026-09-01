"use client";

import { FormEvent, useState } from "react";
import styles from "./christmas-lights.module.css";

const formEndpoint = "https://formspree.io/f/xppadrdq";

export default function HolidayQuoteForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setFormError("");

    if (!form.checkValidity()) {
      form.reportValidity();
      setFormError("Please complete the required information so we can prepare your quote.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(formEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });

      if (!response.ok) {
        throw new Error(`Holiday quote form returned ${response.status}`);
      }

      window.location.assign("/thank-you");
    } catch (error) {
      console.error("Holiday quote form submission failed", error);
      setFormError("We could not send your request. Please try again or call 469-492-8450.");
      setIsSubmitting(false);
    }
  }

  return (
    <form className={styles.quoteForm} action={formEndpoint} method="POST" onSubmit={handleSubmit}>
      <input type="hidden" name="subject" value="New Christmas lights quote request from Landmark website" />
      <input type="hidden" name="Source" value="Landmark Christmas lights landing page" />
      <input
        type="text"
        name="_gotcha"
        className={styles.honey}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <label>
        <span>Name *</span>
        <input name="Name" type="text" autoComplete="name" required />
      </label>
      <label>
        <span>Phone *</span>
        <input name="Phone" type="tel" autoComplete="tel" required />
      </label>
      <label>
        <span>Email *</span>
        <input name="email" type="email" autoComplete="email" required />
      </label>
      <label>
        <span>Address *</span>
        <input name="Property address" type="text" autoComplete="street-address" required />
      </label>
      <label className={styles.fullField}>
        <span>Preferred install date *</span>
        <input name="Preferred install date" type="date" required />
      </label>

      {formError && <p className={styles.formError}>{formError}</p>}

      <button type="submit" className={styles.formButton} disabled={isSubmitting}>
        {isSubmitting ? "Sending your request…" : "Request my free quote"}
        <span aria-hidden="true">→</span>
      </button>
      <p className={styles.formNote}>
        By submitting, you agree that Landmark may contact you about holiday lighting. No mailing list or unrelated marketing.
      </p>
    </form>
  );
}
