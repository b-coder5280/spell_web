import { defineField, defineType } from 'sanity'

export const publicationType = defineType({
    name: 'publication',
    title: 'Publication',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'authors',
            title: 'Authors',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'journal',
            title: 'Journal',
            type: 'string',
        }),
        defineField({
            name: 'year',
            title: 'Year',
            type: 'number',
        }),
        defineField({
            name: 'order',
            title: 'Display Order',
            type: 'number',
            description: 'Smaller numbers appear first. Leave empty to sort by year.',
        }),
        defineField({
            name: 'volume',
            title: 'Volume',
            type: 'string',
        }),
        defineField({
            name: 'selected',
            title: 'Selected Publication (Shows on Home/Highlight)',
            type: 'boolean',
            initialValue: false,
        }),
        defineField({
            name: 'doi',
            title: 'DOI Link',
            type: 'url',
        }),
        defineField({
            name: 'image',
            title: 'Paper Image',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'description',
            title: 'Short Description',
            type: 'text',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'journal',
            media: 'image',
        },
    },
})
