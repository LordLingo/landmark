import assert from 'node:assert/strict';
import { writeFileSync } from 'node:fs';
const base = process.env.BASE_URL || 'http://127.0.0.1:3100';
const paths = ['/landscape-lighting', '/landscape-lighting-prosper-tx', ...['architectural-uplighting','pathway-lighting','tree-garden-lighting','patio-backyard-lighting','cost','celina-tx','frisco-tx','mckinney-tx','the-colony-tx'].map(slug => `/landscape-lighting/${slug}`)];
const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
const titles = new Set(), descriptions = new Set();
const report = [], links = new Set();
for (const path of paths) {
  const response = await fetch(`${base}${path}`); assert.equal(response.status, 200, path);
  const html = await response.text();
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
  const description = html.match(/<meta name="description" content="([^"]*)"/s)?.[1];
  assert.ok(title && !titles.has(title), `unique title: ${path}`); titles.add(title);
  assert.ok(description && !descriptions.has(description), `unique description: ${path}`); descriptions.add(description);
  assert.equal([...html.matchAll(/<h1\b/g)].length,1, `one H1: ${path}`);
  assert.ok(html.includes(`<link rel="canonical" href="https://golandmarktx.com${path}"`), `self canonical: ${path}`);
  assert.equal(sitemap.split(`<loc>https://golandmarktx.com${path}</loc>`).length - 1, 1, `sitemap exactly once: ${path}`);
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(match => JSON.parse(match[1]));
  const graph = blocks.flatMap(block => block['@graph'] || [block]);
  assert.ok(graph.some(node => node['@type'] === 'BreadcrumbList'), `breadcrumb: ${path}`);
  const services = graph.filter(node => node['@type'] === 'Service');
  if (path.endsWith('/cost')) assert.equal(services.length,0);
  else { assert.equal(services.length,1); assert.equal(services[0].provider['@id'],'https://golandmarktx.com/#business'); }
  assert.ok(!graph.some(node => node['@type'] === 'AggregateRating'), 'no invented rating');
  assert.ok(html.includes('tel:+14694928450'), 'phone CTA');
  const anchors = [...html.matchAll(/<a\b[^>]*href="([^"]*)"/g)].map(match => match[1].replaceAll('&amp;','&'));
  const contact = anchors.find(link => link.startsWith('/contact?'));
  assert.ok(contact, 'estimate CTA');
  const params = new URL(contact,base).searchParams;
  assert.equal(params.get('service'),'Landscape lighting', 'supported form service');
  assert.ok(params.get('notes').includes(path), 'referring page survives in notes');
  for (const link of anchors) if (link.startsWith('/') && !link.startsWith('//')) links.add(link.split('#')[0]);
  for (const image of [...html.matchAll(/<img\b[^>]*alt="([^"]*)"/g)]) assert.ok(image[1], 'image alt text');
  const words = html.replace(/<script[\s\S]*?<\/script>/g,'').replace(/<[^>]*>/g,' ').split(/\s+/).filter(Boolean).length;
  assert.ok(words > 450, `substantive page: ${path} (${words})`);
  report.push({path,status:response.status,title,description,words});
}
for(const link of links) assert.equal((await fetch(`${base}${link}`)).status,200,`internal link: ${link}`);
for (const path of ['/landscape-lighting/not-a-page','/landscape-lighting/prosper-tx']) assert.equal((await fetch(`${base}${path}`)).status,404, 'no extra city duplicate');
for (const [path,destination] of [['/outdoor-lighting','/landscape-lighting'],['/upgrade-your-home-with-landscape-lightning-service-in-celina-tx','/landscape-lighting/celina-tx']]) {
 const response=await fetch(`${base}${path}`,{redirect:'manual'}); assert.equal(response.status,308); assert.equal(response.headers.get('location'),`https://golandmarktx.com${destination}`);
}
writeFileSync('docs/lighting-verification.json', JSON.stringify({base,pages:report,internalLinksChecked:links.size,status:'passed'},null,2));
console.log(`PASS: ${paths.length} lighting pages; unique metadata, canonical, H1, schema, sitemap, CTAs, ${links.size} internal links, redirects and missing routes.`);
