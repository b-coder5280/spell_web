import { defineField, defineType } from 'sanity'

export const newsType = defineType({
    name: 'news',
    title: 'News',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
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
            options: {
                list: [
                    { title: 'Award', value: 'Award' },
                    { title: 'Conference', value: 'Conference' },
                    { title: 'Published', value: 'Published' },
                    { title: 'Grant', value: 'Grant' },
                    { title: 'General', value: 'General' },
                ],
            },
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
        }),
    ],
})
