import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import * as dotenv from 'dotenv'
import {
    defaultGalleryPageSettings,
    defaultHomePageSettings,
    defaultMembersPageSettings,
    defaultNewsPageSettings,
    defaultOpeningPageSettings,
    defaultProfessorPageSettings,
    defaultPublicationPageSettings,
    defaultResearchPageSettings,
    defaultSiteSettings,
} from '../src/lib/site-content'

dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId || !dataset || !token) {
    console.error('Missing required environment variables. Add NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, and SANITY_API_WRITE_TOKEN to .env.local')
    process.exit(1)
}

const client = createClient({
    projectId,
    dataset,
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-03-11',
    token,
    useCdn: false,
})

type SingletonConfig = {
    id: string
    type: string
    defaults: Record<string, unknown>
    images?: Record<string, string | undefined>
}

const singletonConfigs: SingletonConfig[] = [
    {
        id: 'siteSettings',
        type: 'siteSettings',
        defaults: omit(defaultSiteSettings, ['faviconUrl', 'headerLogoUrl', 'footerLogoUrl']),
        images: {
            favicon: defaultSiteSettings.faviconUrl,
            headerLogo: defaultSiteSettings.headerLogoUrl,
            footerLogo: defaultSiteSettings.footerLogoUrl,
        },
    },
    { id: 'homePage', type: 'homePage', defaults: defaultHomePageSettings },
    {
        id: 'professor',
        type: 'professor',
        defaults: omit(defaultProfessorPageSettings, ['profileImageUrl']),
        images: {
            profileImage: defaultProfessorPageSettings.profileImageUrl,
        },
    },
    { id: 'opening', type: 'opening', defaults: defaultOpeningPageSettings },
    {
        id: 'researchPage',
        type: 'researchPage',
        defaults: omit(defaultResearchPageSettings, ['overviewImageUrl']),
        images: {
            overviewImage: defaultResearchPageSettings.overviewImageUrl,
        },
    },
    { id: 'membersPage', type: 'membersPage', defaults: defaultMembersPageSettings },
    { id: 'newsPage', type: 'newsPage', defaults: defaultNewsPageSettings },
    { id: 'galleryPage', type: 'galleryPage', defaults: defaultGalleryPageSettings },
    { id: 'publicationPage', type: 'publicationPage', defaults: defaultPublicationPageSettings },
]

function omit<T extends Record<string, unknown>>(source: T, keys: string[]) {
    return Object.fromEntries(Object.entries(source).filter(([key]) => !keys.includes(key)))
}

function isMissing(value: unknown) {
    if (value === undefined || value === null || value === '') return true
    if (Array.isArray(value) && value.length === 0) return true
    return false
}

function keyify(value: unknown, prefix: string): unknown {
    if (Array.isArray(value)) {
        return value.map((item, index) => {
            if (!item || typeof item !== 'object' || Array.isArray(item)) return item
            return {
                _key: `${prefix}-${index}`,
                ...Object.fromEntries(
                    Object.entries(item).map(([key, child]) => [key, keyify(child, `${prefix}-${index}-${key}`)])
                ),
            }
        })
    }

    if (value && typeof value === 'object') {
        return Object.fromEntries(
            Object.entries(value).map(([key, child]) => [key, keyify(child, `${prefix}-${key}`)])
        )
    }

    return value
}

async function uploadDefaultImage(imagePath: string, fieldName: string) {
    const localPath = path.join(__dirname, '..', 'public', imagePath.replace(/^\/+/, ''))

    if (!fs.existsSync(localPath)) {
        console.warn(`  - skipped ${fieldName}: missing local image ${localPath}`)
        return undefined
    }

    const asset = await client.assets.upload('image', fs.readFileSync(localPath), {
        filename: path.basename(localPath),
    })

    return {
        _type: 'image',
        asset: {
            _type: 'reference',
            _ref: asset._id,
        },
    }
}

async function syncSingleton(config: SingletonConfig) {
    await client.createIfNotExists({ _id: config.id, _type: config.type })

    const document = await client.fetch<Record<string, unknown> | null>(
        '*[_id == $id][0]',
        { id: config.id },
        { cache: 'no-store' }
    )

    const set: Record<string, unknown> = {}

    for (const [fieldName, defaultValue] of Object.entries(config.defaults)) {
        if (isMissing(document?.[fieldName])) {
            set[fieldName] = keyify(defaultValue, fieldName)
        }
    }

    for (const [fieldName, imagePath] of Object.entries(config.images || {})) {
        const currentImage = document?.[fieldName] as { asset?: unknown } | undefined
        if (imagePath && !currentImage?.asset) {
            const imageValue = await uploadDefaultImage(imagePath, fieldName)
            if (imageValue) set[fieldName] = imageValue
        }
    }

    if (Object.keys(set).length === 0) {
        console.log(`${config.id}: already complete`)
        return
    }

    await client.patch(config.id).set(set).commit()
    console.log(`${config.id}: filled ${Object.keys(set).join(', ')}`)
}

async function main() {
    console.log(`Syncing singleton defaults to Sanity dataset "${dataset}"...\n`)

    for (const config of singletonConfigs) {
        await syncSingleton(config)
    }

    console.log('\nDone. Open Studio and refresh the page settings documents.')
}

main().catch((error) => {
    console.error('Failed to sync singleton defaults:', error)
    process.exit(1)
})
