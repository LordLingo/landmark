import assert from 'node:assert/strict';
const base = process.env.BASE_URL || 'http://localhost:3100';
let checks = 0;
async function request(path, accept = 'text/html', method = 'GET') {
 const response = await fetch(new URL(path, base), { method, headers: { Accept: accept } });
 return { response, body: await response.text() };
}
function ok(value, message) { assert.ok(value, message); checks++; }
function type(response, expected) { ok(response.headers.get('content-type')?.includes(expected), `${response.url}: expected ${expected}`); }
function vary(response) { ok(response.headers.get('vary')?.toLowerCase().split(',').map(s=>s.trim()).includes('accept'), `${response.url}: missing Vary Accept`); }
for (const [accept, expected] of [['text/markdown','text/markdown'], ['text/html','text/html'], ['text/html;q=0.2,text/markdown;q=0.9','text/markdown'], ['text/markdown;q=0,*/*','text/html'], ['*/*','text/html']]) {
 const {response,body}=await request('/',accept); ok(response.status===200,`home ${accept}`);type(response,expected);if(expected==='text/markdown')vary(response);ok(body.length>100,'nonempty home');
 if(expected==='text/markdown') { ok(body.startsWith('# Landmark'), 'Markdown heading'); ok(!body.includes('<!DOCTYPE'),'not HTML'); }
}
const unsupported=await request('/','application/json');ok(unsupported.response.status===406,'406 unsupported');vary(unsupported.response);
for(const path of ['/__agent-readiness-missing','/missing/deep/path','/water-restrictions/not-a-city','/christmas-lights/not-a-city']) {
 for(const accept of ['text/markdown','text/html']) {const {response,body}=await request(path,accept);ok(response.status===404,`${path} 404`);type(response,accept);if(accept==='text/markdown'){vary(response);ok(body.length>=20 && body.includes('](https://golandmarktx.com/sitemap.xml)'), 'helpful Markdown 404');}}
}
for(const path of ['/','/__agent-readiness-missing']) {const {response,body}=await request(path,'text/markdown','HEAD');ok(body==='','empty HEAD');type(response,'text/markdown');ok(response.status===(path==='/'?200:404),'HEAD status');}
const rsc=await fetch(new URL('/?_rsc=agent-readiness',base),{headers:{Accept:'text/x-component',RSC:'1'}});ok(rsc.status===200,'client navigation stays available');type(rsc,'text/x-component');
const home=await request('/');ok(home.body.includes('<title>Landmark Landscapes | Landscaping in Prosper &amp; North Dallas</title>'),'brand title');ok(home.body.includes('Landmark Landscapes: landscaping for life outdoors.'),'brand heading');
const blocks=[...home.body.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(m=>JSON.parse(m[1]));
const org=blocks.flatMap(b=>b['@graph']||[b]).find(b=>[b['@type']].flat().includes('Organization'));
ok(org?.address?.['@type']==='PostalAddress','Organization address');ok(org.contactPoint.telephone && org.contactPoint.email && org.contactPoint.contactType,'complete contact');ok(org.name&&org.description&&org.url,'identity');
for(const path of ['/about','/contact','/privacy']) {const {response,body}=await request(path);ok(response.status===200,`${path} 200`);const main=body.match(/<main[\s\S]*?<\/main>/)?.[0]||'';const text=main.replace(/<script[\s\S]*?<\/script>/g,'').replace(/<[^>]*>/g,' ').replace(/\s+/g,' ');ok(text.length>=500,`${path} substantive content`);ok(body.includes(`https://golandmarktx.com${path}`),`${path} canonical`);}
const llms=await request('/llms.txt');type(llms.response,'text/markdown');ok(llms.body.startsWith('# Landmark Landscapes\n\n>'),'llms format');ok(llms.body.includes('## When to use this'),'when to use');
for(const section of llms.body.split(/^## /m).slice(1)) ok(section.split('\n').slice(1).filter(s=>s.trim()).every(s=>/^- \[.+\]\(https:\/\/.+\)/.test(s)),'llms file list format');
for(const path of ['/index.md','/agent-instructions.md']){const {response,body}=await request(path);ok(response.status===200,`${path} 200`);type(response,'text/markdown');ok(body.startsWith('# '),'Markdown file');if(path==='/index.md')ok(body===(await request('/','text/markdown')).body,'alternate matches negotiated body');}
const sitemap=await request('/sitemap.xml');type(sitemap.response,'xml');ok(sitemap.response.status===200,'sitemap 200');
const paths=[...sitemap.body.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>new URL(m[1]).pathname);
ok(paths.includes('/privacy')&&paths.includes('/about'),'trust pages in sitemap');
for(const path of [...paths,'/thank-you']){for(const accept of ['text/html','text/markdown']){const {response}=await request(path,accept);ok(response.status===200,`${path} ${accept} 200`);}}
const robots=await request('/robots.txt');ok(robots.response.status===200&&robots.body.includes('Sitemap: https://golandmarktx.com/sitemap.xml')&&robots.body.includes('Disallow: /api/'),'robots preserved');
for(const path of ['/api/yard-lead','/api/visualize-yard','/api/water-guide-email']){const {response}=await request(path,'text/markdown');ok(response.status===405,`${path} GET stays 405`);}
for(const path of ['/images/landmark-logo.webp','/favicon-32.png']){const {response}=await request(path,'text/markdown');ok(response.status===200&&response.headers.get('content-type').startsWith('image/'), 'image unchanged');}
console.log(`PASS: ${checks} assertions across ${paths.length} sitemap pages, trust pages, negotiation, errors, metadata, assets and read-only API checks (${base}).`);
