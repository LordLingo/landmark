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
