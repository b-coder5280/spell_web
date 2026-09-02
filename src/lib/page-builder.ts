export const PAGE_BUILDER_SECTION_TYPES = [
    "heroSection",
    "researchSection",
    "joinSection",
    "publicationSection",
    "newsSection",
    "gallerySection",
    "memberSection",
    "textSection",
    "textImageSection",
    "statsSection",
    "ctaSection",
] as const

export type PageBuilderSectionType = (typeof PAGE_BUILDER_SECTION_TYPES)[number]

export type SectionSettings = {
    enabled?: boolean
    background?: "white" | "light" | "dark" | "brand" | "subtle"
    contentWidth?: "narrow" | "normal" | "wide" | "full"
    spacingTop?: "none" | "small" | "medium" | "large" | "xlarge"
    spacingBottom?: "none" | "small" | "medium" | "large" | "xlarge"
    anchorId?: string
}

export type CmsLink = {
    label?: string
    linkType?: "internal" | "external" | "email"
    internalRoute?: string
    externalUrl?: string
    email?: string
    openInNewTab?: boolean
}

export type PageBuilderSection = {
    _key?: string
    _type?: string
    settings?: SectionSettings
    [key: string]: unknown
}

export type PageBuilderHomeLike = {
    pageBuilderEnabled?: boolean
    sections?: PageBuilderSection[] | null
}

export type LinkItem = {
    name?: string
    label?: string
    href?: string
    linkType?: "internal" | "external" | "email"
    internalRoute?: string
    externalUrl?: string
    email?: string
    enabled?: boolean
    order?: number
    openInNewTab?: boolean
}

const knownSectionTypes = new Set<string>(PAGE_BUILDER_SECTION_TYPES)

export function sanitizeAnchorId(value?: string | null) {
    if (!value) return undefined

    const sanitized = value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9-_]+/g, "-")
        .replace(/^-+|-+$/g, "")

    return sanitized || undefined
}

export function isKnownPageBuilderSection(section?: PageBuilderSection | null) {
    return Boolean(section?._type && knownSectionTypes.has(section._type))
}

export function isSectionEnabled(section?: PageBuilderSection | null) {
    return section?.settings?.enabled !== false
}

export function getRenderableSections(sections?: PageBuilderSection[] | null) {
    return (sections || []).filter((section) => isKnownPageBuilderSection(section) && isSectionEnabled(section))
}

export function hasValidPageBuilderHome(homePage?: PageBuilderHomeLike | null) {
    return Boolean(homePage?.pageBuilderEnabled && getRenderableSections(homePage.sections).length > 0)
}

function cleanInternalRoute(value?: string | null) {
    if (!value) return undefined
    const trimmed = value.trim()
    if (!trimmed || trimmed.startsWith("//")) return undefined
    if (/^https?:\/\//i.test(trimmed) || /^javascript:/i.test(trimmed)) return undefined
    return trimmed.startsWith("/") ? trimmed : `/${trimmed}`
}

function cleanExternalUrl(value?: string | null) {
    if (!value) return undefined
    const trimmed = value.trim()

    try {
        const url = new URL(trimmed)
        if (url.protocol === "http:" || url.protocol === "https:" || url.protocol === "mailto:") {
            return url.toString()
        }
    } catch {
        if (/^mailto:[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(trimmed)) return trimmed
    }

    return undefined
}

export function resolveCmsLink(link?: CmsLink | LinkItem | null, fallbackHref = "/") {
    const type = link?.linkType || (link?.externalUrl ? "external" : "internal")
    const legacyHref = link && "href" in link ? link.href : undefined
    const href =
        type === "external"
            ? cleanExternalUrl(link?.externalUrl)
            : type === "email"
                ? cleanExternalUrl(link?.email ? `mailto:${link.email}` : link?.externalUrl)
                : cleanInternalRoute(link?.internalRoute || legacyHref)

    const isExternal = Boolean(href && (/^https?:\/\//i.test(href) || href.startsWith("mailto:")))
    const openInNewTab = Boolean(link?.openInNewTab && isExternal && !href?.startsWith("mailto:"))

    return {
        href: href || fallbackHref,
        isExternal,
        target: openInNewTab ? "_blank" : undefined,
        rel: openInNewTab ? "noopener noreferrer" : undefined,
    }
}

export function resolveSiteNavigation(navigation?: LinkItem[] | null, fallbackNavigation: LinkItem[] = []) {
    const source = navigation && navigation.length > 0 ? navigation : fallbackNavigation

    return [...source]
        .filter((item) => item.enabled !== false)
        .sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999))
        .map((item) => ({
            ...item,
            name: item.name || item.label || "Untitled",
            ...resolveCmsLink(item, "/"),
        }))
}
