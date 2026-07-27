import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"
import Link from "next/link"
import { client } from "@/sanity/lib/client"
import { defaultOpeningPageSettings, OpeningPageSettings, withDefaults } from "@/lib/site-content"

export const revalidate = 60

type OpeningResearchArea = {
    title?: string
    description?: string
}

type OpeningDocument = Partial<OpeningPageSettings> & {
    koreanDescription?: string[]
    englishIntro?: string
    researchAreas?: OpeningResearchArea[]
    openingPositions?: string[]
    eligibility?: string[]
    howToApply?: string
}

export default async function OpeningPage() {
    const opening = await client.fetch<OpeningDocument | null>(`*[_type == "opening"][0]`)
    const page = withDefaults(defaultOpeningPageSettings, opening as Partial<OpeningPageSettings>)

    const korDesc = opening?.koreanDescription || []
    const englishIntro = opening?.englishIntro || ""
    const researchAreas = opening?.researchAreas || []
    const positions = opening?.openingPositions || []
    const eligibility = opening?.eligibility || []
    const howToApply = opening?.howToApply || ""

    return (
        <div className="pb-24 pt-16">
            <Container>
                <div className="mx-auto max-w-4xl space-y-12">
                    <div className="rounded-2xl border bg-card p-8 shadow-sm">
                        <h2 className="mb-6 text-2xl font-bold">{page.pageTitle}</h2>

                        <div className="space-y-8">
                            <div className="border-b pb-8 last:border-0 last:pb-0">
                                <h3 className="text-xl font-semibold">{page.positionTitle}</h3>
                                <ul className="mt-4 text-muted-foreground space-y-3">
                                    {korDesc.map((desc: string, i: number) => {
                                        const emailMatch = desc.match(/([\w.-]+@[\w.-]+\.\w+)/)
                                        if (emailMatch) {
                                            const parts = desc.split(emailMatch[0])
                                            return (
                                                <li key={i} className="flex gap-2 text-left">
                                                    <span className="text-blue-500 font-bold">&bull;</span>
                                                    <span>
                                                        {parts[0]}
                                                        <Link href={`mailto:${emailMatch[0]}`} className="text-blue-500 hover:underline">{emailMatch[0]}</Link>
                                                        {parts[1]}
                                                    </span>
                                                </li>
                                            )
                                        }

                                        return (
                                            <li key={i} className="flex gap-2 text-left">
                                                <span className="text-blue-500 font-bold">&bull;</span>
                                                <span>{desc}</span>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>

                            <div>
                                <p className="mb-6 text-muted-foreground">
                                    {englishIntro}
                                </p>

                                <div className="space-y-6">
                                    <div>
                                        <h4 className="font-semibold text-blue-500 mb-2">{page.researchAreasHeading}</h4>
                                        <ul className="text-muted-foreground space-y-1 text-sm list-disc pl-5">
                                            {researchAreas.map((area, i) => (
                                                <li key={i}><span className="font-medium text-foreground">{area.title}</span> {area.description}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-blue-500 mb-2">{page.openingPositionsHeading}</h4>
                                        <ul className="text-muted-foreground space-y-1 text-sm list-disc pl-5">
                                            {positions.map((pos: string, i: number) => (
                                                <li key={i}>{pos}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-blue-500 mb-2">{page.eligibilityHeading}</h4>
                                        <ul className="text-muted-foreground space-y-1 text-sm list-disc pl-5">
                                            {eligibility.map((req: string, i: number) => (
                                                <li key={i}>{req}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-blue-500 mb-2">{page.howToApplyHeading}</h4>
                                        <p className="text-muted-foreground text-sm whitespace-pre-line">
                                            {howToApply}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl bg-slate-100 border border-slate-200 p-8 text-center mt-12">
                            <h2 className="mb-4 text-2xl font-bold">{page.applyBoxTitle}</h2>
                            <p className="mb-8 text-muted-foreground">
                                {page.applyBoxDescription}
                            </p>
                            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white gap-2 whitespace-nowrap inline-flex items-center justify-center transition-all hover:scale-105" asChild>
                                <Link href={`mailto:${page.applyEmail}`} className="inline-flex items-center gap-2">
                                    <Mail className="h-5 w-5" /> {page.applyButtonLabel}
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}
