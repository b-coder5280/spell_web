"use client"

import { useState } from "react"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { FileText, Link as LinkIcon, Star } from "lucide-react"
import Link from "next/link"
import { defaultPublicationPageSettings, PublicationPageSettings } from "@/lib/site-content"

export interface PublicationItem {
    _id: string
    title: string
    authors: string[]
    journal: string
    year: number
    order?: number
    selected: boolean
    doi?: string
    pdf?: string
    volume?: string
}

export function PublicationClient({ publications, page = defaultPublicationPageSettings }: { publications: PublicationItem[], page?: PublicationPageSettings }) {
    const [filter, setFilter] = useState<"all" | "selected">("all")

    const sortedPublications = [...publications].sort((a, b) => {
        const orderA = a.order ?? 9999
        const orderB = b.order ?? 9999

        if (orderA !== orderB) return orderA - orderB

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
                        <h1 className="text-4xl font-extrabold tracking-tight">{page.title}</h1>
                    </div>

                    <div className="flex bg-slate-200 p-1 rounded-lg">
                        <button
                            onClick={() => setFilter("all")}
                            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${filter === "all" ? "bg-white shadow text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                        >
                            {page.allFilterLabel}
                        </button>
                        <button
                            onClick={() => setFilter("selected")}
                            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${filter === "selected" ? "bg-white shadow text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                        >
                            {page.selectedFilterLabel}
                        </button>
                    </div>
                </div>

                <div className="space-y-6">
                    {displayedPubs.map((pub) => (
                        <div key={pub._id} className="flex flex-col gap-2 rounded-xl border p-6 hover:shadow-sm transition-shadow bg-card text-card-foreground">
                            <div className="flex items-start justify-between gap-4">
                                <div className="space-y-1">
                                    <div className="block">
                                        <span className="font-semibold text-lg leading-tight mr-2">{pub.title}</span>
                                        {pub.selected && (
                                            <span className="inline-flex items-center rounded-full border border-yellow-500/30 bg-yellow-500/10 px-2 py-0.5 text-xs font-semibold text-yellow-400 whitespace-nowrap align-middle">
                                                <Star className="mr-1 h-3 w-3 fill-current" /> {page.selectedBadgeLabel}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-muted-foreground">{(pub.authors || []).join(", ")}</p>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <span className="font-medium text-foreground">
                                            <span className="italic">{pub.journal}</span>
                                            {pub.volume && <span className="ml-1 text-muted-foreground/80 font-normal">{pub.volume}</span>}
                                        </span>
                                        <span>&bull;</span>
                                        <span>{pub.year}</span>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    {pub.pdf && (
                                        <Button size="icon" variant="ghost" asChild title={page.pdfButtonTitle}>
                                            <Link href={pub.pdf}><FileText className="h-4 w-4" /></Link>
                                        </Button>
                                    )}
                                    {pub.doi && (
                                        <Button size="icon" variant="ghost" asChild title={page.doiButtonTitle}>
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
