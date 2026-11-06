import { defineField, defineType } from 'sanity'
import { GalleryGifInput } from '../components/gallery-gif-input'
import { galleryPlainText } from '../../lib/gallery-text'

export const galleryType = defineType({
    name: 'gallery',
    title: 'Gallery',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            description: '제목에 GIF를 붙여넣거나 아래 GIF 업로드 / GIF 링크 버튼으로 삽입하세요.',
            components: { input: GalleryGifInput },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'date',
            title: 'Date',
            type: 'string',
            description: 'Format: YYYY.MM.DD (e.g. 2026.02.27)',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            description: '글 사이에 GIF를 넣을 수 있어요. 편집 후 Publish하면 갤러리에 반영됩니다.',
            components: { input: GalleryGifInput },
        }),
        defineField({
            name: 'images',
            title: 'Images',
            type: 'array',
            of: [{ type: 'image' }],
            options: { layout: 'grid' },
            validation: (Rule) => Rule.required().min(1),
        }),
    ],
    preview: {
        select: { title: 'title', media: 'images.0' },
        prepare({ title, media }) {
            return { title: galleryPlainText(title || ''), media }
        },
    },
})
