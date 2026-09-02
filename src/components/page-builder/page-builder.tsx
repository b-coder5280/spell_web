"use client"

import Link from "next/link"
import React from "react"
import { ArrowRight, Calendar, ExternalLink, Mail, Newspaper } from "lucide-react"
import type { SanityImageSource } from "@sanity/image-url/lib/types/types"

import { Container } from "@/components/ui/container"
import { cn } from "@/lib/utils"
import {
    CmsLink,
    PageBuilderSection,
    SectionSettings,
    getRenderableSections,
    resolveCmsLink,
    sanitizeAnchorId,
} from "@/lib/page-builder"

type PortableTextChild = {
    _key?: string
    _type?: string
    text?: string
    marks?: string[]
}

type PortableTextBlock = {
    _key?: string
    _type?: string
    style?: string
    listItem?: "bullet" | "number"
    children?: PortableTextChild[]
    markDefs?: { _key?: string; _type?: string; href?: string }[]
}

export type BuilderPublication = {
    _id?: string
    title?: string
    authors?: string[]
    journal?: string
    year?: number
    volume?: string
    doi?: string
    description?: string
    image?: SanityImageSource
    imageUrl?: string
}

export type BuilderNews = {
    _id?: string
    title?: string
    date?: string
    category?: string
    description?: string
    imageUrl?: string
    image?: string
}

export type BuilderGallery = {
    _id?: string
    title?: string
    date?: string
    description?: string
    images?: string[]
}

export type BuilderMember = {
    _id?: string
    name?: string
    role?: string
    position?: string
    interest?: string
    email?: string
    imageUrl?: string
    image?: string
}

export type BuilderResearch = {
    _id?: string
    title?: string
    description?: string
    details?: string
    tags?: string[]
    imageUrl?: string
}

export type BuilderOpening = {
    koreanDescription?: string[]
    englishIntro?: string
    researchAreas?: { title?: string; description?: string }[]
    openingPositions?: string[]
    eligibility?: string[]
    howToApply?: string
}

export type PageBuilderCollections = {
    latestPublications?: BuilderPublication[]
    featuredPublications?: BuilderPublication[]
    latestNews?: BuilderNews[]
    galleryItems?: BuilderGallery[]
    members?: BuilderMember[]
    researchItems?: BuilderResearch[]
    opening?: BuilderOpening
}

type PageBuilderProps = {
    sections?: PageBuilderSection[] | null
    collections?: PageBuilderCollections
}

type SectionRendererProps = {
    section: PageBuilderSection
    collections: PageBuilderCollections
}

const SECTION_COMPONENTS: Record<string, React.ComponentType<SectionRendererProps>> = {
    heroSection: HeroSection,
    researchSection: ResearchSection,
    joinSection: JoinSection,
    publicationSection: PublicationSection,
    newsSection: NewsSection,
    gallerySection: GallerySection,
    memberSection: MemberSection,
    textSection: TextSection,
    textImageSection: TextImageSection,
    statsSection: StatsSection,
    ctaSection: CtaSection,
}

const backgroundClasses: Record<string, string> = {
    white: "bg-white text-slate-950",
    light: "bg-slate-50 text-slate-950",
    dark: "bg-slate-950 text-white",
    brand: "bg-blue-700 text-white",
    subtle: "bg-white/60 text-slate-950",
}

const contentWidthClasses: Record<string, string> = {
    narrow: "max-w-3xl",
    normal: "max-w-5xl",
    wide: "max-w-7xl",
    full: "max-w-none",
}

const spacingClasses: Record<string, string> = {
    none: "py-0",
    small: "py-6 md:py-8",
    medium: "py-10 md:py-14",
    large: "py-14 md:py-20",
    xlarge: "py-20 md:py-28",
}

const topSpacingClasses: Record<string, string> = {
    none: "pt-0",
    small: "pt-6 md:pt-8",
    medium: "pt-10 md:pt-14",
    large: "pt-14 md:pt-20",
    xlarge: "pt-20 md:pt-28",
}

const bottomSpacingClasses: Record<string, string> = {
    none: "pb-0",
    small: "pb-6 md:pb-8",
    medium: "pb-10 md:pb-14",
    large: "pb-14 md:pb-20",
    xlarge: "pb-20 md:pb-28",
}

const columnClasses: Record<number, string> = {
    2: "lg:grid-cols-2",
    3: "lg:grid-cols-3",
    4: "lg:grid-cols-4",
}

const heroHeightClasses: Record<string, string> = {
    compact: "min-h-[48vh]",
    medium: "min-h-[64vh]",
    large: "min-h-[80vh]",
    viewport: "min-h-[calc(100vh-4rem)]",
}

class SectionErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
    state = { hasError: false }

    static getDerivedStateFromError() {
        return { hasError: true }
    }

    componentDidCatch(error: Error) {
        if (process.env.NODE_ENV !== "production") {
            console.warn("Page builder section failed to render:", error)
        }
    }

    render() {
        if (this.state.hasError) return null
        return this.props.children
    }
}

export function PageBuilder({ sections, collections = {} }: PageBuilderProps) {
    const renderableSections = getRenderableSections(sections)

    return (
        <div className="flex flex-col overflow-x-hidden">
            {renderableSections.map((section) => {
                const SectionComponent = section._type ? SECTION_COMPONENTS[section._type] : undefined
                if (!SectionComponent) return null

                return (
                    <SectionErrorBoundary key={section._key || section._type}>
                        <SectionComponent section={section} collections={collections} />
                    </SectionErrorBoundary>
                )
            })}
        </div>
    )
}

function SectionShell({
    settings,
    children,
    className,
    contentClassName,
}: {
    settings?: SectionSettings
    children: React.ReactNode
    className?: string
    contentClassName?: string
}) {
    const background = settings?.background || "white"
    const spacingTop = settings?.spacingTop
    const spacingBottom = settings?.spacingBottom
    const contentWidth = settings?.contentWidth || "wide"
    const anchorId = sanitizeAnchorId(settings?.anchorId)

    return (
        <section
            id={anchorId}
            className={cn(
                "relative w-full overflow-hidden",
                backgroundClasses[background] || backgroundClasses.white,
                spacingTop || spacingBottom
                    ? cn(topSpacingClasses[spacingTop || "large"], bottomSpacingClasses[spacingBottom || "large"])
                    : spacingClasses.large,
                className
            )}
        >
            <Container className={cn(contentWidthClasses[contentWidth] || contentWidthClasses.wide, contentClassName)}>
                {children}
            </Container>
        </section>
    )
}

function asString(value: unknown, fallback = "") {
    return typeof value === "string" ? value : fallback
}

function asNumber(value: unknown, fallback: number) {
    return typeof value === "number" ? value : fallback
}

function asBoolean(value: unknown, fallback: boolean) {
    return typeof value === "boolean" ? value : fallback
}

function asArray<T>(value: unknown): T[] {
    return Array.isArray(value) ? (value.filter(Boolean) as T[]) : []
}

function getLimit(section: PageBuilderSection, fallback: number) {
    return Math.min(Math.max(asNumber(section.limit, fallback), 1), 8)
}

function limitItems<T>(items: T[] | undefined, limit: number) {
    return (items || []).filter(Boolean).slice(0, limit)
}

function pickItems<T>(manual: unknown, fallback: T[] | undefined, limit: number) {
    const manualItems = asArray<T>(manual)
    return limitItems(manualItems.length > 0 ? manualItems : fallback, limit)
}

function SectionHeading({ title, subtitle, align = "left" }: { title?: string; subtitle?: string; align?: "left" | "center" }) {
    if (!title && !subtitle) return null

    return (
        <div className={cn("mb-10 max-w-3xl", align === "center" && "mx-auto text-center")}>
            {title && <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">{title}</h2>}
            {subtitle && <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{subtitle}</p>}
        </div>
    )
}

function CtaButton({ link, variant = "primary" }: { link?: CmsLink | null; variant?: "primary" | "secondary" }) {
    if (!link?.label) return null
    const resolved = resolveCmsLink(link)
    const className = cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
        variant === "primary"
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "border border-slate-300 bg-white text-slate-950 hover:bg-slate-50"
    )

    if (resolved.isExternal) {
        return (
            <a href={resolved.href} target={resolved.target} rel={resolved.rel} className={className}>
                {link.label}
                {resolved.href.startsWith("mailto:") ? <Mail className="h-4 w-4" /> : <ExternalLink className="h-4 w-4" />}
            </a>
        )
    }

    return (
        <Link href={resolved.href} className={className}>
            {link.label}
            <ArrowRight className="h-4 w-4" />
        </Link>
    )
}

function RichText({ value, align = "left" }: { value?: unknown; align?: "left" | "center" }) {
    const blocks = asArray<PortableTextBlock>(value)
    if (blocks.length === 0) return null

    return (
        <div className={cn("space-y-4 text-base leading-relaxed text-muted-foreground", align === "center" && "mx-auto max-w-3xl text-center")}>
            {blocks.map((block, index) => {
                const key = block._key || `block-${index}`
                const children = renderPortableChildren(block)

                if (block.listItem === "bullet") return <li key={key} className="ml-5 list-disc text-left">{children}</li>
                if (block.listItem === "number") return <li key={key} className="ml-5 list-decimal text-left">{children}</li>
                if (block.style === "h2") return <h2 key={key} className="text-3xl font-bold text-foreground">{children}</h2>
                if (block.style === "h3") return <h3 key={key} className="text-2xl font-semibold text-foreground">{children}</h3>
                if (block.style === "blockquote") return <blockquote key={key} className="border-l-4 border-blue-500 pl-4 italic">{children}</blockquote>
                return <p key={key}>{children}</p>
            })}
        </div>
    )
}

function renderPortableChildren(block: PortableTextBlock) {
    return (block.children || []).map((child, index) => {
        const text = child.text || ""
        const key = child._key || `span-${index}`
        const linkMark = child.marks?.find((mark) => block.markDefs?.some((def) => def._key === mark && def.href))
        const linkDef = block.markDefs?.find((def) => def._key === linkMark)
        let node: React.ReactNode = text

        if (child.marks?.includes("strong")) node = <strong>{node}</strong>
        if (child.marks?.includes("em")) node = <em>{node}</em>
        if (linkDef?.href) {
            const resolved = resolveCmsLink({ linkType: linkDef.href.startsWith("/") ? "internal" : "external", internalRoute: linkDef.href, externalUrl: linkDef.href })
            node = resolved.isExternal ? (
                <a href={resolved.href} target={resolved.target} rel={resolved.rel} className="font-medium text-blue-600 underline-offset-4 hover:underline">
                    {node}
                </a>
            ) : (
                <Link href={resolved.href} className="font-medium text-blue-600 underline-offset-4 hover:underline">
                    {node}
                </Link>
            )
        }

        return <React.Fragment key={key}>{node}</React.Fragment>
    })
}

function HeroSection({ section }: SectionRendererProps) {
    const title = asString(section.title, "Semiconductor Photonics and Electronics Lab")
    const subtitle = asString(section.subtitle)
    const eyebrow = asString(section.eyebrow)
    const layout = asString(section.layout, "current")
    const height = asString(section.height, "large")
    const backgroundImageUrl = asString(section.backgroundImageUrl)
    const overlay = asString(section.overlayStrength, "none")
    const split = layout === "split"

    return (
        <SectionShell settings={section.settings} className={cn(heroHeightClasses[height] || heroHeightClasses.large, "flex items-center")} contentClassName="relative z-10">
            {backgroundImageUrl && (
                <>
                    <img src={backgroundImageUrl} alt={asString(section.backgroundImageAlt, "")} className="absolute inset-0 h-full w-full object-cover" />
                    <div
                        className={cn(
                            "absolute inset-0",
                            overlay === "light" && "bg-white/40",
                            overlay === "medium" && "bg-slate-950/35",
                            overlay === "strong" && "bg-slate-950/60"
                        )}
                    />
                </>
            )}
            <div className={cn("relative grid items-center gap-10", split && "lg:grid-cols-[1.05fr_0.95fr]")}>
                <div className={cn("max-w-4xl", layout !== "split" && "mx-auto text-center", layout === "minimal" && "max-w-3xl")}>
                    {eyebrow && <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">{eyebrow}</p>}
                    <h1 className="text-4xl font-bold tracking-tight leading-tight text-inherit sm:text-5xl md:text-6xl lg:text-7xl">{title}</h1>
                    {subtitle && <p className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl">{subtitle}</p>}
                    <div className={cn("mt-9 flex flex-col gap-3 sm:flex-row", layout !== "split" && "justify-center")}>
                        <CtaButton link={section.primaryCta as CmsLink | undefined} />
                        <CtaButton link={section.secondaryCta as CmsLink | undefined} variant="secondary" />
                    </div>
                </div>
                {split && backgroundImageUrl && (
                    <div className="relative hidden aspect-[4/3] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm lg:block">
                        <img src={backgroundImageUrl} alt={asString(section.backgroundImageAlt, title)} className="h-full w-full object-cover" />
                    </div>
                )}
            </div>
        </SectionShell>
    )
}

function ResearchSection({ section, collections }: SectionRendererProps) {
    const limit = getLimit(section, 6)
    const items = pickItems<BuilderResearch>(section.selectedResearch, collections.researchItems, limit)
    const layout = asString(section.layout, "cards")
    const columns = asNumber(section.columns, 3)

    return (
        <SectionShell settings={section.settings}>
            <div className={cn(layout === "splitIntroCards" && "grid gap-10 lg:grid-cols-[0.8fr_1.2fr]")}>
                <SectionHeading title={asString(section.title, "Research")} subtitle={asString(section.description)} align={layout === "splitIntroCards" ? "left" : "center"} />
                <div className={cn("grid items-stretch gap-5 md:grid-cols-2", columnClasses[columns] || columnClasses[3])}>
                    {items.map((item) => (
                        <article key={item._id || item.title} className={cn("flex min-w-0 flex-col overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm", layout === "compactCards" ? "h-full" : "h-[430px] sm:h-[460px] lg:h-[500px]")}>
                            {layout !== "compactCards" && item.imageUrl && <img src={item.imageUrl} alt={item.title || "Research image"} className="h-64 w-full bg-white object-contain p-3 sm:h-72 lg:h-80" loading="lazy" />}
                            <div className="flex flex-1 flex-col p-5">
                                <h3 className="text-lg font-bold leading-tight text-slate-950">{item.title}</h3>
                                {item.description && <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-muted-foreground">{item.description}</p>}
                                {item.tags && item.tags.length > 0 && (
                                    <div className="mt-5 flex flex-wrap gap-2">
                                        {item.tags.slice(0, 4).map((tag) => <span key={tag} className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">{tag}</span>)}
                                    </div>
                                )}
                            </div>
                        </article>
                    ))}
                </div>
            </div>
            {asBoolean(section.showCta, true) && <div className="mt-8"><CtaButton link={section.cta as CmsLink | undefined} /></div>}
        </SectionShell>
    )
}

function JoinSection({ section, collections }: SectionRendererProps) {
    const opening = collections.opening || {}
    const showOpening = asBoolean(section.showOpeningContent, true)
    const bulletGroups = asArray<{ heading?: string; items?: string[] }>(section.bulletGroups)
    const groups = showOpening
        ? [
            { heading: "Research Areas", items: (opening.researchAreas || []).map((area) => [area.title, area.description].filter(Boolean).join(" - ")) },
            { heading: "Opening Positions", items: opening.openingPositions || [] },
            { heading: "Eligibility", items: opening.eligibility || [] },
        ]
        : bulletGroups
    const layout = asString(section.layout, "current")

    return (
        <SectionShell settings={section.settings}>
            <div className={cn("mx-auto w-full max-w-5xl rounded-md border border-slate-200 bg-white p-6 shadow-sm md:p-10", layout === "split" && "lg:grid lg:grid-cols-[0.9fr_1.1fr] lg:gap-12", layout === "centered" && "text-center")}>
                <div className={cn(layout !== "split" && "mx-auto max-w-3xl")}>
                    <SectionHeading title={asString(section.title, "Join Our Lab")} subtitle={asString(section.intro) || opening.englishIntro} align={layout === "split" ? "left" : "center"} />
                    {showOpening && opening.koreanDescription && (
                        <ul className="mb-8 space-y-3 text-left text-sm leading-relaxed text-muted-foreground">
                            {opening.koreanDescription.map((item, index) => <li key={`${item}-${index}`} className="flex gap-2"><span className="font-bold text-blue-600">&bull;</span><span>{item}</span></li>)}
                        </ul>
                    )}
                    <div className={cn("flex flex-col gap-3 sm:flex-row", layout !== "split" && "justify-center")}>
                        <CtaButton link={section.primaryCta as CmsLink | undefined} />
                        <CtaButton link={section.secondaryCta as CmsLink | undefined} variant="secondary" />
                    </div>
                </div>
                <div className="mt-8 grid gap-5 md:grid-cols-2 lg:mt-0">
                    {groups.filter((group) => group.items && group.items.length > 0).map((group) => (
                        <div key={group.heading} className="rounded-md bg-slate-50 p-5 text-left">
                            <h3 className="font-semibold text-blue-700">{group.heading}</h3>
                            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
                                {(group.items || []).map((item, index) => <li key={`${item}-${index}`} className="flex gap-2"><span>&bull;</span><span>{item}</span></li>)}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </SectionShell>
    )
}

function PublicationSection({ section, collections }: SectionRendererProps) {
    const limit = getLimit(section, 6)
    const source = asString(section.source, "featured")
    const fallback = source === "latest" ? collections.latestPublications : collections.featuredPublications
    const items = source === "manual" ? pickItems<BuilderPublication>(section.selectedPublications, fallback, limit) : limitItems(fallback, limit)
    const columns = asNumber(section.columns, 3)
    const showImage = asBoolean(section.showImage, true)

    return (
        <SectionShell settings={section.settings}>
            <SectionHeading title={asString(section.title, "Selected Publications")} subtitle={asString(section.subtitle)} align="center" />
            <div className={cn("grid gap-5 md:grid-cols-2", columnClasses[columns] || columnClasses[3])}>
                {items.map((pub) => (
                    <article key={pub._id || pub.title} className="flex min-w-0 flex-col rounded-md border border-slate-200 bg-white p-5 shadow-sm">
                        {showImage && pub.imageUrl && <img src={pub.imageUrl} alt={pub.title || "Publication image"} className="mb-4 aspect-[16/9] w-full rounded-sm object-contain bg-slate-50" loading="lazy" />}
                        <h3 className="line-clamp-4 text-base font-bold leading-snug text-slate-950">{pub.title}</h3>
                        {asBoolean(section.showAuthors, true) && pub.authors && <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{pub.authors.join(", ")}</p>}
                        <p className="mt-3 text-sm text-muted-foreground">
                            {asBoolean(section.showJournal, true) && pub.journal && <span className="italic">{pub.journal}</span>}
                            {asBoolean(section.showYear, true) && pub.year && <span>{pub.journal ? " · " : ""}{pub.year}</span>}
                        </p>
                        {asBoolean(section.showPaperLink, true) && pub.doi && (
                            <a href={pub.doi} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-semibold text-blue-700 hover:underline">
                                View Paper <ExternalLink className="h-4 w-4" />
                            </a>
                        )}
                    </article>
                ))}
            </div>
        </SectionShell>
    )
}

function NewsSection({ section, collections }: SectionRendererProps) {
    const limit = getLimit(section, 3)
    const source = asString(section.source, "latest")
    const selected = source === "selected" ? asArray<BuilderNews>(section.selectedNews) : []
    const category = asString(section.categoryFilter)
    const baseItems = selected.length > 0 ? selected : collections.latestNews || []
    const items = limitItems(category ? baseItems.filter((item) => item.category === category) : baseItems, limit)
    const layout = asString(section.layout, "cards")

    return (
        <SectionShell settings={section.settings}>
            <SectionHeading title={asString(section.title, "Latest News")} subtitle={asString(section.subtitle)} align="center" />
            <div className={cn(layout === "list" ? "space-y-4" : "grid gap-5 md:grid-cols-2 lg:grid-cols-3")}>
                {items.map((item) => (
                    <article key={item._id || item.title} className="min-w-0 rounded-md border border-slate-200 bg-white shadow-sm">
                        {layout !== "list" && (item.imageUrl || item.image) && <img src={item.imageUrl || item.image} alt={item.title || "News image"} className="aspect-[16/10] w-full rounded-t-md object-cover" loading="lazy" />}
                        <div className="p-5">
                            <div className="mb-3 flex flex-wrap items-center gap-3 text-xs font-medium text-muted-foreground">
                                {item.date && <span className="inline-flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{item.date}</span>}
                                {item.category && <span className="rounded-full bg-blue-50 px-2 py-0.5 text-blue-700">{item.category}</span>}
                            </div>
                            <h3 className="text-lg font-bold leading-tight text-slate-950">{item.title}</h3>
                            {layout !== "compact" && item.description && <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>}
                        </div>
                    </article>
                ))}
            </div>
            {asBoolean(section.showViewAll, true) && <div className="mt-8"><CtaButton link={(section.viewAllCta as CmsLink | undefined) || { label: "View all news", linkType: "internal", internalRoute: "/news" }} variant="secondary" /></div>}
        </SectionShell>
    )
}

function GallerySection({ section, collections }: SectionRendererProps) {
    const limit = getLimit(section, 4)
    const selected = asArray<BuilderGallery>(section.selectedGallery)
    const items = limitItems(selected.length > 0 ? selected : collections.galleryItems, limit)
    const layout = asString(section.layout, "grid")

    return (
        <SectionShell settings={section.settings}>
            <SectionHeading title={asString(section.title, "Gallery")} subtitle={asString(section.subtitle)} align="center" />
            <div className={cn("grid gap-4", layout === "strip" ? "md:grid-cols-4" : "md:grid-cols-2 lg:grid-cols-4")}>
                {items.map((item, index) => {
                    const image = item.images?.[0]
                    return (
                        <article key={item._id || item.title} className={cn("min-w-0 overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm", layout === "featuredGrid" && index === 0 && "md:col-span-2 md:row-span-2")}>
                            <div className={cn("bg-slate-100", layout === "strip" ? "aspect-[4/3]" : "aspect-square")}>
                                {image ? <img src={image} alt={item.title || "Gallery image"} className="h-full w-full object-cover" loading="lazy" /> : <div className="flex h-full items-center justify-center text-sm text-muted-foreground">No image</div>}
                            </div>
                            <div className="p-4">
                                <h3 className="font-semibold leading-tight text-slate-950">{item.title}</h3>
                                {item.date && <p className="mt-1 text-sm text-muted-foreground">{item.date}</p>}
                            </div>
                        </article>
                    )
                })}
            </div>
        </SectionShell>
    )
}

function MemberSection({ section, collections }: SectionRendererProps) {
    const limit = getLimit(section, 4)
    const selected = asArray<BuilderMember>(section.selectedMembers)
    const roleFilter = asString(section.roleFilter)
    const baseItems = selected.length > 0 ? selected : collections.members || []
    const items = limitItems(roleFilter ? baseItems.filter((member) => member.role === roleFilter) : baseItems, limit)
    const layout = asString(section.layout, "cards")

    return (
        <SectionShell settings={section.settings}>
            <SectionHeading title={asString(section.title, "Members")} subtitle={asString(section.subtitle)} align="center" />
            <div className={cn("grid gap-5", layout === "compact" ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-2")}>
                {items.map((member) => (
                    <article key={member._id || member.name} className="flex min-w-0 gap-4 rounded-md border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="h-24 w-20 shrink-0 overflow-hidden bg-slate-100">
                            {member.imageUrl || member.image ? <img src={member.imageUrl || member.image} alt={member.name || "Member photo"} className="h-full w-full object-cover" loading="lazy" /> : null}
                        </div>
                        <div className="min-w-0">
                            <h3 className="font-bold leading-tight text-slate-950">{member.position ? `${member.name} ${member.position}` : member.name}</h3>
                            {member.role && <p className="mt-1 text-sm font-semibold text-blue-800">{member.role}</p>}
                            {layout !== "compact" && member.interest && <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{member.interest}</p>}
                            {member.email && <a href={`mailto:${member.email}`} className="mt-3 inline-flex max-w-full items-center gap-1 text-sm text-blue-700 hover:underline"><Mail className="h-3.5 w-3.5 shrink-0" /><span className="truncate">{member.email}</span></a>}
                        </div>
                    </article>
                ))}
            </div>
        </SectionShell>
    )
}

function TextSection({ section }: SectionRendererProps) {
    const align = asString(section.alignment, "left") === "center" ? "center" : "left"

    return (
        <SectionShell settings={section.settings}>
            <SectionHeading title={asString(section.title)} align={align} />
            <RichText value={section.body} align={align} />
        </SectionShell>
    )
}

function TextImageSection({ section }: SectionRendererProps) {
    const layout = asString(section.layout, "imageRight")
    const hasImage = layout !== "textOnly" && asString(section.imageUrl)

    return (
        <SectionShell settings={section.settings}>
            <div className={cn("grid gap-8", hasImage && layout !== "imageTop" && "lg:grid-cols-2 lg:items-center")}>
                {hasImage && layout === "imageLeft" && <SectionImage section={section} />}
                <div className="min-w-0">
                    <SectionHeading title={asString(section.title)} />
                    <RichText value={section.body} />
                    <div className="mt-6"><CtaButton link={section.cta as CmsLink | undefined} /></div>
                </div>
                {hasImage && layout !== "imageLeft" && <SectionImage section={section} />}
            </div>
        </SectionShell>
    )
}

function SectionImage({ section }: { section: PageBuilderSection }) {
    return (
        <div className="min-w-0 overflow-hidden rounded-md border border-slate-200 bg-slate-100 shadow-sm">
            <img src={asString(section.imageUrl)} alt={asString(section.imageAlt, asString(section.title, ""))} className="aspect-[4/3] w-full object-cover" loading="lazy" />
        </div>
    )
}

function StatsSection({ section }: SectionRendererProps) {
    const items = asArray<{ value?: string; label?: string; description?: string }>(section.items).slice(0, 4)

    return (
        <SectionShell settings={section.settings}>
            <SectionHeading title={asString(section.title)} subtitle={asString(section.subtitle)} align="center" />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {items.map((item, index) => (
                    <div key={`${item.label}-${index}`} className="rounded-md border border-slate-200 bg-white p-6 text-center shadow-sm">
                        <div className="text-3xl font-extrabold text-blue-700 sm:text-4xl">{item.value}</div>
                        <div className="mt-2 font-semibold text-slate-950">{item.label}</div>
                        {item.description && <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>}
                    </div>
                ))}
            </div>
        </SectionShell>
    )
}

function CtaSection({ section }: SectionRendererProps) {
    const preset = asString(section.preset, "centered")

    return (
        <SectionShell settings={section.settings}>
            <div className={cn("rounded-md border border-slate-200 bg-white p-6 shadow-sm md:p-10", preset !== "simple" && "text-center", preset === "banner" && "bg-slate-950 text-white")}>
                <div className="mx-auto max-w-3xl">
                    <div className="mb-6 flex justify-center">
                        <Newspaper className={cn("h-8 w-8", preset === "banner" ? "text-blue-200" : "text-blue-600")} />
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{asString(section.title, "Connect with SPELL")}</h2>
                    {asString(section.description) && <p className={cn("mt-4 text-base leading-relaxed", preset === "banner" ? "text-blue-100" : "text-muted-foreground")}>{asString(section.description)}</p>}
                    <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                        <CtaButton link={section.primaryCta as CmsLink | undefined} />
                        <CtaButton link={section.secondaryCta as CmsLink | undefined} variant="secondary" />
                    </div>
                </div>
            </div>
        </SectionShell>
    )
}
