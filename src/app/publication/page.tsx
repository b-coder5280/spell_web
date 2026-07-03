import { client } from "@/sanity/lib/client"
import { PublicationClient, PublicationItem } from "./publication-client"

export const revalidate = 60

export default async function PublicationPage() {
    const fetchedPubs = await client.fetch<PublicationItem[]>(`*[_type == "publication"] | order(coalesce(order, 9999) asc, year desc)`) || [];

    return <PublicationClient publications={fetchedPubs} />
}
