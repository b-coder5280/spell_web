"use client"

import { useState } from "react"
import { Container } from "@/components/ui/container"
import { newsItems, NewsItem } from "@/data/news"
import { Badge } from "lucide-react" // Wait, Badge is icon? No. I need a Badge UI. I'll just style it.
import Image from "next/image"

export default function NewsPage() {
    const [filter, setFilter] = useState<"All" | NewsItem['category']>("All")

    const filteredNews = filter === "All"
        ? newsItems
        : newsItems.filter(item => item.category === filter)

    return (
        <div className="pb-24 pt-16">
            <Container>
                <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-4xl font-extrabold tracking-tight">News & Gallery</h1>
                        <p className="mt-2 text-muted-foreground">
                            Latest updates, awards, and moments from SPELL Lab.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {(["All", "Award", "Conference", "Daily"] as const).map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-4 py-2 text-sm font-medium rounded-full transition-all border ${filter === cat
                                        ? "bg-primary text-primary-foreground border-primary"
                                        : "bg-background text-muted-foreground border-border hover:border-primary hover:text-foreground"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredNews.map((item) => (
                        <div key={item.id} className="group overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-sm hover:shadow-lg transition-all">
                            <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                                {item.image ? (
                                    <div className="h-full w-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-muted-foreground">
                                        {/* Placeholder for real image loading */}
                                        [Image: {item.title}]
                                    </div>
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-slate-100 text-muted-foreground dark:bg-slate-800">
                                        <span className="text-sm">No Image</span>
                                    </div>
                                )}
                                <div className="absolute top-4 left-4">
                                    <span className="inline-flex items-center rounded-full border border-transparent bg-background/90 px-2.5 py-0.5 text-xs font-semibold text-foreground shadow transition-colors focus:outline-none backdrop-blur-sm">
                                        {item.category}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="mb-2 text-sm text-muted-foreground">
                                    {item.date}
                                </div>
                                <h3 className="mb-2 text-xl font-bold tracking-tight group-hover:text-primary transition-colors">
                                    {item.title}
                                </h3>
                                {item.description && (
                                    <p className="text-muted-foreground line-clamp-3">
                                        {item.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}
