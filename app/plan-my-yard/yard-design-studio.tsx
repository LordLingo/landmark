"use client";

/* eslint-disable @next/next/no-img-element */
import {
  PointerEvent as ReactPointerEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { describePlants, yardPlants } from "./plant-library";

type StudioMode = "plants" | "change" | "keep";

type Placement = {
  id: string;
  plantId: string;
  x: number;
  y: number;
  scale: number;
  renderedX?: number;
  renderedY?: number;
  renderedScale?: number;
};

type BrushMark = {
  id: string;
  x: number;
  y: number;
  size: number;
};

type StudioContext = {
  city: string;
  area: string[];
  goals: string[];
  features: string[];
  style: string;
  notes: string;
  plantPreferences: string[];
  selectedPlantIds: string[];
};

type StudioContact = {
  name: string;
  email: string;
  phone: string;
};

type Props = {
  image: string;
  context: StudioContext;
  contact: StudioContact;
  onImageChange: (image: string) => void;
};

const quickChanges = [
  "Use lower-maintenance native planting",
  "Add more seasonal color",
  "Remove what is inside the marked area",
  "Create cleaner, more graceful bed lines",
  "Add warm, subtle landscape lighting",
  "Show the marked planting at realistic 3–5 year maturity",
  "Show a freshly installed one-year planting view",
];

const clamp = (value: number, min = 3, max = 97) =>
  Math.min(max, Math.max(min, value));

function moved(placement: Placement) {
  if (placement.renderedX === undefined || placement.renderedY === undefined) {
    return true;
  }

  return (
    Math.abs(placement.x - placement.renderedX) > 0.2 ||
    Math.abs(placement.y - placement.renderedY) > 0.2 ||
    Math.abs(placement.scale - (placement.renderedScale ?? 1)) > 0.02
  );
}

function uniqueId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export default function YardDesignStudio({
  image,
  context,
  contact,
  onImageChange,
}: Props) {
  const [mode, setMode] = useState<StudioMode>("plants");
  const [placements, setPlacements] = useState<Placement[]>([]);
  const [removedPlacements, setRemovedPlacements] = useState<Placement[]>([]);
  const [selectedPlacementId, setSelectedPlacementId] = useState("");
  const [editMarks, setEditMarks] = useState<BrushMark[]>([]);
  const [keepMarks, setKeepMarks] = useState<BrushMark[]>([]);
  const [brushSize, setBrushSize] = useState(12);
  const [instruction, setInstruction] = useState(quickChanges[0]);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [isRendering, setIsRendering] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState("");
  const [versions, setVersions] = useState([image]);
  const [versionIndex, setVersionIndex] = useState(0);
  const [renderCount, setRenderCount] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const draggingId = useRef("");
  const drawing = useRef(false);
  const lastImage = useRef(image);

  useEffect(() => {
    if (image === lastImage.current) return;
    lastImage.current = image;
    setVersions((current) => {
      const existingIndex = current.indexOf(image);
      if (existingIndex >= 0) {
        setVersionIndex(existingIndex);
        return current;
      }
      setVersionIndex(current.length);
      return [...current, image];
    });
  }, [image]);

  const filteredPlants = useMemo(() => {
    const query = search.trim().toLowerCase();
    return yardPlants.filter(
      (plant) =>
        (category === "All" || plant.category === category) &&
        (!query ||
          plant.name.toLowerCase().includes(query) ||
          plant.tags.some((tag) => tag.includes(query))),
    );
  }, [category, search]);

  const selectedPlacement = placements.find(
    (placement) => placement.id === selectedPlacementId,
  );
  const selectedPlant = selectedPlacement
    ? yardPlants.find((plant) => plant.id === selectedPlacement.plantId)
    : undefined;
  const placementSchedule = useMemo(() => {
    const counts = new Map<string, number>();
    for (const placement of placements) {
      counts.set(placement.plantId, (counts.get(placement.plantId) ?? 0) + 1);
    }
    return [...counts.entries()].map(([plantId, count]) => ({
      plant: yardPlants.find((plant) => plant.id === plantId),
      count,
    }));
  }, [placements]);
  const hasPendingChanges =
    editMarks.length > 0 ||
    removedPlacements.length > 0 ||
    placements.some(moved);

  function pointFromEvent(event: ReactPointerEvent<HTMLElement>) {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return { x: 50, y: 55 };
    return {
      x: clamp(((event.clientX - rect.left) / rect.width) * 100),
      y: clamp(((event.clientY - rect.top) / rect.height) * 100),
    };
  }

  function addPlant(plantId: string) {
    const offset = placements.length % 5;
    const placement: Placement = {
      id: uniqueId("plant"),
      plantId,
      x: 34 + offset * 8,
      y: 66 + (offset % 2) * 7,
      scale: 1,
    };
    setPlacements((current) => [...current, placement]);
    setSelectedPlacementId(placement.id);
    setMode("plants");
    setStatus("Plant added. Drag it to the exact location you want.");
  }

  function updatePlacement(id: string, changes: Partial<Placement>) {
    setPlacements((current) =>
      current.map((placement) =>
        placement.id === id ? { ...placement, ...changes } : placement,
      ),
    );
  }

  function removePlacement(id: string) {
    setPlacements((current) => {
      const placement = current.find((item) => item.id === id);
      if (placement?.renderedX !== undefined) {
        setRemovedPlacements((removed) => [...removed, placement]);
      }
      return current.filter((item) => item.id !== id);
    });
    setSelectedPlacementId("");
  }

  function duplicatePlacement(placement: Placement) {
    const duplicate: Placement = {
      ...placement,
      id: uniqueId("plant"),
      x: clamp(placement.x + 7),
      y: clamp(placement.y + 4),
      renderedX: undefined,
      renderedY: undefined,
      renderedScale: undefined,
    };
    setPlacements((current) => [...current, duplicate]);
    setSelectedPlacementId(duplicate.id);
  }

  function startDragging(
    event: ReactPointerEvent<HTMLButtonElement>,
    placementId: string,
  ) {
    if (mode !== "plants") return;
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);
    draggingId.current = placementId;
    setSelectedPlacementId(placementId);
  }

  function drawMark(event: ReactPointerEvent<HTMLElement>) {
    if (mode === "plants") return;
    const point = pointFromEvent(event);
    const mark: BrushMark = {
      id: uniqueId(mode),
      ...point,
      size: brushSize,
    };
    if (mode === "change") {
      setEditMarks((current) => [...current, mark]);
    } else {
      setKeepMarks((current) => [...current, mark]);
    }
  }

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (mode === "plants") return;
    event.currentTarget.setPointerCapture(event.pointerId);
    drawing.current = true;
    drawMark(event);
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (draggingId.current) {
      const point = pointFromEvent(event);
      updatePlacement(draggingId.current, point);
      return;
    }
    if (drawing.current) drawMark(event);
  }

  function handlePointerUp() {
    draggingId.current = "";
    drawing.current = false;
  }

  function moveWithKeyboard(
    event: React.KeyboardEvent<HTMLButtonElement>,
    placement: Placement,
  ) {
    const amount = event.shiftKey ? 3 : 1;
    const changes: Partial<Placement> = {};
    if (event.key === "ArrowLeft") changes.x = clamp(placement.x - amount);
    if (event.key === "ArrowRight") changes.x = clamp(placement.x + amount);
    if (event.key === "ArrowUp") changes.y = clamp(placement.y - amount);
    if (event.key === "ArrowDown") changes.y = clamp(placement.y + amount);
    if (event.key === "Delete" || event.key === "Backspace") {
      event.preventDefault();
      removePlacement(placement.id);
      return;
    }
    if (Object.keys(changes).length) {
      event.preventDefault();
      updatePlacement(placement.id, changes);
    }
  }

  async function prepareRefinementFiles() {
    const source = await fetch(image);
    const sourceBlob = await source.blob();
    const bitmap = await createImageBitmap(sourceBlob);
    const width = bitmap.width;
    const height = bitmap.height;

    const baseCanvas = document.createElement("canvas");
    baseCanvas.width = width;
    baseCanvas.height = height;
    baseCanvas.getContext("2d")?.drawImage(bitmap, 0, 0, width, height);
    bitmap.close();

    const maskCanvas = document.createElement("canvas");
    maskCanvas.width = width;
    maskCanvas.height = height;
    const mask = maskCanvas.getContext("2d");
    if (!mask) throw new Error("The design mask could not be prepared.");
    mask.fillStyle = "rgba(255,255,255,1)";
    mask.fillRect(0, 0, width, height);

    const eraseCircle = (x: number, y: number, size: number) => {
      mask.globalCompositeOperation = "destination-out";
      mask.beginPath();
      mask.ellipse(
        (x / 100) * width,
        (y / 100) * height,
        (size / 200) * width,
        (size / 200) * height,
        0,
        0,
        Math.PI * 2,
      );
      mask.fill();
    };

    for (const placement of placements.filter(moved)) {
      const plant = yardPlants.find((item) => item.id === placement.plantId);
      const baseSize = plant?.category === "Small tree" ? 24 : plant?.category === "Shrub" ? 17 : 12;
      if (placement.renderedX !== undefined && placement.renderedY !== undefined) {
        eraseCircle(
          placement.renderedX,
          placement.renderedY,
          baseSize * (placement.renderedScale ?? 1),
        );
      }
      eraseCircle(placement.x, placement.y, baseSize * placement.scale);
    }

    for (const placement of removedPlacements) {
      eraseCircle(
        placement.renderedX ?? placement.x,
        placement.renderedY ?? placement.y,
        18 * (placement.renderedScale ?? placement.scale),
      );
    }
    for (const mark of editMarks) eraseCircle(mark.x, mark.y, mark.size);

    mask.globalCompositeOperation = "source-over";
    mask.fillStyle = "rgba(255,255,255,1)";
    for (const mark of keepMarks) {
      mask.beginPath();
      mask.ellipse(
        (mark.x / 100) * width,
        (mark.y / 100) * height,
        (mark.size / 200) * width,
        (mark.size / 200) * height,
        0,
        0,
        Math.PI * 2,
      );
      mask.fill();
    }

    const toBlob = (canvas: HTMLCanvasElement) =>
      new Promise<Blob>((resolve, reject) =>
        canvas.toBlob(
          (blob) => (blob ? resolve(blob) : reject(new Error("Image preparation failed."))),
          "image/png",
        ),
      );

    return {
      base: new File([await toBlob(baseCanvas)], "yard-concept.png", {
        type: "image/png",
      }),
      mask: new File([await toBlob(maskCanvas)], "yard-mask.png", {
        type: "image/png",
      }),
    };
  }

  async function renderRefinement() {
    if (!hasPendingChanges) {
      setStatus("Add or move a plant, or brush an area you want changed first.");
      return;
    }

    setIsRendering(true);
    setStatus("Preparing your exact placements for a realistic update…");

    try {
      const files = await prepareRefinementFiles();
      const placementPlan = placements.map((placement) => {
        const plant = yardPlants.find((item) => item.id === placement.plantId);
        return {
          name: plant?.name,
          category: plant?.category,
          matureHeight: plant?.height,
          matureSpread: plant?.spread,
          x: Math.round(placement.x),
          y: Math.round(placement.y),
          scale: placement.scale,
          action: placement.renderedX === undefined ? "add" : moved(placement) ? "move or resize" : "keep",
          from:
            placement.renderedX === undefined
              ? undefined
              : {
                  x: Math.round(placement.renderedX),
                  y: Math.round(placement.renderedY ?? placement.y),
                },
        };
      });
      const removedPlan = removedPlacements.map((placement) => {
        const plant = yardPlants.find((item) => item.id === placement.plantId);
        return {
          name: plant?.name,
          action: "remove",
          x: Math.round(placement.renderedX ?? placement.x),
          y: Math.round(placement.renderedY ?? placement.y),
        };
      });

      const formData = new FormData();
      formData.append("image", files.base);
      formData.append("mask", files.mask);
      formData.append("mode", "refine");
      formData.append("city", context.city);
      formData.append("area", context.area.join(", "));
      formData.append("goals", context.goals.join(", "));
      formData.append("features", context.features.join(", "));
      formData.append("style", context.style);
      formData.append("notes", context.notes);
      formData.append("preferences", context.plantPreferences.join(", "));
      formData.append("plantSelections", describePlants(context.selectedPlantIds));
      formData.append("placements", JSON.stringify([...placementPlan, ...removedPlan]));
      formData.append("instruction", instruction);
      formData.append("name", contact.name);
      formData.append("email", contact.email);
      formData.append("phone", contact.phone);

      const response = await fetch("/api/visualize-yard", {
        method: "POST",
        body: formData,
      });
      const result = (await response.json()) as { image?: string; error?: string };
      if (!response.ok || !result.image) {
        throw new Error(result.error || "The realistic update could not be created.");
      }

      const nextImage = result.image;
      setPlacements((current) =>
        current.map((placement) => ({
          ...placement,
          renderedX: placement.x,
          renderedY: placement.y,
          renderedScale: placement.scale,
        })),
      );
      setRemovedPlacements([]);
      setEditMarks([]);
      setKeepMarks([]);
      setRenderCount((count) => count + 1);
      onImageChange(nextImage);
      setStatus("Your placements are blended into a new realistic version. You can keep editing.");
    } catch (error) {
      setStatus(
        error instanceof Error
          ? error.message
          : "The realistic update could not be created right now.",
      );
    } finally {
      setIsRendering(false);
    }
  }

  async function sendDesignToLandmark() {
    setIsSending(true);
    try {
      const response = await fetch("/api/yard-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...contact,
          ...context,
          designPlants: placements.map((placement) => {
            const plant = yardPlants.find((item) => item.id === placement.plantId);
            return `${plant?.name ?? "Native plant"} at ${Math.round(placement.x)}% across / ${Math.round(placement.y)}% down`;
          }),
          selectedPlants: describePlants(context.selectedPlantIds),
          designInstruction: instruction,
          designVersion: versionIndex + 1,
          source: "Landmark Yard Design Studio",
        }),
      });
      if (!response.ok) throw new Error("The design summary could not be sent.");
      setStatus("This version's plant choices and placement summary were sent to Landmark.");
    } catch (error) {
      setStatus(
        error instanceof Error
          ? error.message
          : "The design summary could not be sent.",
      );
    } finally {
      setIsSending(false);
    }
  }

  function showVersion(index: number) {
    const nextIndex = Math.min(versions.length - 1, Math.max(0, index));
    setVersionIndex(nextIndex);
    onImageChange(versions[nextIndex]);
    setStatus(`Showing design version ${nextIndex + 1}.`);
  }

  return (
    <section className="yard-design-studio" aria-labelledby="design-studio-title">
      <header className="design-studio-heading">
        <div>
          <p className="eyebrow">Your interactive design studio</p>
          <h3 id="design-studio-title">Now make the yard feel like yours.</h3>
          <p>
            Add real North Texas plants, drag them into position, mark areas to
            change or protect, then ask AI to blend your decisions naturally.
          </p>
        </div>
        <div className="design-version-controls" aria-label="Design versions">
          <button
            type="button"
            onClick={() => showVersion(versionIndex - 1)}
            disabled={versionIndex === 0}
          >
            ← Previous
          </button>
          <span>
            Version {versionIndex + 1} of {versions.length}
          </span>
          <button
            type="button"
            onClick={() => showVersion(versionIndex + 1)}
            disabled={versionIndex === versions.length - 1}
          >
            Next →
          </button>
        </div>
      </header>

      <div className="design-studio-layout">
        <aside className="design-tool-panel">
          <div className="design-mode-tabs" role="tablist" aria-label="Design tools">
            {([
              ["plants", "Place plants"],
              ["change", "Change an area"],
              ["keep", "Protect an area"],
            ] as Array<[StudioMode, string]>).map(([value, label]) => (
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

          {mode === "plants" ? (
            <>
              <div className="plant-search-row">
                <input
                  type="search"
                  aria-label="Search plants"
                  placeholder="Search color, shade, pollinator…"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
                <select
                  aria-label="Plant category"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                >
                  <option>All</option>
                  <option>Small tree</option>
                  <option>Shrub</option>
                  <option>Flower</option>
                  <option>Grass</option>
                  <option>Groundcover</option>
                  <option>Vine</option>
                </select>
              </div>
              <div className="plant-library" aria-label="North Texas native plants">
                {filteredPlants.map((plant) => (
                  <article className="plant-library-card" key={plant.id}>
                    <span
                      className="plant-card-symbol"
                      style={{ "--plant-color": plant.markerColor } as React.CSSProperties}
                      aria-hidden="true"
                    >
                      {plant.glyph}
                    </span>
                    <div>
                      <strong>{plant.name}</strong>
                      <small>{plant.category} · {plant.height}</small>
                      <span>{plant.sun} · {plant.water} water</span>
                    </div>
                    <button type="button" onClick={() => addPlant(plant.id)}>
                      Add
                    </button>
                  </article>
                ))}
              </div>
            </>
          ) : (
            <div className="brush-controls">
              <strong>
                {mode === "change"
                  ? "Brush over what should change"
                  : "Brush over what must stay untouched"}
              </strong>
              <p>
                Use your mouse or finger directly on the image. Multiple strokes
                can cover a larger area.
              </p>
              <label>
                Brush size
                <input
                  type="range"
                  min="5"
                  max="24"
                  value={brushSize}
                  onChange={(event) => setBrushSize(Number(event.target.value))}
                />
              </label>
              <button
                type="button"
                onClick={() =>
                  mode === "change" ? setEditMarks([]) : setKeepMarks([])
                }
              >
                Clear {mode === "change" ? "change" : "protected"} marks
              </button>
            </div>
          )}

          {selectedPlacement && selectedPlant && (
            <div className="selected-plant-controls">
              <span>Selected plant</span>
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

          {placementSchedule.length > 0 && (
            <div className="design-plant-schedule">
              <div>
                <span>Your working plant list</span>
                <strong>{placements.length} placed</strong>
              </div>
              <ul>
                {placementSchedule.map(({ plant, count }) =>
                  plant ? (
                    <li key={plant.id}>
                      <span>{count}×</span>
                      <div>
                        <strong>{plant.name}</strong>
                        <small>{plant.height} · {plant.sun}</small>
                      </div>
                    </li>
                  ) : null,
                )}
              </ul>
              <small>
                Landmark will confirm final quantities, spacing, utilities and
                availability before installation.
              </small>
            </div>
          )}
        </aside>

        <div className="design-canvas-column">
          <div
            className={`yard-design-canvas is-${mode}`}
            ref={stageRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            <img src={image} alt="Your current editable yard concept" draggable={false} />
            {editMarks.map((mark) => (
              <span
                className="design-brush-mark is-change"
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
            {keepMarks.map((mark) => (
              <span
                className="design-brush-mark is-keep"
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
            {placements.map((placement) => {
              const plant = yardPlants.find((item) => item.id === placement.plantId);
              if (!plant) return null;
              return (
                <button
                  type="button"
                  className={`plant-placement${selectedPlacementId === placement.id ? " is-selected" : ""}`}
                  style={
                    {
                      left: `${placement.x}%`,
                      top: `${placement.y}%`,
                      "--plant-scale": placement.scale,
                      "--plant-color": plant.markerColor,
                    } as React.CSSProperties
                  }
                  aria-label={`${plant.name}. Drag to move; arrow keys also move it.`}
                  onPointerDown={(event) => startDragging(event, placement.id)}
                  onKeyDown={(event) => moveWithKeyboard(event, placement)}
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
            {isRendering && (
              <div className="design-rendering" aria-live="polite">
                <i />
                <strong>Making your choices look real…</strong>
                <span>The home and untouched areas stay protected.</span>
              </div>
            )}
            <div className="design-canvas-legend" aria-hidden="true">
              <span><i className="is-change" /> Change</span>
              <span><i className="is-keep" /> Keep</span>
            </div>
          </div>

          <div className="design-refine-panel">
            <div>
              <span>Tell the designer what should happen in marked areas</span>
              <div className="quick-change-options">
                {quickChanges.map((change) => (
                  <button
                    type="button"
                    className={instruction === change ? "is-selected" : ""}
                    onClick={() => setInstruction(change)}
                    key={change}
                  >
                    {change}
                  </button>
                ))}
              </div>
              <textarea
                rows={3}
                value={instruction}
                onChange={(event) => setInstruction(event.target.value)}
                aria-label="Custom design instructions"
                placeholder="For example: replace these yellow flowers with purple blooms…"
              />
            </div>
            <div className="design-refine-actions">
              <button
                className="button"
                type="button"
                onClick={renderRefinement}
                disabled={isRendering || !hasPendingChanges}
              >
                {isRendering ? "Creating realistic version…" : "Make my changes look real"}
                <span>✦</span>
              </button>
              <button
                type="button"
                onClick={sendDesignToLandmark}
                disabled={isSending}
              >
                {isSending ? "Sending…" : "Send this plant plan to Landmark"}
              </button>
              <small>
                {renderCount
                  ? `${renderCount} custom revision${renderCount === 1 ? "" : "s"} created this visit.`
                  : "Your original concept remains saved as Version 1."}
              </small>
            </div>
          </div>

          {status && <p className="design-studio-status" aria-live="polite">{status}</p>}
        </div>
      </div>
    </section>
  );
}
