# Search Console-informed lighting improvements — October 17, 2026

This report supersedes earlier notes that Search Console access was unavailable. GSC Wizard access was restored after renewal; golandmarktx.com is readable and activated with owner permissions. Earlier reports remain historical records of the initial implementation.

## Evidence

Property: sc-domain:golandmarktx.com. Search type: web. Latest settled date: October 14, 2026. Primary window: September 17–October 14 (28 days). Supporting window: July 17–October 14 (90 days). GSC dates use America/Los_Angeles. Complete returned results and pagination metadata are saved in gsc-lighting28.json, gsc-lighting90.json, gsc-lightingPages.json, gsc-extra0.json (queries for the existing lighting URL) and gsc-extra1.json (devices). All returned result sets report hasMore=false.

These are baseline observations about existing live pages before the new cluster is published, not performance results for the new pages. No new cluster URL appears in the returned page data. Query rows omit some anonymized queries and can differ from page/device totals; query-page impressions should not be treated as distinct people or total market search volume.

| Query | 28-day impressions | Clicks | Average position | Current landing page |
|---|---:|---:|---:|---|
| landscape lighting prosper | 41 | 0 | 11.59 | /landscape-lighting-prosper-tx |
| landscape lighting near me | 32 | 0 | 9.25 | /landscape-lighting-prosper-tx |
| landscape lighting mckinney tx | 21 | 0 | 69.05 | /landscape-lighting-prosper-tx |
| outdoor lighting near me | 19 | 0 | 12.79 | /landscape-lighting-prosper-tx |
| outdoor lighting prosper | 17 | 0 | 19.76 | /landscape-lighting-prosper-tx |
| outdoor lighting prosper tx | 5 | 0 | 31.40 | /landscape-lighting-prosper-tx |
| landscape lighting installation mckinney tx | 3 | 0 | 75.67 | /landscape-lighting-prosper-tx |

The longer window supports the same priorities: “landscape lighting prosper” has 62 impressions at 14.15, “landscape lighting near me” 56 at 9.41, “landscape lighting mckinney tx” 38 at 69.68, and “landscape lighting installation mckinney tx” 16 at 78.50. These are modest samples; zero clicks does not establish that a title caused the result.

Device totals for the existing Prosper lighting URL in the primary window: mobile 104 impressions at position 17.03, desktop 46 at 49.35, zero clicks on both. The 104/150 mobile share supports retaining the existing mobile lighting estimate/call shortcut; it does not prove a device-specific defect. Different query mixes can explain position differences.

The 90-day page report contains 343 impressions for the no-trailing-slash Prosper lighting URL and 12 for the trailing-slash variant. Keep the existing canonical and Next.js trailingSlash:false behavior; do not create another canonical destination or unnecessary redirect migration.

One The Colony installation query has one impression at position 4 on its general landscaping page. A Celina installation phrase appears once on the Christmas page. Neither is enough evidence to rewrite city pages or treat a rank as stable. No Frisco-specific lighting query appeared in the retrieved rows. Absence from this small GSC result set is not proof of zero demand.

## Changes made

- Regional hub H1, search title and description now explicitly describe landscape-lighting design and installation, keeping the promise residential and year-round.
- Prosper LIGHTING page retains its existing URL and topic, while the title, H1, description and opening copy clearly identify landscape-lighting installation in Prosper. Added a direct installation FAQ with supported scope and estimate next steps.
- McKinney LIGHTING page now leads with residential landscape-lighting design and installation in its title, H1, description and introduction. Added useful installation-scope guidance and a direct service-availability FAQ, matching the installation/contractor intent currently landing on the Prosper lighting page.
- Prosper lighting now links to the dedicated McKinney lighting page alongside its relevant service guides, giving visitors and crawlers a direct city-specific route.
- Frisco, Celina, The Colony, specialty guides and cost-guide copy remain unchanged in this follow-up. No near-me repetition, competitor-brand targeting, smart-lighting dealer claims, repair claims or new pages were added on sparse evidence.

The protected /prosper-tx landscaping page, its source data, metadata, shared navigation, shared layout, homepage, global CSS and contact handling are unchanged. GSC rows landing on /prosper-tx were read only; they do not authorize edits there.

## Release and measurement

Updates are added to the existing open PR #19: https://github.com/LordLingo/landmark/pull/19. Production remains unchanged until that PR is merged and deployed. No sitemap submission is necessary for this follow-up because no URLs were added, removed or moved, and the existing sitemap is already registered with Google. No indexing or post-change ranking improvement is claimed.

After publication and recrawl, compare equal complete windows for the existing Prosper lighting URL and new McKinney URL. Check whether McKinney queries begin reaching the intended page, whether Prosper/nearby installation impressions generate clicks, and whether qualified lighting inquiries follow. Preserve the baseline and allow enough impressions before further snippet revisions. Do not infer cannibalization simply because two pages appear for a query; review overlap and intent first.

Validation completed: production build/TypeScript, lint, 21 existing tests, all 11 lighting page checks and 173 full-site endpoint assertions passed. The McKinney update was visually inspected at a 1280px browser viewport with a 1265px document width and no horizontal overflow. Git comparison against the PR base confirmed the protected Prosper landscaping and shared files remain unchanged.
