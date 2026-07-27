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
            description: 'Use the same group names listed in Members Page > Role Group Display Order.',
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
