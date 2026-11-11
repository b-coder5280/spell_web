import { defineField, defineType } from 'sanity'
import { defaultNewsPageSettings } from '../../lib/site-content'
import { FormattedTextInput } from '../components/gallery-gif-input'

export const newsPageType = defineType({
    name: 'newsPage',
    title: 'News Page',
    type: 'document',
    initialValue: defaultNewsPageSettings,
    fields: [
        defineField({ name: 'title', title: 'Page Title', type: 'string', components: { input: FormattedTextInput } }),
        defineField({ name: 'subtitle', title: 'Page Subtitle', type: 'text', components: { input: FormattedTextInput } }),
        defineField({
            name: 'filters',
            title: 'Filter Buttons',
            type: 'array',
            description: 'The first item is usually All. Other items should match News category values.',
            of: [{ type: 'string' }],
        }),
        defineField({ name: 'readMoreLabel', title: 'Read More Label', type: 'string' }),
        defineField({ name: 'emptyMessage', title: 'Empty Category Message', type: 'string' }),
        defineField({ name: 'noImageLabel', title: 'No Image Label', type: 'string' }),
        defineField({ name: 'noDetailsLabel', title: 'No Details Label', type: 'string' }),
        defineField({ name: 'carouselPreviousLabel', title: 'Previous Image Button Label', type: 'string' }),
        defineField({ name: 'carouselNextLabel', title: 'Next Image Button Label', type: 'string' }),
        defineField({ name: 'slideAltPrefix', title: 'Slide Image Alt Prefix', type: 'string' }),
    ],
})
