import { parseGalleryText } from '@/lib/gallery-text'

export function GalleryText({ value }: { value: string }) {
    return parseGalleryText(value).map((part, index) => {
        const content = part.type === 'text' ? part.text : (
            // Use the original image URL to preserve GIF animation.
            // eslint-disable-next-line @next/next/no-img-element
            <img key={index} src={part.url} alt="GIF" loading="lazy" decoding="async" referrerPolicy="no-referrer"
                className="mx-1 inline-block h-[1.6em] max-w-[5em] object-contain align-middle" />
        )
        return part.bold || part.color ? <span key={index} style={{ fontWeight: part.bold ? 700 : undefined, color: part.color }}>{content}</span> : content
    })
}
