import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"
import Link from "next/link"

export default function OpeningPage() {
    return (
        <div className="pb-24 pt-16">
            <Container>
                <div className="mx-auto max-w-3xl text-center">
                    <h1 className="mb-6 text-4xl font-extrabold tracking-tight">Join Our Journey</h1>
                    <p className="mb-12 text-xl text-muted-foreground">
                        We are constantly looking for motivated graduate students and post-docs to join our team at the forefront of semiconductor innovation.
                    </p>
                </div>

                <div className="mx-auto max-w-4xl space-y-12">
                    <div className="rounded-2xl border bg-card p-8 shadow-sm">
                        <h2 className="mb-6 text-2xl font-bold">Open Positions</h2>

                        <div className="space-y-8">
                            <div className="border-b pb-8 last:border-0 last:pb-0">
                                <h3 className="text-xl font-semibold">Ph.D. / M.S. Students</h3>
                                <p className="mt-2 text-muted-foreground">
                                    Semiconductor Photonics and Electronics Lab (SPELL) focuses on next-generation semiconductor and optoelectronic devices, encompassing 1) perovskite material design, 2) perovskite-based device fabrication, and 3) AI/ML-driven performance optimization based on experimental and simulation data, with the goal of establishing core technologies for future semiconductor and optoelectronic industries.
                                </p>
                                <div className="mt-2 text-muted-foreground">Please don't hesitate to contact me by email if you are interested to join us. </div>
                            </div>

                        </div>
                    </div>

                    <div className="rounded-2xl bg-slate-900 p-8 text-center">
                        <h2 className="mb-4 text-2xl font-bold">How to Apply</h2>
                        <p className="mb-8 text-muted-foreground">
                            Please send your <strong>CV</strong> and a brief <strong>cover letter</strong> (or transcript for students) to Prof. Kim.
                        </p>
                        <Button size="lg" className="gap-2" asChild>
                            <Link href="mailto:email@gist.ac.kr">
                                <Mail className="h-5 w-5" /> Apply via Email
                            </Link>
                        </Button>
                    </div>
                </div>
            </Container>
        </div>
    )
}
