import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"
import Link from "next/link"

export default function OpeningPage() {
    return (
        <div className="pb-24 pt-16">
            <Container>
                <div className="mx-auto max-w-3xl text-center">
                    <h1 className="mb-6 text-4xl font-extrabold tracking-tight">Recruitment</h1>
                    <p className="mb-12 text-xl text-muted-foreground">
                        We are constantly looking for motivated graduate students and post-docs to join our team at the forefront of semiconductor.
                    </p>
                </div>

                <div className="mx-auto max-w-4xl space-y-12">
                    <div className="rounded-2xl border bg-card p-8 shadow-sm">
                        <h2 className="mb-6 text-2xl font-bold">Open Positions</h2>

                        <div className="space-y-8">
                            <div className="border-b pb-8 last:border-0 last:pb-0">
                                <h3 className="text-xl font-semibold">Ph.D. / M.S. Students</h3>
                                <ul className="mt-4 text-muted-foreground space-y-3">
                                    <li className="flex gap-2 text-left">
                                        <span className="text-blue-500 font-bold">•</span>
                                        <span>차세대 반도체/광반도체 소재 및 소자 (페로브스카이트 LED, 태양전지, 뉴로모픽 소자 등) 및 인공지능 기반 소재 탐색, 소자 성능 예측 및 최적화 연구에 관심있는 대학원생을 모집합니다.</span>
                                    </li>
                                    <li className="flex gap-2 text-left">
                                        <span className="text-blue-500 font-bold">•</span>
                                        <span>신소재/화공/물리/화학/컴공/AI 등 이공계 전 분야 지원 가능하며 학부 전공보다 연구에 대한 몰입도와 기초 역량을 우선적으로 고려합니다.</span>
                                    </li>
                                    <li className="flex gap-2 text-left">
                                        <span className="text-blue-500 font-bold">•</span>
                                        <span>관심있는 학생들은 언제든지 김호범 교수님(e-mail: <Link href="mailto:hobkim@gist.ac.kr" className="text-blue-500 hover:underline">hobkim@gist.ac.kr</Link>)께 간단한 자기소개서(자유 양식)와 함께 컨택 바랍니다.</span>
                                    </li>
                                </ul>
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
            </Container>
        </div>
    )
}
