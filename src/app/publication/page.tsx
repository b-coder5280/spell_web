"use client"

import { useState } from "react"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { publications } from "@/data/publications"
import { FileText, Link as LinkIcon, Star } from "lucide-react"
import Link from "next/link"

export default function PublicationPage() {
    const [filter, setFilter] = useState<"all" | "selected">("all")

    // Sort: Selected first (if filtered or default view logic requires it), then Year Descending.
    // Requirement: "Selected" tag support, allow pinning.
    // Logic: Display "Selected Publications" section first? Or just list all with pinning?
    // User Prompt: "'Selected' 태그를 지원하여... 상단에 고정(Pin)할 수 있는 기능."
    // So standard view: Highlighting 5-10 selected papers at top, then chronological list? 
    // OR just one list with sorting.
    // I will implement: Two sections if "All" is viewed? Or just one list where Selected are pinned to top.

    // Let's go with one unified list where Selected items come first, then sorted by Year.

    const sortedPublications = [...publications].sort((a, b) => {
        if (a.selected && !b.selected) return -1
        if (!a.selected && b.selected) return 1
        return b.year - a.year
    })

    const displayedPubs = filter === "selected"
        ? sortedPublications.filter(p => p.selected)
        : sortedPublications

    return (
        <div className="pb-24 pt-16">
            <Container>
                <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-4xl font-extrabold tracking-tight">Publications</h1>
                        <p className="mt-2 text-muted-foreground">
                            Selected research outputs and academic contributions.
                        </p>
                    </div>

                    <div className="flex bg-slate-100 p-1 rounded-lg dark:bg-slate-800">
                        <button
                            onClick={() => setFilter("all")}
                            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${filter === "all" ? "bg-white shadow text-foreground dark:bg-slate-950" : "text-muted-foreground hover:text-foreground"}`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setFilter("selected")}
                            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${filter === "selected" ? "bg-white shadow text-foreground dark:bg-slate-950" : "text-muted-foreground hover:text-foreground"}`}
                        >
                            Selected
                        </button>
                    </div>
                </div>

                <div className="space-y-6">
                    {displayedPubs.map((pub) => (
                        <div key={pub.id} className="flex flex-col gap-2 rounded-xl border p-6 hover:shadow-sm transition-shadow bg-card text-card-foreground">
                            <div className="flex items-start justify-between gap-4">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold text-lg leading-tight">{pub.title}</span>
                                        {pub.selected && (
                                            <span className="inline-flex items-center rounded-full border border-yellow-500/30 bg-yellow-500/10 px-2 py-0.5 text-xs font-semibold text-yellow-600 dark:text-yellow-400">
                                                <Star className="mr-1 h-3 w-3 fill-current" /> Selected
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-muted-foreground">{pub.authors.join(", ")}</p>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <span className="font-medium text-foreground">{pub.journal}</span>
                                        <span>•</span>
                                        <span>{pub.year}</span>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    {pub.pdf && (
                                        <Button size="icon" variant="ghost" asChild title="PDF">
                                            <Link href={pub.pdf}><FileText className="h-4 w-4" /></Link>
                                        </Button>
                                    )}
                                    {pub.doi && (
                                        <Button size="icon" variant="ghost" asChild title="DOI">
                                            <Link href={pub.doi}><LinkIcon className="h-4 w-4" /></Link>
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}
