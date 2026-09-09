import { recruitmentCopy } from "@/lib/recruitment-content"
import { Container } from "@/components/ui/container"
import { ArrowUpRight, Mail } from "lucide-react"
import { client } from "@/sanity/lib/client"
import { defaultOpeningPageSettings, OpeningPageSettings, withDefaults } from "@/lib/site-content"
import type { Metadata } from "next"

export const revalidate = 60
export const metadata: Metadata = {
    title: "Opening",
    description: "Open positions and application information for SPELL Lab.",
}

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

    const researchAreas = opening?.researchAreas || []
    const eligibility = opening?.eligibility || []
    return (
        <div className="relative isolate bg-white pb-20 sm:pb-28">
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[480px] bg-gradient-to-b from-blue-50/80 via-cyan-50/30 to-white" />
            <Container>
                <div className="mx-auto max-w-5xl">
                    <header className="pb-12 pt-14 sm:pb-16 sm:pt-20">
                        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-blue-600">Join SPELL</p>
                        <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-6xl">Open <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Positions</span></h1>
                        <p lang="ko" className="mt-6 text-lg leading-8 text-slate-600 [word-break:keep-all]">SPELL에서 함께 연구하고 성장할 동료를 기다립니다.</p>
                        <a href={`mailto:${page.applyEmail}`} className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/15 transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600">
                            지원 문의하기 <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                        </a>
                    </header>

                    <section aria-labelledby="positions-title" className="grid gap-7 border-t border-slate-100 py-10 sm:py-12 md:grid-cols-[220px_minmax(0,1fr)] md:gap-12">
                        <div>
                            <p className="mb-3 text-xs font-medium tracking-widest text-blue-500">01 / POSITIONS</p>
                            <h2 id="positions-title" className="text-xl font-semibold text-slate-950">모집 대상</h2>
                        </div>
                        <div className="min-w-0">
                            <div lang="ko" className="space-y-4 leading-8 text-slate-600 [word-break:keep-all]">
                                <p className="text-xl font-semibold leading-9 text-slate-900">{recruitmentCopy.koreanDescription[0]}</p>
                                <p>{recruitmentCopy.koreanDescription[1]}</p>
                                <p>{recruitmentCopy.koreanDescription[2]}</p>
                            </div>
                            <div lang="en" className="mt-7 space-y-3 rounded-2xl bg-slate-50 px-5 py-6 text-sm leading-7 text-slate-600 sm:px-7">
                                <h3 className="font-semibold text-slate-900">Open Positions</h3>
                                {recruitmentCopy.openingPositions.map(position => <p key={position}>{position}</p>)}
                                <p>Please email <a href={`mailto:${page.applyEmail}`} className="font-medium text-blue-600 underline-offset-4 hover:underline">{page.applyEmail}</a> with a brief introduction, your research interests, and the program or position you are interested in.</p>
                            </div>
                        </div>
                    </section>

                    {researchAreas.length > 0 && (
                        <section aria-labelledby="research-title" className="grid gap-7 border-t border-slate-100 py-10 sm:py-12 md:grid-cols-[220px_minmax(0,1fr)] md:gap-12">
                            <div>
                                <p className="mb-3 text-xs font-medium tracking-widest text-blue-500">02 / RESEARCH</p>
                                <h2 id="research-title" className="text-xl font-semibold text-slate-950">{page.researchAreasHeading}</h2>
                            </div>
                            <div className="space-y-7">
                                {researchAreas.map((area, index) => (
                                    <div key={index} className="relative pl-5 before:absolute before:bottom-1 before:left-0 before:top-1 before:w-0.5 before:rounded-full before:bg-blue-200">
                                        <h3 className="font-semibold leading-7 text-slate-900">{area.title}</h3>
                                        <p className="mt-2 text-sm leading-7 text-slate-600">{area.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {eligibility.length > 0 && (
                        <section aria-labelledby="eligibility-title" className="grid gap-7 border-t border-slate-100 py-10 sm:py-12 md:grid-cols-[220px_minmax(0,1fr)] md:gap-12">
                            <div>
                                <p className="mb-3 text-xs font-medium tracking-widest text-blue-500">03 / BACKGROUND</p>
                                <h2 id="eligibility-title" className="text-xl font-semibold text-slate-950">{page.eligibilityHeading}</h2>
                            </div>
                            <div className="space-y-4 text-sm leading-7 text-slate-600">
                                {eligibility.map((requirement, index) => <p key={index}>{requirement}</p>)}
                            </div>
                        </section>
                    )}

                    <section id="apply" aria-labelledby="apply-title" className="relative mt-6 scroll-mt-24 overflow-hidden rounded-3xl bg-gradient-to-br from-blue-50 via-slate-50 to-cyan-50 px-6 py-9 sm:px-10 sm:py-12">
                        <div aria-hidden="true" className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-cyan-100/50 blur-3xl" />
                        <div className="relative">
                            <Mail aria-hidden="true" className="mb-5 h-7 w-7 text-blue-600" />
                            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">How to Apply</p>
                            <h2 id="apply-title" lang="ko" className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">지원 방법</h2>
                            <p lang="ko" className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 [word-break:keep-all]">지원을 희망하시는 분은 간단한 자기소개, 관심 연구 분야, 희망 과정 또는 지원 분야를 기재하여 아래 이메일로 연락해 주시기 바랍니다.</p>
                            <p lang="en" className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">To apply, please email a brief introduction, your research interests, and the program or position you wish to apply for.</p>
                            <a href={`mailto:${page.applyEmail}`} className="mt-7 inline-flex min-h-12 max-w-full items-center gap-3 rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/15 transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 sm:px-6">
                                {page.applyEmail}<ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0" />
                            </a>
                        </div>
                    </section>
                </div>
            </Container>
        </div>
    )
}
