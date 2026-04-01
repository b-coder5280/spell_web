import { defineField, defineType } from 'sanity'

export const memberType = defineType({
    name: 'member',
    title: 'Member',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'role',
            title: 'Role Group',
            type: 'string',
            options: {
                list: [
                    { title: 'Post Doc.', value: 'Post Doc.' },
                    { title: 'M.S./Ph.D. Candidates', value: 'M.S./Ph.D. Candidates' },
                    { title: 'M.S. Candidates', value: 'M.S. Candidates' },
                    { title: 'Intern', value: 'Intern' },
                    { title: 'Alumni', value: 'Alumni' },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'order',
            title: 'Order',
            type: 'number',
            description: '순서 (숫자가 작을수록 먼저 표시됩니다. 예: 1, 2, 3...)',
            initialValue: 0
        }),
        defineField({
            name: 'interest',
            title: 'Research Interest',
            type: 'string',
        }),
        defineField({
            name: 'email',
            title: 'Email',
            type: 'string',
        }),
        defineField({
            name: 'image',
            title: 'Profile Image',
            type: 'image',
            options: { hotspot: true },
        }),
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'role',
            media: 'image',
        },
    },
})
