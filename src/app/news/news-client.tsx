"use client"

import { useState } from "react"
import { Container } from "@/components/ui/container"
import { motion, AnimatePresence } from "framer-motion"
import { X, Calendar, Tag, Newspaper } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EmblaCarousel } from "@/components/ui/embla-carousel"

export type NewsItemModel = {
    _id: string
    title: string
    date: string
    category: "Award" | "Conference" | "Published" | "Grant" | "General" | ""
    image?: string
    detailImages?: string[]
    description?: string
}

const categoryColors: Record<string, string> = {
    Award: "bg-white text-amber-700 dark:bg-white dark:text-amber-700",
    Conference: "bg-white text-blue-700 dark:bg-white dark:text-blue-700",
    Published: "bg-white text-emerald-700 dark:bg-white dark:text-emerald-700",
    Grant: "bg-white text-violet-700 dark:bg-white dark:text-violet-700",
    General: "bg-white text-slate-600 dark:bg-white dark:text-slate-600",
}

const cardVariants = {
    hidden: (isEven: boolean) => ({
        opacity: 0,
        x: isEven ? -40 : 40,
    }),
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
        },
    },
}

export function NewsClient({ newsItems }: { newsItems: NewsItemModel[] }) {
    const [filter, setFilter] = useState<"All" | NewsItemModel['category']>("All")
    const [selectedId, setSelectedId] = useState<string | null>(null)

    const filteredNews = filter === "All"
        ? newsItems
        : newsItems.filter(item => item.category === filter)

    return (
        <div className="pb-24 pt-16">
            <Container>
                {/* Header Section */}
                <div className="mb-14 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                <Newspaper className="h-5 w-5 text-primary" />
                            </div>
                            <h1 className="text-4xl font-extrabold tracking-tight">News</h1>
                        </div>
                        <p className="mt-2 text-muted-foreground text-lg">
                            Latest updates and stories from SPELL Lab.
                        </p>
                    </div>

                    {/* Filter Pills */}
                    <div className="flex flex-wrap gap-2">
                        {(["All", "Award", "Conference", "Published", "Grant"] as const).map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${filter === cat
                                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/25 scale-105"
                                    : "bg-white/90 text-slate-800 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50 hover:text-slate-950 hover:ring-slate-300"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Alternating Timeline Feed */}
                <div className="flex flex-col gap-8 max-w-5xl mx-auto">
                    {filteredNews.map((item, index) => {
                        const isEven = index % 2 === 0
                        return (
                            <motion.div
                                key={item._id}
                                custom={isEven}
                                variants={cardVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-50px" }}
                                layoutId={`news-card-${item._id}`}
                                onClick={() => setSelectedId(item._id)}
                                className="group cursor-pointer"
                            >
                                <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} overflow-hidden rounded-3xl bg-white/60 dark:bg-card/60 backdrop-blur-sm shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1`}>
                                    {/* Image Side */}
                                    <motion.div
                                        layoutId={`news-image-${item._id}`}
                                        className="relative w-full md:w-[45%] shrink-0 overflow-hidden bg-muted"
                                    >
                                        {item.image ? (
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="h-full w-full object-cover aspect-[4/3] md:aspect-auto md:min-h-[280px] transition-transform duration-700 ease-out group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="flex h-48 md:min-h-[280px] w-full items-center justify-center bg-gradient-to-br from-secondary/40 to-secondary/10 text-muted-foreground">
                                                <Newspaper className="h-10 w-10 opacity-30" />
                                            </div>
                                        )}
                                        {/* Hover overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                                    </motion.div>

                                    {/* Content Side */}
                                    <div className="flex flex-col justify-center p-6 md:p-8 flex-1 gap-3">
                                        {/* Category badge & date */}
                                        <div className="flex items-center gap-3 flex-wrap">
                                            {item.category && item.category !== "General" && (
                                                <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${categoryColors[item.category] || categoryColors.General}`}>
                                                    <Tag className="mr-1.5 h-3 w-3" />
                                                    {item.category}
                                                </span>
                                            )}
                                            <span className="flex items-center text-sm text-muted-foreground/70">
                                                <Calendar className="mr-1.5 h-3.5 w-3.5" />
                                                {item.date}
                                            </span>
                                        </div>

                                        {/* Title */}
                                        <motion.h3
                                            layoutId={`news-title-${item._id}`}
                                            className="text-xl md:text-2xl font-bold leading-tight tracking-tight group-hover:text-primary transition-colors duration-300"
                                        >
                                            {item.title}
                                        </motion.h3>

                                        {/* Description preview */}
                                        {item.description && (
                                            <p className="text-sm text-muted-foreground/80 line-clamp-2 leading-relaxed">
                                                {item.description}
                                            </p>
                                        )}

                                        {/* Read more indicator */}
                                        <div className="flex items-center text-sm text-primary/70 font-medium group-hover:text-primary transition-colors duration-300 mt-1">
                                            <span>Read more</span>
                                            <svg className="ml-1.5 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>

                {/* Empty state */}
                {filteredNews.length === 0 && (
                    <div className="text-center py-20 text-muted-foreground">
                        <Newspaper className="h-12 w-12 mx-auto mb-4 opacity-30" />
                        <p className="text-lg font-medium">No news found for this category.</p>
                    </div>
                )}

                {/* Expanded Details Modal (preserved) */}
                <AnimatePresence>
                    {selectedId && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedId(null)}
                                className="fixed inset-0 z-50 bg-white/80 backdrop-blur-md"
                            />
                            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                                {filteredNews.filter(item => item._id === selectedId).map(item => (
                                    <motion.div
                                        layoutId={`news-card-${item._id}`}
                                        key={item._id}
                                        className="pointer-events-auto relative w-full max-w-5xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl flex flex-col max-h-[90vh]"
                                    >
                                        <div className="relative w-full bg-white flex flex-col shrink-0">
                                            {/* Close Button */}
                                            <div className="absolute top-4 right-4 z-20 flex justify-end px-4 pointer-events-none">
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="pointer-events-auto rounded-full bg-white/90 text-slate-900 shadow-lg backdrop-blur hover:bg-slate-100"
                                                    onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                                                >
                                                    <X className="h-5 w-5" />
                                                </Button>
                                            </div>

                                            {/* Image Logic */}
                                            <div className="w-full bg-slate-50">
                                                {item.detailImages && item.detailImages.length > 0 ? (
                                                    <EmblaCarousel slides={item.detailImages} options={{ loop: true }} />
                                                ) : (
                                                    <div className="w-full flex justify-center bg-slate-50 min-h-[300px]">
                                                        {item.image ? (
                                                            <motion.img
                                                                src={item.image}
                                                                alt={item.title}
                                                                className="w-auto h-auto max-w-full max-h-[60vh] object-contain mx-auto"
                                                            />
                                                        ) : (
                                                            <div className="h-64 w-full flex items-center justify-center text-muted-foreground">
                                                                No Image
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>

                                        </div>

                                        <div className="flex-1 overflow-y-auto bg-white p-6 text-slate-900 md:p-8">
                                            <div className="mb-6">
                                                <div className="mb-3 flex items-center gap-3">
                                                    {item.category && item.category !== "General" && (
                                                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${categoryColors[item.category] || categoryColors.General}`}>
                                                            {item.category}
                                                        </span>
                                                    )}
                                                    <span className="flex items-center text-sm font-medium text-muted-foreground">
                                                        <Calendar className="mr-1.5 h-4 w-4" />
                                                        {item.date}
                                                    </span>
                                                </div>
                                                <motion.h2
                                                    layoutId={`news-title-${item._id}`}
                                                    className="text-2xl md:text-4xl font-extrabold tracking-tight text-slate-950"
                                                >
                                                    {item.title}
                                                </motion.h2>
                                            </div>
                                            <div className="max-w-none border-t border-slate-200 pt-6 text-slate-700">
                                                {item.description ? (
                                                    <p className="whitespace-pre-line leading-relaxed">{item.description}</p>
                                                ) : (
                                                    <p className="italic text-slate-500">No additional details available.</p>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </>
                    )}
                </AnimatePresence>
            </Container>
        </div>
    )
}
