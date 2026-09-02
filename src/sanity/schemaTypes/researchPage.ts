import { defineField, defineType } from 'sanity'
import { defaultResearchPageParts } from '../../lib/research-page-layout'
import { defaultResearchPageSettings } from '../../lib/site-content'

export const researchPageType = defineType({
    name: 'researchPage',
    title: 'Research Page',
    type: 'document',
    groups: [
        { name: 'layout', title: 'Page Parts' },
        { name: 'content', title: 'Text / Image' },
    ],
    initialValue: {
        title: defaultResearchPageSettings.title,
        intro: defaultResearchPageSettings.intro,
        cardActionLabel: defaultResearchPageSettings.cardActionLabel,
        overviewImageAlt: defaultResearchPageSettings.overviewImageAlt,
        modalDetailsTitle: defaultResearchPageSettings.modalDetailsTitle,
        layoutGuide: [
            '여기서 /research 페이지의 큰 파트 순서를 바꿀 수 있습니다.',
            'Research Cards = 연구 카드 6개 영역',
            'Overview Image = 전체 연구 그림 영역',
            '왼쪽 핸들로 드래그해서 순서를 바꾸고, Enabled를 끄면 숨겨집니다.',
        ].join('\n'),
        pageParts: defaultResearchPageParts,
    },
    fields: [
        defineField({
            name: 'layoutGuide',
            title: 'How to Move Research Page Parts',
            type: 'text',
            rows: 5,
            group: 'layout',
            readOnly: true,
        }),
        defineField({
            name: 'pageParts',
            title: 'Page Parts - Drag to Reorder',
            type: 'array',
            group: 'layout',
            description: 'Move, hide, and configure the main /research page parts. This is a safe Google-Sites-like section order editor.',
            initialValue: defaultResearchPageParts,
            of: [
                {
                    type: 'object',
                    name: 'researchPagePart',
                    title: 'Research Page Part',
                    fields: [
                        defineField({
                            name: 'partType',
                            title: 'Part',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'Research Cards', value: 'researchCards' },
                                    { title: 'Overview Image', value: 'overviewImage' },
                                ],
                                layout: 'radio',
                            },
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: 'enabled',
                            title: 'Enabled',
                            type: 'boolean',
                            initialValue: true,
                        }),
                        defineField({
                            name: 'title',
                            title: 'Override Title',
                            type: 'string',
                            description: 'Optional. Leave empty to use the main Research Page title.',
                            hidden: ({ parent }) => parent?.partType !== 'researchCards',
                        }),
                        defineField({
                            name: 'intro',
                            title: 'Override Intro',
                            type: 'text',
                            rows: 3,
                            description: 'Optional. Leave empty to use the main intro text.',
                            hidden: ({ parent }) => parent?.partType !== 'researchCards',
                        }),
                        defineField({
                            name: 'layout',
                            title: 'Cards Layout',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'Grid', value: 'grid' },
                                    { title: 'Compact', value: 'compact' },
                                    { title: 'Featured intro + grid', value: 'featuredIntro' },
                                ],
                                layout: 'radio',
                            },
                            initialValue: 'grid',
                            hidden: ({ parent }) => parent?.partType !== 'researchCards',
                        }),
                        defineField({
                            name: 'columns',
                            title: 'Desktop Columns',
                            type: 'number',
                            options: {
                                list: [
                                    { title: '2 columns', value: 2 },
                                    { title: '3 columns', value: 3 },
                                ],
                            },
                            initialValue: 3,
                            hidden: ({ parent }) => parent?.partType !== 'researchCards',
                        }),
                        defineField({
                            name: 'imageLayout',
                            title: 'Image Layout',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'Contained', value: 'contained' },
                                    { title: 'Full width', value: 'full' },
                                ],
                                layout: 'radio',
                            },
                            initialValue: 'contained',
                            hidden: ({ parent }) => parent?.partType !== 'overviewImage',
                        }),
                    ],
                    preview: {
                        select: {
                            partType: 'partType',
                            enabled: 'enabled',
                            layout: 'layout',
                            columns: 'columns',
                            imageLayout: 'imageLayout',
                        },
                        prepare({
                            partType,
                            enabled,
                            layout,
                            columns,
                            imageLayout,
                        }: {
                            partType?: string
                            enabled?: boolean
                            layout?: string
                            columns?: number
                            imageLayout?: string
                        }) {
                            const title = partType === 'overviewImage' ? 'Overview Image' : 'Research Cards'
                            const subtitle = partType === 'overviewImage'
                                ? imageLayout || 'contained'
                                : `${layout || 'grid'} / ${columns || 3} columns`

                            return {
                                title: enabled === false ? `${title} - hidden` : title,
                                subtitle,
                            }
                        },
                    },
                },
            ],
        }),
        defineField({ name: 'title', title: 'Page Title', type: 'string', group: 'content' }),
        defineField({ name: 'intro', title: 'Intro Text', type: 'text', group: 'content' }),
        defineField({ name: 'cardActionLabel', title: 'Card Action Label', type: 'string', group: 'content' }),
        defineField({
            name: 'overviewImage',
            title: 'Overview Image',
            type: 'image',
            options: { hotspot: true },
            group: 'content',
        }),
        defineField({ name: 'overviewImageAlt', title: 'Overview Image Alt Text', type: 'string', group: 'content' }),
        defineField({ name: 'modalDetailsTitle', title: 'Modal Details Heading', type: 'string', group: 'content' }),
    ],
})
