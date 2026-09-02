export type ResearchPagePartType = "researchCards" | "overviewImage"

export type ResearchPagePart = {
    _key?: string
    _type?: "researchPagePart"
    partType?: ResearchPagePartType
    enabled?: boolean
    title?: string
    intro?: string
    layout?: "grid" | "compact" | "featuredIntro"
    columns?: 2 | 3
    imageLayout?: "contained" | "full"
}

export const defaultResearchPageParts: ResearchPagePart[] = [
    {
        _key: "research-overview-image",
        _type: "researchPagePart",
        partType: "overviewImage",
        enabled: true,
        imageLayout: "contained",
    },
    {
        _key: "research-cards",
        _type: "researchPagePart",
        partType: "researchCards",
        enabled: true,
        layout: "grid",
        columns: 3,
    },
]

export function getRenderableResearchPageParts(parts?: ResearchPagePart[] | null) {
    const usableParts = (parts || []).filter(
        (part) => part?.enabled !== false && (part.partType === "researchCards" || part.partType === "overviewImage")
    )

    const renderableParts = usableParts.length > 0 ? usableParts : defaultResearchPageParts
    const overviewParts = renderableParts.filter((part) => part.partType === "overviewImage")
    const otherParts = renderableParts.filter((part) => part.partType !== "overviewImage")

    return [...overviewParts, ...otherParts]
}
