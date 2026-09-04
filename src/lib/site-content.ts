import type { ResearchPagePart } from "./research-page-layout"
import { defaultResearchPageParts } from "./research-page-layout"

export type LinkItem = {
    name: string
    href?: string
    linkType?: "internal" | "external" | "email"
    internalRoute?: string
    externalUrl?: string
    email?: string
    enabled?: boolean
    order?: number
    openInNewTab?: boolean
}

export type SiteSettings = {
    metadataTitle: string
    metadataDescription: string
    faviconUrl?: string
    headerLogoUrl?: string
    headerLogoAlt: string
    labName?: string
    headerStylePreset?: string
    headerSticky?: boolean
    navigation: LinkItem[]
    joinButtonLabel: string
    joinButtonHref: string
    footerLogoUrl?: string
    footerLogoAlt: string
    footerLabName: string
    footerInstitution: string
    footerLinksTitle: string
    footerLinks: LinkItem[]
    footerContactTitle: string
    footerContactLines: string[]
    footerCopyright: string
    mobileMenuLabel: string
    footerAddress?: string
    footerEmail?: string
    footerTelephone?: string
    footerOffice?: string
    seoSocialImageUrl?: string
}

export type HomePageSettings = {
    heroTitleBefore: string
    heroTitleHighlight: string
    heroTitleAfter: string
    heroPrimaryButtonLabel: string
    heroPrimaryButtonHref: string
    heroSecondaryButtonLabel: string
    heroSecondaryButtonHref: string
    scrollLabel: string
    recruitmentTitleBefore: string
    recruitmentTitleHighlight: string
    researchAreasHeading: string
    openingPositionsHeading: string
    eligibilityHeading: string
    howToApplyHeading: string
    contactButtonLabel: string
    contactEmail: string
    openingDetailsButtonLabel: string
    openingDetailsButtonHref: string
    selectedPublicationTitle: string
    selectedPublicationSubtitle: string
    viewPaperLabel: string
    noPublicationImageLabel: string
    carouselPreviousLabel: string
    carouselNextLabel: string
    latestTitle: string
    latestPlaceholder: string
}

export type OpeningPageSettings = {
    pageTitle: string
    positionTitle: string
    researchAreasHeading: string
    openingPositionsHeading: string
    eligibilityHeading: string
    howToApplyHeading: string
    applyBoxTitle: string
    applyBoxDescription: string
    applyButtonLabel: string
    applyEmail: string
}

export type ProfessorPageSettings = {
    profileImageUrl?: string
    profileName: string
    profileTitle: string
    scholarButtonLabel: string
    scholarUrl: string
    pageTitle: string
    contactLines: string[]
    educationTabLabel: string
    grantsTabLabel: string
    awardsTabLabel: string
}

export type ResearchPageSettings = {
    title: string
    intro: string
    cardActionLabel: string
    overviewImageUrl?: string
    overviewImageAlt: string
    modalDetailsTitle: string
    layoutGuide?: string
    pageParts?: ResearchPagePart[]
}

export type MembersPageSettings = {
    title: string
    roleOrder: string[]
    photoPlaceholder: string
    linkedinLabel: string
}

export type NewsPageSettings = {
    title: string
    subtitle: string
    filters: string[]
    readMoreLabel: string
    emptyMessage: string
    noImageLabel: string
    noDetailsLabel: string
    carouselPreviousLabel: string
    carouselNextLabel: string
    slideAltPrefix: string
}

export type GalleryPageSettings = {
    eyebrow: string
    title: string
    description: string
    albumsLabel: string
    viewAlbumLabel: string
    noImageLabel: string
    previousImageLabel: string
    nextImageLabel: string
    showImageLabel: string
}

export type PublicationPageSettings = {
    title: string
    allFilterLabel: string
    selectedFilterLabel: string
    selectedBadgeLabel: string
    pdfButtonTitle: string
    doiButtonTitle: string
}

export const defaultSiteSettings: SiteSettings = {
    metadataTitle: "Semiconductor Photonics and Electronics Lab | GIST",
    metadataDescription: "Pioneering semiconductor photonics and electronics for a sustainable future. Gwangju Institute of Science and Technology.",
    faviconUrl: "/images/logo_1.png",
    headerLogoUrl: "/images/logo_2.jpg",
    headerLogoAlt: "SPELL Logo",
    labName: "SPELL Lab",
    headerStylePreset: "current",
    headerSticky: true,
    navigation: [
        { name: "Research", href: "/research" },
        { name: "Professor", href: "/professor" },
        { name: "Members", href: "/members" },
        { name: "Publications", href: "/publication" },
        { name: "News", href: "/news" },
        { name: "Gallery", href: "/gallery" },
        { name: "Opening", href: "/opening" },
    ],
    joinButtonLabel: "Join Us",
    joinButtonHref: "/opening",
    footerLogoUrl: "/images/logo_2.jpg",
    footerLogoAlt: "SPELL Logo",
    footerLabName: "Semiconductor Photonics and Electronics Lab",
    footerInstitution: "Gwangju Institute of Science and Technology (GIST)",
    footerLinksTitle: "Links",
    footerLinks: [
        { name: "Research", href: "/research" },
        { name: "Publications", href: "/publication" },
        { name: "Members", href: "/members" },
    ],
    footerContactTitle: "Contact",
    footerContactLines: [
        "123 Cheomdan-gwagiro, Buk-gu, Gwangju 61005, Korea",
        "Email: hobkim@gist.ac.kr",
        "Tel: +82-62-715-2741",
        "Office: Materials Science and Engineering Building (S5)",
    ],
    footerCopyright: "{year} SPELL Lab. All rights reserved.",
    mobileMenuLabel: "Toggle menu",
}

export const defaultHomePageSettings: HomePageSettings = {
    heroTitleBefore: "Semiconductor",
    heroTitleHighlight: "Photonics and Electronics",
    heroTitleAfter: "Lab",
    heroPrimaryButtonLabel: "Research Areas",
    heroPrimaryButtonHref: "/research",
    heroSecondaryButtonLabel: "Join Us",
    heroSecondaryButtonHref: "/opening",
    scrollLabel: "Scroll",
    recruitmentTitleBefore: "Join Our",
    recruitmentTitleHighlight: "Lab",
    researchAreasHeading: "Research Areas",
    openingPositionsHeading: "Opening Positions",
    eligibilityHeading: "Eligibility & Requirements",
    howToApplyHeading: "How to Apply",
    contactButtonLabel: "Contact Prof. Kim",
    contactEmail: "hobkim@gist.ac.kr",
    openingDetailsButtonLabel: "View Full Opening Details",
    openingDetailsButtonHref: "/opening",
    selectedPublicationTitle: "Selected Publication",
    selectedPublicationSubtitle: "Highlighting our latest breakthroughs.",
    viewPaperLabel: "View Paper",
    noPublicationImageLabel: "No Image Available",
    carouselPreviousLabel: "Previous publication",
    carouselNextLabel: "Next publication",
    latestTitle: "Latest at SPELL",
    latestPlaceholder: "(News content to be implemented)",
}

export const defaultOpeningPageSettings: OpeningPageSettings = {
    pageTitle: "Open Positions",
    positionTitle: "Graduate Students (M.S. / Ph.D. Program)",
    researchAreasHeading: "Research Areas",
    openingPositionsHeading: "Opening Positions",
    eligibilityHeading: "Eligibility & Requirements",
    howToApplyHeading: "Free-Form Email",
    applyBoxTitle: "Submit Your Application",
    applyBoxDescription: "Email Prof. Kim in a free format. Briefly introduce your background, research interests, and the position or program you are interested in.",
    applyButtonLabel: "Apply via Email",
    applyEmail: "hobkim@gist.ac.kr",
}

export const defaultProfessorPageSettings: ProfessorPageSettings = {
    profileImageUrl: "/images/hb.jpg",
    profileName: "Hobeom Kim, Ph.D.",
    profileTitle: "Assistant Professor",
    scholarButtonLabel: "Google Scholar",
    scholarUrl: "https://scholar.google.com/citations?user=LuWKShkAAAAJ&hl=ko",
    pageTitle: "Principal Investigator",
    contactLines: [
        "Department of Materials Science and Engineering",
        "Graduate School of Advanced Semiconductor Engineering",
        "Gwangju Institute of Science and Technology (GIST)",
        "Tel: +82-62-715-2741",
        "E-mail: hobkim@gist.ac.kr, hobkim11@gmail.com",
        "Address: 123 Cheomdangwagi-ro, Buk-gu, Gwangju 61005, Republic of Korea",
        "Office: Materials Science and Engineering Building(S5)",
    ],
    educationTabLabel: "Education & Experience",
    grantsTabLabel: "Grants",
    awardsTabLabel: "Awards & Honors",
}

export const defaultResearchPageSettings: ResearchPageSettings = {
    title: "Our Vision & Core Research Areas",
    intro: "We aim to redefine the limits of semiconductor technology by leveraging novel materials and innovative device architectures.",
    cardActionLabel: "Explore",
    overviewImageUrl: "/images/research3.jpg",
    overviewImageAlt: "Research Overview",
    modalDetailsTitle: "Key Research Details",
    layoutGuide: "Drag Research Cards and Overview Image to change the /research page order.",
    pageParts: defaultResearchPageParts,
}

export const defaultMembersPageSettings: MembersPageSettings = {
    title: "Members",
    roleOrder: [
        "Post Doc.",
        "M.S./Ph.D. Candidates",
        "M.S. Candidates",
        "Intern",
        "Alumni",
    ],
    photoPlaceholder: "[Photo]",
    linkedinLabel: "LinkedIn",
}

export const defaultNewsPageSettings: NewsPageSettings = {
    title: "News",
    subtitle: "Latest updates and stories from SPELL Lab.",
    filters: ["All", "Award", "Conference", "Published", "Grant"],
    readMoreLabel: "Read more",
    emptyMessage: "No news found for this category.",
    noImageLabel: "No Image",
    noDetailsLabel: "No additional details available.",
    carouselPreviousLabel: "Previous image",
    carouselNextLabel: "Next image",
    slideAltPrefix: "Slide",
}

export const defaultGalleryPageSettings: GalleryPageSettings = {
    eyebrow: "SPELL Moments",
    title: "Gallery",
    description: "A clean visual journal of lab life, conferences, workshops, and shared memories.",
    albumsLabel: "albums",
    viewAlbumLabel: "View album",
    noImageLabel: "No Image",
    previousImageLabel: "Previous image",
    nextImageLabel: "Next image",
    showImageLabel: "Show image",
}

export const defaultPublicationPageSettings: PublicationPageSettings = {
    title: "Publications",
    allFilterLabel: "All",
    selectedFilterLabel: "Selected",
    selectedBadgeLabel: "Selected",
    pdfButtonTitle: "PDF",
    doiButtonTitle: "DOI",
}

export function withDefaults<T extends object>(defaults: T, values?: Partial<T> | null): T {
    if (!values) return defaults

    return Object.fromEntries(
        Object.entries(defaults).map(([key, defaultValue]) => {
            const value = values[key as keyof T]
            const isEmptyArray = Array.isArray(value) && value.length === 0
            return [key, value === undefined || value === null || value === "" || isEmptyArray ? defaultValue : value]
        })
    ) as T
}
