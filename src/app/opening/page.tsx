import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"
import Link from "next/link"

export default function OpeningPage() {
    return (
        <div className="pb-24 pt-16">
            <Container>

                <div className="mx-auto max-w-4xl space-y-12">
                    <div className="rounded-2xl border bg-card p-8 shadow-sm">
                        <h2 className="mb-6 text-2xl font-bold">Open Positions</h2>

                        <div className="space-y-8">
                            <div className="border-b pb-8 last:border-0 last:pb-0">
                                <h3 className="text-xl font-semibold">Graduate Students (M.S. / Ph.D. Program)</h3>
                                <ul className="mt-4 text-muted-foreground space-y-3">
                                    <li className="flex gap-2 text-left">
                                        <span className="text-blue-500 font-bold">•</span>
                                        <span>차세대 반도체/광반도체 소재·소자(페로브스카이트 LED, 태양전지, 뉴로모픽, 센서, 레이징 등) 연구와 더불어, 인공지능 기반 소재 탐색 및 소자 성능 최적화에 관심있는 대학원생, 박사후연구원을 모집합니다. (인턴 환영)</span>
                                    </li>
                                    <li className="flex gap-2 text-left">
                                        <span className="text-blue-500 font-bold">•</span>
                                        <span>신소재, 화공, 물리, 화학, 컴공, AI 등 이공계 전 분야 지원 가능하며, 학부 전공보다 연구 몰입도를 우선적으로 고려합니다.</span>
                                    </li>
                                    <li className="flex gap-2 text-left">
                                        <span className="text-blue-500 font-bold">•</span>
                                        <span>관심있는 학생들은 김호범 교수님께 간단한 이메일(자유 양식)로 컨택 바랍니다(e-mail: <Link href="mailto:hobkim@gist.ac.kr" className="text-blue-500 hover:underline">hobkim@gist.ac.kr</Link>)</span>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <p className="mb-6 text-muted-foreground">
                                    The SPELL is looking for passionate researchers to join our journey in pioneering the next generation of semiconductors and AI-integrated technologies.
                                </p>

                                <div className="space-y-6">
                                    <div>
                                        <h4 className="font-semibold text-blue-500 mb-2">Research Areas</h4>
                                        <ul className="text-muted-foreground space-y-1 text-sm list-disc pl-5">
                                            <li><span className="font-medium text-foreground">Next-Gen Materials & Optoelectronic Devices:</span> Perovskite LEDs, Solar Cells, Neuromorphic Devices, Sensors, and Lasing etc.</li>
                                            <li><span className="font-medium text-foreground">AI-Driven Research:</span> AI-based materials discovery, device performance prediction, and process optimization.</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-blue-500 mb-2">Opening Positions</h4>
                                        <ul className="text-muted-foreground space-y-1 text-sm list-disc pl-5">
                                            <li>Graduate Students (M.S./Ph.D. integrated or Ph.D. candidates)</li>
                                            <li>Postdoctoral Researchers</li>
                                            <li>Undergraduate Interns (Warmly welcome!)</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-blue-500 mb-2">Eligibility & Requirements</h4>
                                        <ul className="text-muted-foreground space-y-1 text-sm list-disc pl-5">
                                            <li>Open to all STEM fields: Materials Science, Chemical Engineering, Physics, Chemistry, Computer Science, AI, etc.</li>
                                            <li>We prioritize your passion, dedication, and fundamental research potential over your specific undergraduate major.</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-blue-500 mb-2">How to Apply</h4>
                                        <p className="text-muted-foreground text-sm">
                                            Interested candidates are encouraged to contact Prof. Kim via email (free format).<br />
                                            Email: <Link href="mailto:hobkim@gist.ac.kr" className="text-blue-500 hover:underline">hobkim@gist.ac.kr</Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-8 text-center">
                            <h2 className="mb-4 text-2xl font-bold text-white">How to Apply</h2>
                            <p className="mb-8 text-slate-400">
                                Please send your <strong>CV</strong> and a brief <strong>cover letter</strong> (or transcript for students) to Prof. Kim.
                            </p>
                            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white gap-2 whitespace-nowrap inline-flex items-center justify-center transition-all hover:scale-105" asChild>
                                <Link href="mailto:hobkim@gist.ac.kr" className="inline-flex items-center gap-2">
                                    <Mail className="h-5 w-5" /> Apply via Email
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>

            </Container>
        </div>
    )
}
