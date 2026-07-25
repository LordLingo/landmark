import type { MetadataRoute } from "next";
import { serviceList } from "./service-data";

const prioritySeoPages = [
  {
    path: "/landscape-design/",
    priority: 0.95,
  },
  {
    path: "/prosper-tx/",
    priority: 0.95,
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://landmarklandscapestx.com";

  return [
    {
      url: `${baseUrl}/`,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/contact/`,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    ...prioritySeoPages.map((page) => ({
      url: `${baseUrl}${page.path}`,
      changeFrequency: "monthly" as const,
      priority: page.priority,
    })),
    ...serviceList.map((service) => ({
      url: `${baseUrl}/${service.slug}/`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
