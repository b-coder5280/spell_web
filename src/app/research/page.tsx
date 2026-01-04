"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Container } from "@/components/ui/container"
import { X, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

import { thrusts } from "@/data/research"

import { StaggeredReveal, StaggeredItem } from "@/components/ui/staggered-reveal"

export default function ResearchPage() {
    const [selectedId, setSelectedId] = useState<string | null>(null)

    return (
        <div className="pb-24 pt-16">
            <Container>
                {/* Vision Section */}
                <div className="mb-24 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 text-4xl font-extrabold tracking-tight lg:text-5xl"
                    >
                        Our Vision & Core Research
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mx-auto max-w-3xl text-xl text-muted-foreground"
                    >
                        We aim to <span className="text-foreground font-semibold">redefine the limits of semiconductor technology</span> by leveraging novel materials and innovative device architectures.
                    </motion.p>
                </div>

                {/* Thrusts Grid with Staggered Reveal */}
                <StaggeredReveal className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {thrusts.map((thrust) => (
                        <StaggeredItem key={thrust.id}>
                            <motion.div
                                layoutId={`card-container-${thrust.id}`}
                                onClick={() => setSelectedId(thrust.id)}
                                whileHover={{ y: -8, scale: 1.02 }}
                                className="cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-lg backdrop-blur-md transition-all hover:bg-white/10 hover:shadow-cyan-500/20"
                            >
                                <motion.div layoutId={`card-image-container-${thrust.id}`} className="relative aspect-[4/3] overflow-hidden">
                                    <img src={thrust.image} alt={thrust.title} className="h-full w-full object-cover transition-transform duration-700 hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                    <motion.h3 layoutId={`card-title-${thrust.id}`} className="absolute bottom-4 left-4 text-xl font-bold text-white shadow-black drop-shadow-md">
                                        {thrust.title}
                                    </motion.h3>
                                </motion.div>

                                <motion.div className="p-6">
                                    <p className="line-clamp-3 text-sm text-gray-300">{thrust.description}</p>
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {thrust.tags.map(tag => (
                                            <span key={tag} className="text-xs font-semibold text-primary/90">#{tag}</span>
                                        ))}
                                    </div>
                                </motion.div>
                            </motion.div>
                        </StaggeredItem>
                    ))}
                </StaggeredReveal>

                {/* Details Modal */}
                <AnimatePresence>
                    {selectedId && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedId(null)}
                                className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                            />
                            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                                {thrusts.filter(t => t.id === selectedId).map(thrust => (
                                    <motion.div
                                        layoutId={`card-container-${thrust.id}`}
                                        key={thrust.id}
                                        className="pointer-events-auto relative w-full max-w-2xl overflow-hidden rounded-2xl bg-card shadow-2xl"
                                    >
                                        <motion.div layoutId={`card-image-container-${thrust.id}`} className="relative h-64 w-full">
                                            <img src={thrust.image} alt={thrust.title} className="h-full w-full object-cover" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="absolute right-4 top-4 text-white hover:bg-white/20"
                                                onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                                            >
                                                <X className="h-6 w-6" />
                                            </Button>
                                            <motion.h2 layoutId={`card-title-${thrust.id}`} className="absolute bottom-6 left-6 text-3xl font-bold text-white">
                                                {thrust.title}
                                            </motion.h2>
                                        </motion.div>

                                        <div className="p-8">
                                            <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
                                                {thrust.description}
                                            </p>

                                            <div className="rounded-xl bg-slate-50 dark:bg-slate-900/50 p-6 border">
                                                <h4 className="mb-2 font-semibold flex items-center gap-2">
                                                    <ArrowRight className="h-4 w-4 text-primary" /> Key Research Details
                                                </h4>
                                                <p className="text-sm text-muted-foreground">
                                                    {thrust.details}
                                                </p>
                                            </div>

                                            <div className="mt-8 flex gap-2">
                                                {thrust.tags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium border-transparent bg-secondary text-secondary-foreground"
                                                    >
                                                        #{tag}
                                                    </span>
                                                ))}
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
