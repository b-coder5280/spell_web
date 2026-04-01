import { client } from "@/sanity/lib/client"
import ResearchClient, { ResearchItem } from "./research-client"

export const revalidate = 60

export default async function ResearchPage() {
    const fetchedThrusts = await client.fetch<ResearchItem[]>(`*[_type == "research"]`) || [];

    return <ResearchClient thrusts={fetchedThrusts} />
}
