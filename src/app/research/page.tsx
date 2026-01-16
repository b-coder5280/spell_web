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
        <div className="min-h-screen pb-24 pt-16 text-slate-200">
            <Container>
                {/* Vision Section */}
                <div className="mb-8 text-center">
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
                        className="mx-auto max-w-3xl text-xl text-slate-400"
                    >
                        We aim to <span className="text-slate-200 font-semibold">redefine the limits of semiconductor technology</span> by leveraging novel materials and innovative device architectures.
                    </motion.p>
                </div>

                {/* Research Overview Image */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-16 w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
                >
                    <img
                        src="/images/research.png"
                        alt="Research Overview"
                        className="h-auto w-full object-cover"
                    />
                </motion.div>

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
                                className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
                            />
                            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
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
