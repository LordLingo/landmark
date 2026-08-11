import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 300;

const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
const requestWindow = 6 * 60 * 60 * 1000;
const requestLimit = 3;
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

  if (image.size > 4 * 1024 * 1024) {
    return NextResponse.json(
      {
        error:
          "The optimized yard photo is still too large. Please choose a smaller image.",
      },
      { status: 413 },
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
  const prompt = [
    "Create a photorealistic residential landscape design inspiration concept by editing this exact homeowner photo.",
    "Preserve the house architecture, roof, windows, doors, driveway, street, camera position, perspective, lighting direction, neighboring structures, and all hardscape that was not specifically requested.",
    `Property context: ${city || "North Texas"}. Project area: ${area || "yard"}.`,
    `Homeowner priorities: ${goals || "a more beautiful, practical yard"}.`,
    `Requested features: ${features || "layered planting and a finished landscape"}.`,
    `Visual direction: ${style || "refined North Texas residential landscape"}.`,
    "PLANT STANDARD: Every newly added plant must be native to the Dallas-Fort Worth area's Blackland Prairie or Cross Timbers ecoregions. This applies to every visual style, including traditional, modern, colorful, and resort-inspired concepts.",
    "Use only species from this approved North Texas native palette:",
    northTexasNativePlantPalette,
    "Choose from the palette according to the visible sun exposure, available mature space, drainage clues, and requested function. Use natural groupings and believable mature sizes. If the requested look normally relies on a non-native ornamental, reproduce its color, texture, or structure with the closest plant from the approved palette instead.",
    "Do not introduce crape myrtle, Bradford pear, boxwood, privet or Ligustrum, Nandina, loropetalum, Japanese holly, Japanese barberry, Japanese honeysuckle, Asian jasmine, liriope or monkey grass, pampas grass, Mexican feathergrass, palms, elephant ears, or other non-native ornamentals.",
    "Make the transformation substantial but buildable, upscale, cohesive, well maintained, and believable for a professional residential landscape installation.",
    "Do not add a swimming pool. Do not add text, logos, labels, people, vehicles, fantasy architecture, impossible grading, or plants blocking doors and windows.",
    "Return one wide landscape-oriented concept image.",
  ].join("\n");

  const openAiForm = new FormData();
  openAiForm.append("model", "gpt-image-2");
  openAiForm.append("image", image, image.name || "yard.jpg");
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
