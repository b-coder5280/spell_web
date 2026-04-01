import { defineField, defineType } from 'sanity'

export const professorType = defineType({
    name: 'professor',
    title: 'Professor Page (Singleton)',
    type: 'document',
    fields: [
        defineField({
            name: 'education',
            title: 'Education & Experience',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'role', title: 'Role (e.g., Assistant Professor)', type: 'string' },
                        { name: 'description', title: 'Description (Institution & Year)', type: 'string' },
                        { name: 'highlight', title: 'Highlight Color Line?', type: 'boolean', initialValue: false }
                    ]
                }
            ],
        }),
        defineField({
            name: 'grants',
            title: 'Grants',
            type: 'array',
            of: [{ type: 'text' }],
        }),
        defineField({
            name: 'awards',
            title: 'Awards & Honors',
            type: 'array',
            of: [{ type: 'text' }],
        }),
    ],
})
