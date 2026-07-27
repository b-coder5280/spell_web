import { defineField, defineType } from 'sanity'
import { defaultOpeningPageSettings } from '../../lib/site-content'

export const openingType = defineType({
    name: 'opening',
    title: 'Opening Content',
    type: 'document',
    groups: [
        { name: 'main', title: 'Main Opening Content' },
        { name: 'labels', title: 'Page Labels' },
        { name: 'apply', title: 'Apply Box' },
    ],
    initialValue: defaultOpeningPageSettings,
    fields: [
        defineField({
            name: 'pageTitle',
            title: 'Card Title',
            type: 'string',
            group: 'labels',
        }),
        defineField({
            name: 'positionTitle',
            title: 'Position Section Title',
            type: 'string',
            group: 'labels',
        }),
        defineField({
            name: 'researchAreasHeading',
            title: 'Research Areas Heading',
            type: 'string',
            group: 'labels',
        }),
        defineField({
            name: 'openingPositionsHeading',
            title: 'Opening Positions Heading',
            type: 'string',
            group: 'labels',
        }),
        defineField({
            name: 'eligibilityHeading',
            title: 'Eligibility Heading',
            type: 'string',
            group: 'labels',
        }),
        defineField({
            name: 'howToApplyHeading',
            title: 'How to Apply Heading',
            type: 'string',
            group: 'labels',
        }),
        defineField({
            name: 'applyBoxTitle',
            title: 'Apply Box Title',
            type: 'string',
            group: 'apply',
        }),
        defineField({
            name: 'applyBoxDescription',
            title: 'Apply Box Description',
            type: 'text',
            group: 'apply',
        }),
        defineField({
            name: 'applyButtonLabel',
            title: 'Apply Button Label',
            type: 'string',
            group: 'apply',
        }),
        defineField({
            name: 'applyEmail',
            title: 'Apply Email',
            type: 'string',
            group: 'apply',
        }),
        defineField({
            name: 'koreanDescription',
            title: 'Korean Description (Bullet Points)',
            type: 'array',
            of: [{ type: 'text' }],
            group: 'main',
        }),
        defineField({
            name: 'englishIntro',
            title: 'English Intro Text',
            type: 'text',
            group: 'main',
        }),
        defineField({
            name: 'researchAreas',
            title: 'Research Areas',
            type: 'array',
            group: 'main',
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
            group: 'main',
        }),
        defineField({
            name: 'eligibility',
            title: 'Eligibility & Requirements',
            type: 'array',
            of: [{ type: 'text' }],
            group: 'main',
        }),
        defineField({
            name: 'howToApply',
            title: 'How to Apply',
            type: 'text',
            group: 'main',
        }),
    ],
})
