'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\src\app\studio\[[...tool]]\page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {presentationTool} from 'sanity/presentation'
import {structureTool} from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './src/sanity/env'
import {fillHomeBuilderDefaultsAction} from './src/sanity/actions/fillHomeBuilderDefaults'
import {fillResearchPagePartsAction} from './src/sanity/actions/fillResearchPageParts'
import {schema} from './src/sanity/schemaTypes'
import {structure} from './src/sanity/structure'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  document: {
    actions: (previousActions, context) => {
      if (context.schemaType === 'homePage') return [fillHomeBuilderDefaultsAction, ...previousActions]
      if (context.schemaType === 'researchPage') return [fillResearchPagePartsAction, ...previousActions]
      return previousActions
    },
  },
  plugins: [
    structureTool({structure}),
    presentationTool({
      previewUrl: {
        initial: '/',
        previewMode: {
          enable: '/api/draft-mode/enable',
          shareAccess: false,
        },
      },
    }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
  ],
})
