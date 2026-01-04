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
                                    We invite applications from students with a strong background in Electrical Engineering, Materials Science, or Physics.
                                    Successful candidates will work on projects related to Perovskite LEDs, Neuromorphic Computing, or Flexible Electronics.
                                    Full financial support (tuition + stipend) is provided.
                                </p>
                                <div className="mt-4 font-medium text-sm">Target: Entering Fall 2024 / Spring 2025</div>
                            </div>

                            <div className="border-b pb-8 last:border-0 last:pb-0">
                                <h3 className="text-xl font-semibold">Postdoctoral Researchers</h3>
                                <p className="mt-2 text-muted-foreground">
                                    Candidates with expertise in device fabrication, characterization, or circuit design are encouraged to apply.
                                    Competitive salary and benefits will be provided.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl bg-slate-100 p-8 dark:bg-slate-900 text-center">
                        <h2 className="mb-4 text-2xl font-bold">How to Apply</h2>
                        <p className="mb-8 text-muted-foreground">
                            Please send your <strong>CV</strong> and a brief <strong>cover letter</strong> (or transcript for students) to Prof. Hong.
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
