import { client } from "@/sanity/lib/client"
import { PublicationClient, PublicationItem } from "./publication-client"
import { publicationPageQuery } from "@/sanity/lib/queries"
import { defaultPublicationPageSettings, PublicationPageSettings, withDefaults } from "@/lib/site-content"

export const revalidate = 60

export default async function PublicationPage() {
    const fetchedPubs = await client.fetch<PublicationItem[]>(`*[_type == "publication"] | order(coalesce(order, 9999) asc, year desc)`) || [];
    const page = withDefaults(defaultPublicationPageSettings, await client.fetch<Partial<PublicationPageSettings>>(publicationPageQuery));

    return <PublicationClient publications={fetchedPubs} page={page} />
}
