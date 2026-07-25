import type { MetadataRoute } from "next";
import { locationPageList } from "./location-page-data";
import { serviceList } from "./service-data";
import { landscapeDesignPage } from "./seo-page-data";
import { absoluteUrl } from "./site-url";

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
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: absoluteUrl("/contact/"),
      changeFrequency: "yearly",
      priority: 0.8,
    },
    ...prioritySeoPages.map((page) => ({
      url: absoluteUrl(`/${page.slug}/`),
      changeFrequency: "monthly" as const,
      priority: page.priority,
    })),
    ...serviceList.map((service) => ({
      url: absoluteUrl(`/${service.slug}/`),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
