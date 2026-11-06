// Keep gallery fields as strings so existing documents need no migration.
// GIFs use a small, explicit subset of Markdown; arbitrary HTML is never rendered.
export type GalleryTextPart = { type: 'text'; text: string } | { type: 'gif'; url: string }

export function galleryGifUrl(value: string): string | null {
    try {
        const url = new URL(value.trim())
        if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password) return null
        return url.href.replace(/\(/g, '%28').replace(/\)/g, '%29')
    } catch {
        return null
    }
}

export function galleryGifToken(url: string): string {
    const safeUrl = galleryGifUrl(url)
    return safeUrl ? `![GIF](${safeUrl})` : ''
}

export function parseGalleryText(value: string): GalleryTextPart[] {
    const parts: GalleryTextPart[] = []
    const pattern = /!\[GIF\]\(([^\s)]+)\)/g
    let start = 0
    for (const match of value.matchAll(pattern)) {
        const url = galleryGifUrl(match[1])
        if (!url) continue
        if (match.index! > start) parts.push({ type: 'text', text: value.slice(start, match.index) })
        parts.push({ type: 'gif', url })
        start = match.index! + match[0].length
    }
    if (start < value.length) parts.push({ type: 'text', text: value.slice(start) })
    return parts
}

export function galleryPlainText(value: string): string {
    return parseGalleryText(value).map(part => part.type === 'text' ? part.text : 'GIF').join('')
}
