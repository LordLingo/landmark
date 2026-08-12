import Image, { type ImageProps } from "next/image";

const imageDimensions: Record<string, readonly [number, number]> = {
  "/images/backyard-life.webp": [1536, 960],
  "/images/drainage-landscape-bed.webp": [860, 664],
  "/images/drainage-rock-bed.webp": [1125, 1500],
  "/images/flower-bed-front-entry.webp": [860, 664],
  "/images/flower-bed-stacked-stone.webp": [860, 664],
  "/images/front-yard-project.webp": [1800, 1350],
  "/images/front-yard-stone.webp": [860, 664],
  "/images/irrigation-turf-project.webp": [1800, 755],
  "/images/landmark-logo.webp": [941, 240],
  "/images/lighting-blue-home.webp": [1600, 1200],
  "/images/lighting-landscape-bed.webp": [1800, 1350],
  "/images/lighting-warm-home.webp": [1800, 1350],
  "/images/stone-border-entry.webp": [860, 664],
  "/images/stone-walkway-project.webp": [1800, 1350],
  "/images/texas-home-after-stone.webp": [1200, 800],
  "/images/texas-home-after.webp": [1200, 800],
  "/images/texas-home-before.jpg": [1200, 800],
  "/images/uplighting-home.webp": [1586, 992],
};

type SiteImageProps = Omit<ImageProps, "src" | "width" | "height"> & {
  src: string;
};

export default function SiteImage({
  src,
  alt,
  sizes = "100vw",
  ...props
}: SiteImageProps) {
  const [width, height] = imageDimensions[src] ?? [1200, 800];

  return (
    <Image
      src={src}
      width={width}
      height={height}
      alt={alt}
      sizes={sizes}
      {...props}
    />
  );
}
