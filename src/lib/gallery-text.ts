// Keep gallery fields as strings so existing documents need no migration.
// Only explicit GIF and formatting tokens are interpreted; HTML stays inert text.
export type TextStyle = { bold?: boolean; color?: string }
export type GalleryTextPart = ({ type: 'text'; text: string } | { type: 'gif'; url: string }) & TextStyle

export function textColor(value: string): string | undefined {
    return /^#[0-9a-f]{6}$/i.test(value) ? value.toLowerCase() : undefined
}

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
    type Frame = { token: string; kind: string; style: TextStyle; parts: GalleryTextPart[] }
    const frames: Frame[] = [{ token: '', kind: '', style: {}, parts: [] }]
    const pattern = /\[b\]|\[\/b\]|\[color=#[0-9a-f]{6}\]|\[\/color\]/gi
    let start = 0
    for (const match of value.matchAll(pattern)) {
        const frame = frames[frames.length - 1]
        frame.parts.push(...parseGifText(value.slice(start, match.index)))
        const token = match[0].toLowerCase()
        if (token === '[b]' || token.startsWith('[color=')) {
            frames.push({ token: match[0], kind: token === '[b]' ? 'b' : 'color', style: token === '[b]' ? { bold: true } : { color: token.slice(7, -1) }, parts: [] })
        } else if (frames.length > 1 && token === `[/${frame.kind}]`) {
            frames.pop()
            frames[frames.length - 1].parts.push(...frame.parts.map(part => ({ ...frame.style, ...part })))
        } else {
            frame.parts.push({ type: 'text', text: match[0] })
        }
        start = match.index! + match[0].length
    }
    frames[frames.length - 1].parts.push(...parseGifText(value.slice(start)))
    // Preserve incomplete markup while a document is being edited.
    while (frames.length > 1) {
        const frame = frames.pop()!
        frames[frames.length - 1].parts.push({ type: 'text', text: frame.token }, ...frame.parts)
    }
    return frames[0].parts
}

export function serializeGalleryText(parts: GalleryTextPart[]): string {
    // Merge adjacent runs so editor DOM changes do not create redundant tokens.
    const merged: GalleryTextPart[] = []
    for (const part of parts) {
        if (part.type === 'text' && !part.text) continue
        const previous = merged[merged.length - 1]
        if (part.type === 'text' && previous?.type === 'text' && !!part.bold === !!previous.bold && part.color === previous.color) previous.text += part.text
        else merged.push({ ...part })
    }
    return merged.map(part => {
        let text = part.type === 'text' ? part.text : galleryGifToken(part.url)
        if (part.color && textColor(part.color)) text = `[color=${textColor(part.color)}]${text}[/color]`
        if (part.bold) text = `[b]${text}[/b]`
        return text
    }).join('')
}

function parseGifText(value: string): GalleryTextPart[] {
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
