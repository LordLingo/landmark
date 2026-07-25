const fallbackSiteUrl = "http://localhost:3000";

function normalizeSiteUrl(value: string): string {
  const trimmed = value.trim().replace(/\/+$/, "");

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  return `https://${trimmed}`;
}

const configuredSiteUrl = [
  process.env.NEXT_PUBLIC_SITE_URL,
  process.env.VERCEL_PROJECT_PRODUCTION_URL,
  process.env.VERCEL_URL,
].find((value) => value?.trim());

export const siteUrl = normalizeSiteUrl(configuredSiteUrl ?? fallbackSiteUrl);

export function absoluteUrl(path = "/"): string {
  return new URL(path, `${siteUrl}/`).toString();
}
