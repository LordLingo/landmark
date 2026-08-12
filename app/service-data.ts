import type { Metadata } from "next";

export type ServiceFeature = {
  title: string;
  copy: string;
};

export type ServiceFaq = {
  question: string;
  answer: string;
};

export type ServicePageData = {
  slug: string;
  navLabel: string;
  shortLabel: string;
  eyebrow: string;
  title: string;
  intro: string;
  metaTitle: string;
  metaDescription: string;
  relatedDescription?: string;
  heroImage: string;
  heroAlt: string;
  detailImage: string;
  detailAlt: string;
  imagePosition?: string;
  detailPosition?: string;
  problemTitle: string;
  problemCopy: string;
  features: ServiceFeature[];
  outcomeTitle: string;
  outcomeCopy: string;
  outcomePoints: string[];
  localSection?: {
    eyebrow: string;
    title: string;
    intro: string;
    items: ServiceFeature[];
  };
  process: ServiceFeature[];
  faqs: ServiceFaq[];
  searchTerms: string[];
  note?: string;
};

export const services: Record<string, ServicePageData> = {
  frontYard: {
    slug: "front-yard-landscaping-prosper-tx",
    navLabel: "Front-yard landscaping",
    shortLabel: "Front yards",
    eyebrow: "Front-yard landscaping · Prosper, Texas",
    title: "Come home to a house that finally feels finished.",
    intro:
      "Landmark designs and installs welcoming front landscapes for Prosper homes—from builder-basic beds to a complete curb-appeal renovation that feels connected to the architecture.",
    metaTitle: "Front Yard Landscaping Prosper, TX",
    metaDescription:
      "Front-yard landscaping in Prosper, TX. Upgrade builder-grade beds with layered planting, stone borders, walkways and a cohesive curb-appeal design.",
    relatedDescription:
      "Transform builder-grade or dated front yards with layered planting, stone borders, walkways and cohesive curb appeal across North Dallas.",
    heroImage: "/images/front-yard-project.webp",
    heroAlt:
      "Completed Landmark front-yard landscaping project at a brick and stone North Texas home",
    detailImage: "/images/front-yard-stone.webp",
    detailAlt:
      "Stone landscape borders and planted front beds completed by Landmark Landscapes",
    problemTitle: "A beautiful house should not arrive at an unfinished yard.",
    problemCopy:
      "New construction often leaves the landscape feeling thin, repetitive or disconnected from the home. Established yards can lose their shape as plants outgrow the original plan. We look at the whole arrival—beds, borders, scale, color, walkways and the view from the street—then create one direction that brings it together.",
    features: [
      {
        title: "A complete arrival plan",
        copy:
          "Bed lines, focal points and planting layers are planned together so the front of the home reads as one composition.",
      },
      {
        title: "Builder-grade upgrades",
        copy:
          "Keep what is working, replace what is not and add the structure, scale and personality the original landscape is missing.",
      },
      {
        title: "Stone-defined beds",
        copy:
          "Natural stone borders give planting a finished edge and connect the landscape to North Texas brick and stone architecture.",
      },
      {
        title: "Texas-aware planting",
        copy:
          "Selections account for sun, exposure, drainage, mature size and the level of care that feels realistic for your household.",
      },
    ],
    outcomeTitle: "Curb appeal is really a feeling of arrival.",
    outcomeCopy:
      "The strongest front yards do more than look improved in a photograph. They guide the eye to the entrance, soften the architecture and make pulling into the driveway feel different every day.",
    outcomePoints: [
      "Layered shrubs, ornamental grasses and seasonal color",
      "Defined beds that stay visually organized as plants mature",
      "A clear connection between the home, walkway and landscape",
      "A maintenance approach discussed before installation",
    ],
    localSection: {
      eyebrow: "Front-yard projects in Prosper",
      title: "Designed for the way Prosper homes are built and lived in.",
      intro:
        "From newer homes in Windsong Ranch and Star Trail to established properties near Gentle Creek and Whitley Place, a strong front-yard plan responds to the home’s scale, North Texas exposure and the way the landscape will mature.",
      items: [
        {
          title: "Builder-grade landscape upgrades",
          copy:
            "Shallow beds and undersized foundation plants can be reshaped into a layered front-yard landscape with stronger focal points, better mature scale and a clearer connection to the entrance.",
        },
        {
          title: "Curb appeal with year-round structure",
          copy:
            "Evergreen shrubs, ornamental grasses, perennials and concentrated seasonal color can keep the front elevation composed even when individual plants are not in bloom.",
        },
        {
          title: "Water, sun + maintenance considered early",
          copy:
            "Planting beds work better when direct sun, reflected heat, irrigation coverage, drainage and the homeowner’s realistic care level shape the design before installation.",
        },
      ],
    },
    process: [
      {
        title: "Walk the property",
        copy:
          "We talk about what feels unfinished, what you want to keep and how you want the front of your home to feel.",
      },
      {
        title: "Build the direction",
        copy:
          "Planting, borders, pathways and related drainage needs are considered as one plan rather than separate add-ons.",
      },
      {
        title: "Install the transformation",
        copy:
          "Landmark completes the approved scope and walks through the finished landscape and care expectations with you.",
      },
    ],
    faqs: [
      {
        question: "Can you improve a builder-grade front landscape?",
        answer:
          "Yes. Landmark can evaluate the existing beds and plants, preserve useful elements and redesign the areas that feel sparse, undersized or disconnected from the home.",
      },
      {
        question: "Will I see the design before installation?",
        answer:
          "Landmark’s process can include a landscape design rendering so you can understand the overall direction before installation begins.",
      },
      {
        question: "Can the plan be designed for lower maintenance?",
        answer:
          "Yes. Plant choices, spacing, bed materials and irrigation needs can be discussed around the amount of seasonal care you actually want.",
      },
      {
        question: "Where does Landmark provide front-yard landscaping?",
        answer:
          "Landmark serves homeowners in Prosper and surrounding North Dallas communities including Celina, Frisco, McKinney and The Colony.",
      },
    ],
    searchTerms: [
      "Front-yard landscaping",
      "Curb-appeal design",
      "Builder-grade upgrades",
      "Prosper TX",
    ],
  },
  flowerBeds: {
    slug: "flower-bed-installation-prosper-tx",
    navLabel: "Flower-bed installation",
    shortLabel: "Flowers + planting",
    eyebrow: "Flower-bed installation · Prosper, Texas",
    title: "Color that looks composed, not complicated.",
    intro:
      "Landmark creates planting beds with shape, rhythm and North Texas staying power—bringing together shrubs, ornamental grasses, perennials, seasonal color and finished edging.",
    metaTitle: "Flower Bed Installation Prosper, TX",
    metaDescription:
      "Flower-bed design and installation in Prosper, TX with shrubs, seasonal color, stone borders and low-maintenance North Texas planting options.",
    relatedDescription:
      "Add layered shrubs, ornamental grasses, perennials and seasonal color selected for North Dallas homes and North Texas conditions.",
    heroImage: "/images/flower-bed-stacked-stone.webp",
    heroAlt:
      "Colorful Landmark planting bed with a stacked natural stone border",
    detailImage: "/images/flower-bed-front-entry.webp",
    detailAlt:
      "Low-maintenance front planting bed with North Texas textures and seasonal color",
    problemTitle: "The goal is not more plants. It is the right layers.",
    problemCopy:
      "A bed can be full and still feel unfinished. Strong planting design considers height, texture, mature size, bloom timing, sun and the home behind it. Landmark creates beds that feel intentional now and have room to become better with time.",
    features: [
      {
        title: "Bed design + reshaping",
        copy:
          "New curves, cleaner proportions and better focal points can make the entire front elevation feel more balanced.",
      },
      {
        title: "Shrubs + structural planting",
        copy:
          "Evergreen structure gives the bed a dependable foundation while softer layers bring movement and personality.",
      },
      {
        title: "Perennials + seasonal color",
        copy:
          "Color is placed where it has the most impact, with options that match your sunlight and preferred care level.",
      },
      {
        title: "Mulch, stone + edging",
        copy:
          "A finished bed surface and defined edge help the planting look polished and make ongoing care easier.",
      },
    ],
    outcomeTitle: "A garden can feel generous without becoming demanding.",
    outcomeCopy:
      "Depending on exposure and site conditions, a North Texas palette may use combinations of dwarf yaupon holly, Texas sage, salvia, lantana, ornamental grasses and seasonal accents. Final selections are made for the actual property—not from a one-size-fits-all list.",
    outcomePoints: [
      "Planting scaled to the home and the mature landscape",
      "Color placed for impact instead of scattered everywhere",
      "A mix of dependable structure and softer seasonal interest",
      "Spacing and care expectations explained before installation",
    ],
    localSection: {
      eyebrow: "Planting beds for North Texas",
      title: "The right flower bed begins with conditions—not a plant list.",
      intro:
        "Prosper flower-bed installation has to account for clay soil, intense afternoon sun, reflected heat, irrigation coverage and sudden winter weather. Landmark builds the palette around the actual exposure and the level of care you want.",
      items: [
        {
          title: "Native + adapted plant options",
          copy:
            "Texas sage, salvia, lantana, dwarf yaupon holly and ornamental grasses are examples of useful North Texas plants, but final choices depend on sunlight, mature size, drainage and design style.",
        },
        {
          title: "Existing flower-bed makeovers",
          copy:
            "Healthy plants can remain while crowded shrubs, weak bed lines and empty focal areas are reorganized into a planting composition that looks intentional instead of patched together.",
        },
        {
          title: "Stone edging, mulch + irrigation",
          copy:
            "A finished border, appropriate bed material and dependable water delivery support the planting after installation and help the entire front or backyard feel complete.",
        },
      ],
    },
    process: [
      {
        title: "Read the conditions",
        copy:
          "Sun, shade, soil, drainage, existing irrigation and the surrounding architecture all influence the planting plan.",
      },
      {
        title: "Choose the feeling",
        copy:
          "Soft and organic, classic Texas or clean and modern—the palette follows the home and your personal style.",
      },
      {
        title: "Plant for the next season",
        copy:
          "Beds are installed with finished materials and straightforward guidance for establishment and ongoing care.",
      },
    ],
    faqs: [
      {
        question: "What makes a flower bed lower maintenance?",
        answer:
          "Appropriate plants, realistic spacing, a strong evergreen structure, effective irrigation and a finished mulch or stone layer can all reduce unnecessary upkeep.",
      },
      {
        question: "Can you redesign existing beds without replacing everything?",
        answer:
          "Often, yes. Healthy plants that fit the new direction can be retained while crowded, misplaced or struggling material is adjusted.",
      },
      {
        question: "Can you add seasonal color?",
        answer:
          "Yes. Seasonal color can be concentrated near entrances, walkways or focal areas where a smaller amount creates a stronger effect.",
      },
      {
        question: "Do you install stone borders with planting beds?",
        answer:
          "Yes. Stone edging and raised borders can be incorporated when they support the design, improve definition and complement the home.",
      },
    ],
    searchTerms: [
      "Flower-bed installation",
      "Planting-bed design",
      "Native + adapted plants",
      "Prosper TX",
    ],
  },
  drainage: {
    slug: "yard-drainage-prosper-tx",
    navLabel: "Yard drainage",
    shortLabel: "Drainage",
    eyebrow: "Yard drainage solutions · Prosper, Texas",
    title: "Give rain somewhere better to go.",
    intro:
      "Standing water, soggy side yards and washed-out beds can keep a beautiful property from feeling usable. Landmark evaluates how water moves, then builds the drainage solution into the landscape.",
    metaTitle: "Yard Drainage Prosper, TX",
    metaDescription:
      "Yard drainage in Prosper, TX for standing water, soggy side yards and washout. Explore French drains, surface drains, downspout routing and grading.",
    relatedDescription:
      "Solve standing water, soggy side yards and runoff with grading, French drains, surface drains and downspout routing across North Dallas.",
    heroImage: "/images/drainage-rock-bed.webp",
    heroAlt:
      "Landmark side-yard landscape using decorative rock and planting around a North Texas home",
    detailImage: "/images/drainage-landscape-bed.webp",
    detailAlt:
      "Finished Landmark landscape bed with river rock near the home",
    imagePosition: "center 58%",
    problemTitle: "Water problems rarely stay in one place.",
    problemCopy:
      "Runoff can leave muddy grass, stressed plants, eroded beds and water collecting near patios or the home. The right answer depends on slope, soil, roof runoff, neighboring grades and where water can discharge safely. That is why the first step is understanding the path—not prescribing one drain for every yard.",
    features: [
      {
        title: "Standing-water assessment",
        copy:
          "We look for low areas, compacted soil, blocked flow, downspout concentration and grading conditions that contribute to repeated wet spots.",
      },
      {
        title: "French-drain options",
        copy:
          "A subsurface collection system may be appropriate where water lingers in turf, along fence lines or beside landscape beds.",
      },
      {
        title: "Surface collection",
        copy:
          "Catch basins, channel drains or other surface solutions may help collect concentrated runoff before it spreads.",
      },
      {
        title: "Downspout routing",
        copy:
          "Roof water can sometimes be carried through underground connections toward an appropriate discharge point away from problem areas.",
      },
    ],
    outcomeTitle: "The best drainage work disappears back into the yard.",
    outcomeCopy:
      "A drainage plan should solve the water problem while respecting the landscape above it. Final solutions may combine drainage components, selective grading, river rock or restored beds and turf based on the property.",
    outcomePoints: [
      "Less standing water in frequently used parts of the yard",
      "Reduced washout around mulch and planting beds",
      "A cleaner relationship between downspouts and the landscape",
      "Restored surfaces that make the completed work feel intentional",
    ],
    localSection: {
      eyebrow: "Drainage solutions in Prosper",
      title: "French drains are one option. The water path decides the answer.",
      intro:
        "Prosper’s clay-heavy soil, concentrated roof runoff and narrow spaces between newer homes can leave soggy side yards and standing water after storms. A site-specific drainage plan starts by identifying where the water enters, collects and can discharge safely.",
      items: [
        {
          title: "French drains + area drains",
          copy:
            "Subsurface French drains and surface catch basins solve different problems. The right system depends on soil saturation, low points, runoff volume and the available route to an appropriate outlet.",
        },
        {
          title: "Downspout drainage",
          copy:
            "Roof runoff can overwhelm a small planting bed or side yard. Underground downspout connections may help carry that concentrated water away from recurring problem areas.",
        },
        {
          title: "Grading + landscape restoration",
          copy:
            "Selective grading, rock channels, turf repair and planting-bed restoration can be coordinated with drainage components so the completed solution works without leaving the yard looking excavated.",
        },
      ],
    },
    process: [
      {
        title: "Trace the water",
        copy:
          "We start with the visible symptoms and follow grade, runoff and collection points across the property.",
      },
      {
        title: "Match the solution",
        copy:
          "The recommendation is based on the yard’s conditions and may use one method or a coordinated combination.",
      },
      {
        title: "Restore the landscape",
        copy:
          "After installation, disturbed areas are finished so the drainage solution supports the yard instead of looking added on.",
      },
    ],
    faqs: [
      {
        question: "Does every wet yard need a French drain?",
        answer:
          "No. A French drain is one option. The correct solution may instead involve surface collection, downspout routing, grading or a combination depending on how water enters and leaves the area.",
      },
      {
        question: "Why does water collect in my side yard?",
        answer:
          "Common contributors include narrow spacing between homes, clay-heavy soil, concentrated roof runoff, settled grades and limited surface slope.",
      },
      {
        question: "Can drainage be added without ruining the landscaping?",
        answer:
          "Drainage installation temporarily disturbs part of the property, but the route and restoration can be planned to protect important features and leave a finished result.",
      },
      {
        question: "Can drainage be included in a larger landscape project?",
        answer:
          "Yes. Addressing drainage before new beds, turf or pathways are installed can protect the larger investment and produce a more cohesive result.",
      },
    ],
    searchTerms: [
      "Yard drainage",
      "French drain installation",
      "Standing-water solutions",
      "Prosper TX",
    ],
  },
  stone: {
    slug: "stone-borders-walkways-prosper-tx",
    navLabel: "Stone borders + walkways",
    shortLabel: "Stone + walkways",
    eyebrow: "Stone borders + walkways · Prosper, Texas",
    title: "Make every step feel intentional.",
    intro:
      "Natural stone borders, pathways and transitions give a landscape structure. Landmark uses them to connect entrances, beds and outdoor spaces—not simply fill the gaps between them.",
    metaTitle: "Stone Borders & Walkways Prosper, TX",
    metaDescription:
      "Stone flower-bed borders, flagstone walkways and garden paths in Prosper, TX. Create cleaner beds and more beautiful transitions around your home.",
    relatedDescription:
      "Give beds and entries a finished edge with natural stone borders, flagstone walkways and garden paths designed for North Dallas homes.",
    heroImage: "/images/stone-walkway-project.webp",
    heroAlt:
      "Landmark patio and walkway project at a North Texas brick home",
    detailImage: "/images/stone-border-entry.webp",
    detailAlt:
      "Landmark stone border and colorful planting beside a residential entry",
    problemTitle: "The transitions are what make a landscape feel designed.",
    problemCopy:
      "A walkway should feel like part of the home. A border should give the planting shape without overpowering it. Material, scale, color, curves and construction all affect whether stonework feels naturally connected—or obviously added later.",
    features: [
      {
        title: "Stone flower-bed borders",
        copy:
          "Defined edges create a clean visual line, contain bed material and add weight that complements brick and stone exteriors.",
      },
      {
        title: "Flagstone walkways",
        copy:
          "A well-planned path makes movement through the landscape feel more comfortable while adding natural texture.",
      },
      {
        title: "Garden pathways",
        copy:
          "Stepping-stone and gravel combinations can create relaxed access through side yards, planting areas and backyard spaces.",
      },
      {
        title: "Patio transitions",
        copy:
          "Stone, pavers and planting can soften the change from architecture to lawn and make separate outdoor areas feel connected.",
      },
    ],
    outcomeTitle: "Structure first. Then let the landscape soften it.",
    outcomeCopy:
      "Strong hardscape details hold the composition together through every season. Planting can move, bloom and mature around a dependable framework of borders, paths and transitions.",
    outcomePoints: [
      "Materials selected to complement the home’s exterior",
      "Curves and proportions planned with the complete yard in mind",
      "Path widths and spacing based on comfortable everyday use",
      "Planting and stonework designed as one connected result",
    ],
    localSection: {
      eyebrow: "Stonework for Prosper landscapes",
      title: "Material, proportion and preparation make stonework feel permanent.",
      intro:
        "Stone edging and walkways are highly visible against Prosper’s brick-and-stone homes. Landmark considers color, thickness, grade, drainage and everyday foot traffic so the hardscape belongs to the architecture and the planting around it.",
      items: [
        {
          title: "Stone flower-bed borders",
          copy:
            "Natural stone edging can define bed lines, retain finished material and give foundation planting enough visual weight to match a larger North Texas home.",
        },
        {
          title: "Flagstone + garden walkways",
          copy:
            "Comfortable spacing, a stable prepared base and a route that follows how people actually move help a flagstone path feel useful instead of decorative only.",
        },
        {
          title: "Drainage-aware transitions",
          copy:
            "Borders and pathways can change how water moves. Existing low spots, downspouts and bed drainage should be understood before masonry creates a new barrier or collection point.",
        },
      ],
    },
    process: [
      {
        title: "Study the connection",
        copy:
          "We look at where people naturally walk, how the home is approached and which bed lines need stronger definition.",
      },
      {
        title: "Select the material",
        copy:
          "Color, texture, thickness and installation style are chosen for the home, landscape and intended use.",
      },
      {
        title: "Build the finish",
        copy:
          "Base preparation, placement and surrounding landscape work come together to make the result feel permanent and complete.",
      },
    ],
    faqs: [
      {
        question: "What stone works well with Prosper homes?",
        answer:
          "The best choice depends on the home’s brick, stone and trim. Buff limestone, Lueders-style tones and other natural materials can work well when their color and scale are coordinated carefully.",
      },
      {
        question: "Can you add a walkway to an existing landscape?",
        answer:
          "Yes. Landmark can plan a new path around existing entrances, beds and important plants, then adjust the surrounding landscape for a finished connection.",
      },
      {
        question: "Are raised stone borders always better?",
        answer:
          "Not always. Raised borders create stronger definition, while lower edging can feel quieter and more natural. The right approach depends on grade, bed depth and the home’s style.",
      },
      {
        question: "Can lighting be incorporated into a walkway?",
        answer:
          "Yes. Path lighting can be coordinated with the walkway and planting plan to improve nighttime comfort and highlight the route without over-lighting it.",
      },
    ],
    searchTerms: [
      "Stone flower-bed edging",
      "Flagstone walkways",
      "Landscape borders",
      "Prosper TX",
    ],
  },
  lighting: {
    slug: "landscape-lighting-prosper-tx",
    navLabel: "Landscape lighting",
    shortLabel: "Lighting",
    eyebrow: "Landscape lighting · Prosper, Texas",
    title: "Your home deserves a second first impression.",
    intro:
      "Landmark designs warm, restrained outdoor lighting that reveals the home’s architecture, gives pathways a comfortable glow and keeps the landscape alive after sunset.",
    metaTitle: "Landscape Lighting Prosper, TX",
    metaDescription:
      "Residential landscape lighting in Prosper, TX including house uplighting, walkway lighting and tree lighting designed for a warm, elegant nighttime look.",
    relatedDescription:
      "Add warm architectural, tree and walkway lighting that gives North Dallas homes depth, visibility and curb appeal after sunset.",
    heroImage: "/images/lighting-warm-home.webp",
    heroAlt:
      "Warm landscape uplighting installed at a North Texas brick home",
    detailImage: "/images/lighting-landscape-bed.webp",
    detailAlt:
      "Landmark landscape lighting highlighting a raised planting bed and backyard tree",
    problemTitle: "Good lighting lets you notice the home—not the fixtures.",
    problemCopy:
      "The difference is restraint. Thoughtful placement creates depth, highlights texture and supports comfortable movement without washing the property in harsh, uniform brightness. Landmark plans the evening view as carefully as the daytime landscape.",
    features: [
      {
        title: "House uplighting",
        copy:
          "Warm beams can reveal brick, stone, columns and architectural depth while keeping the overall composition balanced.",
      },
      {
        title: "Walkway lighting",
        copy:
          "Low, controlled illumination supports safer movement and makes the approach to the home feel more welcoming.",
      },
      {
        title: "Tree + planting accents",
        copy:
          "Selected trees, ornamental grasses and focal beds gain dimension when the light is aimed for shape and texture.",
      },
      {
        title: "A connected lighting plan",
        copy:
          "Front elevation, paths and landscape focal points are considered together so the property has rhythm after dark.",
      },
    ],
    outcomeTitle: "The evening version of home should feel warm, not theatrical.",
    outcomeCopy:
      "A successful plan creates contrast and shadow as well as light. It welcomes guests, makes everyday arrivals more comfortable and lets the best parts of the property remain visible long after dinner.",
    outcomePoints: [
      "Warm architectural emphasis instead of flat brightness",
      "Comfortable light along important steps and pathways",
      "Selected trees and beds used as nighttime focal points",
      "Fixture placement refined around the actual property",
    ],
    localSection: {
      eyebrow: "Outdoor lighting in Prosper",
      title: "Layer the house, paths and landscape instead of lighting everything.",
      intro:
        "A low-voltage landscape-lighting plan can improve curb appeal, nighttime visibility and the feeling of arrival. The strongest result uses restraint—placing light where architecture, trees, walkways and planting create useful depth.",
      items: [
        {
          title: "Architectural uplighting",
          copy:
            "Controlled beams can emphasize stone, brick, columns and rooflines while avoiding the flat, over-bright look created when every surface receives equal light.",
        },
        {
          title: "Path + step lighting",
          copy:
            "Low fixtures near important routes help reveal grade changes and walkway edges while keeping the source of the light quieter than the landscape itself.",
        },
        {
          title: "Tree + planting accents",
          copy:
            "Selected canopy trees, ornamental forms and layered beds can become nighttime focal points that connect the home to the complete front or backyard.",
        },
      ],
    },
    process: [
      {
        title: "See the night view",
        copy:
          "We discuss which parts of the home disappear after sunset and where comfort, beauty or visibility matters most.",
      },
      {
        title: "Plan the layers",
        copy:
          "Architectural light, pathway light and landscape accents are balanced as one composition.",
      },
      {
        title: "Aim + refine",
        copy:
          "After installation, fixture direction and emphasis are adjusted so the final effect feels intentional from the street and the home.",
      },
    ],
    faqs: [
      {
        question: "What is the difference between uplighting and path lighting?",
        answer:
          "Uplighting emphasizes vertical features such as walls, columns and trees. Path lighting places softer light closer to the ground to support movement and reveal nearby planting.",
      },
      {
        question: "Will landscape lighting make my home too bright?",
        answer:
          "It should not. A strong design uses selected focal points, controlled beam direction and areas of natural shadow instead of lighting every surface equally.",
      },
      {
        question: "Can lighting be added to an existing landscape?",
        answer:
          "Yes. Existing architecture, beds, trees and pathways can be evaluated to create a lighting plan without requiring a full landscape redesign.",
      },
      {
        question: "Can lighting be planned with a new landscape?",
        answer:
          "Yes. Coordinating lighting while beds and pathways are being designed can improve fixture placement and make the final installation feel more integrated.",
      },
    ],
    searchTerms: [
      "Low-voltage lighting",
      "House uplighting",
      "Tree lighting",
      "Prosper TX",
    ],
  },
  sprinkler: {
    slug: "sprinkler-repair-prosper-tx",
    navLabel: "Sprinkler repair",
    shortLabel: "Sprinklers",
    eyebrow: "Sprinkler troubleshooting · Prosper, Texas",
    title: "A healthier lawn starts with water landing where it should.",
    intro:
      "From a broken head to a dry zone or controller problem, Landmark helps homeowners identify irrigation issues and define the right next step for reliable, efficient coverage.",
    metaTitle: "Sprinkler Repair Prosper, TX",
    metaDescription:
      "Sprinkler repair troubleshooting in Prosper, TX for leaks, broken heads, dry zones, controller problems and uneven lawn coverage. Check service availability.",
    relatedDescription:
      "Troubleshoot leaks, broken heads, controller issues, dry zones and uneven irrigation coverage for homeowners across North Dallas.",
    heroImage: "/images/irrigation-turf-project.webp",
    heroAlt:
      "Completed Landmark backyard with healthy green turf and landscape beds",
    detailImage: "/images/texas-home-after.webp",
    detailAlt:
      "Prosper-area home with a healthy lawn and completed front landscape",
    problemTitle: "Small sprinkler problems show up everywhere else.",
    problemCopy:
      "A leaking valve raises the water bill. A damaged head leaves a dry patch. Poorly aimed spray waters the sidewalk while nearby plants struggle. A useful service visit should identify the underlying issue, explain the options and help the entire landscape receive more consistent coverage.",
    features: [
      {
        title: "Leaks + broken heads",
        copy:
          "Visible spray problems, damaged components and suspected underground leaks can be evaluated to determine the appropriate repair scope.",
      },
      {
        title: "Dry zones + poor coverage",
        copy:
          "Uneven turf or stressed beds may point to blocked heads, pressure issues, changed landscaping or zone layouts that no longer fit the yard.",
      },
      {
        title: "Controller programming",
        copy:
          "Schedules should reflect current Prosper watering rules, seasonal conditions and the actual needs of turf and planting zones.",
      },
      {
        title: "System tune-ups",
        copy:
          "A zone-by-zone review can surface overspray, misalignment and small failures before summer heat turns them into visible landscape damage.",
      },
    ],
    outcomeTitle: "Water the landscape—not the pavement.",
    outcomeCopy:
      "The goal is dependable coverage with less guesswork and less visible waste. Irrigation work in Texas is regulated; Landmark will confirm the applicable licensed professional and service scope before regulated repair or installation work is scheduled.",
    outcomePoints: [
      "More consistent coverage across turf and planting areas",
      "Less overspray onto streets, sidewalks and hardscape",
      "Schedules aligned with current local watering guidelines",
      "Clear explanation of the problem and recommended next step",
    ],
    localSection: {
      eyebrow: "Sprinkler troubleshooting in Prosper",
      title: "Start with the symptom, then inspect the complete zone.",
      intro:
        "Dry patches, constantly wet turf, runoff and sudden water-use changes can have several causes. A useful sprinkler evaluation looks beyond the first broken head to coverage, pressure, valves, controller settings and current Prosper watering rules.",
      items: [
        {
          title: "Broken heads + poor coverage",
          copy:
            "Clogged nozzles, shifted spray patterns, sunken heads and plant growth can leave part of a zone dry while another area receives too much water.",
        },
        {
          title: "Valves, leaks + controller issues",
          copy:
            "A zone that will not start or stop, water surfacing between cycles and confusing schedules can point to different components that require systematic diagnosis.",
        },
        {
          title: "Licensed irrigation scope",
          copy:
            "Texas regulates irrigation work. Landmark confirms the applicable licensed professional, the service scope and the current local watering framework before regulated repair or installation proceeds.",
        },
      ],
    },
    process: [
      {
        title: "Describe the symptom",
        copy:
          "Tell us what you see—dry turf, constant water, a zone that will not run or a controller that no longer makes sense.",
      },
      {
        title: "Review the system",
        copy:
          "Coverage, visible components, zone behavior and controller settings are considered together rather than treating only the first symptom.",
      },
      {
        title: "Confirm the next step",
        copy:
          "Landmark explains the recommended scope, availability and applicable licensed irrigation professional before regulated work proceeds.",
      },
    ],
    faqs: [
      {
        question: "Why is one part of my lawn turning brown?",
        answer:
          "Possible causes include a clogged or damaged head, poor alignment, low pressure, changed plant growth, compacted soil or a zone schedule that does not match the area.",
      },
      {
        question: "Can you help program my controller for Prosper watering days?",
        answer:
          "Controller schedules can be reviewed against the Town of Prosper’s current watering guidelines and adjusted for the landscape and season when service is available.",
      },
      {
        question: "How do I know if I have a sprinkler leak?",
        answer:
          "Persistently wet areas, water surfacing when the system runs, a zone that will not shut off or an unexplained water-use increase may justify an inspection.",
      },
      {
        question: "Does Texas require an irrigation license?",
        answer:
          "Yes. Texas regulates irrigation design, installation, maintenance, repair and related consultation. Landmark will confirm the appropriately licensed professional and scope before regulated work begins.",
      },
    ],
    searchTerms: [
      "Sprinkler repair",
      "Broken heads + leaks",
      "Controller programming",
      "Prosper TX",
    ],
    note:
      "Texas regulates irrigation repair and installation. Landmark confirms the applicable licensed professional before regulated work is scheduled.",
  },
};

export const serviceList = [
  services.frontYard,
  services.flowerBeds,
  services.drainage,
  services.stone,
  services.lighting,
  services.sprinkler,
];

export function buildServiceMetadata(service: ServicePageData): Metadata {
  const path = `/${service.slug}`;
  const title = `${service.metaTitle} | Landmark Landscapes`;

  return {
    title: {
      absolute: title,
    },
    description: service.metaDescription,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: path,
      type: "website",
      images: [
        {
          url: service.heroImage,
          alt: service.heroAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: service.metaDescription,
      images: [service.heroImage],
    },
  };
}
