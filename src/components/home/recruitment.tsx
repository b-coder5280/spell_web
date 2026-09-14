import Link from "next/link"
import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { defaultHomePageSettings, type HomePageSettings } from "@/lib/site-content"
import { recruitmentCopy } from "@/lib/recruitment-content"

type RecruitmentProps = {
    researchAreas?: { title?: string; description?: string }[]
    eligibility?: string[]
    homePage?: HomePageSettings
}

export function Recruitment({ researchAreas = [], eligibility = [], homePage = defaultHomePageSettings }: RecruitmentProps) {
    return (
                    <div className="relative mx-auto mb-8 w-full max-w-full overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8 md:p-12">
                        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
                        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-72 h-72 bg-indigo-500/10 rounded-full blur-[80px]" />

                        <div className="relative z-10 flex flex-col items-center justify-center gap-12 xl:flex-row xl:items-start">
                            <div className="mx-auto max-w-3xl text-left xl:mx-0">
                                <h2 className="mb-8 text-center text-3xl font-bold text-foreground md:text-5xl xl:text-left">
                                    {homePage.recruitmentTitleBefore} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">{homePage.recruitmentTitleHighlight}</span>
                                </h2>

                                <div className="space-y-8">
                                    <div lang="ko" className="space-y-4 text-base leading-7 text-muted-foreground [word-break:keep-all]">
                                        <h3 className="text-lg font-semibold text-blue-500">모집 대상</h3>
                                        <p className="font-medium text-foreground">{recruitmentCopy.koreanDescription[0]}</p>
                                        <p>{recruitmentCopy.koreanDescription[1]}</p>
                                        <p>{recruitmentCopy.koreanDescription[2]}</p>
                                        <Link href="mailto:hobkim@gist.ac.kr" className="inline-flex items-center gap-2 font-medium text-blue-600 underline-offset-4 hover:underline"><Mail aria-hidden="true" className="h-4 w-4 shrink-0" />hobkim@gist.ac.kr</Link>
                                    </div>
                                    <div lang="en" className="space-y-4 border-t border-slate-200 pt-8 text-base leading-7 text-muted-foreground">
                                        <h3 className="text-lg font-semibold text-blue-500">Open Positions</h3>
                                        <p className="font-medium text-foreground">{recruitmentCopy.openingPositions[0]}</p>
                                        <p>{recruitmentCopy.openingPositions[1]}</p>
                                        <p>Please email <Link href="mailto:hobkim@gist.ac.kr" className="font-medium text-blue-600 underline-offset-4 hover:underline">hobkim@gist.ac.kr</Link> with a brief introduction, your research interests, and the program or position you are interested in.</p>
                                    </div>
                                    {(researchAreas.length > 0 || eligibility.length > 0) && (
                                        <div lang="en" className="space-y-6 border-t border-slate-200 pt-8 text-sm leading-6 text-muted-foreground">
                                            {researchAreas.length > 0 && <div>
                                                <h3 className="mb-3 font-semibold text-blue-500">{homePage.researchAreasHeading}</h3>
                                                <div className="space-y-3">{researchAreas.map((area, index) => <p key={index}><span className="font-medium text-foreground">{area.title}</span> {area.description}</p>)}</div>
                                            </div>}
                                            {eligibility.length > 0 && <div>
                                                <h3 className="mb-3 font-semibold text-blue-500">{homePage.eligibilityHeading}</h3>
                                                <div className="space-y-3">{eligibility.map((item, index) => <p key={index}>{item}</p>)}</div>
                                            </div>}
                                        </div>
                                    )}
                                        <div className="flex flex-wrap justify-center gap-4 pt-4 xl:justify-start">
                                            <Button size="lg" variant="outline" className="h-12 px-8 border-slate-200 hover:bg-slate-100 text-foreground backdrop-blur-sm group/btn" asChild>
                                                <Link href={`mailto:${homePage.contactEmail}`} className="inline-flex items-center gap-2">
                                                    <Mail className="h-5 w-5 text-blue-500 group-hover/btn:scale-110 transition-transform" /> {homePage.contactButtonLabel}
                                                </Link>
                                            </Button>
                                            <Button size="lg" variant="ghost" className="h-12 px-8 text-muted-foreground hover:text-foreground" asChild>
                                                <Link href={homePage.openingDetailsButtonHref}>{homePage.openingDetailsButtonLabel}</Link>
                                            </Button>
                                        </div>
                                </div>
                            </div>

                            <div className="hidden xl:block shrink-0 sticky top-0">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
                                    <div className="relative w-48 h-48 rounded-full border border-blue-500/30 bg-blue-500/5 flex items-center justify-center backdrop-blur-sm">
                                        <div className="w-36 h-36 rounded-full border border-blue-500/20 bg-blue-500/10 flex items-center justify-center">
                                            <div className="w-24 h-24 rounded-full bg-blue-500/20 flex items-center justify-center">
                                                <Mail className="w-12 h-12 text-blue-400" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
    )
}
