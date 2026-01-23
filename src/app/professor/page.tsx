import { Container } from "@/components/ui/container"
import { SectionTitle } from "@/components/ui/section-title"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { Mail, MapPin, Linkedin, GraduationCap, User, Award, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { image } from "framer-motion/client"

export default function ProfessorPage() {
    return (
        <div className="pb-24 pt-16">
            <Container>
                <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
                    {/* Profile Sidebar */}
                    <div className="space-y-8">
                        <div className="relative aspect-[3/4] w-full max-w-sm overflow-hidden rounded-2xl bg-slate-800">
                            <Image
                                src="/images/hb.jpg"
                                alt="Hobeom Kim, Ph.D."
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold">Hobeom Kim, Ph.D.</h2>
                            <p className="text-muted-foreground">Assistant Professor</p>



                            <div className="flex flex-wrap gap-2">
                                <Button variant="outline" className="gap-2 px-4 py-2 h-auto whitespace-nowrap inline-flex items-center" asChild>
                                    <a href="https://scholar.google.com/citations?user=LuWKShkAAAAJ&hl=ko" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                                        <svg
                                            viewBox="0 0 24 24"
                                            className="h-5 w-5 fill-current shrink-0"
                                            aria-hidden="true"
                                        >
                                            <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.828 3.38L12 18.26l7.172-5.38L24 9.5z" />
                                        </svg>
                                        <span className="font-medium">Google Scholar</span>
                                    </a>
                                </Button>

                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="space-y-12">
                        <div>
                            <h1 className="mb-6 text-4xl font-extrabold tracking-tight">Principal Investigator</h1>
                            <p className="text-lg leading-relaxed text-muted-foreground">
                                <li>Department of Materials Science and Engineering</li>
                                <li>Gwangju Institute of Science and Technology (GIST)</li>
                                <li>Tel: +82-62-715-2741</li>
                                <li>E-mail: hobkim@gist.ac.kr, hobkim11@gmail.com</li>
                                <li>Address: 123 Cheomdangwagi-ro, Buk-gu, Gwangju 61005, Republic of Korea</li>
                                <li>Office: Materials Science and Engineering Building(S5)</li>
                            </p>
                        </div>

                        <Tabs defaultValue="edu_exp" className="w-full">
                            <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 bg-transparent p-0 gap-4 h-auto">
                                <TabsTrigger
                                    value="edu_exp"
                                    className="flex items-center justify-center rounded-xl py-6 px-4 text-base font-bold transition-all border-2
                                    bg-muted/30 border-muted/50 text-muted-foreground
                                    data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:border-primary data-[state=active]:shadow-xl 
                                    hover:bg-muted/50 hover:border-muted-foreground/30 shadow-sm"
                                >
                                    Education & Experience
                                </TabsTrigger>
                                <TabsTrigger
                                    value="grants"
                                    className="flex items-center justify-center rounded-xl py-6 px-4 text-base font-bold transition-all border-2
                                    bg-muted/30 border-muted/50 text-muted-foreground
                                    data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:border-primary data-[state=active]:shadow-xl 
                                    hover:bg-muted/50 hover:border-muted-foreground/30 shadow-sm"
                                >
                                    Grants
                                </TabsTrigger>
                                <TabsTrigger
                                    value="awards"
                                    className="flex items-center justify-center rounded-xl py-6 px-4 text-base font-bold transition-all border-2
                                    bg-muted/30 border-muted/50 text-muted-foreground
                                    data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:border-primary data-[state=active]:shadow-xl 
                                    hover:bg-muted/50 hover:border-muted-foreground/30 shadow-sm"
                                >
                                    Awards & Honors
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="edu_exp" className="mt-8 space-y-8">
                                <div className="border-l-2 border-primary pl-6 py-1">
                                    <h3 className="font-bold">Assistant Professor</h3>
                                    <p className="text-muted-foreground">Department of Materials Science and Engineering, Gwangju Institute of Science and Technology (GIST) (2022-Present)</p>
                                </div>
                                <div className="border-l-2 border-slate-800 pl-6 py-1">
                                    <h3 className="font-bold">Postdoctoral Researcher</h3>
                                    <p className="text-muted-foreground">Institute of Chemical Sciences and Engineering (ISIC), École Polytechnique Fédérale de Lausanne (EPFL), Switzerland (Advisor: Prof. Mohammad Khaja Nazeeruddin) (2018-2022)</p>
                                </div>
                                <div className="border-l-2 border-slate-800 pl-6 py-1">
                                    <h3 className="font-bold">Postdoctoral Researcher</h3>
                                    <p className="text-muted-foreground">Research Institute of Advanced Materials, Seoul National University (SNU), Republic of Korea (Advisor: Prof. Tae-Woo Lee) (2017-2018)</p>
                                </div>
                                <div className="border-l-2 border-slate-800 pl-6 py-1">
                                    <h3 className="font-bold">Ph.D. in Materials Science and Engineering</h3>
                                    <p className="text-muted-foreground">Pohang University of Science and Technology (POSTECH), South Korea (Advisor: Prof. Tae-Woo Lee) (2011-2017)</p>
                                </div>
                                <div className="border-l-2 border-slate-800 pl-6 py-1">
                                    <h3 className="font-bold">B.S. in Advanced Materials Science and Engineering</h3>
                                    <p className="text-muted-foreground">Sungkyunkwan University (SKKU), South Korea (2004-2011)</p>
                                </div>
                            </TabsContent>

                            <TabsContent value="grants" className="mt-8 space-y-4">
                                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                                    <li><strong className="text-foreground">과학기술정보통신부 기초연구사업 글로벌 매칭형(독일) 연구과제 선정</strong>, '근적외선 발광 페로브스카이트의 결함-전하동역학 이해 기반 고효율·고안정성 근적외선 발광다이오드 개발' (2024.12 - 2027.11)</li>
                                    <li><strong className="text-foreground">이공분야 기초연구사업 - 우수신진연구 연구과제 선정</strong>, '단결정 페로브스카이트 결정다형체 기반 고효율 고안정성 적색 발광다이오드 개발' (2024.05 - 2029.04)</li>
                                    <li><strong className="text-foreground">다학제 융합클러스터사업 연구과제 선정</strong>, '미래 마이크로 디스플레이 기술 개발을 위한 융합클러스터' (2023.11 - 2025.10)</li>
                                    <li><strong className="text-foreground">디지털연구혁신 선도기관 육성 사업 연구과제 선정</strong>, '인공지능 디지털 트윈 기반 고효율 적층형 반도체 소자 개발 자동화 연구실' (2023.09 - 2026.12)</li>
                                    <li><strong className="text-foreground">대학 혁신역량 강화 기획지원 사업 연구과제 선정</strong>, '차세대 마이크로 디스플레이 기술개발' (2023.09 - 2023.12)</li>
                                </ul>
                            </TabsContent>

                            <TabsContent value="awards" className="mt-8 space-y-4">
                                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                                    <li><strong className="text-foreground">Young Scientist Award</strong>, PIERS 2025, Abu Dhabi</li>
                                    <li><strong className="text-foreground">Young Scientist Award</strong>, The Polymer Society of Korea, 한국고분자학회 신진학술상 (2025 춘계)</li>
                                    <li><strong className="text-foreground">Korea Toray Fellowship</strong>, Korea Toray Science Foundation, 한국도레이 펠로십, 한국도레이과학진흥재단 (2024)</li>
                                    <li><strong className="text-foreground">PRIME SPECIALE</strong>, School of Basic Sciences, EPFL, Switzerland (2019)</li>
                                    <li><strong className="text-foreground">LG Award</strong>, Korean Expert Association on Material Science and Technology in Europe (KEMST) (2019)</li>
                                    <li><strong className="text-foreground">Rising Scientist</strong>, Inter-Academy Seoul Science Forum (IASSF), The Korea Academy of Science and Technology (KAST), Republic of Korea (2017)</li>
                                    <li><strong className="text-foreground">Best Paper Award of Year</strong>, Department of Materials Science and Engineering, POSTECH, Republic of Korea (2017)</li>
                                    <li><strong className="text-foreground">Excellent Paper Presentation Award</strong>,The Korean Society of Industrial and Engineering Chemistry, Republic of Korea (2015)</li>
                                </ul>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </Container>
        </div>
    )
}
