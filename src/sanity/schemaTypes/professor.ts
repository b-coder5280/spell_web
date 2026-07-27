import { defineField, defineType } from 'sanity'
import { defaultProfessorPageSettings } from '../../lib/site-content'

export const professorType = defineType({
    name: 'professor',
    title: 'Professor Page (Singleton)',
    type: 'document',
    groups: [
        { name: 'profile', title: 'Profile Sidebar' },
        { name: 'contact', title: 'Main Contact Block' },
        { name: 'tabs', title: 'Tabs' },
    ],
    initialValue: {
        profileName: defaultProfessorPageSettings.profileName,
        profileTitle: defaultProfessorPageSettings.profileTitle,
        scholarButtonLabel: defaultProfessorPageSettings.scholarButtonLabel,
        scholarUrl: defaultProfessorPageSettings.scholarUrl,
        pageTitle: defaultProfessorPageSettings.pageTitle,
        contactLines: defaultProfessorPageSettings.contactLines,
        educationTabLabel: defaultProfessorPageSettings.educationTabLabel,
        grantsTabLabel: defaultProfessorPageSettings.grantsTabLabel,
        awardsTabLabel: defaultProfessorPageSettings.awardsTabLabel,
    },
    fields: [
        defineField({
            name: 'profileImage',
            title: 'Profile Image',
            type: 'image',
            options: { hotspot: true },
            group: 'profile',
        }),
        defineField({
            name: 'profileName',
            title: 'Profile Name',
            type: 'string',
            group: 'profile',
        }),
        defineField({
            name: 'profileTitle',
            title: 'Profile Title',
            type: 'string',
            group: 'profile',
        }),
        defineField({
            name: 'scholarButtonLabel',
            title: 'Scholar Button Label',
            type: 'string',
            group: 'profile',
        }),
        defineField({
            name: 'scholarUrl',
            title: 'Scholar Button URL',
            type: 'url',
            group: 'profile',
        }),
        defineField({
            name: 'pageTitle',
            title: 'Main Heading',
            type: 'string',
            group: 'contact',
        }),
        defineField({
            name: 'contactLines',
            title: 'Contact Lines',
            type: 'array',
            of: [{ type: 'string' }],
            group: 'contact',
        }),
        defineField({
            name: 'educationTabLabel',
            title: 'Education Tab Label',
            type: 'string',
            group: 'tabs',
        }),
        defineField({
            name: 'grantsTabLabel',
            title: 'Grants Tab Label',
            type: 'string',
            group: 'tabs',
        }),
        defineField({
            name: 'awardsTabLabel',
            title: 'Awards Tab Label',
            type: 'string',
            group: 'tabs',
        }),
        defineField({
            name: 'education',
            title: 'Education & Experience',
            type: 'array',
            group: 'tabs',
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
            group: 'tabs',
        }),
        defineField({
            name: 'awards',
            title: 'Awards & Honors',
            type: 'array',
            of: [{ type: 'text' }],
            group: 'tabs',
        }),
    ],
})
