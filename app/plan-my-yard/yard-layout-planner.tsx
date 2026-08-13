"use client";

/* eslint-disable @next/next/no-img-element */
import {
  Dispatch,
  PointerEvent as ReactPointerEvent,
  SetStateAction,
  useMemo,
  useRef,
  useState,
} from "react";
import { yardPlants } from "./plant-library";
import {
  BedLineStyle,
  FlowerLevel,
  PlantingDensity,
  YardBrushMark,
  YardLayoutPlan,
  YardPlantPlacement,
} from "./yard-layout-types";

type LayoutMode = "zone" | "keep" | "plants";

type Props = {
  photoUrl: string;
  plan: YardLayoutPlan;
  preferredPlantIds: string[];
  onChange: Dispatch<SetStateAction<YardLayoutPlan>>;
};

const densityOptions: Array<{
  value: PlantingDensity;
  label: string;
  note: string;
}> = [
  {
    value: "restrained",
    label: "Clean + restrained",
    note: "More breathing room, structure and lawn",
  },
  {
    value: "balanced",
    label: "Balanced layers",
    note: "Shrubs, grasses and controlled color",
  },
  {
    value: "lush",
    label: "Full + layered",
    note: "Denser planting without becoming random",
  },
];

const flowerOptions: Array<{
  value: FlowerLevel;
  label: string;
  note: string;
}> = [
  { value: "none", label: "No flowers", note: "Green texture only" },
  {
    value: "accents",
    label: "A few accents",
    note: "Default · small repeated groups",
  },
  {
    value: "colorful",
    label: "More seasonal color",
    note: "Still limited to chosen zones",
  },
];

const bedLineOptions: Array<{ value: BedLineStyle; label: string }> = [
  { value: "clean", label: "Clean lines" },
  { value: "soft-curves", label: "Soft curves" },
  { value: "natural", label: "Natural edges" },
];

const clamp = (value: number, min = 3, max = 97) =>
  Math.min(max, Math.max(min, value));

function uniqueId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export default function YardLayoutPlanner({
  photoUrl,
  plan,
  preferredPlantIds,
  onChange,
}: Props) {
  const [mode, setMode] = useState<LayoutMode>("zone");
  const [brushSize, setBrushSize] = useState(14);
  const [plantId, setPlantId] = useState(
    preferredPlantIds[0] ?? "american-beautyberry",
  );
  const [selectedPlacementId, setSelectedPlacementId] = useState("");
  const stageRef = useRef<HTMLDivElement>(null);
  const drawing = useRef(false);
  const draggingId = useRef("");
  const lastDrawPoint = useRef<{ x: number; y: number } | null>(null);

  const selectedPlacement = plan.placements.find(
    (placement) => placement.id === selectedPlacementId,
  );
  const selectedPlant = selectedPlacement
    ? yardPlants.find((plant) => plant.id === selectedPlacement.plantId)
    : undefined;
  const plantSchedule = useMemo(() => {
    const counts = new Map<string, number>();
    plan.placements.forEach((placement) =>
      counts.set(placement.plantId, (counts.get(placement.plantId) ?? 0) + 1),
    );
    return [...counts.entries()].map(([id, count]) => ({
      plant: yardPlants.find((item) => item.id === id),
      count,
    }));
  }, [plan.placements]);

  function updatePlan(
    changes:
      | Partial<YardLayoutPlan>
      | ((current: YardLayoutPlan) => Partial<YardLayoutPlan>),
  ) {
    onChange((current) => ({
      ...current,
      ...(typeof changes === "function" ? changes(current) : changes),
    }));
  }

  function pointFromEvent(event: ReactPointerEvent<HTMLElement>) {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return { x: 50, y: 65 };
    return {
      x: clamp(((event.clientX - rect.left) / rect.width) * 100),
      y: clamp(((event.clientY - rect.top) / rect.height) * 100),
    };
  }

  function drawMark(event: ReactPointerEvent<HTMLElement>) {
    if (mode === "plants") return;
    const point = pointFromEvent(event);
    const last = lastDrawPoint.current;
    if (last && Math.hypot(point.x - last.x, point.y - last.y) < 2.2) return;
    lastDrawPoint.current = point;
    const mark: YardBrushMark = {
      id: uniqueId(mode),
      ...point,
      size: brushSize,
    };
    if (mode === "zone") {
      updatePlan((current) => ({
        plantZones: [...current.plantZones, mark],
      }));
    } else {
      updatePlan((current) => ({ keepZones: [...current.keepZones, mark] }));
    }
  }

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (mode === "plants") return;
    event.currentTarget.setPointerCapture(event.pointerId);
    drawing.current = true;
    lastDrawPoint.current = null;
    drawMark(event);
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (draggingId.current) {
      const point = pointFromEvent(event);
      updatePlan((current) => ({
        placements: current.placements.map((placement) =>
          placement.id === draggingId.current
            ? { ...placement, ...point }
            : placement,
        ),
      }));
      return;
    }
    if (drawing.current) drawMark(event);
  }

  function handlePointerUp() {
    drawing.current = false;
    draggingId.current = "";
    lastDrawPoint.current = null;
  }

  function addPlant(nextPlantId = plantId) {
    const offset = plan.placements.length % 5;
    const placement: YardPlantPlacement = {
      id: uniqueId("layout-plant"),
      plantId: nextPlantId,
      x: 34 + offset * 8,
      y: 68 + (offset % 2) * 6,
      scale: 1,
    };
    updatePlan((current) => ({
      placements: [...current.placements, placement],
    }));
    setSelectedPlacementId(placement.id);
    setMode("plants");
  }

  function startDragging(
    event: ReactPointerEvent<HTMLButtonElement>,
    placementId: string,
  ) {
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);
    draggingId.current = placementId;
    setSelectedPlacementId(placementId);
  }

  function updatePlacement(id: string, changes: Partial<YardPlantPlacement>) {
    updatePlan((current) => ({
      placements: current.placements.map((placement) =>
        placement.id === id ? { ...placement, ...changes } : placement,
      ),
    }));
  }

  function removePlacement(id: string) {
    updatePlan((current) => ({
      placements: current.placements.filter((placement) => placement.id !== id),
    }));
    setSelectedPlacementId("");
  }

  function duplicatePlacement(placement: YardPlantPlacement) {
    const duplicate: YardPlantPlacement = {
      ...placement,
      id: uniqueId("layout-plant"),
      x: clamp(placement.x + 7),
      y: clamp(placement.y + 4),
    };
    updatePlan((current) => ({
      placements: [...current.placements, duplicate],
    }));
    setSelectedPlacementId(duplicate.id);
  }

  return (
    <section className="layout-planner" aria-labelledby="layout-planner-title">
      <header className="layout-planner-heading">
        <div>
          <p className="eyebrow">Optional control before AI</p>
          <h3 id="layout-planner-title">Show the designer exactly what belongs where.</h3>
          <p>
            Brush only the areas that may become planting beds, protect anything
            that must stay open and place exact plants before the first concept.
          </p>
        </div>
        <span>AI starts with your layout—not a random yard</span>
      </header>

      <div className="layout-planner-grid">
        <div className="layout-canvas-column">
          <div className="layout-mode-tabs" role="tablist" aria-label="Layout tools">
            {([
              ["zone", "1 · Plant here"],
              ["keep", "2 · Keep this open"],
              ["plants", "3 · Place exact plants"],
            ] as Array<[LayoutMode, string]>).map(([value, label]) => (
              <button
                type="button"
                role="tab"
                aria-selected={mode === value}
                className={mode === value ? "is-active" : ""}
                onClick={() => setMode(value)}
                key={value}
              >
                {label}
              </button>
            ))}
          </div>

          <div
            className={`layout-photo-stage is-${mode}`}
            ref={stageRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            <img src={photoUrl} alt="Your yard ready for layout planning" draggable={false} />
            {plan.plantZones.map((mark) => (
              <span
                className="layout-brush-mark is-zone"
                style={{
                  left: `${mark.x}%`,
                  top: `${mark.y}%`,
                  width: `${mark.size}%`,
                  aspectRatio: "1",
                }}
                key={mark.id}
                aria-hidden="true"
              />
            ))}
            {plan.keepZones.map((mark) => (
              <span
                className="layout-brush-mark is-keep"
                style={{
                  left: `${mark.x}%`,
                  top: `${mark.y}%`,
                  width: `${mark.size}%`,
                  aspectRatio: "1",
                }}
                key={mark.id}
                aria-hidden="true"
              />
            ))}
            {plan.placements.map((placement) => {
              const plant = yardPlants.find((item) => item.id === placement.plantId);
              if (!plant) return null;
              return (
                <button
                  type="button"
                  className={`layout-plant-marker${selectedPlacementId === placement.id ? " is-selected" : ""}`}
                  style={
                    {
                      left: `${placement.x}%`,
                      top: `${placement.y}%`,
                      "--plant-scale": placement.scale,
                      "--plant-color": plant.markerColor,
                    } as React.CSSProperties
                  }
                  aria-label={`${plant.name}. Drag to move.`}
                  onPointerDown={(event) => startDragging(event, placement.id)}
                  onClick={(event) => {
                    event.stopPropagation();
                    setSelectedPlacementId(placement.id);
                  }}
                  key={placement.id}
                >
                  <i aria-hidden="true">{plant.glyph}</i>
                  <span>{plant.name}</span>
                </button>
              );
            })}
            <div className="layout-stage-legend" aria-hidden="true">
              <span><i className="is-zone" /> Planting allowed</span>
              <span><i className="is-keep" /> Keep unchanged</span>
            </div>
          </div>

          {mode !== "plants" && (
            <div className="layout-brush-controls">
              <span>
                {mode === "zone"
                  ? "Brush across the bed or lawn area landscaping may occupy."
                  : "Brush across lawn, trees, walks or features AI must not change."}
              </span>
              <label>
                Brush size
                <input
                  type="range"
                  min="6"
                  max="25"
                  value={brushSize}
                  onChange={(event) => setBrushSize(Number(event.target.value))}
                />
              </label>
              <button
                type="button"
                onClick={() =>
                  mode === "zone"
                    ? updatePlan({ plantZones: [] })
                    : updatePlan({ keepZones: [] })
                }
              >
                Clear these marks
              </button>
            </div>
          )}
        </div>

        <aside className="layout-control-panel">
          <fieldset>
            <legend>How full should the planting feel?</legend>
            <div className="layout-choice-stack">
              {densityOptions.map((option) => (
                <label
                  className={plan.density === option.value ? "is-selected" : ""}
                  key={option.value}
                >
                  <input
                    type="radio"
                    name="layout-density"
                    checked={plan.density === option.value}
                    onChange={() => updatePlan({ density: option.value })}
                  />
                  <span>
                    <strong>{option.label}</strong>
                    <small>{option.note}</small>
                  </span>
                  <i>✓</i>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend>How many flowers?</legend>
            <div className="layout-choice-stack">
              {flowerOptions.map((option) => (
                <label
                  className={plan.flowerLevel === option.value ? "is-selected" : ""}
                  key={option.value}
                >
                  <input
                    type="radio"
                    name="flower-level"
                    checked={plan.flowerLevel === option.value}
                    onChange={() => updatePlan({ flowerLevel: option.value })}
                  />
                  <span>
                    <strong>{option.label}</strong>
                    <small>{option.note}</small>
                  </span>
                  <i>✓</i>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend>Bed edge style</legend>
            <div className="layout-segmented-control">
              {bedLineOptions.map((option) => (
                <button
                  type="button"
                  className={plan.bedLineStyle === option.value ? "is-selected" : ""}
                  onClick={() => updatePlan({ bedLineStyle: option.value })}
                  key={option.value}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="layout-plant-picker">
            <legend>Place exact plants</legend>
            <div>
              <select
                value={plantId}
                onChange={(event) => setPlantId(event.target.value)}
                aria-label="Plant to place"
              >
                {preferredPlantIds.length > 0 && (
                  <optgroup label="Your favorites">
                    {yardPlants
                      .filter((plant) => preferredPlantIds.includes(plant.id))
                      .map((plant) => (
                        <option value={plant.id} key={`favorite-${plant.id}`}>
                          {plant.name} · {plant.category}
                        </option>
                      ))}
                  </optgroup>
                )}
                <optgroup label="All North Texas natives">
                  {yardPlants.map((plant) => (
                    <option value={plant.id} key={plant.id}>
                      {plant.name} · {plant.category}
                    </option>
                  ))}
                </optgroup>
              </select>
              <button type="button" onClick={() => addPlant()}>
                Add to photo
              </button>
            </div>
            <p>Each marker equals one plant. Duplicate markers to set quantities.</p>
          </fieldset>

          {selectedPlacement && selectedPlant && (
            <div className="layout-selected-plant">
              <span>Selected marker</span>
              <strong>{selectedPlant.name}</strong>
              <small>
                Mature size: {selectedPlant.height} high · {selectedPlant.spread} wide
              </small>
              <label>
                Visual size
                <input
                  type="range"
                  min="0.6"
                  max="1.8"
                  step="0.05"
                  value={selectedPlacement.scale}
                  onChange={(event) =>
                    updatePlacement(selectedPlacement.id, {
                      scale: Number(event.target.value),
                    })
                  }
                />
              </label>
              <div>
                <button
                  type="button"
                  onClick={() => duplicatePlacement(selectedPlacement)}
                >
                  Duplicate
                </button>
                <button
                  type="button"
                  onClick={() => removePlacement(selectedPlacement.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          )}

          {plantSchedule.length > 0 && (
            <div className="layout-plant-counts">
              <span>Your exact quantities</span>
              <ul>
                {plantSchedule.map(({ plant, count }) =>
                  plant ? (
                    <li key={plant.id}>
                      <strong>{count}×</strong>
                      <span>{plant.name}</span>
                    </li>
                  ) : null,
                )}
              </ul>
            </div>
          )}
        </aside>
      </div>

      <footer className="layout-planner-note">
        <strong>
          {plan.plantZones.length || plan.placements.length
            ? "Your controlled layout will guide the first concept."
            : "You can skip these controls."}
        </strong>
        <span>
          {plan.plantZones.length || plan.placements.length
            ? "The house and unmarked areas will be preserved as closely as possible."
            : "Without marks, AI will propose a clean, restrained layout using your selections."}
        </span>
      </footer>
    </section>
  );
}
