import { groq } from 'next-sanity'

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    metadataTitle,
    metadataDescription,
    "faviconUrl": favicon.asset->url,
    "seoSocialImageUrl": seoSocialImage.asset->url,
    labName,
    "headerLogoUrl": headerLogo.asset->url,
    headerLogoAlt,
    headerStylePreset,
    headerSticky,
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
    footerAddress,
    footerEmail,
    footerTelephone,
    footerOffice,
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

const publicationFields = groq`
  _id,
  title,
  authors,
  journal,
  year,
  order,
  selected,
  volume,
  doi,
  description,
  image,
  "imageUrl": image.asset->url
`

const newsFields = groq`
  _id,
  title,
  date,
  category,
  description,
  "image": image.asset->url,
  "imageUrl": image.asset->url
`

const galleryFields = groq`
  _id,
  title,
  date,
  description,
  "images": images[].asset->url
`

const memberFields = groq`
  _id,
  name,
  role,
  order,
  interest,
  email,
  position,
  "image": image.asset->url,
  "imageUrl": image.asset->url
`

const researchFields = groq`
  _id,
  title,
  description,
  details,
  tags,
  image,
  "imageUrl": image.asset->url
`

export const homePageBuilderQuery = groq`
  {
    "homePage": *[_type == "homePage"][0] {
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
      latestPlaceholder,
      pageBuilderEnabled,
      seoTitle,
      seoDescription,
      "seoImageUrl": seoImage.asset->url,
      sections[] {
        ...,
        "backgroundImageUrl": backgroundImage.asset->url,
        "backgroundImageAlt": backgroundImage.alt,
        "imageUrl": image.asset->url,
        "imageAlt": image.alt,
        selectedResearch[]->{${researchFields}},
        selectedPublications[]->{${publicationFields}},
        selectedNews[]->{${newsFields}},
        selectedGallery[]->{${galleryFields}},
        selectedMembers[]->{${memberFields}}
      }
    },
    "opening": *[_type == "opening"][0] {
      koreanDescription,
      englishIntro,
      researchAreas,
      openingPositions,
      eligibility,
      howToApply
    },
    "featuredPubs": *[_type == "publication" && selected == true] | order(year desc)[0...8] {
      ${publicationFields}
    },
    "latestPublications": *[_type == "publication"] | order(coalesce(order, 9999) asc, year desc)[0...8] {
      ${publicationFields}
    },
    "featuredPublications": *[_type == "publication" && selected == true] | order(year desc)[0...8] {
      ${publicationFields}
    },
    "latestNews": *[_type == "news"] | order(date desc)[0...8] {
      ${newsFields}
    },
    "galleryItems": *[_type == "gallery"] | order(date desc)[0...8] {
      ${galleryFields}
    },
    "members": *[_type == "member"] | order(order asc)[0...16] {
      ${memberFields}
    },
    "researchItems": *[_type == "research"][0...8] {
      ${researchFields}
    }
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
    modalDetailsTitle,
    layoutGuide,
    pageParts
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
