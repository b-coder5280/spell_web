import { client } from "@/sanity/lib/client"
import ResearchClient, { ResearchItem } from "./research-client"
import { researchPageSettingsQuery } from "@/sanity/lib/queries"
import { defaultResearchPageSettings, ResearchPageSettings, withDefaults } from "@/lib/site-content"

export const revalidate = 60

export default async function ResearchPage() {
    const fetchedThrusts = await client.fetch<ResearchItem[]>(`*[_type == "research"]`) || [];
    const page = withDefaults(defaultResearchPageSettings, await client.fetch<Partial<ResearchPageSettings>>(researchPageSettingsQuery));

    return <ResearchClient thrusts={fetchedThrusts} page={page} />
}
