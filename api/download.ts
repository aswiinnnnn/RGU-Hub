import type { VercelRequest, VercelResponse } from '@vercel/node'

function sanitizeFilename(name: string) {
  // Keep simple safe characters
  return name.replace(/[^a-zA-Z0-9._-]+/g, '_')
}

function inferFilenameFromUrl(urlStr: string, fallback = 'file') {
  try {
    const u = new URL(urlStr)
    const last = u.pathname.split('/').filter(Boolean).pop() || fallback
    return sanitizeFilename(last)
  } catch {
    return sanitizeFilename(fallback)
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const url = (req.query.url as string) || ''
  const nameParam = (req.query.name as string) || ''
  if (!url) {
    res.status(400).send('Missing url')
    return
  }

  try {
    const upstream = await fetch(url, {
      // Do not forward cookies
      credentials: 'omit',
      // Follow redirects to reach the final file
      redirect: 'follow',
    })

    if (!upstream.ok) {
      res.status(upstream.status).send(`Upstream error ${upstream.status}`)
      return
    }

    // Try to detect filename from override, then headers, then URL
    let filename = nameParam ? sanitizeFilename(nameParam) : inferFilenameFromUrl(url)
    const cd = upstream.headers.get('content-disposition') || upstream.headers.get('Content-Disposition')
    if (cd) {
      const m = cd.match(/filename\*=UTF-8''([^;\n]+)/i) || cd.match(/filename="?([^";\n]+)"?/i)
      if (m && m[1]) {
        try { filename = decodeURIComponent(m[1]) } catch {}
      }
    }

    // Normalize common double extensions and ensure only one extension
    filename = filename.replace(/\.(pdf|docx?|pptx?)\.$/i, '.$1')
    filename = sanitizeFilename(filename)

    // Forward content type if available
    const contentType = upstream.headers.get('content-type') || 'application/octet-stream'

    res.setHeader('Content-Type', contentType)
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`)
    // Optional: caching headers can be added here

    const arrayBuffer = await upstream.arrayBuffer()
    res.status(200).send(Buffer.from(arrayBuffer))
  } catch (e) {
    res.status(500).send('Download proxy error')
  }
}
