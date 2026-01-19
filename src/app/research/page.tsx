"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Container } from "@/components/ui/container"
import { X, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

import { thrusts } from "@/data/research"

import { StaggeredReveal, StaggeredItem } from "@/components/ui/staggered-reveal"
import { SectionTitle } from "@/components/ui/section-title"

export default function ResearchPage() {
    const [selectedId, setSelectedId] = useState<string | null>(null)

    return (
        <div className="min-h-screen pb-24 pt-16 text-slate-200">
            <Container>
                {/* Research Thrusts Grid Section */}
                <div className="mb-24 mt-12">
                    <div className="mb-16 text-center">
                        <h1 className="text-4xl font-extrabold tracking-tight">Our Vision & Core Research</h1>
                        <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
                            We aim to <span className="font-bold text-white">redefine the limits of semiconductor technology</span> by leveraging novel materials and innovative device architectures.
                        </p>
                    </div>
                    <div className="mt-16">
                        <StaggeredReveal className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {thrusts.map((thrust) => (
                                <StaggeredItem key={thrust.id}>
                                    <motion.div
                                        onClick={() => setSelectedId(thrust.id)}
                                        whileHover={{ y: -10, transition: { duration: 0.3 } }}
                                        className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/60 shadow-xl backdrop-blur-xl transition-all hover:bg-slate-800/80 hover:border-cyan-500/50 hover:shadow-cyan-500/20"
                                    >
                                        <div className="relative aspect-[16/10] shrink-0 overflow-hidden">
                                            <img
                                                src={thrust.image}
                                                alt={thrust.title}
                                                className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-90" />
                                            <h3 className="absolute bottom-6 left-8 text-xl font-bold text-white tracking-tight leading-tight">
                                                {thrust.title}
                                            </h3>
                                        </div>

                                        <div className="flex flex-1 flex-col p-7">
                                            <p className="line-clamp-3 text-sm text-slate-300 leading-relaxed font-medium mb-6">
                                                {thrust.description}
                                            </p>
                                            <div className="mt-auto flex items-center text-cyan-400 text-xs font-bold tracking-[0.2em] uppercase transition-colors group-hover:text-cyan-300">
                                                Exploration <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                                            </div>
                                        </div>
                                    </motion.div>
                                </StaggeredItem>
                            ))}
                        </StaggeredReveal>
                    </div>
                </div>

                {/* Research Overview Image */}
                <div className="mb-24">
                    <SectionTitle
                        title="Research Workflow"
                        subtitle="From material synthesis to device integration."
                        align="center"
                    />
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="mt-12 w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
                    >
                        <img
                            src="/images/research.png"
                            alt="Research Overview"
                            className="h-auto w-full object-cover"
                        />
                    </motion.div>
                </div>

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
                                {thrusts.filter(t => t.id === selectedId).map(thrust => (
                                    <motion.div
                                        layoutId={`card-container-${thrust.id}`}
                                        key={thrust.id}
                                        className="pointer-events-auto relative w-full max-w-5xl overflow-hidden rounded-2xl bg-[#0f172a] border border-slate-800 shadow-2xl flex flex-col max-h-[95vh]"
                                    >
                                        <div className="relative w-full bg-black/90 flex items-center justify-center overflow-hidden shrink-0">
                                            <motion.img
                                                layoutId={`card-image-container-${thrust.id}`}
                                                src={thrust.detailImage || thrust.image}
                                                alt={thrust.title}
                                                className="max-h-[60vh] w-auto max-w-full object-contain"
                                            />

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
                                                    layoutId={`card-title-${thrust.id}`}
                                                    className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4"
                                                >
                                                    {thrust.title}
                                                </motion.h2>
                                                <div className="h-1.5 w-20 bg-sky-500 rounded-full" />
                                            </div>
                                            <div className="prose prose-lg prose-invert max-w-none">
                                                <p className="mb-8 text-xl leading-relaxed text-slate-300 font-medium">
                                                    {thrust.description}
                                                </p>

                                                <div className="rounded-xl bg-slate-900/50 p-6 border border-slate-800">
                                                    <h4 className="mb-2 font-semibold flex items-center gap-2 text-slate-200">
                                                        <ArrowRight className="h-4 w-4 text-sky-400" /> Key Research Details
                                                    </h4>
                                                    <p className="text-slate-400">
                                                        {thrust.details}
                                                    </p>
                                                </div>


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
