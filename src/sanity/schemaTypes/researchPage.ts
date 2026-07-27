import { defineField, defineType } from 'sanity'
import { defaultResearchPageSettings } from '../../lib/site-content'

export const researchPageType = defineType({
    name: 'researchPage',
    title: 'Research Page',
    type: 'document',
    initialValue: {
        title: defaultResearchPageSettings.title,
        intro: defaultResearchPageSettings.intro,
        cardActionLabel: defaultResearchPageSettings.cardActionLabel,
        overviewImageAlt: defaultResearchPageSettings.overviewImageAlt,
        modalDetailsTitle: defaultResearchPageSettings.modalDetailsTitle,
    },
    fields: [
        defineField({ name: 'title', title: 'Page Title', type: 'string' }),
        defineField({ name: 'intro', title: 'Intro Text', type: 'text' }),
        defineField({ name: 'cardActionLabel', title: 'Card Action Label', type: 'string' }),
        defineField({
            name: 'overviewImage',
            title: 'Overview Image',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({ name: 'overviewImageAlt', title: 'Overview Image Alt Text', type: 'string' }),
        defineField({ name: 'modalDetailsTitle', title: 'Modal Details Heading', type: 'string' }),
    ],
})
