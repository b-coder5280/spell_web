"use client"

import { type MouseEvent, useState } from "react"
import { Container } from "@/components/ui/container"
import { motion, AnimatePresence } from "framer-motion"
import { X, Calendar, Camera, ChevronLeft, ChevronRight, Images } from "lucide-react"
import { Button } from "@/components/ui/button"
import { defaultGalleryPageSettings, GalleryPageSettings } from "@/lib/site-content"

export type GalleryItemModel = {
    _id: string
    title: string
    images?: string[]
    date: string
    description?: string
}

function imageCount(item: GalleryItemModel) {
    return item.images?.length || 0
}

export function GalleryClient({ galleryItems, page = defaultGalleryPageSettings }: { galleryItems: GalleryItemModel[], page?: GalleryPageSettings }) {
    const [selectedId, setSelectedId] = useState<string | null>(null)
    const [imageIndexes, setImageIndexes] = useState<Record<string, number>>({})

    const getImageIndex = (item: GalleryItemModel) => {
        const count = imageCount(item)
        if (count === 0) return 0
        return Math.min(imageIndexes[item._id] || 0, count - 1)
    }

    const setImageIndex = (item: GalleryItemModel, index: number) => {
        const count = imageCount(item)
        if (count < 2) return
        setImageIndexes(prev => ({
            ...prev,
            [item._id]: (index + count) % count,
        }))
    }

    const stepImage = (event: MouseEvent<HTMLButtonElement>, item: GalleryItemModel, direction: -1 | 1) => {
        event.stopPropagation()
        setImageIndex(item, getImageIndex(item) + direction)
    }

    return (
        <div className="overflow-hidden pb-24 pt-16">
            <Container>
                <div className="mx-auto max-w-6xl">
                    <div className="mb-14 flex flex-col gap-5 border-b border-slate-200 pb-8 sm:flex-row sm:items-end sm:justify-between">
                        <div className="max-w-3xl">
                            <div className="mb-4 flex items-center gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-950 text-white shadow-sm">
                                    <Camera className="h-5 w-5" />
                                </div>
                                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">{page.eyebrow}</p>
                            </div>
                            <h1 className="text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">{page.title}</h1>
                            <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
                                {page.description}
                            </p>
                        </div>
                        <div className="flex w-fit shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 shadow-sm">
                            <Images className="h-4 w-4 text-blue-600" />
                            {galleryItems.length} {page.albumsLabel}
                        </div>
                    </div>

                    <div className="space-y-12 sm:space-y-16">
                        {galleryItems.map((item) => (
                            <motion.article
                                key={item._id}
                                className="grid gap-7 lg:grid-cols-[minmax(0,0.95fr)_minmax(320px,0.85fr)] lg:items-center lg:gap-12"
                            >
                                <div className="group min-w-0">
                                    <motion.div
                                        layoutId={`gallery-image-${item._id}`}
                                        className="relative aspect-[5/4] overflow-hidden bg-slate-100 shadow-sm transition-shadow duration-500 group-hover:shadow-2xl sm:aspect-[4/3]"
                                    >
                                        <button
                                            type="button"
                                            onClick={() => setSelectedId(item._id)}
                                            className="block h-full w-full text-left"
                                        >
                                            {item.images && item.images.length > 0 ? (
                                                <img
                                                    src={item.images[getImageIndex(item)]}
                                                    alt={item.title}
                                                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center bg-secondary/30 text-muted-foreground">
                                                    {page.noImageLabel}
                                                </div>
                                            )}
                                        </button>

                                        {imageCount(item) > 1 && (
                                            <>
                                                <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-slate-950/65 px-2.5 py-1 text-xs font-semibold text-white shadow-sm backdrop-blur-md">
                                                    <Camera className="h-3.5 w-3.5" />
                                                    {getImageIndex(item) + 1}/{imageCount(item)}
                                                </div>
                                                <button
                                                    type="button"
                                                    aria-label={page.previousImageLabel}
                                                    onClick={(event) => stepImage(event, item, -1)}
                                                    className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/88 text-slate-800 opacity-0 shadow-sm backdrop-blur transition-opacity hover:bg-white group-hover:opacity-100"
                                                >
                                                    <ChevronLeft className="h-5 w-5" />
                                                </button>
                                                <button
                                                    type="button"
                                                    aria-label={page.nextImageLabel}
                                                    onClick={(event) => stepImage(event, item, 1)}
                                                    className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/88 text-slate-800 opacity-0 shadow-sm backdrop-blur transition-opacity hover:bg-white group-hover:opacity-100"
                                                >
                                                    <ChevronRight className="h-5 w-5" />
                                                </button>
                                            </>
                                        )}
                                    </motion.div>

                                    {imageCount(item) > 1 && (
                                        <div className="mt-5 flex justify-center gap-2">
                                            {Array.from({ length: Math.min(imageCount(item), 5) }).map((_, dotIndex) => (
                                                <button
                                                    type="button"
                                                    key={`${item._id}-dot-${dotIndex}`}
                                                    aria-label={`${page.showImageLabel} ${dotIndex + 1}`}
                                                    onClick={(event) => {
                                                        event.stopPropagation()
                                                        setImageIndex(item, dotIndex)
                                                    }}
                                                    className={`h-2 w-2 rounded-full transition-colors ${dotIndex === getImageIndex(item) ? "bg-slate-700" : "bg-slate-300 hover:bg-slate-400"}`}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="flex min-w-0 flex-col lg:min-h-[320px] lg:pb-8">
                                    <div className="mb-5 flex w-fit items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                                        <Calendar className="h-3.5 w-3.5" />
                                        {item.date}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setSelectedId(item._id)}
                                        className="group/title text-left"
                                    >
                                        <motion.h2
                                            layoutId={`gallery-title-${item._id}`}
                                            className="text-xl font-extrabold leading-tight tracking-tight text-slate-800 transition-colors group-hover/title:text-blue-600 sm:text-2xl"
                                        >
                                            {item.title}
                                        </motion.h2>
                                    </button>
                                    {item.description && (
                                        <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-slate-600">
                                            {item.description}
                                        </p>
                                    )}
                                    <div className="mt-auto flex justify-start pt-8">
                                        <button
                                            type="button"
                                            onClick={() => setSelectedId(item._id)}
                                            className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                                        >
                                            {page.viewAlbumLabel}
                                        </button>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </div>

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
                                {galleryItems.filter(item => item._id === selectedId).map(item => (
                                    <motion.div
                                        layoutId={`gallery-card-${item._id}`}
                                        key={item._id}
                                        className="pointer-events-auto relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl"
                                    >
                                        <div className="relative flex w-full shrink-0 flex-col bg-white">
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="absolute right-4 top-4 z-20 rounded-full bg-white/90 text-slate-900 shadow-md backdrop-blur hover:bg-slate-100"
                                                onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                                            >
                                                <X className="h-5 w-5" />
                                            </Button>

                                            <div className="relative flex min-h-[52vh] w-full items-center justify-center bg-slate-50">
                                                {item.images && item.images.length > 0 ? (
                                                    <img
                                                        src={item.images[getImageIndex(item)]}
                                                        alt={item.title}
                                                        className="max-h-[68vh] w-auto max-w-full object-contain"
                                                    />
                                                ) : (
                                                    <div className="flex h-[52vh] w-full items-center justify-center text-muted-foreground">
                                                        {page.noImageLabel}
                                                    </div>
                                                )}

                                                {imageCount(item) > 1 && (
                                                    <>
                                                        <button
                                                            type="button"
                                                            aria-label={page.previousImageLabel}
                                                            onClick={(event) => stepImage(event, item, -1)}
                                                            className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-md backdrop-blur hover:bg-white"
                                                        >
                                                            <ChevronLeft className="h-6 w-6" />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            aria-label={page.nextImageLabel}
                                                            onClick={(event) => stepImage(event, item, 1)}
                                                            className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-md backdrop-blur hover:bg-white"
                                                        >
                                                            <ChevronRight className="h-6 w-6" />
                                                        </button>
                                                    </>
                                                )}
                                            </div>

                                            <div className="z-20 flex flex-col items-center gap-4 border-t bg-white p-6">
                                                <motion.h2
                                                    layoutId={`gallery-title-${item._id}`}
                                                    className="text-center text-xl font-bold text-foreground sm:text-2xl"
                                                >
                                                    {item.title}
                                                </motion.h2>
                                                {item.description && (
                                                    <p className="max-w-2xl whitespace-pre-line text-center text-sm leading-relaxed text-muted-foreground">
                                                        {item.description}
                                                    </p>
                                                )}
                                                {imageCount(item) > 1 && (
                                                    <div className="flex justify-center gap-2">
                                                        {item.images?.map((_, dotIndex) => (
                                                            <button
                                                                type="button"
                                                                key={`${item._id}-modal-dot-${dotIndex}`}
                                                                aria-label={`${page.showImageLabel} ${dotIndex + 1}`}
                                                                onClick={(event) => {
                                                                    event.stopPropagation()
                                                                    setImageIndex(item, dotIndex)
                                                                }}
                                                                className={`h-2 w-2 rounded-full transition-colors ${dotIndex === getImageIndex(item) ? "bg-slate-800" : "bg-slate-300 hover:bg-slate-400"}`}
                                                            />
                                                        ))}
                                                    </div>
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
