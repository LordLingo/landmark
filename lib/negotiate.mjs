// RFC 9110: the most specific matching media range supplies quality.
export function negotiate(accept) {
  const ranges = (accept || '*/*').toLowerCase().split(',').map((entry) => {
    const [type, ...params] = entry.trim().split(';').map(s => s.trim());
    const qParam = params.find(p => p.startsWith('q='));
    const raw = qParam ? qParam.slice(2) : '1';
    const q = /^(?:0(?:\.\d{0,3})?|1(?:\.0{0,3})?)$/.test(raw) ? Number(raw) : 0;
    const mediaParams = params.slice(0, qParam ? params.indexOf(qParam) : params.length);
    return { type, q, mediaParams };
  });
  function quality(type) {
    const matches = ranges.map(r => ({ ...r, specificity: r.type === type ? 2 : r.type === 'text/*' ? 1 : r.type === '*/*' ? 0 : -1 })).filter(r => r.specificity >= 0 && r.mediaParams.every(p => /^charset\s*=\s*(?:utf-8|"utf-8")$/.test(p)));
    matches.sort((a, b) => b.specificity - a.specificity || b.mediaParams.length - a.mediaParams.length || b.q - a.q);
    return matches[0]?.q ?? 0;
  }
  const html = quality('text/html');
  const markdown = quality('text/markdown');
  if (!html && !markdown) return null;
  return markdown > html ? 'markdown' : 'html';
}
