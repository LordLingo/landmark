"use client";

/* eslint-disable @next/next/no-img-element */
import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import SiteImage from "../site-image";
import YardDesignStudio from "./yard-design-studio";
import {
  describePlants,
  plantPreferenceOptions,
  yardPlants,
} from "./plant-library";

type Choice = {
  value: string;
  label: string;
  note?: string;
  image?: string;
};

type Feature = Choice & {
  low: number;
  high: number;
};

type PlannerState = {
  city: string;
  area: string[];
  goals: string[];
  features: string[];
  style: string;
  plantPreferences: string[];
  selectedPlantIds: string[];
  notes: string;
  preferredDate: string;
  preferredTime: string;
};

type ContactState = {
  name: string;
  email: string;
  phone: string;
};

const cities: Choice[] = [
  { value: "Prosper", label: "Prosper" },
  { value: "Frisco", label: "Frisco" },
  { value: "McKinney", label: "McKinney" },
  { value: "Celina", label: "Celina" },
  { value: "The Colony", label: "The Colony" },
  { value: "Nearby North Texas", label: "Another nearby community" },
];

const areas: Array<Choice & { multiplier: number }> = [
  {
    value: "Front yard",
    label: "Front yard",
    note: "Curb appeal, entry beds and arrival",
    multiplier: 1,
  },
  {
    value: "Backyard",
    label: "Backyard",
    note: "Daily life, privacy and entertaining",
    multiplier: 1.15,
  },
  {
    value: "Beds + entry",
    label: "Beds + entry",
    note: "Focused planting and borders",
    multiplier: 0.72,
  },
  {
    value: "Patio + outdoor living",
    label: "Patio + outdoor living",
    note: "A place to gather outside",
    multiplier: 1.2,
  },
  {
    value: "Entire property",
    label: "Entire property",
    note: "One connected plan, front to back",
    multiplier: 1.65,
  },
  {
    value: "New construction",
    label: "New construction",
    note: "Build beyond builder-basic",
    multiplier: 1.75,
  },
];

const goals: Choice[] = [
  { value: "Curb appeal", label: "Make the home feel finished" },
  { value: "Lower maintenance", label: "Spend less time maintaining it" },
  { value: "Lower water use", label: "Use water more thoughtfully" },
  { value: "Privacy + shade", label: "Create privacy or useful shade" },
  { value: "Outdoor living", label: "Make room for people to gather" },
  { value: "Drainage solution", label: "Fix water, erosion or soggy areas" },
  { value: "Replace dead landscaping", label: "Replace dead or dated landscaping" },
  { value: "Help me decide", label: "I need Landmark to help me decide" },
];

const features: Feature[] = [
  {
    value: "Layered planting",
    label: "Trees, grasses + flowers",
    note: "North Texas native layers with seasonal interest",
    low: 5500,
    high: 13000,
  },
  {
    value: "Stone borders + boulders",
    label: "Stone borders + boulders",
    note: "Structure, texture and a more finished arrival",
    low: 4500,
    high: 12000,
  },
  {
    value: "Irrigation",
    label: "Irrigation improvements",
    note: "Better coverage, repairs and efficiency",
    low: 2200,
    high: 6500,
  },
  {
    value: "Landscape lighting",
    label: "Landscape lighting",
    note: "Warm arrivals, safer walks and evening atmosphere",
    low: 3500,
    high: 8500,
  },
  {
    value: "Pavers + patio",
    label: "Pavers, patio or walkway",
    note: "Usable space and beautiful transitions",
    low: 12000,
    high: 34000,
  },
  {
    value: "Drainage",
    label: "Drainage correction",
    note: "Move water away from problem areas",
    low: 4000,
    high: 14000,
  },
  {
    value: "Turf + lawn",
    label: "Turf or lawn improvements",
    note: "A cleaner, healthier green foundation",
    low: 4500,
    high: 14000,
  },
  {
    value: "Outdoor living details",
    label: "Outdoor living details",
    note: "Gathering zones, screening and finishing touches",
    low: 8500,
    high: 26000,
  },
];

const styles: Choice[] = [
  {
    value: "Texas natural",
    label: "Texas natural",
    note: "Stone, grasses and relaxed planting",
    image: "/images/front-yard-stone.webp",
  },
  {
    value: "Clean modern",
    label: "Clean modern",
    note: "Strong lines and restrained planting",
    image: "/images/texas-home-after-stone.webp",
  },
  {
    value: "Colorful traditional",
    label: "Colorful traditional",
    note: "Layered flowers and a warm welcome",
    image: "/images/flower-bed-front-entry.webp",
  },
  {
    value: "Low-water native",
    label: "Low-water native",
    note: "North Texas character with practical care",
    image: "/images/drainage-landscape-bed.webp",
  },
  {
    value: "Resort inspired",
    label: "Resort inspired",
    note: "Soft, lush and made for unwinding",
    image: "/images/backyard-life.webp",
  },
  {
    value: "Help me decide",
    label: "Surprise me",
    note: "Let Landmark find the right direction",
    image: "/images/stone-walkway-project.webp",
  },
];

const defaultState: PlannerState = {
  city: "",
  area: [],
  goals: [],
  features: [],
  style: "",
  plantPreferences: [],
  selectedPlantIds: [],
  notes: "",
  preferredDate: "",
  preferredTime: "Morning",
};

const steps = [
  { number: "01", label: "Your property" },
  { number: "02", label: "Your priorities" },
  { number: "03", label: "The look" },
  { number: "04", label: "Your photo" },
  { number: "05", label: "Your result" },
];

function toggleValue(values: string[], value: string) {
  return values.includes(value)
    ? values.filter((item) => item !== value)
    : [...values, value];
}

function buildBrief(state: PlannerState) {
  return [
    `${state.city || "North Texas"} · ${state.area.join(", ")}`,
    `Goals: ${state.goals.join(", ")}`,
    `Features: ${state.features.join(", ")}`,
    `Style: ${state.style}`,
    state.plantPreferences.length
      ? `Plant priorities: ${state.plantPreferences.join(", ")}`
      : "",
    state.selectedPlantIds.length
      ? `Plants requested: ${describePlants(state.selectedPlantIds)}`
      : "",
    "Plant standard: North Texas natives only",
    state.notes ? `Notes: ${state.notes}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

async function optimizeYardPhoto(file: File) {
  try {
    const bitmap = await createImageBitmap(file);
    const maxDimension = 1800;
    const scale = Math.min(
      1,
      maxDimension / Math.max(bitmap.width, bitmap.height),
    );
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    const context = canvas.getContext("2d");
    context?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", 0.84),
    );

    if (blob) {
      return new File([blob], "yard-photo.jpg", { type: "image/jpeg" });
    }
  } catch {
    // The API route performs a second validation if browser compression fails.
  }

  return file;
}

export default function YardPlanner({ bookingUrl }: { bookingUrl: string }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [state, setState] = useState<PlannerState>(defaultState);
  const [contact, setContact] = useState<ContactState>({
    name: "",
    email: "",
    phone: "",
  });
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoUrl, setPhotoUrl] = useState("");
  const [generatedImage, setGeneratedImage] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [leadDelivered, setLeadDelivered] = useState(false);
  const [copied, setCopied] = useState(false);
  const [comparePosition, setComparePosition] = useState(55);
  const [fieldError, setFieldError] = useState("");
  const [storageReady, setStorageReady] = useState(false);
  const plannerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const restoreSavedPlan = window.setTimeout(() => {
      try {
        const saved = window.localStorage.getItem("landmark-yard-plan");
        if (saved) {
          const parsed = JSON.parse(saved) as Partial<PlannerState> & {
            area?: string | string[];
          };
          setState({
            ...defaultState,
            ...parsed,
            area: Array.isArray(parsed.area)
              ? parsed.area
              : parsed.area
                ? [parsed.area]
                : [],
          });
        }
      } catch {
        // A saved plan is a convenience; the planner remains usable without it.
      } finally {
        setStorageReady(true);
      }
    }, 0);

    return () => window.clearTimeout(restoreSavedPlan);
  }, []);

  useEffect(() => {
    if (!storageReady) return;
    try {
      window.localStorage.setItem("landmark-yard-plan", JSON.stringify(state));
    } catch {
      // Ignore storage restrictions in private browsing.
    }
  }, [state, storageReady]);

  useEffect(() => {
    return () => {
      if (photoUrl) {
        URL.revokeObjectURL(photoUrl);
      }
    };
  }, [photoUrl]);

  const brief = useMemo(() => buildBrief(state), [state]);

  function updateState<K extends keyof PlannerState>(
    key: K,
    value: PlannerState[K],
  ) {
    setState((current) => ({ ...current, [key]: value }));
    setFieldError("");
  }

  function stepIsComplete(step: number) {
    if (step === 0) return Boolean(state.city && state.area.length);
    if (step === 1) return Boolean(state.goals.length && state.features.length);
    if (step === 2) return Boolean(state.style);
    if (step === 3) return Boolean(photo);
    return true;
  }

  function goNext() {
    if (!stepIsComplete(currentStep)) {
      setFieldError("Choose the options above to continue.");
      return;
    }
    setCurrentStep((step) => Math.min(step + 1, steps.length - 1));
    window.setTimeout(() => {
      plannerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 40);
  }

  function goBack() {
    setFieldError("");
    setCurrentStep((step) => Math.max(0, step - 1));
  }

  function handlePhoto(event: ChangeEvent<HTMLInputElement>) {
    const nextPhoto = event.target.files?.[0] ?? null;
    if (!nextPhoto) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(nextPhoto.type)) {
      setFieldError("Please upload a JPG, PNG or WebP yard photo.");
      event.target.value = "";
      return;
    }

    if (nextPhoto.size > 15 * 1024 * 1024) {
      setFieldError("Please choose an image smaller than 15 MB.");
      event.target.value = "";
      return;
    }

    if (photoUrl) URL.revokeObjectURL(photoUrl);
    setPhoto(nextPhoto);
    setPhotoUrl(URL.createObjectURL(nextPhoto));
    setGeneratedImage("");
    setStatusMessage("");
    setFieldError("");
    event.target.value = "";
  }

  async function deliverLead() {
    const response = await fetch("/api/yard-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...contact,
        ...state,
        selectedPlants: describePlants(state.selectedPlantIds),
        photoName: photo?.name ?? "",
      }),
    });

    if (!response.ok) {
      throw new Error("We could not deliver the project brief.");
    }

    setLeadDelivered(true);
  }

  async function createConcept(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatusMessage("");

    if (!photo || !contact.name || !contact.email || !contact.phone) {
      setStatusMessage(
        "Add your name, email, phone and yard photo so Landmark can return your concept and follow up on the project.",
      );
      return;
    }

    setIsGenerating(true);

    try {
      await deliverLead();
    } catch {
      setStatusMessage(
        "Your plan is ready, but the lead connection did not respond. You can still continue to the estimate form below.",
      );
    }

    try {
      const optimizedPhoto = await optimizeYardPhoto(photo);
      const formData = new FormData();
      formData.append("image", optimizedPhoto);
      formData.append("city", state.city);
      formData.append("area", state.area.join(", "));
      formData.append("goals", state.goals.join(", "));
      formData.append("features", state.features.join(", "));
      formData.append("style", state.style);
      formData.append("preferences", state.plantPreferences.join(", "));
      formData.append("plantSelections", describePlants(state.selectedPlantIds));
      formData.append("notes", state.notes);
      formData.append("name", contact.name);
      formData.append("email", contact.email);
      formData.append("phone", contact.phone);

      const response = await fetch("/api/visualize-yard", {
        method: "POST",
        body: formData,
      });
      const result = (await response.json()) as {
        image?: string;
        error?: string;
        code?: string;
      };

      if (!response.ok || !result.image) {
        if (result.code === "visualizer_not_configured") {
          setStatusMessage(
            "Your yard brief has been sent to Landmark. The live AI concept generator is being connected for launch; Landmark can use this photo and your selections to prepare the next step.",
          );
          return;
        }
        throw new Error(result.error || "The concept could not be generated.");
      }

      setGeneratedImage(result.image);
      setStatusMessage(
        "Your inspiration concept is ready. Save it, share it, or ask Landmark to price this direction.",
      );
    } catch (error) {
      setStatusMessage(
        error instanceof Error
          ? error.message
          : "The concept could not be generated right now. Your yard brief is still ready.",
      );
    } finally {
      setIsGenerating(false);
    }
  }

  async function copyBrief() {
    await navigator.clipboard.writeText(brief);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  async function shareConcept() {
    if (!generatedImage) return;

    try {
      const blob = await (await fetch(generatedImage)).blob();
      const file = new File([blob], "landmark-yard-concept.webp", {
        type: "image/webp",
      });
      const shareData = {
        title: "My Landmark yard concept",
        text: "A starting point for our yard project with Landmark Landscapes.",
        files: [file],
      };

      if (navigator.share && navigator.canShare?.(shareData)) {
        await navigator.share(shareData);
        return;
      }

      await navigator.clipboard.writeText(window.location.href);
      setStatusMessage(
        "This browser cannot share the image directly, so the planner link was copied. Download the concept to attach it.",
      );
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setStatusMessage(
        "The share panel could not open. Download the concept to save or send it.",
      );
    }
  }

  const contactHref = useMemo(() => {
    const params = new URLSearchParams({
      service: "Landscape design + installation",
      project: `${state.area.join(", ")} · ${state.goals.join(", ")}`,
      style: state.style,
      notes: brief,
    });
    return `/contact?${params.toString()}`;
  }, [brief, state]);

  return (
    <section className="yard-planner-shell" id="yard-planner" ref={plannerRef}>
      <div className="planner-progress" aria-label="Planner progress">
        <div
          className="planner-progress-line"
          style={{
            "--planner-progress": `${(currentStep / (steps.length - 1)) * 100}%`,
          } as React.CSSProperties}
        />
        {steps.map((step, index) => (
          <button
            type="button"
            className={
              index === currentStep
                ? "is-current"
                : index < currentStep
                  ? "is-complete"
                  : ""
            }
            key={step.number}
            onClick={() => {
              if (index <= currentStep || stepIsComplete(currentStep)) {
                setCurrentStep(index);
                setFieldError("");
              }
            }}
          >
            <span>{index < currentStep ? "✓" : step.number}</span>
            <small>{step.label}</small>
          </button>
        ))}
      </div>

      <div className="planner-stage">
        {currentStep === 0 && (
          <div className="planner-step">
            <div className="planner-step-heading">
              <span>01</span>
              <div>
                <p className="eyebrow">Start with the property</p>
                <h2>Where are we imagining?</h2>
                <p>
                  Your city and project area help us ground every recommendation
                  in the right North Texas context.
                </p>
              </div>
            </div>

            <fieldset className="planner-fieldset">
              <legend>Choose your city</legend>
              <div className="planner-pill-grid">
                {cities.map((city) => (
                  <label
                    className={state.city === city.value ? "is-selected" : ""}
                    key={city.value}
                  >
                    <input
                      type="radio"
                      name="city"
                      value={city.value}
                      checked={state.city === city.value}
                      onChange={() => updateState("city", city.value)}
                    />
                    <span>{city.label}</span>
                    <i>✓</i>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="planner-fieldset">
              <legend>What area needs work?</legend>
              <div className="planner-option-grid">
                {areas.map((area) => (
                  <label
                    className={
                      state.area.includes(area.value) ? "is-selected" : ""
                    }
                    key={area.value}
                  >
                    <input
                      type="checkbox"
                      name="area"
                      value={area.value}
                      checked={state.area.includes(area.value)}
                      onChange={() =>
                        updateState("area", toggleValue(state.area, area.value))
                      }
                    />
                    <span>
                      <strong>{area.label}</strong>
                      <small>{area.note}</small>
                    </span>
                    <i>✓</i>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
        )}

        {currentStep === 1 && (
          <div className="planner-step">
            <div className="planner-step-heading">
              <span>02</span>
              <div>
                <p className="eyebrow">Build the wish list</p>
                <h2>What should the yard do better?</h2>
                <p>
                  Choose everything that matters. Landmark will help prioritize
                  the pieces that create the strongest result.
                </p>
              </div>
            </div>

            <fieldset className="planner-fieldset">
              <legend>What would change home the most?</legend>
              <div className="planner-option-grid">
                {goals.map((goal) => (
                  <label
                    className={
                      state.goals.includes(goal.value) ? "is-selected" : ""
                    }
                    key={goal.value}
                  >
                    <input
                      type="checkbox"
                      checked={state.goals.includes(goal.value)}
                      onChange={() =>
                        updateState("goals", toggleValue(state.goals, goal.value))
                      }
                    />
                    <span>
                      <strong>{goal.label}</strong>
                    </span>
                    <i>✓</i>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="planner-fieldset">
              <legend>Which features belong in the picture?</legend>
              <div className="planner-option-grid feature-grid">
                {features.map((feature) => (
                  <label
                    className={
                      state.features.includes(feature.value) ? "is-selected" : ""
                    }
                    key={feature.value}
                  >
                    <input
                      type="checkbox"
                      checked={state.features.includes(feature.value)}
                      onChange={() =>
                        updateState(
                          "features",
                          toggleValue(state.features, feature.value),
                        )
                      }
                    />
                    <span>
                      <strong>{feature.label}</strong>
                      <small>{feature.note}</small>
                    </span>
                    <i>+</i>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
        )}

        {currentStep === 2 && (
          <div className="planner-step">
            <div className="planner-step-heading">
              <span>03</span>
              <div>
                <p className="eyebrow">Choose a visual direction</p>
                <h2>What feels most like home?</h2>
                <p>
                  The style guides the AI inspiration concept. Every direction
                  uses a curated North Texas native plant palette; the style
                  changes the composition, not the plant standard.
                </p>
              </div>
            </div>

            <fieldset className="planner-fieldset">
              <legend>Choose one direction</legend>
              <div className="planner-style-grid">
                {styles.map((style) => (
                  <label
                    className={state.style === style.value ? "is-selected" : ""}
                    key={style.value}
                  >
                    <input
                      type="radio"
                      name="style"
                      value={style.value}
                      checked={state.style === style.value}
                      onChange={() => updateState("style", style.value)}
                    />
                    <SiteImage
                      src={style.image ?? "/images/texas-home-after-stone.webp"}
                      alt=""
                      sizes="(max-width: 720px) 50vw, 24vw"
                    />
                    <span>
                      <strong>{style.label}</strong>
                      <small>{style.note}</small>
                    </span>
                    <i>✓</i>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="planner-fieldset plant-priority-fieldset">
              <legend>What should every plant choice prioritize?</legend>
              <p className="planner-field-hint">
                Choose as many as you want. These guide both the first concept
                and every revision.
              </p>
              <div className="plant-priority-grid">
                {plantPreferenceOptions.map((preference) => (
                  <label
                    className={
                      state.plantPreferences.includes(preference)
                        ? "is-selected"
                        : ""
                    }
                    key={preference}
                  >
                    <input
                      type="checkbox"
                      checked={state.plantPreferences.includes(preference)}
                      onChange={() =>
                        updateState(
                          "plantPreferences",
                          toggleValue(state.plantPreferences, preference),
                        )
                      }
                    />
                    <span>{preference}</span>
                    <i>✓</i>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="planner-fieldset plant-choice-fieldset">
              <legend>See a plant you already love?</legend>
              <p className="planner-field-hint">
                Tap any favorites and the designer will deliberately work them
                into the concept. You can place more plants after it is created.
              </p>
              <div className="planner-plant-choice-grid">
                {yardPlants.map((plant) => (
                  <label
                    className={
                      state.selectedPlantIds.includes(plant.id)
                        ? "is-selected"
                        : ""
                    }
                    key={plant.id}
                  >
                    <input
                      type="checkbox"
                      checked={state.selectedPlantIds.includes(plant.id)}
                      onChange={() =>
                        updateState(
                          "selectedPlantIds",
                          toggleValue(state.selectedPlantIds, plant.id),
                        )
                      }
                    />
                    <span
                      className="planner-plant-symbol"
                      style={
                        {
                          "--plant-color": plant.markerColor,
                        } as React.CSSProperties
                      }
                      aria-hidden="true"
                    >
                      {plant.glyph}
                    </span>
                    <span>
                      <strong>{plant.name}</strong>
                      <small>
                        {plant.category} · {plant.height} · {plant.season}
                      </small>
                    </span>
                    <i>{state.selectedPlantIds.includes(plant.id) ? "✓" : "+"}</i>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
        )}

        {currentStep === 3 && (
          <div className="planner-step">
            <div className="planner-step-heading">
              <span>04</span>
              <div>
                <p className="eyebrow">See my yard reimagined</p>
                <h2>Show us the view you want to change.</h2>
                <p>
                  Stand back far enough to include the home, beds and lawn. A
                  clear daytime photo gives the concept the best starting point.
                </p>
              </div>
            </div>

            <div className="photo-step-grid">
              <div
                className={`yard-photo-upload${photoUrl ? " has-photo" : ""}`}
              >
                {photoUrl ? (
                  <>
                    <img src={photoUrl} alt="Your uploaded yard" />
                    <div className="photo-selected-controls">
                      <strong>Photo ready</strong>
                      <small>{photo?.name}</small>
                      <div className="photo-choice-actions">
                        <label className="photo-choice-button">
                          <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            capture="environment"
                            onChange={handlePhoto}
                          />
                          <span>Take a new photo</span>
                        </label>
                        <label className="photo-choice-button is-secondary">
                          <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            onChange={handlePhoto}
                          />
                          <span>Upload a different photo</span>
                        </label>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <i aria-hidden="true">＋</i>
                    <strong>Add a yard photo</strong>
                    <span>JPG, PNG or WebP · up to 15 MB</span>
                    <div className="photo-choice-actions">
                      <label className="photo-choice-button">
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          capture="environment"
                          onChange={handlePhoto}
                        />
                        <span>Take a photo</span>
                      </label>
                      <label className="photo-choice-button is-secondary">
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          onChange={handlePhoto}
                        />
                        <span>Upload from device</span>
                      </label>
                    </div>
                  </>
                )}
              </div>

              <div className="photo-guidance">
                <p className="eyebrow">For a stronger concept</p>
                <ul>
                  <li>
                    <span>01</span> Use a clear, level photo in daylight.
                  </li>
                  <li>
                    <span>02</span> Include the whole area you want changed.
                  </li>
                  <li>
                    <span>03</span> Avoid people, vehicles and house numbers.
                  </li>
                </ul>
                <label>
                  <span>Anything the concept must keep or avoid?</span>
                  <textarea
                    rows={4}
                    value={state.notes}
                    onChange={(event) => updateState("notes", event.target.value)}
                    placeholder="Keep the mature tree, hide the utility box, no red flowers..."
                  />
                </label>
                <p className="photo-privacy">
                  Your photo is used to create this concept and project brief.
                  Do not upload people, license plates or other sensitive
                  information.
                </p>
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="planner-step planner-result-step">
            <div className="planner-step-heading">
              <span>05</span>
              <div>
                <p className="eyebrow">Your Landmark starting point</p>
                <h2>Your project already has a clearer direction.</h2>
                <p>
                  Review the brief, create the visual concept and choose how
                  you&apos;d like to continue with Landmark.
                </p>
              </div>
            </div>

            <div className="planner-result-grid">
              <div className="yard-brief-card">
                <div className="yard-brief-heading">
                  <span>Project brief</span>
                  <button type="button" onClick={copyBrief}>
                    {copied ? "Copied ✓" : "Copy brief"}
                  </button>
                </div>
                <h3>
                  {state.area.join(" · ")} in {state.city}
                </h3>
                <dl>
                  <div>
                    <dt>Primary goals</dt>
                    <dd>{state.goals.join(" · ")}</dd>
                  </div>
                  <div>
                    <dt>Features</dt>
                    <dd>{state.features.join(" · ")}</dd>
                  </div>
                  <div>
                    <dt>Visual direction</dt>
                    <dd>{state.style}</dd>
                  </div>
                  {state.plantPreferences.length > 0 && (
                    <div>
                      <dt>Plant priorities</dt>
                      <dd>{state.plantPreferences.join(" · ")}</dd>
                    </div>
                  )}
                  {state.selectedPlantIds.length > 0 && (
                    <div>
                      <dt>Requested plants</dt>
                      <dd>{describePlants(state.selectedPlantIds)}</dd>
                    </div>
                  )}
                  <div>
                    <dt>Plant standard</dt>
                    <dd>North Texas natives only</dd>
                  </div>
                </dl>
              </div>

              <div className="concept-card">
                <div className="concept-card-heading">
                  <span>See my yard reimagined</span>
                  <small>AI inspiration concept</small>
                </div>
                <div
                  className={`concept-image-stage${generatedImage ? " has-comparison" : ""}`}
                  style={
                    {
                      "--compare-position": `${comparePosition}%`,
                    } as React.CSSProperties
                  }
                >
                  {generatedImage ? (
                    <>
                      <img
                        className="concept-before-image"
                        src={photoUrl}
                        alt="Your yard before the design concept"
                      />
                      <div className="concept-after-image">
                        <img
                          src={generatedImage}
                          alt="Your current AI yard design concept"
                        />
                      </div>
                      <span className="concept-compare-line" aria-hidden="true" />
                      <span className="concept-compare-label is-before">Before</span>
                      <span className="concept-compare-label is-after">Current design</span>
                      <label className="concept-compare-control">
                        <span>Slide to compare before and after</span>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={comparePosition}
                          onChange={(event) =>
                            setComparePosition(Number(event.target.value))
                          }
                        />
                      </label>
                    </>
                  ) : (
                    <img src={photoUrl} alt="Your uploaded yard" />
                  )}
                  {!generatedImage && !isGenerating && (
                    <span className="concept-awaiting">
                      Add your details below to create the concept
                    </span>
                  )}
                  {isGenerating && (
                    <div className="concept-generating" aria-live="polite">
                      <i />
                      <strong>Reimagining your yard…</strong>
                      <span>
                        Keeping the home recognizable and changing the landscape
                        direction.
                      </span>
                    </div>
                  )}
                  {generatedImage && (
                    <span className="concept-label">
                      Inspiration concept · not a construction plan
                    </span>
                  )}
                </div>

                {generatedImage && (
                  <div className="concept-actions">
                    <a href={generatedImage} download="landmark-yard-concept.webp">
                      Download concept
                    </a>
                    <button type="button" onClick={shareConcept}>
                      Share concept
                    </button>
                  </div>
                )}
              </div>
            </div>

            <form className="concept-contact-form" onSubmit={createConcept}>
              <div>
                <p className="eyebrow">Create and save the concept</p>
                <h3>Where should Landmark connect this idea to you?</h3>
                <p>
                  Your contact details keep the photo, brief and visual direction
                  together as one useful project record.
                </p>
              </div>
              <div className="concept-contact-fields">
                <label>
                  <span>Name</span>
                  <input
                    type="text"
                    autoComplete="name"
                    required
                    value={contact.name}
                    onChange={(event) =>
                      setContact((current) => ({
                        ...current,
                        name: event.target.value,
                      }))
                    }
                  />
                </label>
                <label>
                  <span>Email</span>
                  <input
                    type="email"
                    autoComplete="email"
                    required
                    value={contact.email}
                    onChange={(event) =>
                      setContact((current) => ({
                        ...current,
                        email: event.target.value,
                      }))
                    }
                  />
                </label>
                <label>
                  <span>Phone</span>
                  <input
                    type="tel"
                    autoComplete="tel"
                    required
                    value={contact.phone}
                    onChange={(event) =>
                      setContact((current) => ({
                        ...current,
                        phone: event.target.value,
                      }))
                    }
                  />
                </label>
                <label>
                  <span>Preferred visit date</span>
                  <input
                    type="date"
                    value={state.preferredDate}
                    onChange={(event) =>
                      updateState("preferredDate", event.target.value)
                    }
                  />
                </label>
                <label>
                  <span>Preferred time</span>
                  <select
                    value={state.preferredTime}
                    onChange={(event) =>
                      updateState("preferredTime", event.target.value)
                    }
                  >
                    <option>Morning</option>
                    <option>Afternoon</option>
                    <option>Evening</option>
                  </select>
                </label>
                <button className="button" type="submit" disabled={isGenerating}>
                  {isGenerating ? "Creating my concept…" : "Reimagine my yard"}
                  <span>✦</span>
                </button>
              </div>
              <p className="concept-consent">
                By continuing, you agree that Landmark may contact you about
                this project. No unrelated marketing.
              </p>
            </form>

            {statusMessage && (
              <div
                className={`planner-status${generatedImage ? " is-success" : ""}`}
                aria-live="polite"
              >
                <span>{generatedImage ? "✓" : "i"}</span>
                <p>{statusMessage}</p>
              </div>
            )}

            {generatedImage && (
              <YardDesignStudio
                image={generatedImage}
                context={{
                  city: state.city,
                  area: state.area,
                  goals: state.goals,
                  features: state.features,
                  style: state.style,
                  notes: state.notes,
                  plantPreferences: state.plantPreferences,
                  selectedPlantIds: state.selectedPlantIds,
                }}
                contact={contact}
                onImageChange={setGeneratedImage}
              />
            )}

            <div className="planner-next-actions">
              <div>
                <p className="eyebrow">Turn the idea into a real plan</p>
                <h3>Have Landmark price this look.</h3>
                <p>
                  The brief and concept give the first conversation a real
                  starting point. Landmark will confirm what is buildable and
                  prepare an accurate proposal.
                </p>
              </div>
              <div>
                {bookingUrl ? (
                  <a
                    className="button"
                    href={bookingUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Choose a consultation time <span>→</span>
                  </a>
                ) : (
                  <a className="button" href={contactHref}>
                    Request my consultation <span>→</span>
                  </a>
                )}
                <a className="text-link" href="tel:+14694928450">
                  Call 469-492-8450 <span>→</span>
                </a>
                {leadDelivered && <small>Project brief sent to Landmark ✓</small>}
              </div>
            </div>

          </div>
        )}

        {fieldError && <p className="planner-field-error">{fieldError}</p>}

        <div className="planner-controls">
          {currentStep > 0 && (
            <button className="planner-back" type="button" onClick={goBack}>
              ← Back
            </button>
          )}
          {currentStep < steps.length - 1 && (
            <button className="button" type="button" onClick={goNext}>
              {currentStep === 3 ? "Build my result" : "Continue"} <span>→</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
