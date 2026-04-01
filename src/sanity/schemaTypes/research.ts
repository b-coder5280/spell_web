import { defineField, defineType } from 'sanity'

export const researchType = defineType({
    name: 'research',
    title: 'Research',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'description',
            title: 'Short Description',
            type: 'string',
        }),
        defineField({
            name: 'details',
            title: 'Detailed Description',
            type: 'text',
        }),
        defineField({
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'image',
            title: 'Main Image',
            type: 'image',
            options: { hotspot: true },
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'description',
            media: 'image',
        },
    },
})
