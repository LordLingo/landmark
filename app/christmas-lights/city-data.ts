export type ChristmasCity = {
  slug: string;
  city: string;
  county: string;
  neighborhoods: string[];
  heroPosition: string;
  heroImage?: string;
  detailImage?: string;
  theme?: "celinaTheme" | "prosperTheme";
  intro: string;
  propertyNote: string;
  localDetails: Array<{ title: string; copy: string }>;
};

export const christmasCities: ChristmasCity[] = [
  {
    slug: "prosper-tx",
    city: "Prosper",
    county: "Collin and Denton counties",
    neighborhoods: [
      "Windsong Ranch",
      "Star Trail",
      "Gentle Creek",
      "Whitley Place",
    ],
    heroPosition: "center",
    heroImage: "/images/christmas-lights-prosper-green-hero.webp",
    detailImage: "/images/christmas-lights-prosper-green-detail.webp",
    theme: "prosperTheme",
    intro:
      "Landmark designs and installs custom Christmas lights for Prosper homes, coordinating rooflines, entries, trees and landscape accents into a polished holiday display.",
    propertyNote:
      "Prosper homes often have broad elevations, multiple roof peaks, tall entries and larger front landscapes. A custom lighting plan uses that scale intentionally so the display feels balanced from the street and welcoming at the front door.",
    localDetails: [
      {
        title: "Large-home rooflines",
        copy: "Custom-fit warm-white LEDs can trace peaks, dormers and long eaves with clean spacing that complements the home's architecture.",
      },
      {
        title: "Entries + statement features",
        copy: "Columns, wreaths, garland and prominent entry details can become a clear holiday focal point without competing with the full elevation.",
      },
      {
        title: "Trees + landscape depth",
        copy: "Wrapped trees, shrubs and walkway accents extend the display through larger Prosper lots while keeping the design cohesive.",
      },
    ],
  },
  {
    slug: "frisco-tx",
    city: "Frisco",
    county: "Collin and Denton counties",
    neighborhoods: [
      "Newman Village",
      "Starwood",
      "Phillips Creek Ranch",
      "The Trails",
    ],
    heroPosition: "center",
    intro:
      "Landmark designs and installs custom Christmas lighting for Frisco homes, from crisp rooflines and illuminated entries to wrapped trees and layered landscape accents.",
    propertyNote:
      "Frisco homes often combine tall roof peaks, stone elevations and mature front-yard trees. A measured plan keeps those elements connected without making the display feel crowded.",
    localDetails: [
      {
        title: "Architectural rooflines",
        copy: "Custom-fit warm-white lighting can trace peaks, dormers and long rooflines with clean spacing that complements the home.",
      },
      {
        title: "Entry + column lighting",
        copy: "Wreaths, garland and lit columns create a clear focal point from the street and a welcoming arrival for holiday guests.",
      },
      {
        title: "Trees + landscape layers",
        copy: "Wrapped trunks, shrubs and walkway accents add depth while respecting the landscape already established around the home.",
      },
    ],
  },
  {
    slug: "celina-tx",
    city: "Celina",
    county: "Collin and Denton counties",
    neighborhoods: [
      "Light Farms",
      "Mustang Lakes",
      "Cambridge Crossing",
      "Glen Crossing",
    ],
    heroPosition: "center",
    heroImage: "/images/christmas-lights-celina-orange-hero.webp",
    detailImage: "/images/christmas-lights-celina-orange-detail.webp",
    theme: "celinaTheme",
    intro:
      "Landmark creates custom Christmas light displays for Celina homes, coordinating rooflines, entries, trees and landscape accents into one polished holiday design.",
    propertyNote:
      "Celina's newer homes and larger lots give holiday lighting room to make an impact. The best displays use that scale deliberately, with a strong roofline and a few well-chosen focal points.",
    localDetails: [
      {
        title: "New-home rooflines",
        copy: "Measured LED lighting follows the home's architecture so peaks, dormers and eaves read as one clean composition.",
      },
      {
        title: "Large-lot focal points",
        copy: "Feature trees, entry drives and landscape beds can be layered into the design without losing the home's visual center.",
      },
      {
        title: "A complete seasonal plan",
        copy: "Landmark can coordinate design, professional installation, take-down and organized storage planning for an easier season.",
      },
    ],
  },
  {
    slug: "mckinney-tx",
    city: "McKinney",
    county: "Collin County",
    neighborhoods: [
      "Stonebridge Ranch",
      "Trinity Falls",
      "Craig Ranch",
      "Adriatica",
    ],
    heroPosition: "center",
    intro:
      "Landmark installs professional Christmas lights for McKinney homes, combining custom-fit rooflines with entry, tree and landscape lighting tailored to the property's character.",
    propertyNote:
      "McKinney includes both established neighborhoods with mature trees and newer communities with prominent architecture. A custom plan can highlight either character without relying on a repeated package.",
    localDetails: [
      {
        title: "Established-home displays",
        copy: "Mature trees, porches and detailed elevations can become natural focal points when the lighting is planned around their existing scale.",
      },
      {
        title: "Clean roofline installation",
        copy: "Professional-grade LEDs are measured to the home for consistent spacing and a finished look from every street-facing angle.",
      },
      {
        title: "Warm arrivals",
        copy: "Entries, walkways and landscape beds can be accented to guide guests toward the front door and complete the nighttime view.",
      },
    ],
  },
  {
    slug: "the-colony-tx",
    city: "The Colony",
    county: "Denton County",
    neighborhoods: [
      "The Tribute",
      "Stewart Peninsula",
      "Austin Ranch",
      "The Legends",
    ],
    heroPosition: "center",
    intro:
      "Landmark provides custom Christmas light installation for The Colony homes, with professional roofline, entry, tree and landscape displays handled from design through seasonal take-down.",
    propertyNote:
      "From established homes near the lake to newer properties in The Tribute and Austin Ranch, The Colony offers varied architecture and lot sizes that benefit from a property-specific lighting plan.",
    localDetails: [
      {
        title: "Right-sized roofline design",
        copy: "The lighting plan follows the home's strongest architectural lines so the result feels festive, balanced and visible from the street.",
      },
      {
        title: "Trees, shrubs + walkways",
        copy: "Landscape accents add depth and warmth while keeping paths, entries and outdoor gathering areas visually connected.",
      },
      {
        title: "Season-long service",
        copy: "Landmark can plan installation, in-season support, take-down and storage options as one coordinated local service.",
      },
    ],
  },
];

export function getChristmasCity(slug: string) {
  return christmasCities.find((city) => city.slug === slug);
}
