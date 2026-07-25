"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { serviceList } from "../service-data";

const formEndpoint =
  "https://formsubmit.co/landmarklandscapesllc@outlook.com";

export default function ContactForm() {
  const [nextUrl, setNextUrl] = useState(
    "https://landmarklandscapestx.com/thank-you/",
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [brief, setBrief] = useState({
    service: "",
    project: "",
    style: "",
    care: "",
    notes: "",
  });

  useEffect(() => {
    const updateFromUrl = window.setTimeout(() => {
      setNextUrl(`${window.location.origin}/thank-you/`);
      const params = new URLSearchParams(window.location.search);
      setBrief({
        service: params.get("service") ?? "",
        project: params.get("project") ?? "",
        style: params.get("style") ?? "",
        care: params.get("care") ?? "",
        notes: params.get("notes") ?? "",
      });
    }, 0);

    return () => window.clearTimeout(updateFromUrl);
  }, []);

  const hasYardBrief = useMemo(
    () => Boolean(brief.project || brief.style || brief.care || brief.notes),
    [brief],
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const form = event.currentTarget;
    setFormError("");

    if (!form.checkValidity()) {
      event.preventDefault();
      form.reportValidity();
      setFormError("Please complete the required contact information.");
      return;
    }

    setIsSubmitting(true);
  }

  return (
    <div className="contact-form-shell">
      {hasYardBrief && (
        <div className="carried-brief">
          <p className="eyebrow">Your yard brief came with you</p>
          <div>
            {brief.project && (
              <span>
                <small>Priority</small>
                {brief.project}
              </span>
            )}
            {brief.style && (
              <span>
                <small>Feeling</small>
                {brief.style}
              </span>
            )}
            {brief.care && (
              <span>
                <small>Care level</small>
                {brief.care}
              </span>
            )}
          </div>
        </div>
      )}

      <form
        className="contact-form"
        action={formEndpoint}
        method="POST"
        onSubmit={handleSubmit}
      >
        <input
          type="hidden"
          name="_subject"
          value="New estimate request from the Landmark website"
        />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_next" value={nextUrl} />
        <input type="text" name="_honey" className="form-honey" tabIndex={-1} />
        <input type="hidden" name="Yard brief priority" value={brief.project} />
        <input type="hidden" name="Preferred style" value={brief.style} />
        <input type="hidden" name="Care preference" value={brief.care} />

        <div className="contact-form-heading">
          <span>01</span>
          <div>
            <h2>How can Landmark reach you?</h2>
            <p>We&apos;ll use this information only to discuss your project.</p>
          </div>
        </div>

        <div className="form-grid two-columns">
          <label>
            <span>First name *</span>
            <input
              name="First name"
              type="text"
              autoComplete="given-name"
              required
            />
          </label>
          <label>
            <span>Last name *</span>
            <input
              name="Last name"
              type="text"
              autoComplete="family-name"
              required
            />
          </label>
          <label>
            <span>Email *</span>
            <input name="Email" type="email" autoComplete="email" required />
          </label>
          <label>
            <span>Phone *</span>
            <input name="Phone" type="tel" autoComplete="tel" required />
          </label>
        </div>

        <div className="contact-form-heading">
          <span>02</span>
          <div>
            <h2>Tell us about the property.</h2>
            <p>A few useful details help make the first conversation productive.</p>
          </div>
        </div>

        <div className="form-grid two-columns">
          <label>
            <span>Project type *</span>
            <select
              key={brief.service || "service-choice"}
              name="Project type"
              required
              defaultValue={brief.service}
            >
              <option value="">Choose a service</option>
              {serviceList.map((service) => (
                <option value={service.navLabel} key={service.slug}>
                  {service.navLabel}
                </option>
              ))}
              <option value="Several connected services">
                Several connected services
              </option>
              <option value="Not sure yet">Not sure yet</option>
            </select>
          </label>
          <label>
            <span>City *</span>
            <select name="City" required defaultValue="">
              <option value="">Choose your city</option>
              <option>Prosper</option>
              <option>Celina</option>
              <option>Frisco</option>
              <option>McKinney</option>
              <option>The Colony</option>
              <option>Little Elm</option>
              <option>Another nearby community</option>
            </select>
          </label>
          <label className="full-field">
            <span>Property address</span>
            <input
              name="Property address"
              type="text"
              autoComplete="street-address"
              placeholder="Helpful for understanding the property before we call"
            />
          </label>
          <label className="full-field">
            <span>What would you like to change? *</span>
            <textarea
              key={brief.notes || "project-notes"}
              name="Project details"
              rows={6}
              required
              defaultValue={brief.notes}
              placeholder="Tell us what is not working, what you are imagining, and anything you want to keep."
            />
          </label>
        </div>

        <fieldset className="contact-choice">
          <legend>How would you prefer Landmark to respond?</legend>
          <label>
            <input
              type="radio"
              name="Preferred response"
              value="Phone call"
              defaultChecked
            />
            <span>Phone call</span>
          </label>
          <label>
            <input type="radio" name="Preferred response" value="Text message" />
            <span>Text message</span>
          </label>
          <label>
            <input type="radio" name="Preferred response" value="Email" />
            <span>Email</span>
          </label>
        </fieldset>

        {formError && <p className="form-error">{formError}</p>}

        <button
          className="button contact-submit"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending your request…" : "Send my estimate request"}
          <span aria-hidden="true">→</span>
        </button>
        <p className="form-privacy">
          By submitting, you agree that Landmark may contact you about this
          project. No mailing list and no unrelated marketing.
        </p>
      </form>
    </div>
  );
}
