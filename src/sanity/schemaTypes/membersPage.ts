import { defineField, defineType } from 'sanity'
import { defaultMembersPageSettings } from '../../lib/site-content'

export const membersPageType = defineType({
    name: 'membersPage',
    title: 'Members Page',
    type: 'document',
    initialValue: defaultMembersPageSettings,
    fields: [
        defineField({ name: 'title', title: 'Page Title', type: 'string' }),
        defineField({
            name: 'roleOrder',
            title: 'Role Group Display Order',
            type: 'array',
            description: 'Role names are shown in this order. Member role values should match these names.',
            of: [{ type: 'string' }],
        }),
        defineField({ name: 'photoPlaceholder', title: 'Missing Photo Placeholder', type: 'string' }),
        defineField({ name: 'linkedinLabel', title: 'LinkedIn Link Label', type: 'string' }),
    ],
})
