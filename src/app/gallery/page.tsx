import { client } from "@/sanity/lib/client"
import { galleryQuery } from "@/sanity/lib/queries"
import { GalleryClient, GalleryItemModel } from "./gallery-client"

export const revalidate = 60

export default async function GalleryPage() {
    const fetchedGallery = await client.fetch<GalleryItemModel[]>(galleryQuery) || [];

    const processedGallery = fetchedGallery.map((item: any) => ({
        ...item,
        _id: item._id || item.id || Math.random().toString(36).substring(7)
    }));

    return <GalleryClient galleryItems={processedGallery as GalleryItemModel[]} />
}
