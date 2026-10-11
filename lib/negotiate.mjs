// RFC 9110: the most specific matching media range supplies quality.
export function negotiate(accept) {
  const ranges = (accept || '*/*').toLowerCase().split(',').map((entry) => {
    const [type, ...params] = entry.trim().split(';').map(s => s.trim());
    const qParam = params.find(p => p.startsWith('q='));
    const raw = qParam ? qParam.slice(2) : '1';
    const q = /^(?:0(?:\.\d{0,3})?|1(?:\.0{0,3})?)$/.test(raw) ? Number(raw) : 0;
    return { type, q };
  });
  function quality(type) {
    const matches = ranges.map(r => ({ ...r, specificity: r.type === type ? 2 : r.type === 'text/*' ? 1 : r.type === '*/*' ? 0 : -1 })).filter(r => r.specificity >= 0);
    matches.sort((a, b) => b.specificity - a.specificity || b.q - a.q);
    return matches[0]?.q ?? 0;
  }
  const html = quality('text/html');
  const markdown = quality('text/markdown');
  if (!html && !markdown) return null;
  return markdown > html ? 'markdown' : 'html';
}
