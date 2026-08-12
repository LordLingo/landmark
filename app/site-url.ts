const productionSiteUrl = "https://golandmarktx.com";

function normalizeSiteUrl(value: string): string {
  const trimmed = value.trim().replace(/\/+$/, "");

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  return `https://${trimmed}`;
}

// Canonicals must never switch to a Vercel preview hostname. Set
// NEXT_PUBLIC_SITE_URL only when the production domain itself changes.
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

export const siteUrl = normalizeSiteUrl(configuredSiteUrl ?? productionSiteUrl);

export function absoluteUrl(path = "/"): string {
  return new URL(path, `${siteUrl}/`).toString();
}
