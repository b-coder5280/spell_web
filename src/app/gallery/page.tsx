"use client"

import { EmblaCarousel } from "@/components/ui/embla-carousel"
import { useState } from "react"
import { Container } from "@/components/ui/container"
import { galleryItems } from "@/data/gallery"
import { motion, AnimatePresence } from "framer-motion"
import { X, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function GalleryPage() {
    const [selectedId, setSelectedId] = useState<string | null>(null)

    return (
        <div className="pb-24 pt-16">
            <Container>
                {/* Header Section */}
                <div className="mb-12">
                    <h1 className="text-4xl font-extrabold tracking-tight">Gallery</h1>
                    <p className="mt-2 text-muted-foreground">
                        Moments from SPELL Lab.
                    </p>
                </div>

                {/* Gallery Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {galleryItems.map((item) => (
                        <motion.div
                            layoutId={`gallery-card-${item.id}`}
                            key={item.id}
                            onClick={() => setSelectedId(item.id)}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="group cursor-pointer overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-sm hover:shadow-xl transition-all"
                        >
                            {/* thumbnail Image */}
                            <motion.div layoutId={`gallery-image-${item.id}`} className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                                {item.images && item.images.length > 0 ? (
                                    <img
                                        src={item.images[0]}
                                        alt={item.title}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-secondary/50 text-muted-foreground">
                                        <span className="text-sm font-medium">No Image</span>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            </motion.div>

                            {/* Content Section (Title & Date) */}
                            <div className="p-5 flex flex-col gap-2">
                                <div className="flex items-center text-sm text-muted-foreground">
                                    <Calendar className="mr-2 h-4 w-4" />
                                    {item.date}
                                </div>
                                <motion.h3
                                    layoutId={`gallery-title-${item.id}`}
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
                                {galleryItems.filter(item => item.id === selectedId).map(item => (
                                    <motion.div
                                        layoutId={`gallery-card-${item.id}`}
                                        key={item.id}
                                        className="pointer-events-auto relative w-full max-w-4xl overflow-hidden rounded-xl bg-card shadow-2xl flex flex-col max-h-[90vh]"
                                    >
                                        <div className="relative w-full bg-black flex flex-col shrink-0">
                                            {/* Close Button */}
                                            <div className="absolute top-4 right-4 z-20 flex justify-end">
                                                <Button
                                                    size="icon"
                                                    variant="secondary"
                                                    className="rounded-full shadow-lg opacity-80 hover:opacity-100"
                                                    onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                                                >
                                                    <X className="h-5 w-5" />
                                                </Button>
                                            </div>

                                            {/* Carousel or Single Image */}
                                            <div className="w-full bg-black">
                                                {item.images && item.images.length > 0 ? (
                                                    <EmblaCarousel slides={item.images} options={{ loop: true }} />
                                                ) : (
                                                    <div className="h-[60vh] w-full flex items-center justify-center text-muted-foreground">
                                                        No Image
                                                    </div>
                                                )}
                                            </div>

                                            {/* Title Overlay */}
                                            <div className="bg-background/90 backdrop-blur p-6 border-t z-20 flex flex-col items-center gap-2">
                                                <div className="flex items-center text-muted-foreground">
                                                    <Calendar className="mr-2 h-4 w-4" />
                                                    {item.date}
                                                </div>
                                                <motion.h2
                                                    layoutId={`gallery-title-${item.id}`}
                                                    className="text-2xl font-bold text-foreground text-center"
                                                >
                                                    {item.title}
                                                </motion.h2>
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
