import { NextRequest, NextResponse } from "next/server";
import sitemap from "./app/sitemap";
import { homeMarkdown, notFoundMarkdown } from "./app/agent-content";
import { negotiate } from "./lib/negotiate.mjs";

// All public page routes are covered by the sitemap except the form receipt.
// Integration tests compare this list with Next's build manifest.
const pages = new Set([...sitemap().map(page => new URL(page.url).pathname), "/thank-you"]);

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  if (request.headers.get("rsc") === "1" || request.headers.get("accept")?.includes("text/x-component") || !["GET", "HEAD"].includes(request.method)) return NextResponse.next();
  const choice = negotiate(request.headers.get("accept"));
  const isHome = path === "/";
  const missingPage = !pages.has(path);
  if (!isHome && !missingPage) return NextResponse.next();
  const headers = { Vary: "Accept", "Cache-Control": "private, no-store", Link: '</llms.txt>; rel="describedby"' };
  if (choice === "markdown") {
    return new NextResponse(request.method === "HEAD" ? null : isHome ? homeMarkdown : notFoundMarkdown, {
      status: isHome ? 200 : 404,
      headers: { ...headers, "Content-Type": "text/markdown; charset=utf-8", ...(isHome ? {} : { "X-Robots-Tag": "noindex" }) },
    });
  }
  if (isHome && choice === null) {
    return new NextResponse(request.method === "HEAD" ? null : "Supported representations: text/html, text/markdown.", {
      status: 406, headers: { ...headers, "Content-Type": "text/plain; charset=utf-8" },
    });
  }
  const response = NextResponse.next();
  response.headers.set("Vary", "Accept");
  response.headers.set("Link", headers.Link);
  return response;
}

// Assets, metadata and API responses retain their existing formats and behavior.
export const config = {
  matcher: ["/((?!api(?:/|$)|_next(?:/|$)|images(?:/|$)|favicon|apple-touch-icon|robots\\.txt$|sitemap\\.xml$|llms\\.txt$|index\\.md$|agent-instructions\\.md$|.*\\.(?:svg|png|jpg|jpeg|webp|ico|woff2?)$).*)"],
};
