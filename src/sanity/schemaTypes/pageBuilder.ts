import { defineArrayMember, defineField, defineType } from 'sanity'

const backgroundOptions = [
    { title: 'White', value: 'white' },
    { title: 'Light', value: 'light' },
    { title: 'Dark', value: 'dark' },
    { title: 'Brand', value: 'brand' },
    { title: 'Subtle', value: 'subtle' },
]

const widthOptions = [
    { title: 'Narrow', value: 'narrow' },
    { title: 'Normal', value: 'normal' },
    { title: 'Wide', value: 'wide' },
    { title: 'Full', value: 'full' },
]

const spacingOptions = [
    { title: 'None', value: 'none' },
    { title: 'Small', value: 'small' },
    { title: 'Medium', value: 'medium' },
    { title: 'Large', value: 'large' },
    { title: 'Extra Large', value: 'xlarge' },
]

const alignmentOptions = [
    { title: 'Left', value: 'left' },
    { title: 'Center', value: 'center' },
]

const columnsOptions = [
    { title: '2 columns', value: 2 },
    { title: '3 columns', value: 3 },
    { title: '4 columns', value: 4 },
]

const limitOptions = [
    { title: '3 items', value: 3 },
    { title: '4 items', value: 4 },
    { title: '6 items', value: 6 },
    { title: '8 items', value: 8 },
]

const sectionSettingsField = defineField({
    name: 'settings',
    title: 'Section Settings',
    type: 'sectionSettings',
})

const titleField = defineField({
    name: 'title',
    title: 'Title',
    type: 'string',
})

const subtitleField = defineField({
    name: 'subtitle',
    title: 'Subtitle',
    type: 'text',
    rows: 3,
})

const ctaFields = [
    defineField({
        name: 'primaryCta',
        title: 'Primary CTA',
        type: 'cmsLink',
    }),
    defineField({
        name: 'secondaryCta',
        title: 'Secondary CTA',
        type: 'cmsLink',
    }),
]

const defaultSectionSettings = {
    enabled: true,
    background: 'white',
    contentWidth: 'wide',
    spacingTop: 'large',
    spacingBottom: 'large',
}

function sectionPreview(label: string, subtitleFieldName = 'layout') {
    return {
        select: {
            title: 'title',
            subtitle: subtitleFieldName,
            enabled: 'settings.enabled',
        },
        prepare({ title, subtitle, enabled }: { title?: string; subtitle?: string; enabled?: boolean }) {
            const state = enabled === false ? 'Disabled' : subtitle
            return {
                title: `${label}${title ? ` - ${title}` : ''}`,
                subtitle: state || 'Current preset',
            }
        },
    }
}

export const sectionSettingsType = defineType({
    name: 'sectionSettings',
    title: 'Section Settings',
    type: 'object',
    fields: [
        defineField({
            name: 'enabled',
            title: 'Enabled',
            type: 'boolean',
            initialValue: true,
        }),
        defineField({
            name: 'background',
            title: 'Background',
            type: 'string',
            options: { list: backgroundOptions, layout: 'radio' },
            initialValue: 'white',
        }),
        defineField({
            name: 'contentWidth',
            title: 'Content Width',
            type: 'string',
            options: { list: widthOptions, layout: 'radio' },
            initialValue: 'normal',
        }),
        defineField({
            name: 'spacingTop',
            title: 'Top Spacing',
            type: 'string',
            options: { list: spacingOptions, layout: 'dropdown' },
            initialValue: 'large',
        }),
        defineField({
            name: 'spacingBottom',
            title: 'Bottom Spacing',
            type: 'string',
            options: { list: spacingOptions, layout: 'dropdown' },
            initialValue: 'large',
        }),
        defineField({
            name: 'anchorId',
            title: 'Anchor ID',
            type: 'string',
            description: 'Optional in-page anchor. Use letters, numbers, hyphens, and underscores only.',
            validation: (Rule) =>
                Rule.regex(/^[A-Za-z0-9_-]*$/, {
                    name: 'anchor',
                    invert: false,
                }).warning('Anchor IDs should use only letters, numbers, hyphens, and underscores.'),
        }),
    ],
    preview: {
        select: {
            enabled: 'enabled',
            background: 'background',
            width: 'contentWidth',
        },
        prepare({ enabled, background, width }: { enabled?: boolean; background?: string; width?: string }) {
            return {
                title: enabled === false ? 'Disabled section' : 'Enabled section',
                subtitle: `${background || 'white'} / ${width || 'normal'}`,
            }
        },
    },
})

export const cmsLinkType = defineType({
    name: 'cmsLink',
    title: 'Link',
    type: 'object',
    fields: [
        defineField({
            name: 'label',
            title: 'Label',
            type: 'string',
            validation: (Rule) =>
                Rule.custom((label, context) => {
                    const parent = context.parent as { internalRoute?: string; externalUrl?: string; email?: string } | undefined
                    if (!label && (parent?.internalRoute || parent?.externalUrl || parent?.email)) {
                        return 'Add a label for this link.'
                    }
                    return true
                }),
        }),
        defineField({
            name: 'linkType',
            title: 'Link Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Internal route', value: 'internal' },
                    { title: 'External URL', value: 'external' },
                    { title: 'Email', value: 'email' },
                ],
                layout: 'radio',
            },
            initialValue: 'internal',
        }),
        defineField({
            name: 'internalRoute',
            title: 'Internal Route',
            type: 'string',
            description: 'Use current routes such as /research, /publication, /members, /news, /gallery, or /opening.',
            hidden: ({ parent }) => parent?.linkType && parent.linkType !== 'internal',
        }),
        defineField({
            name: 'externalUrl',
            title: 'External URL',
            type: 'url',
            hidden: ({ parent }) => parent?.linkType !== 'external',
            validation: (Rule) =>
                Rule.uri({
                    scheme: ['http', 'https', 'mailto'],
                    allowRelative: false,
                }),
        }),
        defineField({
            name: 'email',
            title: 'Email Address',
            type: 'string',
            hidden: ({ parent }) => parent?.linkType !== 'email',
            validation: (Rule) => Rule.email().warning(),
        }),
        defineField({
            name: 'openInNewTab',
            title: 'Open in New Tab',
            type: 'boolean',
            initialValue: false,
            hidden: ({ parent }) => parent?.linkType !== 'external',
        }),
    ],
    preview: {
        select: {
            title: 'label',
            type: 'linkType',
            internalRoute: 'internalRoute',
            externalUrl: 'externalUrl',
            email: 'email',
        },
        prepare({ title, type, internalRoute, externalUrl, email }: { title?: string; type?: string; internalRoute?: string; externalUrl?: string; email?: string }) {
            return {
                title: title || 'Link',
                subtitle: type === 'external' ? externalUrl : type === 'email' ? email : internalRoute,
            }
        },
    },
})

export const richTextType = defineType({
    name: 'richText',
    title: 'Rich Text',
    type: 'array',
    of: [
        defineArrayMember({
            type: 'block',
            styles: [
                { title: 'Normal', value: 'normal' },
                { title: 'Heading 2', value: 'h2' },
                { title: 'Heading 3', value: 'h3' },
                { title: 'Quote', value: 'blockquote' },
            ],
            lists: [
                { title: 'Bulleted', value: 'bullet' },
                { title: 'Numbered', value: 'number' },
            ],
            marks: {
                decorators: [
                    { title: 'Strong', value: 'strong' },
                    { title: 'Emphasis', value: 'em' },
                ],
                annotations: [
                    {
                        name: 'link',
                        title: 'Link',
                        type: 'object',
                        fields: [
                            defineField({
                                name: 'href',
                                title: 'URL',
                                type: 'url',
                                validation: (Rule) =>
                                    Rule.uri({
                                        scheme: ['http', 'https', 'mailto'],
                                        allowRelative: true,
                                    }),
                            }),
                        ],
                    },
                ],
            },
        }),
    ],
})

export const heroSectionType = defineType({
    name: 'heroSection',
    title: 'Hero',
    type: 'object',
    initialValue: {
        settings: { ...defaultSectionSettings, spacingTop: 'none', spacingBottom: 'none' },
        layout: 'current',
        height: 'large',
        title: 'Semiconductor Photonics and Electronics Lab',
        primaryCta: { label: 'Research Areas', linkType: 'internal', internalRoute: '/research' },
        secondaryCta: { label: 'Join Us', linkType: 'internal', internalRoute: '/opening' },
    },
    fields: [
        sectionSettingsField,
        defineField({
            name: 'layout',
            title: 'Layout',
            type: 'string',
            options: {
                list: [
                    { title: 'Current', value: 'current' },
                    { title: 'Centered', value: 'centered' },
                    { title: 'Split', value: 'split' },
                    { title: 'Minimal', value: 'minimal' },
                ],
                layout: 'radio',
            },
            initialValue: 'current',
        }),
        defineField({
            name: 'height',
            title: 'Height',
            type: 'string',
            options: {
                list: [
                    { title: 'Compact', value: 'compact' },
                    { title: 'Medium', value: 'medium' },
                    { title: 'Large', value: 'large' },
                    { title: 'Viewport', value: 'viewport' },
                ],
                layout: 'radio',
            },
            initialValue: 'large',
        }),
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) =>
                Rule.custom((title, context) => {
                    const parent = context.parent as { settings?: { enabled?: boolean } } | undefined
                    if (parent?.settings?.enabled !== false && !title) return 'Hero title is required when enabled.'
                    return true
                }),
        }),
        subtitleField,
        defineField({
            name: 'backgroundImage',
            title: 'Background Image',
            type: 'image',
            options: { hotspot: true },
            fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }],
        }),
        defineField({
            name: 'overlayStrength',
            title: 'Overlay Strength',
            type: 'string',
            options: {
                list: [
                    { title: 'None', value: 'none' },
                    { title: 'Light', value: 'light' },
                    { title: 'Medium', value: 'medium' },
                    { title: 'Strong', value: 'strong' },
                ],
                layout: 'radio',
            },
            initialValue: 'none',
        }),
        ...ctaFields,
    ],
    preview: sectionPreview('Hero'),
})

export const researchSectionType = defineType({
    name: 'researchSection',
    title: 'Research',
    type: 'object',
    initialValue: {
        settings: { ...defaultSectionSettings, background: 'light' },
        title: 'Research',
        description: 'Introduce selected research areas.',
        layout: 'cards',
        source: 'latest',
        columns: 3,
        showCta: true,
        cta: { label: 'View research', linkType: 'internal', internalRoute: '/research' },
    },
    fields: [
        sectionSettingsField,
        titleField,
        defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
        defineField({
            name: 'layout',
            title: 'Layout',
            type: 'string',
            options: {
                list: [
                    { title: 'Cards', value: 'cards' },
                    { title: 'Compact Cards', value: 'compactCards' },
                    { title: 'Split Introduction + Cards', value: 'splitIntroCards' },
                ],
                layout: 'radio',
            },
            initialValue: 'cards',
        }),
        defineField({ name: 'columns', title: 'Columns', type: 'number', options: { list: columnsOptions }, initialValue: 3 }),
        defineField({
            name: 'source',
            title: 'Item Source',
            type: 'string',
            options: {
                list: [
                    { title: 'Latest research documents', value: 'latest' },
                    { title: 'Manual selection', value: 'manual' },
                ],
                layout: 'radio',
            },
            initialValue: 'latest',
        }),
        defineField({
            name: 'selectedResearch',
            title: 'Selected Research',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'research' }] }],
            hidden: ({ parent }) => parent?.source !== 'manual',
        }),
        defineField({ name: 'showCta', title: 'Show CTA', type: 'boolean', initialValue: true }),
        defineField({ name: 'cta', title: 'CTA', type: 'cmsLink' }),
    ],
    preview: sectionPreview('Research'),
})

export const joinSectionType = defineType({
    name: 'joinSection',
    title: 'Join Our Lab',
    type: 'object',
    initialValue: {
        settings: defaultSectionSettings,
        layout: 'current',
        title: 'Join Our Lab',
        showOpeningContent: true,
        primaryCta: { label: 'Contact Prof. Kim', linkType: 'email', email: 'hobkim@gist.ac.kr' },
        secondaryCta: { label: 'View Full Opening Details', linkType: 'internal', internalRoute: '/opening' },
    },
    fields: [
        sectionSettingsField,
        defineField({
            name: 'layout',
            title: 'Layout',
            type: 'string',
            options: {
                list: [
                    { title: 'Current', value: 'current' },
                    { title: 'Centered', value: 'centered' },
                    { title: 'Split', value: 'split' },
                ],
                layout: 'radio',
            },
            initialValue: 'current',
        }),
        titleField,
        defineField({ name: 'intro', title: 'Intro', type: 'text', rows: 4 }),
        defineField({
            name: 'showOpeningContent',
            title: 'Use Opening Page Content',
            type: 'boolean',
            description: 'Recommended. Reuses the existing Opening singleton content rather than duplicating it.',
            initialValue: true,
        }),
        defineField({
            name: 'bulletGroups',
            title: 'Optional Bullet Groups',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'heading', title: 'Heading', type: 'string' },
                        { name: 'items', title: 'Items', type: 'array', of: [{ type: 'string' }] },
                    ],
                    preview: { select: { title: 'heading' } },
                },
            ],
        }),
        ...ctaFields,
    ],
    preview: sectionPreview('Join Our Lab'),
})

export const publicationSectionType = defineType({
    name: 'publicationSection',
    title: 'Publications',
    type: 'object',
    initialValue: {
        settings: defaultSectionSettings,
        title: 'Selected Publication',
        subtitle: 'Highlighting our latest breakthroughs.',
        source: 'featured',
        limit: 6,
        layout: 'current',
        columns: 3,
        showImage: true,
        showJournal: true,
        showYear: true,
        showAuthors: true,
        showPaperLink: true,
    },
    fields: [
        sectionSettingsField,
        titleField,
        subtitleField,
        defineField({
            name: 'source',
            title: 'Source',
            type: 'string',
            options: {
                list: [
                    { title: 'Latest', value: 'latest' },
                    { title: 'Featured', value: 'featured' },
                    { title: 'Manual selection', value: 'manual' },
                ],
                layout: 'radio',
            },
            initialValue: 'featured',
        }),
        defineField({ name: 'limit', title: 'Limit', type: 'number', options: { list: limitOptions }, initialValue: 6 }),
        defineField({
            name: 'layout',
            title: 'Layout',
            type: 'string',
            options: {
                list: [
                    { title: 'Current', value: 'current' },
                    { title: 'Grid', value: 'grid' },
                    { title: 'Featured Grid', value: 'featuredGrid' },
                    { title: 'Compact', value: 'compact' },
                ],
                layout: 'radio',
            },
            initialValue: 'current',
        }),
        defineField({ name: 'columns', title: 'Columns', type: 'number', options: { list: columnsOptions }, initialValue: 3 }),
        defineField({
            name: 'selectedPublications',
            title: 'Selected Publications',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'publication' }] }],
            hidden: ({ parent }) => parent?.source !== 'manual',
        }),
        defineField({ name: 'showImage', title: 'Show Image', type: 'boolean', initialValue: true }),
        defineField({ name: 'showJournal', title: 'Show Journal', type: 'boolean', initialValue: true }),
        defineField({ name: 'showYear', title: 'Show Year', type: 'boolean', initialValue: true }),
        defineField({ name: 'showAuthors', title: 'Show Authors', type: 'boolean', initialValue: true }),
        defineField({ name: 'showPaperLink', title: 'Show Paper Link', type: 'boolean', initialValue: true }),
    ],
    preview: {
        select: { title: 'title', source: 'source', limit: 'limit', layout: 'layout', enabled: 'settings.enabled' },
        prepare({ title, source, limit, layout, enabled }: { title?: string; source?: string; limit?: number; layout?: string; enabled?: boolean }) {
            return {
                title: `Publications${title ? ` - ${title}` : ''}`,
                subtitle: enabled === false ? 'Disabled' : `${source || 'featured'} ${limit || 6} - ${layout || 'current'}`,
            }
        },
    },
})

export const newsSectionType = defineType({
    name: 'newsSection',
    title: 'News',
    type: 'object',
    initialValue: {
        settings: { ...defaultSectionSettings, background: 'light' },
        title: 'Latest at SPELL',
        subtitle: 'Latest updates from SPELL Lab.',
        source: 'latest',
        limit: 3,
        layout: 'cards',
        showViewAll: true,
        viewAllCta: { label: 'View all news', linkType: 'internal', internalRoute: '/news' },
    },
    fields: [
        sectionSettingsField,
        titleField,
        subtitleField,
        defineField({
            name: 'source',
            title: 'Source',
            type: 'string',
            options: {
                list: [
                    { title: 'Latest', value: 'latest' },
                    { title: 'Selected', value: 'selected' },
                ],
                layout: 'radio',
            },
            initialValue: 'latest',
        }),
        defineField({ name: 'limit', title: 'Limit', type: 'number', options: { list: limitOptions }, initialValue: 3 }),
        defineField({
            name: 'layout',
            title: 'Layout',
            type: 'string',
            options: {
                list: [
                    { title: 'Cards', value: 'cards' },
                    { title: 'Compact', value: 'compact' },
                    { title: 'List', value: 'list' },
                ],
                layout: 'radio',
            },
            initialValue: 'cards',
        }),
        defineField({ name: 'categoryFilter', title: 'Category Filter', type: 'string' }),
        defineField({
            name: 'selectedNews',
            title: 'Selected News',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'news' }] }],
            hidden: ({ parent }) => parent?.source !== 'selected',
        }),
        defineField({ name: 'showViewAll', title: 'Show View All Button', type: 'boolean', initialValue: true }),
        defineField({ name: 'viewAllCta', title: 'View All CTA', type: 'cmsLink' }),
    ],
    preview: sectionPreview('News'),
})

export const gallerySectionType = defineType({
    name: 'gallerySection',
    title: 'Gallery',
    type: 'object',
    initialValue: {
        settings: defaultSectionSettings,
        title: 'Gallery',
        subtitle: 'Recent moments from the lab.',
        layout: 'grid',
        limit: 4,
    },
    fields: [
        sectionSettingsField,
        titleField,
        subtitleField,
        defineField({
            name: 'layout',
            title: 'Layout',
            type: 'string',
            options: {
                list: [
                    { title: 'Grid', value: 'grid' },
                    { title: 'Featured Grid', value: 'featuredGrid' },
                    { title: 'Strip', value: 'strip' },
                ],
                layout: 'radio',
            },
            initialValue: 'grid',
        }),
        defineField({ name: 'limit', title: 'Limit', type: 'number', options: { list: limitOptions }, initialValue: 4 }),
        defineField({
            name: 'selectedGallery',
            title: 'Selected Gallery Albums',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'gallery' }] }],
        }),
    ],
    preview: sectionPreview('Gallery'),
})

export const memberSectionType = defineType({
    name: 'memberSection',
    title: 'Members',
    type: 'object',
    initialValue: {
        settings: defaultSectionSettings,
        title: 'Members',
        subtitle: 'Meet the SPELL Lab team.',
        layout: 'cards',
        limit: 4,
    },
    fields: [
        sectionSettingsField,
        titleField,
        subtitleField,
        defineField({
            name: 'layout',
            title: 'Layout',
            type: 'string',
            options: {
                list: [
                    { title: 'Cards', value: 'cards' },
                    { title: 'Compact', value: 'compact' },
                ],
                layout: 'radio',
            },
            initialValue: 'cards',
        }),
        defineField({ name: 'roleFilter', title: 'Optional Role Filter', type: 'string' }),
        defineField({ name: 'limit', title: 'Limit', type: 'number', options: { list: limitOptions }, initialValue: 4 }),
        defineField({
            name: 'selectedMembers',
            title: 'Selected Members',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'member' }] }],
        }),
    ],
    preview: sectionPreview('Members'),
})

export const textSectionType = defineType({
    name: 'textSection',
    title: 'Text',
    type: 'object',
    initialValue: {
        settings: defaultSectionSettings,
        title: 'Section Title',
        alignment: 'left',
    },
    fields: [
        sectionSettingsField,
        titleField,
        defineField({
            name: 'alignment',
            title: 'Alignment',
            type: 'string',
            options: { list: alignmentOptions, layout: 'radio' },
            initialValue: 'left',
        }),
        defineField({ name: 'body', title: 'Body', type: 'richText' }),
    ],
    preview: sectionPreview('Text', 'alignment'),
})

export const textImageSectionType = defineType({
    name: 'textImageSection',
    title: 'Text + Image',
    type: 'object',
    initialValue: {
        settings: defaultSectionSettings,
        title: 'Section Title',
        layout: 'imageRight',
    },
    fields: [
        sectionSettingsField,
        titleField,
        defineField({ name: 'body', title: 'Body', type: 'richText' }),
        defineField({
            name: 'layout',
            title: 'Layout',
            type: 'string',
            options: {
                list: [
                    { title: 'Image Left', value: 'imageLeft' },
                    { title: 'Image Right', value: 'imageRight' },
                    { title: 'Image Top', value: 'imageTop' },
                    { title: 'Text Only', value: 'textOnly' },
                ],
                layout: 'radio',
            },
            initialValue: 'imageRight',
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: { hotspot: true },
            fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }],
        }),
        defineField({ name: 'cta', title: 'CTA', type: 'cmsLink' }),
    ],
    preview: sectionPreview('Text + Image'),
})

export const statsSectionType = defineType({
    name: 'statsSection',
    title: 'Stats',
    type: 'object',
    initialValue: {
        settings: { ...defaultSectionSettings, background: 'light' },
        title: 'SPELL at a Glance',
        items: [
            { _key: 'stat-publications', value: '40+', label: 'Publications' },
            { _key: 'stat-members', value: '10+', label: 'Members' },
            { _key: 'stat-projects', value: '5+', label: 'Projects' },
        ],
    },
    fields: [
        sectionSettingsField,
        titleField,
        subtitleField,
        defineField({
            name: 'items',
            title: 'Stats',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'value', title: 'Value', type: 'string' },
                        { name: 'label', title: 'Label', type: 'string' },
                        { name: 'description', title: 'Description', type: 'string' },
                    ],
                    preview: { select: { title: 'value', subtitle: 'label' } },
                },
            ],
            validation: (Rule) => Rule.max(4).warning('Use 2-4 stats to keep the layout balanced.'),
        }),
    ],
    preview: sectionPreview('Stats'),
})

export const ctaSectionType = defineType({
    name: 'ctaSection',
    title: 'CTA',
    type: 'object',
    initialValue: {
        settings: defaultSectionSettings,
        preset: 'centered',
        title: 'Join SPELL Lab',
        description: 'Explore open positions and collaboration opportunities.',
        primaryCta: { label: 'Opening', linkType: 'internal', internalRoute: '/opening' },
    },
    fields: [
        sectionSettingsField,
        defineField({
            name: 'preset',
            title: 'Preset',
            type: 'string',
            options: {
                list: [
                    { title: 'Simple', value: 'simple' },
                    { title: 'Centered', value: 'centered' },
                    { title: 'Banner', value: 'banner' },
                ],
                layout: 'radio',
            },
            initialValue: 'centered',
        }),
        titleField,
        defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
        ...ctaFields,
    ],
    preview: sectionPreview('CTA', 'preset'),
})

export const pageBuilderTypes = [
    sectionSettingsType,
    cmsLinkType,
    richTextType,
    heroSectionType,
    researchSectionType,
    joinSectionType,
    publicationSectionType,
    newsSectionType,
    gallerySectionType,
    memberSectionType,
    textSectionType,
    textImageSectionType,
    statsSectionType,
    ctaSectionType,
]
