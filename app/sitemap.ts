import type { MetadataRoute } from "next";
import { locationPageList } from "./location-page-data";
import { serviceList } from "./service-data";
import { landscapeDesignPage } from "./seo-page-data";
import { absoluteUrl } from "./site-url";
import { waterRestrictionCities } from "./water-restrictions/water-restriction-data";

const lastModified = new Date("2026-08-12T00:00:00-05:00");

const prioritySeoPages = [
  {
    slug: landscapeDesignPage.slug,
    priority: 0.95,
  },
  ...locationPageList.map((page) => ({
    slug: page.slug,
    priority: page.slug === "prosper-tx" ? 0.95 : 0.92,
  })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: absoluteUrl("/contact"),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/plan-my-yard"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.96,
    },
    ...prioritySeoPages.map((page) => ({
      url: absoluteUrl(`/${page.slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: page.priority,
    })),
    ...serviceList.map((service) => ({
      url: absoluteUrl(`/${service.slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    {
      url: absoluteUrl("/water-restrictions"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.82,
    },
    ...waterRestrictionCities.map((city) => ({
      url: absoluteUrl(`/water-restrictions/${city.slug}`),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.78,
    })),
  ];
}
