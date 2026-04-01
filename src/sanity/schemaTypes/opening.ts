import { defineField, defineType } from 'sanity'

export const openingType = defineType({
    name: 'opening',
    title: 'Opening / Home Page (Singleton)',
    type: 'document',
    fields: [
        defineField({
            name: 'koreanDescription',
            title: 'Korean Description (Bullet Points)',
            type: 'array',
            of: [{ type: 'text' }],
        }),
        defineField({
            name: 'englishIntro',
            title: 'English Intro Text',
            type: 'text',
        }),
        defineField({
            name: 'researchAreas',
            title: 'Research Areas',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'title', title: 'Title', type: 'string' },
                        { name: 'description', title: 'Description', type: 'text' }
                    ]
                }
            ],
        }),
        defineField({
            name: 'openingPositions',
            title: 'Opening Positions',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'eligibility',
            title: 'Eligibility & Requirements',
            type: 'array',
            of: [{ type: 'text' }],
        }),
        defineField({
            name: 'howToApply',
            title: 'How to Apply',
            type: 'text',
        }),
    ],
})
