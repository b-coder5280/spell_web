"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Container } from "@/components/ui/container"
import { X, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { defaultResearchPageSettings, ResearchPageSettings } from "@/lib/site-content"
import type { SanityImageSource } from "@sanity/image-url/lib/types/types"
import { getRenderableResearchPageParts, type ResearchPagePart } from "@/lib/research-page-layout"

import { StaggeredReveal, StaggeredItem } from "@/components/ui/staggered-reveal"

export interface ResearchItem {
    _id: string
    title: string
    description: string
    details: string
    tags: string[]
    image?: SanityImageSource
}

// Helper to extract sanity image url
import { urlFor } from "@/sanity/lib/image"

export default function ResearchClient({ thrusts, page = defaultResearchPageSettings }: { thrusts: ResearchItem[], page?: ResearchPageSettings }) {
    const [selectedId, setSelectedId] = useState<string | null>(null)
    const pageParts = getRenderableResearchPageParts(page.pageParts)
    const overviewImageUrl = "/images/research3.jpg"

    const renderResearchCards = (part: ResearchPagePart) => {
        const layout = part.layout || "grid"
        const columns = part.columns === 2 ? 2 : 3

        return (
            <div className="mb-24" key={part._key || "research-cards"}>
                <div className={layout === "featuredIntro" ? "grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start" : ""}>
                    <div>
                        <StaggeredReveal className={`grid items-stretch gap-8 md:grid-cols-2 ${columns === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3"}`}>
                            {thrusts.map((thrust) => {
                                const imageUrl = thrust.image ? urlFor(thrust.image).url() : "";
                                return (
                                    <StaggeredItem key={thrust._id} className="h-full">
                                        <motion.div
                                            onClick={() => setSelectedId(thrust._id)}
                                            whileHover={{ y: layout === "compact" ? -4 : -10, transition: { duration: 0.3 } }}
                                            className={`group flex h-[430px] cursor-pointer flex-col overflow-hidden border border-slate-200 bg-white/70 shadow-xl backdrop-blur-xl transition-all hover:bg-white/90 hover:border-cyan-500/50 hover:shadow-cyan-500/10 sm:h-[460px] lg:h-[500px] ${layout === "compact" ? "rounded-2xl" : "rounded-[2rem]"}`}
                                        >
                                            {layout !== "compact" && (
                                                <div className="relative h-64 shrink-0 overflow-hidden bg-white sm:h-72 lg:h-80">
                                                    {imageUrl && (
                                                        <Image
                                                            src={imageUrl}
                                                            alt={thrust.title}
                                                            fill
                                                            className="object-contain p-3 transition-transform duration-1000 group-hover:scale-105"
                                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                        />
                                                    )}
                                                </div>
                                            )}

                                            <div className={`flex flex-1 flex-col ${layout === "compact" ? "p-5" : "p-7"}`}>
                                                <h3 className="mb-3 text-lg font-bold leading-tight text-slate-950">
                                                    {thrust.title}
                                                </h3>
                                                <p className={`${layout === "compact" ? "line-clamp-2" : "line-clamp-3"} text-sm text-muted-foreground leading-relaxed font-medium mb-6`}>
                                                    {thrust.description}
                                                </p>
                                                <div className="mt-auto flex items-center text-cyan-400 text-xs font-bold tracking-[0.2em] uppercase transition-colors group-hover:text-cyan-300">
                                                    {page.cardActionLabel} <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                                                </div>
                                            </div>
                                        </motion.div>
                                    </StaggeredItem>
                                )
                            })}
                        </StaggeredReveal>
                    </div>
                </div>
            </div>
        )
    }

    const renderOverviewImage = (part: ResearchPagePart) => {
        const imageLayout = part.imageLayout || "contained"

        return (
            <div className="mb-16" key={part._key || "research-overview-image"}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className={`w-full overflow-hidden border border-slate-200 shadow-2xl bg-white/40 backdrop-blur-sm ${imageLayout === "full" ? "rounded-xl" : "rounded-[2rem]"}`}
                >
                    <img
                        src={overviewImageUrl}
                        alt={page.overviewImageAlt}
                        className="w-full h-auto block"
                    />
                </motion.div>
            </div>
        )
    }

    return (
        <div className="min-h-screen pb-24 pt-16 text-foreground">
            <Container>
                <div className="mx-auto mb-12 mt-12 max-w-3xl text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight">{page.title}</h1>
                    <p className="mx-auto mt-4 text-xl text-muted-foreground">
                        {page.intro}
                    </p>
                </div>

                {pageParts.map((part) => part.partType === "overviewImage" ? renderOverviewImage(part) : renderResearchCards(part))}

                {/* Details Modal */}
                <AnimatePresence>
                    {selectedId && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedId(null)}
                                className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm"
                            />
                            <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
                                {thrusts.filter(t => t._id === selectedId).map(thrust => {
                                    const imageUrl = thrust.image ? urlFor(thrust.image).url() : "";
                                    return (
                                        <motion.div
                                            layoutId={`card-container-${thrust._id}`}
                                            key={thrust._id}
                                            className="pointer-events-auto relative w-full max-w-5xl overflow-hidden rounded-2xl bg-background border border-slate-200 shadow-2xl flex flex-col max-h-[95vh]"
                                        >
                                            <div className="relative w-full bg-black/90 flex items-center justify-center overflow-hidden shrink-0">
                                                <div className="relative w-full h-[60vh]">
                                                    {imageUrl && (
                                                        <Image
                                                            src={imageUrl}
                                                            alt={thrust.title}
                                                            fill
                                                            className="object-contain"
                                                            sizes="100vw"
                                                        />
                                                    )}
                                                </div>

                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="absolute right-4 top-4 rounded-full bg-black/50 text-white opacity-80 hover:bg-black/70 hover:opacity-100 hover:text-white shadow-md backdrop-blur-sm"
                                                    onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                                                >
                                                    <X className="h-5 w-5" />
                                                </Button>

                                            </div>

                                            <div className="flex-1 overflow-y-auto p-8">
                                                <div className="mb-8">
                                                    <motion.h2
                                                        layoutId={`card-title-${thrust._id}`}
                                                        className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4"
                                                    >
                                                        {thrust.title}
                                                    </motion.h2>
                                                    <div className="h-1.5 w-20 bg-sky-500 rounded-full" />
                                                </div>
                                                <div className="prose prose-lg prose-invert max-w-none">
                                                    <p className="mb-8 text-xl leading-relaxed text-muted-foreground font-medium">
                                                        {thrust.description}
                                                    </p>

                                                    <div className="rounded-xl bg-slate-100 p-6 border border-slate-200">
                                                        <h4 className="mb-2 font-semibold flex items-center gap-2 text-foreground">
                                                            <ArrowRight className="h-4 w-4 text-sky-500" /> {page.modalDetailsTitle}
                                                        </h4>
                                                        <p className="text-muted-foreground">
                                                            {thrust.details}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )
                                })}
                            </div>
                        </>
                    )}
                </AnimatePresence>
            </Container>
        </div>
    )
}
