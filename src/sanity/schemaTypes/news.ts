import { defineField, defineType } from 'sanity'
import { FormattedTextInput } from '../components/gallery-gif-input'
import { galleryPlainText } from '../../lib/gallery-text'

export const newsType = defineType({
    name: 'news',
    title: 'News',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            components: { input: FormattedTextInput },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'date',
            title: 'Date',
            type: 'string',
            description: 'Format: YYYY.MM (e.g. 2026.02)',
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            description: 'Use values listed in News Page > Filter Buttons if you want this category to be filterable.',
        }),
        defineField({
            name: 'image',
            title: 'Main Image',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'detailImages',
            title: 'Detail Images',
            type: 'array',
            of: [{ type: 'image' }],
            options: { layout: 'grid' },
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            components: { input: FormattedTextInput },
        }),
    ],
    preview: {
        select: { title: 'title', media: 'image' },
        prepare({ title, media }) {
            return { title: galleryPlainText(title || ''), media }
        },
    },
})
