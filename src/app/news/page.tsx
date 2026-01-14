"use client"

import { useState } from "react"
import { Container } from "@/components/ui/container"
import { newsItems, NewsItem } from "@/data/news"
import { motion, AnimatePresence } from "framer-motion"
import { X, Calendar, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EmblaCarousel } from "@/components/ui/embla-carousel"

export default function NewsPage() {
    const [filter, setFilter] = useState<"All" | NewsItem['category']>("All")
    const [selectedId, setSelectedId] = useState<string | null>(null)

    const filteredNews = filter === "All"
        ? newsItems
        : newsItems.filter(item => item.category === filter)

    return (
        <div className="pb-24 pt-16">
            <Container>
                {/* Header Section */}
                <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-4xl font-extrabold tracking-tight">News</h1>
                        <p className="mt-2 text-muted-foreground">
                            Latest updates and awards from SPELL Lab.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {(["All", "Award", "Conference", "Daily", "Grant"] as const).map((cat) => (
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

                {/* News Grid */}
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredNews.map((item) => (
                        <motion.div
                            layoutId={`news-card-${item.id}`}
                            key={item.id}
                            onClick={() => setSelectedId(item.id)}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="group cursor-pointer overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-sm hover:shadow-xl transition-all"
                        >
                            {/* Image Section */}
                            <motion.div layoutId={`news-image-${item.id}`} className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                                {item.image ? (
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-secondary/50 text-muted-foreground">
                                        <span className="text-sm font-medium">SPELL News</span>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            </motion.div>

                            {/* Content Section (Date & Title only) */}
                            <div className="p-5">
                                <div className="mb-3 flex items-center text-xs font-semibold text-muted-foreground">
                                    <Calendar className="mr-1.5 h-3.5 w-3.5" />
                                    {item.date}
                                </div>
                                <motion.h3
                                    layoutId={`news-title-${item.id}`}
                                    className="text-lg font-bold leading-tight tracking-tight group-hover:text-primary transition-colors"
                                >
                                    {item.title}
                                </motion.h3>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Expanded Details Modal */}
                <AnimatePresence>
                    {selectedId && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedId(null)}
                                className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
                            />
                            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                                {filteredNews.filter(item => item.id === selectedId).map(item => (
                                    <motion.div
                                        layoutId={`news-card-${item.id}`}
                                        key={item.id}
                                        className="pointer-events-auto relative w-full max-w-5xl overflow-hidden rounded-xl bg-card shadow-2xl flex flex-col max-h-[90vh]"
                                    >
                                        <div className="relative w-full bg-black flex flex-col shrink-0">
                                            {/* Close Button */}
                                            <div className="absolute top-4 right-4 z-20 flex justify-end px-4 pointer-events-none">
                                                <Button
                                                    size="icon"
                                                    variant="secondary"
                                                    className="pointer-events-auto rounded-full shadow-lg opacity-80 hover:opacity-100"
                                                    onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                                                >
                                                    <X className="h-5 w-5" />
                                                </Button>
                                            </div>

                                            {/* Image Logic */}
                                            <div className="w-full bg-black">
                                                {item.detailImages && item.detailImages.length > 0 ? (
                                                    <EmblaCarousel slides={item.detailImages} options={{ loop: true }} />
                                                ) : (
                                                    <div className="w-full flex justify-center bg-black min-h-[300px]">
                                                        {item.image ? (
                                                            <motion.img
                                                                src={item.image}
                                                                alt={item.title}
                                                                className="w-auto h-auto max-w-full max-h-[60vh] object-contain mx-auto"
                                                            />
                                                        ) : (
                                                            <div className="h-64 w-full flex items-center justify-center text-white/50">
                                                                No Image
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Title Overlay */}
                                            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 pointer-events-none z-10">
                                                <div className="mb-2 flex items-center gap-3">
                                                    <span className="inline-flex items-center rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground shadow-sm">
                                                        {item.category}
                                                    </span>
                                                    <span className="flex items-center text-sm font-medium text-gray-200">
                                                        <Calendar className="mr-1.5 h-4 w-4" />
                                                        {item.date}
                                                    </span>
                                                </div>
                                                <motion.h2
                                                    layoutId={`news-title-${item.id}`}
                                                    className="text-2xl md:text-3xl font-bold text-white shadow-black drop-shadow-md"
                                                >
                                                    {item.title}
                                                </motion.h2>
                                            </div>
                                        </div>

                                        <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-card">
                                            <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground">
                                                {item.description ? (
                                                    <p className="whitespace-pre-line leading-relaxed">{item.description}</p>
                                                ) : (
                                                    <p className="italic text-muted-foreground/60">No additional details available.</p>
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
