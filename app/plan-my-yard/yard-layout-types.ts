export type YardPoint = {
  x: number;
  y: number;
};

export type YardBrushMark = YardPoint & {
  id: string;
  size: number;
};

export type YardPlantPlacement = YardPoint & {
  id: string;
  plantId: string;
  scale: number;
};

export type PlantingDensity = "restrained" | "balanced" | "lush";
export type FlowerLevel = "none" | "accents" | "colorful";
export type BedLineStyle = "clean" | "soft-curves" | "natural";

export type YardLayoutPlan = {
  plantZones: YardBrushMark[];
  keepZones: YardBrushMark[];
  placements: YardPlantPlacement[];
  density: PlantingDensity;
  flowerLevel: FlowerLevel;
  bedLineStyle: BedLineStyle;
};

export const defaultYardLayoutPlan: YardLayoutPlan = {
  plantZones: [],
  keepZones: [],
  placements: [],
  density: "restrained",
  flowerLevel: "accents",
  bedLineStyle: "soft-curves",
};
