import { client } from "@/sanity/lib/client"
import { galleryPageSettingsQuery, galleryQuery } from "@/sanity/lib/queries"
import { GalleryClient, GalleryItemModel } from "./gallery-client"
import { defaultGalleryPageSettings, GalleryPageSettings, withDefaults } from "@/lib/site-content"
import type { Metadata } from "next"

export const revalidate = 60
export const metadata: Metadata = {
    title: "Gallery",
    description: "A visual journal of SPELL Lab life, conferences, workshops, and shared memories.",
}

type GalleryItemWithOptionalId = GalleryItemModel & {
    id?: string
}

export default async function GalleryPage() {
    const fetchedGallery = await client.fetch<GalleryItemWithOptionalId[]>(galleryQuery) || [];
    const page = withDefaults(defaultGalleryPageSettings, await client.fetch<Partial<GalleryPageSettings>>(galleryPageSettingsQuery));

    const processedGallery = fetchedGallery.map((item, index) => ({
        ...item,
        _id: item._id || item.id || `gallery-${index}`
    }));

    return <GalleryClient galleryItems={processedGallery as GalleryItemModel[]} page={page} />
}
