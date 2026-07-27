import { defineField, defineType } from 'sanity'
import { defaultSiteSettings } from '../../lib/site-content'

export const siteSettingsType = defineType({
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    groups: [
        { name: 'seo', title: 'SEO / Browser' },
        { name: 'header', title: 'Header' },
        { name: 'footer', title: 'Footer' },
    ],
    initialValue: {
        metadataTitle: defaultSiteSettings.metadataTitle,
        metadataDescription: defaultSiteSettings.metadataDescription,
        headerLogoAlt: defaultSiteSettings.headerLogoAlt,
        navigation: defaultSiteSettings.navigation,
        joinButtonLabel: defaultSiteSettings.joinButtonLabel,
        joinButtonHref: defaultSiteSettings.joinButtonHref,
        mobileMenuLabel: defaultSiteSettings.mobileMenuLabel,
        footerLogoAlt: defaultSiteSettings.footerLogoAlt,
        footerLabName: defaultSiteSettings.footerLabName,
        footerInstitution: defaultSiteSettings.footerInstitution,
        footerLinksTitle: defaultSiteSettings.footerLinksTitle,
        footerLinks: defaultSiteSettings.footerLinks,
        footerContactTitle: defaultSiteSettings.footerContactTitle,
        footerContactLines: defaultSiteSettings.footerContactLines,
        footerCopyright: defaultSiteSettings.footerCopyright,
    },
    fields: [
        defineField({
            name: 'metadataTitle',
            title: 'Browser Title',
            type: 'string',
            group: 'seo',
        }),
        defineField({
            name: 'metadataDescription',
            title: 'Search Description',
            type: 'text',
            group: 'seo',
        }),
        defineField({
            name: 'favicon',
            title: 'Favicon',
            type: 'image',
            group: 'seo',
        }),
        defineField({
            name: 'headerLogo',
            title: 'Header Logo',
            type: 'image',
            options: { hotspot: true },
            group: 'header',
        }),
        defineField({
            name: 'headerLogoAlt',
            title: 'Header Logo Alt Text',
            type: 'string',
            group: 'header',
        }),
        defineField({
            name: 'navigation',
            title: 'Navigation Items',
            type: 'array',
            group: 'header',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'name', title: 'Menu Label', type: 'string' },
                        { name: 'href', title: 'Link Path', type: 'string' },
                    ],
                    preview: {
                        select: {
                            title: 'name',
                            subtitle: 'href',
                        },
                    },
                },
            ],
        }),
        defineField({
            name: 'joinButtonLabel',
            title: 'Header Button Label',
            type: 'string',
            group: 'header',
        }),
        defineField({
            name: 'joinButtonHref',
            title: 'Header Button Link',
            type: 'string',
            group: 'header',
        }),
        defineField({
            name: 'mobileMenuLabel',
            title: 'Mobile Menu Accessibility Label',
            type: 'string',
            group: 'header',
        }),
        defineField({
            name: 'footerLogo',
            title: 'Footer Logo',
            type: 'image',
            options: { hotspot: true },
            group: 'footer',
        }),
        defineField({
            name: 'footerLogoAlt',
            title: 'Footer Logo Alt Text',
            type: 'string',
            group: 'footer',
        }),
        defineField({
            name: 'footerLabName',
            title: 'Lab Name',
            type: 'string',
            group: 'footer',
        }),
        defineField({
            name: 'footerInstitution',
            title: 'Institution Line',
            type: 'string',
            group: 'footer',
        }),
        defineField({
            name: 'footerLinksTitle',
            title: 'Links Heading',
            type: 'string',
            group: 'footer',
        }),
        defineField({
            name: 'footerLinks',
            title: 'Footer Links',
            type: 'array',
            group: 'footer',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'name', title: 'Link Label', type: 'string' },
                        { name: 'href', title: 'Link Path', type: 'string' },
                    ],
                    preview: {
                        select: {
                            title: 'name',
                            subtitle: 'href',
                        },
                    },
                },
            ],
        }),
        defineField({
            name: 'footerContactTitle',
            title: 'Contact Heading',
            type: 'string',
            group: 'footer',
        }),
        defineField({
            name: 'footerContactLines',
            title: 'Contact Lines',
            type: 'array',
            of: [{ type: 'string' }],
            group: 'footer',
        }),
        defineField({
            name: 'footerCopyright',
            title: 'Copyright Text',
            type: 'string',
            description: 'Use {year} where the current year should appear.',
            group: 'footer',
        }),
    ],
})
