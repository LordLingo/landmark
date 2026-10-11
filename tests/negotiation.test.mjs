import { test } from 'node:test';
import assert from 'node:assert/strict';
import { negotiate } from '../lib/negotiate.mjs';
for (const [header, expected] of [
 [null,'html'], ['*/*','html'], ['text/html','html'], ['text/markdown','markdown'],
 ['text/html;q=0.5, text/markdown;q=0.9','markdown'],
 ['text/html;q=1, text/markdown;q=0.2','html'],
 ['text/markdown;q=0, */*;q=1','html'], ['text/html;q=0, text/*;q=1','markdown'],
 ['text/markdown;q=0, text/html;q=0',null], ['application/json',null],
 ['TEXT/MARKDOWN; charset=utf-8','markdown'], ['text/html;q=bogus, text/markdown','markdown'],
 ['text/html, text/markdown','html'],
 ['text/html;level=1;q=1,text/html;q=0,text/markdown;q=0.5','markdown'],
 ['text/html;charset=utf-8;q=0,text/html;q=1,text/markdown;q=0.5','markdown'],
 ['text/markdown;charset="UTF-8"','markdown'],
 ['text/markdown;charset=iso-8859-1',null],
 ['text/markdown;profile="a,b;c",text/html','html'],
]) test(`Accept ${header}`, () => assert.equal(negotiate(header), expected));

import { readFileSync, existsSync } from 'node:fs';
test('Markdown alternate stays synchronized with homepage representation',()=>{
 const source=readFileSync(new URL('../app/agent-content.ts',import.meta.url),'utf8');
 assert.equal(readFileSync(new URL('../public/index.md',import.meta.url),'utf8'),source.split('`')[1]);
});
test('every generated page is registered in sitemap or explicitly excluded', { skip: !existsSync('.next/prerender-manifest.json') },()=>{
 const manifest=JSON.parse(readFileSync('.next/prerender-manifest.json','utf8'));
 const sitemap=readFileSync('.next/server/app/sitemap.xml.body','utf8');
 for(const path of Object.keys(manifest.routes)){
  if(['/robots.txt','/sitemap.xml','/_not-found','/_global-error','/thank-you'].includes(path)) continue;
  assert.ok(sitemap.includes(`<loc>https://golandmarktx.com${path}</loc>`),`${path} must be registered in sitemap before Markdown routing`);
 }
});

test('privacy discloses property addresses and their form provider',()=>{
 const notice=readFileSync(new URL('../app/privacy/page.tsx',import.meta.url),'utf8');
 assert.match(notice,/property city and street address/);
 assert.match(notice,/including any property street address you provide, are sent through Formspree/);
});
