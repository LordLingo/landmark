export type WaterRestrictionCity = {
  slug: string;
  city: string;
  status: string;
  statusTone: "standard" | "watch";
  intro: string;
  scheduleLabel: string;
  scheduleDetail: string;
  timeRule: string;
  newLandscapeRule: string;
  rules: string[];
  schedule: Array<{
    label: string;
    value: string;
  }>;
  landscapeAdvice: string[];
  officialUrl: string;
  officialLabel: string;
  serviceUrl: string;
};

export const lastVerified = "July 26, 2026";

export const waterRestrictionCities: WaterRestrictionCity[] = [
  {
    slug: "celina-tx",
    city: "Celina",
    status: "Stage 2 · One day per week",
    statusTone: "watch",
    intro:
      "Celina is under Stage 2 water conservation measures. Automatic irrigation and hose-end sprinklers are limited to one designated day per week.",
    scheduleLabel: "One designated day weekly",
    scheduleDetail:
      "Use Celina’s current city schedule to confirm the watering day assigned to your address.",
    timeRule: "No irrigation from 10 a.m. to 6 p.m.",
    newLandscapeRule:
      "Establishing new sod or plants in existing landscapes is prohibited during Stage 2. Certain new developments may qualify for a one-time variance.",
    rules: [
      "Automatic systems and hose-end sprinklers are limited to one designated day per week.",
      "Hand-held hoses, drip irrigation and soaker hoses may be used for up to two hours per day for landscaped areas or foundations.",
      "Runoff and water waste are prohibited.",
    ],
    schedule: [
      {
        label: "Current stage",
        value: "Stage 2, effective July 2, 2026",
      },
      {
        label: "Sprinklers",
        value: "One designated day per week",
      },
      {
        label: "Restricted hours",
        value: "10 a.m.–6 p.m.",
      },
    ],
    landscapeAdvice: [
      "Prioritize established trees and valuable shrubs with targeted drip or soaker-hose watering within the city’s limits.",
      "Pause plans for new sod or planting until Celina changes stages or confirms that your project qualifies for a variance.",
      "Inspect every irrigation zone for runoff, broken heads and overspray before using your weekly sprinkler day.",
    ],
    officialUrl: "https://www.celina-tx.gov/1304/Water-Conservation",
    officialLabel: "City of Celina Water Conservation",
    serviceUrl: "/celina-tx/",
  },
  {
    slug: "mckinney-tx",
    city: "McKinney",
    status: "Designated days · Water only as needed",
    statusTone: "standard",
    intro:
      "McKinney allows landscape watering on a property’s normal trash day and three days later, when a second watering is necessary.",
    scheduleLabel: "Trash day + three days later",
    scheduleDetail:
      "Your regular trash day is the primary watering day. The second day is available only when the landscape needs it.",
    timeRule: "No irrigation from 10 a.m. to 6 p.m., April 1–October 31.",
    newLandscapeRule:
      "Newly planted landscapes may receive a 30-day exemption with city approval. Overseeding does not qualify.",
    rules: [
      "Water on your designated day and three days later only when needed.",
      "A working rain/freeze sensor is required on irrigation systems.",
      "Irrigation runoff, overspray and other water waste are prohibited.",
    ],
    schedule: [
      { label: "Monday trash day", value: "Monday + Thursday" },
      { label: "Tuesday trash day", value: "Tuesday + Friday" },
      { label: "Wednesday trash day", value: "Wednesday + Saturday" },
      { label: "Thursday trash day", value: "Thursday + Sunday" },
      { label: "Friday trash day", value: "Friday + Monday" },
    ],
    landscapeAdvice: [
      "Treat the second watering day as an option, not an automatic requirement; skip it after meaningful rain.",
      "Use short cycle-and-soak runs so McKinney’s clay soil can absorb water without sending it toward the street.",
      "Apply for the city’s approval before relying on a new-landscape exemption.",
    ],
    officialUrl: "https://www.mckinneytexas.org/511/Outdoor-Water-Use",
    officialLabel: "City of McKinney Outdoor Water Use",
    serviceUrl: "/mckinney-tx/",
  },
  {
    slug: "frisco-tx",
    city: "Frisco",
    status: "Summer schedule · Up to two days",
    statusTone: "standard",
    intro:
      "Frisco’s summer schedule allows watering on the regular trash day and one designated second day, as needed, from June 1 through August 31.",
    scheduleLabel: "Trash day + designated second day",
    scheduleDetail:
      "Spring and fall allow one day on regular trash day. Spray irrigation of turfgrass is not allowed during winter.",
    timeRule: "No automatic irrigation from 10 a.m. to 6 p.m., April 1–October 31.",
    newLandscapeRule:
      "Frisco does not grant turfgrass exemptions for existing homes during June, July and August. Drip-irrigated landscape areas may be watered as needed.",
    rules: [
      "Summer watering is allowed on regular trash day and one designated second day, as needed.",
      "Hand-held hoses, soaker hoses, drip irrigation and bubblers may be used when needed.",
      "Frisco changes the allowed frequency by season.",
    ],
    schedule: [
      { label: "Monday trash day", value: "Monday + Thursday" },
      { label: "Tuesday trash day", value: "Tuesday + Friday" },
      { label: "Wednesday trash day", value: "Wednesday + Saturday" },
      { label: "Thursday trash day", value: "Thursday + Sunday" },
      { label: "Friday trash day", value: "Friday + Tuesday" },
    ],
    landscapeAdvice: [
      "Check Frisco’s weekly WaterWise recommendation before deciding whether the optional second day is necessary.",
      "Keep new beds on drip where practical so water reaches roots without wetting pavement or losing as much to evaporation.",
      "Adjust the controller when the season changes; Frisco’s spring, summer, fall and winter schedules differ.",
    ],
    officialUrl: "https://www.friscotexas.gov/378/Water-Management-Plan",
    officialLabel: "City of Frisco Water Management Plan",
    serviceUrl: "/frisco-tx/",
  },
  {
    slug: "prosper-tx",
    city: "Prosper",
    status: "Summer schedule · Two zone days",
    statusTone: "standard",
    intro:
      "Prosper uses three geographic watering zones. From April 1 through October 31, each zone has two available watering days per week, if needed.",
    scheduleLabel: "Two days by geographic zone",
    scheduleDetail:
      "Confirm your zone on Prosper’s official watering map before programming the controller.",
    timeRule: "No irrigation from 10 a.m. to 6 p.m.",
    newLandscapeRule:
      "New sod or landscaping may qualify for a watering variance for up to 30 days from installation.",
    rules: [
      "Zone I waters Monday and Thursday.",
      "Zone II waters Tuesday and Friday.",
      "Zone III waters Wednesday and Saturday.",
    ],
    schedule: [
      { label: "Zone I", value: "Monday + Thursday" },
      { label: "Zone II", value: "Tuesday + Friday" },
      { label: "Zone III", value: "Wednesday + Saturday" },
      {
        label: "November 1–March 31",
        value: "One assigned day weekly, if needed",
      },
    ],
    landscapeAdvice: [
      "Confirm the property’s zone before changing the controller; zone boundaries matter more than street number.",
      "Request a variance when installing qualifying sod or landscaping, then return the controller to the normal schedule when it ends.",
      "Use Prosper’s two available days only when the soil and plants need water.",
    ],
    officialUrl: "https://www.prospertx.gov/295/Water-Conservation",
    officialLabel: "Town of Prosper Water Conservation",
    serviceUrl: "/prosper-tx/",
  },
  {
    slug: "the-colony-tx",
    city: "The Colony",
    status: "Phase 1 · Conservation encouraged",
    statusTone: "standard",
    intro:
      "The Colony’s published drought guide currently identifies Phase 1 and encourages residents to follow its twice-weekly odd/even-address schedule.",
    scheduleLabel: "Odd/even address schedule",
    scheduleDetail:
      "Phase 1 encourages the same twice-weekly schedule used in Phases 2 and 3. Restrictions become more stringent in later phases.",
    timeRule:
      "Phase 1 discourages watering from 10 a.m. to 6 p.m.; later phases prohibit it.",
    newLandscapeRule:
      "The city’s drought chart does not provide a simple blanket new-landscape rule. Confirm project-specific needs with the city before installation.",
    rules: [
      "Even-numbered addresses: Sunday and Thursday.",
      "Odd-numbered addresses: Saturday and Wednesday.",
      "No scheduled watering Monday, Tuesday or Friday.",
    ],
    schedule: [
      { label: "Even addresses", value: "Sunday + Thursday" },
      { label: "Odd addresses", value: "Saturday + Wednesday" },
      { label: "No scheduled watering", value: "Monday, Tuesday or Friday" },
      {
        label: "Austin Ranch",
        value: "Follow the City of Plano drought plan",
      },
    ],
    landscapeAdvice: [
      "Follow the odd/even schedule now so the controller is already prepared if a mandatory phase is activated.",
      "Austin Ranch residents should use Plano’s current drought plan rather than The Colony’s schedule.",
      "Check the current phase before major planting or irrigation work because later phases can sharply limit outdoor water use.",
    ],
    officialUrl:
      "https://www.thecolonytx.gov/DocumentCenter/View/11641/Drought-Contingencies-Chart",
    officialLabel: "City of The Colony Drought Contingency Guide",
    serviceUrl: "/the-colony-tx/",
  },
];

export function getWaterRestrictionCity(slug: string) {
  return waterRestrictionCities.find((city) => city.slug === slug);
}
