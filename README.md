# Landmark Landscapes

The production-ready Landmark Landscapes marketing site. It includes:

- Responsive desktop and mobile navigation
- Six SEO-focused landscaping service pages
- Interactive yard-planning questionnaire
- Estimate request form with questionnaire answers carried forward
- Sitemap, robots metadata, local-business schema, and page metadata
- Real Landmark project photography

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Deploy on Vercel

Import `LordLingo/landmark` into Vercel. Vercel will detect Next.js and use:

- Build command: `npm run build`
- Output: Next.js default
- Node.js: 22.x

No environment variables are required for the current site. Estimate requests
submit through FormSubmit to the Landmark email address configured in
`app/contact/contact-form.tsx`.

## Agent readiness

The homepage negotiates `text/markdown` and `text/html` through `proxy.ts`.
Explicit quality values are honored; unsupported homepage representations return
406. Markdown responses use `Vary: Accept` and `Cache-Control: private, no-store`
to keep them out of shared caches. Next retains its own HTML/RSC Vary headers.
API routes, browser navigation, images and metadata files bypass negotiation.
Unknown page requests accepting Markdown receive a helpful Markdown HTTP 404.

`/llms.txt` follows the llms.txt heading, summary and file-list format. It links
agent guidance and `/index.md`, which must stay aligned with the homepage's
Markdown representation. All public page routes must be included in the sitemap
(or explicitly exempted in `proxy.ts`); the build-manifest test checks coverage.

Verification:

```sh
npm run build
npm test
npm run lint
npm run start -- --hostname 127.0.0.1 --port 3100
# In another terminal:
BASE_URL=http://127.0.0.1:3100 npm run test:endpoints
# After deployment:
BASE_URL=https://golandmarktx.com npm run test:endpoints
```

Endpoint checks are read-only and do not submit inquiries or generate images.
The privacy notice describes the site's implemented providers and forms. Business
owners should confirm retention practices and any additional offline processing.
Search ranking improvements require recrawling and are not guaranteed by code.
