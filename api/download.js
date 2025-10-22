export default async function handler(req, res) {
  const url = (req.query.url || '').toString();
  const nameParam = (req.query.name || '').toString();
  if (!url) {
    res.status(400).send('Missing url');
    return;
  }

  const sanitize = (s) => s.replace(/[^a-zA-Z0-9._-]+/g, '_');
  const inferFromUrl = (u, fallback = 'file') => {
    try {
      const parsed = new URL(u);
      const last = parsed.pathname.split('/').filter(Boolean).pop() || fallback;
      return sanitize(last);
    } catch {
      return sanitize(fallback);
    }
  };

  try {
    const upstream = await fetch(url, { credentials: 'omit', redirect: 'follow' });
    if (!upstream.ok) {
      res.status(upstream.status).send(`Upstream error ${upstream.status}`);
      return;
    }

    let filename = nameParam ? sanitize(nameParam) : inferFromUrl(url);
    const cd = upstream.headers.get('content-disposition') || upstream.headers.get('Content-Disposition');
    if (cd) {
      const m = cd.match(/filename\*=UTF-8''([^;\n]+)/i) || cd.match(/filename="?([^";\n]+)"?/i);
      if (m && m[1]) {
        try { filename = decodeURIComponent(m[1]); } catch {}
      }
    }
    filename = filename.replace(/\.(pdf|docx?|pptx?)\.$/i, '.$1');
    filename = sanitize(filename);

    // Force download rather than preview in browser
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

    const arrayBuffer = await upstream.arrayBuffer();
    res.status(200).send(Buffer.from(arrayBuffer));
  } catch (e) {
    res.status(500).send('Download proxy error');
  }
}
