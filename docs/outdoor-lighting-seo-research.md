# Outdoor lighting research and implementation — October 17, 2026

## Scope and evidence

Site: https://golandmarktx.com. Research combines live HTML/metadata, repository routes and redirects, and web results for installation searches across the five cities. Search results are a sampled competitive landscape, not a localized Google Maps rank report. No keyword-volume, CPC, difficulty or ranking numbers are invented. The connected GSC Wizard account returned payment_required, so query performance, index coverage, conversions and a traffic baseline could not be retrieved. The user's report that Prosper landscaping ranks on page one is preserved as user context, not independently measured.

## Live architecture audit

Live checks returned 200 for home, the existing Prosper lighting page, all five general landscaping city pages, contact, robots and sitemap. Metadata and raw sitemap evidence are in lighting-live-audit.json. Robots allows public pages, excludes /api/ and names the production sitemap. All audited city pages have their own canonical.

Before this change, the sole lighting service URL was /landscape-lighting-prosper-tx. Shared navigation and the homepage service list point there. The service has useful architectural, walkway, tree and planting content, but a broad hub and specialist lighting paths were absent. General city landscaping pages mention lighting without satisfying a lighting-specific visit. The homepage currently emphasizes Christmas lights; the new cluster explicitly explains year-round landscape lighting. Source code already supplies Organization/HomeAndConstructionBusiness and WebSite entities, production-domain canonicals, an estimate form and mobile navigation.

Old /outdoor-lighting redirected to the Prosper lighting URL. It now points to the regional lighting hub. The legacy misspelled Celina lighting article redirects to the new Celina lighting page. No redirect, metadata, copy, layout, nav or shared stylesheet for /prosper-tx is changed. The existing Prosper lighting URL stays in place, targeting lighting rather than general landscaping.

## Search intent and prioritization

Priority is qualitative: purchase proximity + verified service fit + distinct user need. Combine installation/design/installer/company with city where natural; do not create one URL per synonym. “Near me” intent belongs to relevant local service pages and accurate business information, not repeated near-me copy.

| Priority | Intent family | Query examples | Destination |
|---|---|---|---|
| P1 | Regional installation | landscape lighting installation North Texas; outdoor lighting company North Dallas; low voltage landscape lighting | /landscape-lighting |
| P1 | Prosper installation | landscape lighting Prosper TX; outdoor lighting installation Prosper; house uplighting Prosper | /landscape-lighting-prosper-tx |
| P1 | Celina installation | landscape lighting Celina TX; outdoor lighting installer Celina; new home landscape lighting Celina | /landscape-lighting/celina-tx |
| P1 | Frisco installation | landscape lighting Frisco TX; outdoor lighting installation Frisco; landscape uplighting Frisco | /landscape-lighting/frisco-tx |
| P1 | McKinney installation | landscape lighting McKinney TX; outdoor lighting installer McKinney; tree lighting McKinney | /landscape-lighting/mckinney-tx |
| P1 | The Colony installation | landscape lighting The Colony TX; outdoor lighting installation The Colony; backyard lighting The Colony | /landscape-lighting/the-colony-tx |
| P1 | Architecture | house uplighting installation; architectural landscape lighting; brick house uplighting | /landscape-lighting/architectural-uplighting |
| P1 | Paths | pathway lighting installation; walkway lighting installers; low voltage path lighting | /landscape-lighting/pathway-lighting |
| P1 | Living landscape | tree uplighting installation; garden lighting installation; landscape bed lighting | /landscape-lighting/tree-garden-lighting |
| P2 | Outdoor living | backyard landscape lighting installation; landscape lighting around patio | /landscape-lighting/patio-backyard-lighting |
| P2 | Quote comparison | landscape lighting installation cost; outdoor lighting estimate; landscape lighting quote | /landscape-lighting/cost |
| Conditional | Existing systems | landscape lighting repair; landscape lighting maintenance; transformer troubleshooting | Hub inquiry section only; no dedicated service page until availability confirmed |
| Conditional | Security | security landscape lighting; entry accent lighting | Hub visibility section; no security-system, camera or electrical contractor claim |
| Separate intent | Seasonal/roofline | Christmas light installation; permanent Christmas lights; Jellyfish/Govee/Trimlight installer | Seasonal requests go to existing /christmas-lights. No permanent roofline dealer/product claims. |

“Permanent outdoor lighting” has mixed intent: many results sell color-changing roofline systems or holiday products. Use “year-round landscape lighting” to clarify the supported offering. No new city-by-service multiplication: five city pages cover the service, and four specialist pages cover the design jobs across the region.

## Competitors and the resulting strategy

Observed claims are competitors' own marketing, not verified endorsements or promises Landmark should copy.

| City/market | Competitor primary source | Observed positioning | Landmark response |
|---|---|---|---|
| Prosper | [Wonderly Lights](https://wonderlylights.com/northdfw/landscape-lighting-in-prosper/) | Dedicated landscape/architectural city landing page with consultation CTA and maintenance messaging | Preserve Prosper lighting route; make arrival planning and estimate requirements concrete |
| Prosper / Celina / Frisco | [Clay’s Clippers](https://www.claysclippers.com/landscape-lighting) | Explains designer-led process, fixture choice, budget and timing | Explain cost drivers and proposal comparisons without borrowing their prices or timelines |
| North Dallas including Prosper, Celina, Frisco, McKinney | [AK Lighting](https://aklighting.net/) | Separates landscape, permanent holiday and repair services; strong gallery and consultation paths | Separate seasonal intent, use existing project photography, offer direct phone and estimate paths |
| Celina | [BlueHopper Celina](https://www.bluehopper.com/location/texas/celina/permanent-landscape-lighting/) | Search result presents permanent landscape products and identifies local installer Simple Lights | Explain conventional landscape intent and growth-aware planning; no unsupported product authorization |
| Frisco | [Bernardy Lighting](https://bernardylightingllc.com/frisco/) and [Outdoor Lighting Perspectives](https://www.outdoorlights.com/north-dallas/resources/service-areas/frisco/landscape-lighting/) | Dedicated local lighting pages spanning exterior features | Focus the Frisco page on balancing existing porch lights, mature beds and neighboring views |
| McKinney | [Landscape Light People](https://www.landscapelightpeople.com/) and [Metroplex](https://www.metroplexlandscapelighting.com/mckinney-outdoor-landscape-lighting-installation-services) | Design/installation with existing-system service or local installation pages | Offer detailed canopy, texture, root/access and renovation decisions; leave repair availability conditional |
| The Colony | [Stonebridge Lawn & Garden](https://stonebridgelawn.com/landscape-lighting-installation/) and [Big State Electricians](https://www.bigstateelectricians.com/the-colony/services/lighting-installation) | Landscape lighting versus broader electrical-service positioning | Give patio-to-gate and side-yard guidance while drawing a clear line around electrical/security scope |

City pages are differentiated by practical project scenarios. These are conditional design guidance, not claims that every city property shares a trait, invented local projects, or claims of neighborhood approvals. Gallery captions identify North Texas work without attributing a photograph to a specific city.

## Content, linking and metadata implementation

11 URLs: regional hub + four service specialties + cost guide + five city pages. This includes rebuilding the existing Prosper lighting page, so there are ten additional URLs. Each has a distinct H1, description, title, canonical, Open Graph and Twitter metadata. Page bodies are server-rendered and statically generated.

Existing navigation continues to lead to the established Prosper lighting route; its breadcrumb, related links and service-area section expose the hub and cluster. The hub links all specialty pages and all five cities. Each city links appropriate specialties, the hub and its existing general landscaping city page. All pages include contact and seasonal cross-links. Shared navigation is intentionally unchanged to protect the established landscaping surface.

New JSON-LD uses WebPage + BreadcrumbList + Service (except the cost guide), referring to the existing single business entity. City service areas use real city names, not fabricated branch offices. No AggregateRating, invented address, awards, opening hours, warranties or pricing are added. FAQs are visible HTML, without implying eligibility for Google FAQ rich results.

Estimate links use the existing supported “Landscape lighting” selector value and notes parameters. City and referring page are included in the notes. Existing contact handling, privacy and form provider are untouched. No external form is submitted in testing. Existing GA4 can measure contact-page visits, but lighting-specific conversion attribution is not newly configured or claimed.

The sitemap includes each lighting canonical once with its actual content-change date. Other pages retain their prior dates and priorities. Proxy route recognition derives from that sitemap. Google sitemap submission/indexation is not claimed; publishing sitemap content and submitting it are separate actions.

## Local SEO after launch

Keep the business name, Prosper base, phone and actual service areas consistent with the verified Google Business Profile. Add genuine, owner-authorized lighting project photos and specific customer feedback when available. Do not create profiles or addresses in cities without real eligible locations. Obtain confirmation before adding brands, warranty terms, maintenance plans, commercial projects, permanent roofline systems or electrical services.

When Search Console access is restored, compare lighting queries/pages over an initial complete baseline period, inspect the new URLs, and monitor impressions, clicks, contact visits and qualified inquiries after recrawl. Look for overlap between city and specialty queries before changing titles or consolidating URLs. Avoid reacting to single-day position fluctuations. No ranking or lead guarantee is made.

## Guidance used

- [Google doorway abuse policy](https://developers.google.com/search/docs/essentials/spam-policies#doorway-abuse): useful standalone city guidance and a browseable hierarchy rather than city-name copies.
- [Google local business structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business): truthful shared identity; no fabricated branches or ratings.
- [Google sitemap overview](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview): sitemap discovery supports crawling but does not guarantee indexing.
