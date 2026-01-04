import { Container } from "@/components/ui/container"
import { SectionTitle } from "@/components/ui/section-title"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { Mail, MapPin, Linkedin, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ProfessorPage() {
    return (
        <div className="pb-24 pt-16">
            <Container>
                <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
                    {/* Profile Sidebar */}
                    <div className="space-y-8">
                        <div className="relative aspect-[3/4] w-full max-w-sm overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800">
                            {/* Placeholder for Professor Image */}
                            <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                                [Professor Photo]
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold">Prof. Gil-Dong Hong</h2>
                            <p className="text-muted-foreground">Principal Investigator</p>

                            <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4" />
                                    <span>email@gist.ac.kr</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4" />
                                    <span>Rm 301, AI Graduate School</span>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <Button size="icon" variant="outline" title="Google Scholar">
                                    <GraduationCap className="h-4 w-4" />
                                </Button>
                                <Button size="icon" variant="outline" title="LinkedIn">
                                    <Linkedin className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="space-y-12">
                        <div>
                            <h1 className="mb-6 text-4xl font-extrabold tracking-tight">Biography</h1>
                            <p className="text-lg leading-relaxed text-muted-foreground">
                                Professor Hong leads the SPELL Lab at GIST, focusing on the intersection of semiconductor devices and photonic systems.
                                With extensive experience in both academia and industry, he aims to develop sustainable technologies that power next-generation computing and display applications.
                                His research has been published in top-tier journals including Nature Electronics and Advanced Materials.
                            </p>
                        </div>

                        <Tabs defaultValue="education" className="w-full">
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="education">Education</TabsTrigger>
                                <TabsTrigger value="experience">Experience</TabsTrigger>
                                <TabsTrigger value="awards">Awards & Service</TabsTrigger>
                            </TabsList>

                            <TabsContent value="education" className="mt-8 space-y-8">
                                <div className="border-l-2 border-primary pl-6 py-1">
                                    <h3 className="font-bold">Ph.D. in Electrical Engineering</h3>
                                    <p className="text-muted-foreground">Stanford University, CA, USA (2015-2020)</p>
                                </div>
                                <div className="border-l-2 border-slate-200 pl-6 py-1 dark:border-slate-800">
                                    <h3 className="font-bold">B.S. in Electrical Engineering</h3>
                                    <p className="text-muted-foreground">Seoul National University, Korea (2009-2015)</p>
                                </div>
                            </TabsContent>

                            <TabsContent value="experience" className="mt-8 space-y-8">
                                <div className="border-l-2 border-primary pl-6 py-1">
                                    <h3 className="font-bold">Assistant Professor</h3>
                                    <p className="text-muted-foreground">GIST (2022-Present)</p>
                                </div>
                                <div className="border-l-2 border-slate-200 pl-6 py-1 dark:border-slate-800">
                                    <h3 className="font-bold">Postdoctoral Researcher</h3>
                                    <p className="text-muted-foreground">MIT (2020-2022)</p>
                                </div>
                            </TabsContent>

                            <TabsContent value="awards" className="mt-8 space-y-4">
                                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                                    <li><strong className="text-foreground">Best Paper Award</strong>, IEDM (2023)</li>
                                    <li><strong className="text-foreground">Young Investigator Award</strong>, KIEEME (2022)</li>
                                    <li>Samsung Scholarship (2015-2020)</li>
                                </ul>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </Container>
        </div>
    )
}
