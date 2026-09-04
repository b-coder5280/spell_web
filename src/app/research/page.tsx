import { client } from "@/sanity/lib/client"
import ResearchClient, { ResearchItem } from "./research-client"
import { researchPageSettingsQuery } from "@/sanity/lib/queries"
import { defaultResearchPageSettings, ResearchPageSettings, withDefaults } from "@/lib/site-content"
import type { Metadata } from "next"

export const revalidate = 60
export const metadata: Metadata = {
    title: "Research",
    description: "Core research areas and vision of Semiconductor Photonics and Electronics Lab.",
}

export default async function ResearchPage() {
    const fetchedThrusts = await client.fetch<ResearchItem[]>(`*[_type == "research"]`) || [];
    const page = withDefaults(defaultResearchPageSettings, await client.fetch<Partial<ResearchPageSettings>>(researchPageSettingsQuery));

    return <ResearchClient thrusts={fetchedThrusts} page={page} />
}
