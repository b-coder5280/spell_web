import { Container } from "@/components/ui/container"
import { SectionTitle } from "@/components/ui/section-title"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { client } from "@/sanity/lib/client"

export const revalidate = 60

export default async function ProfessorPage() {
    const prof = await client.fetch(`*[_type == "professor"][0]`)

    const education = prof?.education || []
    const grants = prof?.grants || []
    const awards = prof?.awards || []

    return (
        <div className="pb-24 pt-16">
            <Container>
                <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
                    {/* Profile Sidebar */}
                    <div className="space-y-8">
                        <div className="relative aspect-[3/4] w-full max-w-sm overflow-hidden rounded-2xl bg-slate-100">
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
                            <ul className="text-lg leading-relaxed text-muted-foreground list-none p-0">
                                <li>Department of Materials Science and Engineering</li>
                                <li>Gwangju Institute of Science and Technology (GIST)</li>
                                <li>Tel: +82-62-715-2741</li>
                                <li>E-mail: hobkim@gist.ac.kr, hobkim11@gmail.com</li>
                                <li>Address: 123 Cheomdangwagi-ro, Buk-gu, Gwangju 61005, Republic of Korea</li>
                                <li>Office: Materials Science and Engineering Building(S5)</li>
                            </ul>
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
                                {education.map((edu: any, i: number) => (
                                    <div key={i} className={`border-l-2 ${edu.highlight ? 'border-primary' : 'border-slate-200'} pl-6 py-1`}>
                                        <h3 className="font-bold">{edu.role}</h3>
                                        <p className="text-muted-foreground">{edu.description}</p>
                                    </div>
                                ))}
                            </TabsContent>

                            <TabsContent value="grants" className="mt-8 space-y-4">
                                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                                    {grants.map((grant: string, i: number) => {
                                        // A simple heuristic to bold the project title vs grant program
                                        // Format usually is "Program Name, 'Project Title' (Date)"
                                        const parts = grant.split("',");
                                        if (parts.length > 1) {
                                            const [first, ...rest] = parts;
                                            return (
                                                <li key={i}><strong className="text-foreground">{first}'</strong>,{rest.join("',")}</li>
                                            );
                                        }
                                        const parts2 = grant.split(", '");
                                        if (parts2.length > 1) {
                                            return (
                                                <li key={i}><strong className="text-foreground">{parts2[0]}</strong>, '{parts2[1]}</li>
                                            );
                                        }
                                        // Fallback
                                        return <li key={i}><strong className="text-foreground">{grant.split(',')[0]}</strong>{grant.substring(grant.indexOf(','))}</li>
                                    })}
                                </ul>
                            </TabsContent>

                            <TabsContent value="awards" className="mt-8 space-y-4">
                                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                                    {awards.map((award: string, i: number) => {
                                        const commaIndex = award.indexOf(',');
                                        if (commaIndex !== -1) {
                                            const boldPart = award.substring(0, commaIndex);
                                            const restPart = award.substring(commaIndex);
                                            return <li key={i}><strong className="text-foreground">{boldPart}</strong>{restPart}</li>
                                        }
                                        return <li key={i}>{award}</li>
                                    })}
                                </ul>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </Container>
        </div>
    )
}
