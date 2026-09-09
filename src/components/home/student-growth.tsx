import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Container } from "@/components/ui/container"

const stories = [
    {
        name: "박준모", category: "국제 연구 교류", date: "2026.07",
        title: "해외 연구진과 직접 교류하는 경험",
        description: "박준모 학생은 2026년 7월 독일 뷔르츠부르크대학교의 Vladimir Dyakonov 교수님 연구실을 방문해 현지 연구진과 연구 내용을 공유하고 교류했습니다.",
        image: "4b7f05b05f37e441cff01d3653d1ad4fddae8bb6-4000x3000.jpg",
        alt: "독일 뷔르츠부르크대학교 연구실 방문 기록",
        href: "/gallery?story=1e860a6a-1039-4c53-8d4b-337f79b2aad7", action: "연구 교류 기록 보기",
    },
    {
        name: "송승우", category: "학회 발표", date: "2026",
        title: "자신의 연구를 학회에서 발표하는 경험",
        description: "송승우 학생은 2026년 한국공업화학회 춘계학술대회에서 연구 결과를 포스터로 발표하고 우수논문상을 수상했습니다.",
        image: "a1533b36114e4319c8a80628248fc400f7f58bd1-698x991.jpg",
        alt: "송승우 학생의 한국공업화학회 춘계학술대회 우수논문상 증서",
        href: "/news?story=5ecad841-3ae9-40d7-a077-73185f1fcdb7", action: "발표·수상 소식 보기",
    },
    {
        name: "손연지", category: "연구지원사업 선정", date: "2026",
        title: "연구지원사업에 도전하는 경험",
        description: "손연지 학생은 2026년도 이공분야 학술연구지원사업의 박사과정생 연구장려금 지원 대상으로 선정되었습니다.",
        image: "fd3fc6ee5d759ac70baa7c902f4ee5abb8c1d291-1254x880.avif",
        alt: "손연지 학생의 박사과정생 연구장려금 선정 소식 이미지",
        href: "/news?story=ae843bd4-614f-46f3-bff6-5e6871ca7ae4", action: "연구장려금 선정 소식 보기",
    },
]

export function StudentGrowth() {
    return (
        <section id="student-growth" lang="ko" aria-labelledby="student-growth-title" className="py-10 md:py-14">
            <Container>
                <div className="mb-8">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">Research & Growth</p>
                    <h2 id="student-growth-title" className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">SPELL에서의 연구와 성장</h2>
                </div>
                <div className="grid gap-6 lg:grid-cols-3">
                    {stories.map((story, index) => (
                        <Link key={story.name} href={story.href} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700">
                            <div className="aspect-[4/3] overflow-hidden border-b border-slate-100 bg-slate-50">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={`https://cdn.sanity.io/images/iy8pysb3/production/${story.image}?w=900&auto=format`} alt={story.alt} width={900} height={675} loading="lazy" className={`h-full w-full ${index === 0 ? "object-cover" : "object-contain p-5"}`} />
                            </div>
                            <div className="flex flex-1 flex-col p-6">
                                <div className="mb-4 flex items-center justify-between gap-2 text-xs font-medium">
                                    <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-700">{story.category}</span>
                                    <span className="text-slate-500">{story.date}</span>
                                </div>
                                <h3 className="text-xl font-bold leading-snug tracking-tight text-slate-950 [word-break:keep-all]">{story.title}</h3>
                                <p className="mt-3 text-sm font-medium text-slate-800">{story.name} 학생</p>
                                <p className="mb-6 mt-3 text-sm leading-7 text-slate-600 [word-break:keep-all]">{story.description}</p>
                                <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-blue-700">{story.action}<ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
                            </div>
                        </Link>
                    ))}
                </div>
            </Container>
        </section>
    )
}
