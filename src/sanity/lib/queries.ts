import { groq } from 'next-sanity'

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    metadataTitle,
    metadataDescription,
    "faviconUrl": favicon.asset->url,
    "headerLogoUrl": headerLogo.asset->url,
    headerLogoAlt,
    navigation,
    joinButtonLabel,
    joinButtonHref,
    mobileMenuLabel,
    "footerLogoUrl": footerLogo.asset->url,
    footerLogoAlt,
    footerLabName,
    footerInstitution,
    footerLinksTitle,
    footerLinks,
    footerContactTitle,
    footerContactLines,
    footerCopyright
  }
`

export const homePageQuery = groq`
  *[_type == "homePage"][0] {
    heroTitleBefore,
    heroTitleHighlight,
    heroTitleAfter,
    heroPrimaryButtonLabel,
    heroPrimaryButtonHref,
    heroSecondaryButtonLabel,
    heroSecondaryButtonHref,
    scrollLabel,
    recruitmentTitleBefore,
    recruitmentTitleHighlight,
    researchAreasHeading,
    openingPositionsHeading,
    eligibilityHeading,
    howToApplyHeading,
    contactButtonLabel,
    contactEmail,
    openingDetailsButtonLabel,
    openingDetailsButtonHref,
    selectedPublicationTitle,
    selectedPublicationSubtitle,
    viewPaperLabel,
    noPublicationImageLabel,
    carouselPreviousLabel,
    carouselNextLabel,
    latestTitle,
    latestPlaceholder
  }
`

export const professorPageQuery = groq`
  *[_type == "professor"][0] {
    "profileImageUrl": profileImage.asset->url,
    profileName,
    profileTitle,
    scholarButtonLabel,
    scholarUrl,
    pageTitle,
    contactLines,
    educationTabLabel,
    grantsTabLabel,
    awardsTabLabel,
    education,
    grants,
    awards
  }
`

export const researchPageSettingsQuery = groq`
  *[_type == "researchPage"][0] {
    title,
    intro,
    cardActionLabel,
    "overviewImageUrl": overviewImage.asset->url,
    overviewImageAlt,
    modalDetailsTitle
  }
`

export const membersPageQuery = groq`
  *[_type == "membersPage"][0] {
    title,
    roleOrder,
    photoPlaceholder,
    linkedinLabel
  }
`

export const newsPageQuery = groq`
  *[_type == "newsPage"][0] {
    title,
    subtitle,
    filters,
    readMoreLabel,
    emptyMessage,
    noImageLabel,
    noDetailsLabel,
    carouselPreviousLabel,
    carouselNextLabel,
    slideAltPrefix
  }
`

export const galleryPageSettingsQuery = groq`
  *[_type == "galleryPage"][0] {
    eyebrow,
    title,
    description,
    albumsLabel,
    viewAlbumLabel,
    noImageLabel,
    previousImageLabel,
    nextImageLabel,
    showImageLabel
  }
`

export const publicationPageQuery = groq`
  *[_type == "publicationPage"][0] {
    title,
    allFilterLabel,
    selectedFilterLabel,
    selectedBadgeLabel,
    pdfButtonTitle,
    doiButtonTitle
  }
`

export const newsQuery = groq`
  *[_type == "news"] | order(date desc) {
    _id,
    title,
    date,
    category,
    "image": image.asset->url,
    "detailImages": detailImages[].asset->url,
    description
  }
`

export const membersQuery = groq`
  *[_type == "member"] | order(order asc) {
    _id,
    name,
    role,
    order,
    interest,
    email,
    position,
    "image": image.asset->url
  }
`

export const galleryQuery = groq`
  *[_type == "gallery"] | order(date desc) {
    _id,
    title,
    date,
    description,
    "images": images[].asset->url
  }
`
