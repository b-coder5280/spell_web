import { defineField, defineType } from 'sanity'
import { defaultPublicationPageSettings } from '../../lib/site-content'

export const publicationPageType = defineType({
    name: 'publicationPage',
    title: 'Publications Page',
    type: 'document',
    initialValue: defaultPublicationPageSettings,
    fields: [
        defineField({ name: 'title', title: 'Page Title', type: 'string' }),
        defineField({ name: 'allFilterLabel', title: 'All Filter Label', type: 'string' }),
        defineField({ name: 'selectedFilterLabel', title: 'Selected Filter Label', type: 'string' }),
        defineField({ name: 'selectedBadgeLabel', title: 'Selected Badge Label', type: 'string' }),
        defineField({ name: 'pdfButtonTitle', title: 'PDF Button Tooltip', type: 'string' }),
        defineField({ name: 'doiButtonTitle', title: 'DOI Button Tooltip', type: 'string' }),
    ],
})
