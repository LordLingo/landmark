import type { MetadataRoute } from "next";
import { serviceList } from "./service-data";

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
    ...serviceList.map((service) => ({
      url: `${baseUrl}/${service.slug}/`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
