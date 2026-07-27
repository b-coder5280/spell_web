import { type SchemaTypeDefinition } from 'sanity'

import { newsType } from './news'
import { memberType } from './member'
import { galleryType } from './gallery'
import { publicationType } from './publication'
import { researchType } from './research'
import { professorType } from './professor'
import { openingType } from './opening'
import { siteSettingsType } from './siteSettings'
import { homePageType } from './homePage'
import { researchPageType } from './researchPage'
import { membersPageType } from './membersPage'
import { newsPageType } from './newsPage'
import { galleryPageType } from './galleryPage'
import { publicationPageType } from './publicationPage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    siteSettingsType,
    homePageType,
    researchPageType,
    membersPageType,
    newsPageType,
    galleryPageType,
    publicationPageType,
    newsType,
    memberType,
    galleryType,
    publicationType,
    researchType,
    professorType,
    openingType
  ],
}
