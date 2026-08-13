import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 300;

const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
const requestWindow = 6 * 60 * 60 * 1000;
const requestLimit = 6;
const requestsByVisitor = new Map<string, number[]>();

const northTexasNativePlantPalette = [
  "Canopy trees: cedar elm (Ulmus crassifolia), bur oak (Quercus macrocarpa), chinkapin oak (Quercus muehlenbergii), escarpment live oak (Quercus fusiformis), Shumard oak (Quercus shumardii), Texas red oak (Quercus buckleyi), and pecan (Carya illinoinensis).",
  "Small trees: Eve's necklace (Styphnolobium affine), Mexican plum (Prunus mexicana), eastern or Texas redbud (Cercis canadensis), and rusty blackhaw viburnum (Viburnum rufidulum).",
  "Shrubs: American beautyberry (Callicarpa americana) and coralberry (Symphoricarpos orbiculatus).",
  "Flowering perennials: black-eyed Susan (Rudbeckia hirta), butterfly milkweed (Asclepias tuberosa), fall aster (Symphyotrichum oblongifolium), four-nerve daisy (Tetraneuris scaposa), Indian blanket (Gaillardia pulchella), blue mistflower (Conoclinium coelestinum), mealy blue sage (Salvia farinacea), beebalm (Monarda fistulosa), Engelmann's daisy (Engelmannia peristenia), frostweed (Verbesina virginica), Mexican hat (Ratibida columnifera), prairie penstemon (Penstemon cobaea), prairie verbena (Glandularia bipinnatifida), rattlesnake master (Eryngium yuccifolium), and Texas blazing star (Liatris punctata).",
  "Grasses and sedges: little bluestem (Schizachyrium scoparium), buffalograss (Bouteloua dactyloides), Indiangrass (Sorghastrum nutans), eastern gamagrass (Tripsacum dactyloides), Texas bluegrass (Poa arachnifera), sideoats grama (Bouteloua curtipendula), inland sea oats (Chasmanthium latifolium), and switchgrass (Panicum virgatum).",
  "Groundcovers and vines: frogfruit (Phyla nodiflora), golden groundsel (Packera obovata), horseherb (Calyptocarpus vialis), coral honeysuckle (Lonicera sempervirens), and Virginia creeper (Parthenocissus quinquefolia).",
].join("\n");

function clean(value: FormDataEntryValue | null, maxLength = 500) {
  return typeof value === "string"
    ? value.replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, maxLength)
    : "";
}

function visitorCanGenerate(key: string) {
  const now = Date.now();
  const recent = (requestsByVisitor.get(key) ?? []).filter(
    (timestamp) => now - timestamp < requestWindow,
  );
  if (recent.length >= requestLimit) return false;
  recent.push(now);
  requestsByVisitor.set(key, recent);
  return true;
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        code: "visualizer_not_configured",
        error: "The visualizer is not configured yet.",
      },
      { status: 503 },
    );
  }

  const formData = await request.formData();
  const image = formData.get("image");
  const mask = formData.get("mask");
  const mode = clean(formData.get("mode"), 20);
  const email = clean(formData.get("email"), 180).toLowerCase();
  const phone = clean(formData.get("phone"), 40);
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0];
  const visitorKey = `${forwardedFor ?? "unknown"}:${email}`;

  if (!(image instanceof File) || !allowedTypes.has(image.type)) {
    return NextResponse.json(
      { error: "Please upload a JPG, PNG or WebP yard photo." },
      { status: 400 },
    );
  }

  if (image.size > 12 * 1024 * 1024) {
    return NextResponse.json(
      {
        error:
          "The optimized yard image is still too large. Please choose a smaller image.",
      },
      { status: 413 },
    );
  }

  if (mode === "refine" && !(mask instanceof File)) {
    return NextResponse.json(
      { error: "The selected edit areas could not be read. Please mark them again." },
      { status: 400 },
    );
  }

  if (
    mask instanceof File &&
    (mask.type !== "image/png" || mask.size > 12 * 1024 * 1024)
  ) {
    return NextResponse.json(
      { error: "The selected edit areas could not be read. Please mark them again." },
      { status: 400 },
    );
  }

  if (!email.includes("@") || phone.length < 7) {
    return NextResponse.json(
      { error: "Valid contact details are required." },
      { status: 400 },
    );
  }

  if (!visitorCanGenerate(visitorKey)) {
    return NextResponse.json(
      {
        error:
          "You have created several concepts recently. Please save the current result or ask Landmark to continue the design with you.",
      },
      { status: 429 },
    );
  }

  const city = clean(formData.get("city"), 80);
  const area = clean(formData.get("area"), 120);
  const goals = clean(formData.get("goals"), 500);
  const features = clean(formData.get("features"), 500);
  const style = clean(formData.get("style"), 120);
  const preferences = clean(formData.get("preferences"), 500);
  const plantSelections = clean(formData.get("plantSelections"), 1000);
  const notes = clean(formData.get("notes"), 1200);
  const layout = clean(formData.get("layout"), 8000);
  const density = clean(formData.get("density"), 30) || "restrained";
  const flowerLevel = clean(formData.get("flowerLevel"), 30) || "accents";
  const bedLineStyle = clean(formData.get("bedLineStyle"), 40) || "soft-curves";
  const placements = clean(formData.get("placements"), 8000);
  const instruction = clean(formData.get("instruction"), 1200);
  const densityRule =
    density === "lush"
      ? "PLANTING DENSITY: Full and layered, but organized into a few intentional masses with visible mulch or breathing room between groups. Never create a random wildflower meadow."
      : density === "balanced"
        ? "PLANTING DENSITY: Balanced and edited. Use clear shrub and grass structure, controlled repetition, and roughly 30–40% visible open lawn, mulch, or negative space in editable landscape areas."
        : "PLANTING DENSITY: Clean and restrained. Prioritize green shrubs and grasses, use fewer larger masses, and retain roughly 45–55% visible open lawn, mulch, or negative space in editable landscape areas. Do not fill every gap with a plant.";
  const flowerRule =
    flowerLevel === "none"
      ? "FLOWER LIMIT: Add no new flowering plants. Use green native shrubs, grasses, groundcovers, stone, lawn, and mulch for interest."
      : flowerLevel === "colorful"
        ? "FLOWER LIMIT: Seasonal flowers may occupy at most 25–30% of the new plant mass. Keep them in a few repeated, intentional groups; do not create ribbons of mixed flowers or wall-to-wall blooms."
        : "FLOWER LIMIT: Flowers are accents only—at most 10–15% of the new plant mass and no more than 3–5 small repeated groups in the entire view. The design must read primarily as green structure, lawn, mulch, shrubs, and grasses.";
  const plantRules = [
    "PLANT STANDARD: Every newly added plant must be native to the Dallas-Fort Worth area's Blackland Prairie or Cross Timbers ecoregions. This applies to every visual style, including traditional, modern, colorful, and resort-inspired concepts.",
    "Use only species from this approved North Texas native palette:",
    northTexasNativePlantPalette,
    "Choose from the palette according to the visible sun exposure, available mature space, drainage clues, and requested function. Use natural groupings and believable mature sizes. If the requested look normally relies on a non-native ornamental, reproduce its color, texture, or structure with the closest plant from the approved palette instead.",
    "Do not introduce crape myrtle, Bradford pear, boxwood, privet or Ligustrum, Nandina, loropetalum, Japanese holly, Japanese barberry, Japanese honeysuckle, Asian jasmine, liriope or monkey grass, pampas grass, Mexican feathergrass, palms, elephant ears, or other non-native ornamentals.",
    densityRule,
    flowerRule,
    `BED EDGE: Use ${bedLineStyle.replace(/-/g, " ")} bed lines where new beds are requested.`,
    "Make the transformation appropriate to the homeowner's chosen density, buildable, upscale, cohesive, well maintained, and believable for a professional residential landscape installation.",
    "Do not add a swimming pool. Do not add text, logos, labels, people, vehicles, fantasy architecture, impossible grading, or plants blocking doors and windows.",
  ];
  const prompt =
    mode === "refine"
      ? [
          "Refine this existing residential landscape concept using the supplied edit mask and the homeowner's exact placement decisions.",
          "The transparent mask regions are the only areas allowed to change. Preserve every pixel and recognizable detail outside those regions as closely as possible, including the house, roof, windows, doors, driveway, street, camera, perspective, lighting, lawn and finished landscaping.",
          "Blend the requested plants and changes photorealistically into the marked locations. The placement coordinates are percentages measured from the left and top of the image. Treat them as deliberate final positions, not suggestions.",
          "For a move or resize action, remove the plant from its old coordinates and render it at the new coordinates. For a remove action, restore a natural continuation of the bed, lawn or background at that location.",
          `Homeowner instruction: ${instruction || "Blend the marked native plants naturally into the selected areas."}`,
          `Placement plan: ${placements || "No named placement plan supplied; follow the edit mask."}`,
          "If the placement plan contains an action named move-existing, remove the visible plant or landscape object at FROM and recreate that same kind of item at TO. If it contains remove-area, remove landscaping inside that marked circle and continue the surrounding lawn, mulch, or bed naturally. Do not replace removed flowers with more flowers unless explicitly requested.",
          `Property context: ${city || "North Texas"}. Project area: ${area || "yard"}.`,
          `Visual direction: ${style || "refined North Texas residential landscape"}.`,
          preferences ? `Plant priorities: ${preferences}.` : "",
          plantSelections ? `Homeowner-selected plants: ${plantSelections}.` : "",
          notes ? `Keep/avoid notes: ${notes}.` : "",
          ...plantRules,
          "Return one wide landscape-oriented concept image with no labels or placement markers.",
        ]
          .filter(Boolean)
          .join("\n")
      : [
          "Create a photorealistic residential landscape design inspiration concept by editing this exact homeowner photo.",
          "Preserve the house architecture, roof, windows, doors, driveway, street, camera position, perspective, lighting direction, neighboring structures, and all hardscape that was not specifically requested.",
          mask instanceof File
            ? "A homeowner layout mask is supplied. Transparent mask regions are the only areas where planting or bed changes are allowed. Preserve opaque areas as closely as possible. Do not extend landscaping beyond the marked planting zones."
            : "No planting-zone mask was supplied, so propose a modest, clean arrangement that leaves generous lawn and visual breathing room.",
          layout
            ? `HOMEOWNER-CONTROLLED LAYOUT (coordinates are percentages from left and top): ${layout}. Treat every exactPlants marker as one deliberately placed plant and do not add extra plants of those named species beyond the number of markers. Protected zones must remain visibly unchanged.`
            : "No exact plant markers were supplied.",
          `Property context: ${city || "North Texas"}. Project area: ${area || "yard"}.`,
          `Homeowner priorities: ${goals || "a more beautiful, practical yard"}.`,
          `Requested features: ${features || "layered planting and a finished landscape"}.`,
          `Visual direction: ${style || "refined North Texas residential landscape"}.`,
          preferences ? `Plant priorities: ${preferences}.` : "",
          plantSelections
            ? `Use these homeowner-selected plants only where site conditions, marked zones, chosen flower limit, and mature space allow: ${plantSelections}. If exact plant markers are supplied, their marked count and positions take priority.`
            : "",
          notes ? `Homeowner keep/avoid notes: ${notes}.` : "",
          ...plantRules,
          "Return one wide landscape-oriented concept image.",
        ]
          .filter(Boolean)
          .join("\n");

  const openAiForm = new FormData();
  openAiForm.append("model", "gpt-image-2");
  openAiForm.append("image", image, image.name || "yard.jpg");
  if (mask instanceof File) {
    openAiForm.append("mask", mask, mask.name || "yard-mask.png");
  }
  openAiForm.append("prompt", prompt);
  openAiForm.append("quality", "medium");
  openAiForm.append("size", "1536x1024");
  openAiForm.append("output_format", "webp");
  openAiForm.append("output_compression", "84");
  openAiForm.append("n", "1");

  try {
    const response = await fetch("https://api.openai.com/v1/images/edits", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      body: openAiForm,
      signal: AbortSignal.timeout(240_000),
    });

    const result = (await response.json()) as {
      data?: Array<{ b64_json?: string; url?: string }>;
      error?: { message?: string };
    };

    if (!response.ok) {
      console.error("OpenAI image edit failed", response.status, result.error);
      return NextResponse.json(
        {
          error:
            "The image service could not create this concept right now. Please try a different photo or continue with Landmark.",
        },
        { status: response.status >= 500 ? 502 : 400 },
      );
    }

    const output = result.data?.[0];
    const imageUrl = output?.b64_json
      ? `data:image/webp;base64,${output.b64_json}`
      : output?.url;

    if (!imageUrl) {
      return NextResponse.json(
        { error: "The image service returned no concept." },
        { status: 502 },
      );
    }

    return NextResponse.json(
      { image: imageUrl },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  } catch (error) {
    console.error("Visualizer request failed", error);
    return NextResponse.json(
      {
        error:
          "The concept took too long to create. Your yard brief is safe—please try again.",
      },
      { status: 504 },
    );
  }
}
