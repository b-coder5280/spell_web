import { defineField, defineType } from 'sanity'
import { defaultGalleryPageSettings } from '../../lib/site-content'

export const galleryPageType = defineType({
    name: 'galleryPage',
    title: 'Gallery Page',
    type: 'document',
    initialValue: defaultGalleryPageSettings,
    fields: [
        defineField({ name: 'eyebrow', title: 'Small Heading', type: 'string' }),
        defineField({ name: 'title', title: 'Page Title', type: 'string' }),
        defineField({ name: 'description', title: 'Page Description', type: 'text' }),
        defineField({ name: 'albumsLabel', title: 'Albums Count Label', type: 'string' }),
        defineField({ name: 'viewAlbumLabel', title: 'View Album Button Label', type: 'string' }),
        defineField({ name: 'noImageLabel', title: 'No Image Label', type: 'string' }),
        defineField({ name: 'previousImageLabel', title: 'Previous Image Accessibility Label', type: 'string' }),
        defineField({ name: 'nextImageLabel', title: 'Next Image Accessibility Label', type: 'string' }),
        defineField({ name: 'showImageLabel', title: 'Dot Button Accessibility Label Prefix', type: 'string' }),
    ],
})
