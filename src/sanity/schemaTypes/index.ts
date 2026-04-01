import { type SchemaTypeDefinition } from 'sanity'

import { newsType } from './news'
import { memberType } from './member'
import { galleryType } from './gallery'
import { publicationType } from './publication'
import { researchType } from './research'
import { professorType } from './professor'
import { openingType } from './opening'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    newsType,
    memberType,
    galleryType,
    publicationType,
    researchType,
    professorType,
    openingType
  ],
}
