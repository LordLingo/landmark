import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ChristmasCityPage from "../city-page";
import { christmasCities, getChristmasCity } from "../city-data";

type PageProps = { params: Promise<{ city: string }> };

export function generateStaticParams() {
  return christmasCities.map((city) => ({ city: city.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getChristmasCity(slug);
  if (!city) return {};
  const title = `Christmas Light Installation ${city.city}, TX | Landmark`;
  const description = `Professional Christmas light installation in ${city.city}, TX. Custom rooflines, trees and entries with take-down and storage planning. Request a quote.`;
  const url = `/christmas-lights/${city.slug}`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      images: [
        {
          url: "/images/christmas-lights-celina-hero.webp",
          width: 1440,
          height: 810,
          alt: `Professional Christmas light installation in ${city.city}, Texas`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/christmas-lights-celina-hero.webp"],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { city: slug } = await params;
  const city = getChristmasCity(slug);
  if (!city) notFound();
  return <ChristmasCityPage city={city} />;
}
