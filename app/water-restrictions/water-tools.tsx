"use client";

import { FormEvent, useMemo, useState } from "react";
import { waterRestrictionCities } from "./water-restriction-data";

type DetailOption = {
  value: string;
  label: string;
  schedule: string;
};

const cityDetails: Record<
  string,
  {
    question: string;
    placeholder: string;
    options: DetailOption[];
  }
> = {
  "prosper-tx": {
    question: "Which Prosper watering zone is the property in?",
    placeholder: "Choose the zone from Prosper’s map",
    options: [
      { value: "Zone I", label: "Zone I", schedule: "Monday + Thursday" },
      { value: "Zone II", label: "Zone II", schedule: "Tuesday + Friday" },
      { value: "Zone III", label: "Zone III", schedule: "Wednesday + Saturday" },
      {
        value: "Not sure",
        label: "I need to check the official zone map",
        schedule: "Confirm the property zone on Prosper’s official map",
      },
    ],
  },
  "frisco-tx": {
    question: "What is the regular trash day?",
    placeholder: "Choose the regular trash day",
    options: [
      { value: "Monday", label: "Monday", schedule: "Monday + Thursday" },
      { value: "Tuesday", label: "Tuesday", schedule: "Tuesday + Friday" },
      { value: "Wednesday", label: "Wednesday", schedule: "Wednesday + Saturday" },
      { value: "Thursday", label: "Thursday", schedule: "Thursday + Sunday" },
      { value: "Friday", label: "Friday", schedule: "Friday + Tuesday" },
    ],
  },
  "mckinney-tx": {
    question: "What is the regular trash day?",
    placeholder: "Choose the regular trash day",
    options: [
      { value: "Monday", label: "Monday", schedule: "Monday + Thursday" },
      { value: "Tuesday", label: "Tuesday", schedule: "Tuesday + Friday" },
      { value: "Wednesday", label: "Wednesday", schedule: "Wednesday + Saturday" },
      { value: "Thursday", label: "Thursday", schedule: "Thursday + Sunday" },
      { value: "Friday", label: "Friday", schedule: "Friday + Monday" },
    ],
  },
  "the-colony-tx": {
    question: "Is the street address odd or even?",
    placeholder: "Choose odd or even",
    options: [
      {
        value: "Odd address",
        label: "Odd-numbered address",
        schedule: "Saturday + Wednesday",
      },
      {
        value: "Even address",
        label: "Even-numbered address",
        schedule: "Sunday + Thursday",
      },
      {
        value: "Austin Ranch",
        label: "Austin Ranch",
        schedule: "Follow the current City of Plano drought plan",
      },
    ],
  },
  "celina-tx": {
    question: "Celina assigns a designated day by current city schedule.",
    placeholder: "Choose the next step",
    options: [
      {
        value: "Check schedule",
        label: "Open Celina’s official schedule",
        schedule: "One designated day per week under current Stage 2 measures",
      },
    ],
  },
};

const symptoms = [
  { value: "Brown patches", label: "Brown or thinning lawn patches" },
  { value: "Drooping plants", label: "Drooping, scorched or dying plants" },
  { value: "Standing water", label: "Standing water or a soggy area" },
  { value: "Runoff", label: "Water runs into the street" },
  { value: "Uneven growth", label: "Some areas thrive while others struggle" },
  { value: "High water bill", label: "A higher water bill without better results" },
];

const soilOptions = [
  "Dry two inches down",
  "Moist two inches down",
  "Wet or sticky",
  "I have not checked",
];

const systemOptions = [
  "Automatic sprinklers",
  "Drip or soaker hose",
  "A mix of both",
  "Hand watering only",
  "I am not sure",
];

function diagnose(symptom: string, soil: string, system: string) {
  if (symptom === "Standing water") {
    return {
      title: "This looks more like a drainage or grading problem.",
      copy:
        "More irrigation will usually make it worse. Photograph the area after rain, note how long the water remains and have Landmark evaluate where the runoff should move.",
      service: "Yard drainage",
    };
  }

  if (symptom === "Runoff") {
    return {
      title: "The soil may need shorter cycle-and-soak watering.",
      copy:
        "North Texas clay often sheds water when a zone runs too long. Split the runtime into shorter cycles, pause between them and inspect heads for overspray or excessive flow.",
      service: "Sprinkler repair",
    };
  }

  if (symptom === "High water bill" || system === "Automatic sprinklers") {
    return {
      title: "Start with an irrigation efficiency check.",
      copy:
        "Broken heads, poor coverage, hidden leaks and outdated controller settings can waste water while plants still struggle. Test every zone before increasing runtime.",
      service: "Sprinkler repair",
    };
  }

  if (soil === "Wet or sticky") {
    return {
      title: "Pause watering and look for trapped water.",
      copy:
        "Wet soil plus plant decline can point to overwatering, poor drainage or a leak. Let the area dry, check nearby irrigation and avoid adding new plants until the cause is clear.",
      service: "Yard drainage",
    };
  }

  if (soil === "Dry two inches down" || symptom === "Drooping plants") {
    return {
      title: "The root zone may not be receiving useful water.",
      copy:
        "Water during allowed hours, apply it slowly and verify that moisture reaches below the surface. Beds often benefit from targeted drip or soaker-hose watering where city rules allow.",
      service: "Water-conscious landscape design",
    };
  }

  return {
    title: "The pattern needs a closer look before adding water.",
    copy:
      "Compare sun exposure, sprinkler coverage and soil moisture across the healthy and struggling areas. A side-by-side pattern often reveals whether the cause is water, plant placement or soil.",
    service: "Landscape design + installation",
  };
}

export default function WaterTools() {
  const [citySlug, setCitySlug] = useState("");
  const [detail, setDetail] = useState("");
  const [email, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState("");
  const [symptom, setSymptom] = useState("");
  const [soil, setSoil] = useState("");
  const [system, setSystem] = useState("");
  const [diagnosticReady, setDiagnosticReady] = useState(false);

  const city = waterRestrictionCities.find((item) => item.slug === citySlug);
  const detailConfig = citySlug ? cityDetails[citySlug] : undefined;
  const selectedDetail = detailConfig?.options.find(
    (option) => option.value === detail,
  );
  const result = useMemo(
    () => diagnose(symptom, soil, system),
    [soil, symptom, system],
  );

  async function emailSchedule(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!city || !selectedDetail || !email.includes("@")) return;
    setEmailStatus("Sending…");

    try {
      const response = await fetch("/api/water-guide-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          city: city.city,
          schedule: selectedDetail.schedule,
          timeRule: city.timeRule,
          officialUrl: city.officialUrl,
        }),
      });

      if (!response.ok) throw new Error("Email request failed");
      setEmailStatus("Schedule sent ✓");
    } catch {
      setEmailStatus("Could not send—please use the official city link below.");
    }
  }

  function finishDiagnostic(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!symptom || !soil || !system) return;
    setDiagnosticReady(true);
  }

  return (
    <section className="water-tools-section" id="watering-day-checker">
      <div className="water-section-heading">
        <div>
          <p className="eyebrow">Two useful answers in about a minute</p>
          <h2>What day can I water—and why is the yard still struggling?</h2>
        </div>
        <p>
          Start with the rule. Then look at what the landscape is telling you
          before adding more runtime.
        </p>
      </div>

      <div className="water-tool-grid">
        <article className="watering-checker">
          <div className="water-tool-title">
            <span>01</span>
            <div>
              <p className="eyebrow">Watering-day checker</p>
              <h3>Find the current schedule framework.</h3>
            </div>
          </div>

          <label>
            <span>Choose your city</span>
            <select
              value={citySlug}
              onChange={(event) => {
                setCitySlug(event.target.value);
                setDetail("");
                setEmailStatus("");
              }}
            >
              <option value="">Select a city</option>
              {waterRestrictionCities.map((item) => (
                <option value={item.slug} key={item.slug}>
                  {item.city}
                </option>
              ))}
            </select>
          </label>

          {city && detailConfig && (
            <label>
              <span>{detailConfig.question}</span>
              <select
                value={detail}
                onChange={(event) => {
                  setDetail(event.target.value);
                  setEmailStatus("");
                }}
              >
                <option value="">{detailConfig.placeholder}</option>
                {detailConfig.options.map((option) => (
                  <option value={option.value} key={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          )}

          {city && selectedDetail && (
            <div className="watering-result" aria-live="polite">
              <span>{city.city} · current framework</span>
              <strong>{selectedDetail.schedule}</strong>
              <dl>
                <div>
                  <dt>Restricted hours</dt>
                  <dd>{city.timeRule}</dd>
                </div>
                <div>
                  <dt>Current status</dt>
                  <dd>{city.status}</dd>
                </div>
              </dl>
              <a href={city.officialUrl} target="_blank" rel="noreferrer">
                Confirm on the official {city.city} source <span>↗</span>
              </a>

              <form className="schedule-email-form" onSubmit={emailSchedule}>
                <label>
                  <span>Email this schedule to me</span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                  />
                </label>
                <button type="submit">Send it →</button>
              </form>
              {emailStatus && <p className="schedule-email-status">{emailStatus}</p>}
            </div>
          )}
        </article>

        <article className="yard-health-checker" id="yard-health-check">
          <div className="water-tool-title">
            <span>02</span>
            <div>
              <p className="eyebrow">60-second yard health check</p>
              <h3>Find the smarter first step.</h3>
            </div>
          </div>

          <form onSubmit={finishDiagnostic}>
            <label>
              <span>What is the most obvious problem?</span>
              <select
                value={symptom}
                required
                onChange={(event) => {
                  setSymptom(event.target.value);
                  setDiagnosticReady(false);
                }}
              >
                <option value="">Choose the main symptom</option>
                {symptoms.map((item) => (
                  <option value={item.value} key={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>What does the soil feel like two inches down?</span>
              <select
                value={soil}
                required
                onChange={(event) => {
                  setSoil(event.target.value);
                  setDiagnosticReady(false);
                }}
              >
                <option value="">Choose the closest answer</option>
                {soilOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
            <label>
              <span>How is the area watered?</span>
              <select
                value={system}
                required
                onChange={(event) => {
                  setSystem(event.target.value);
                  setDiagnosticReady(false);
                }}
              >
                <option value="">Choose a watering method</option>
                {systemOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
            <button className="button" type="submit">
              Check my yard <span>→</span>
            </button>
          </form>

          {diagnosticReady && (
            <div className="health-result" aria-live="polite">
              <span>Likely first direction</span>
              <h4>{result.title}</h4>
              <p>{result.copy}</p>
              <a
                href={`/contact/?service=${encodeURIComponent(
                  result.service,
                )}&project=${encodeURIComponent(symptom)}&notes=${encodeURIComponent(
                  `Yard Health Check: ${symptom}. Soil: ${soil}. Watering: ${system}.`,
                )}`}
              >
                Ask Landmark to look at this <span>→</span>
              </a>
            </div>
          )}
        </article>
      </div>
      <p className="water-tool-disclaimer">
        This tool provides general landscape guidance, not a diagnosis. City
        rules and official sources control; site conditions require an onsite
        evaluation.
      </p>
    </section>
  );
}
