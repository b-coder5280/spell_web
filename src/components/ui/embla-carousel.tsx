"use client"

import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import type { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from './button'

type PropType = {
    slides: string[]
    options?: EmblaOptionsType
    previousLabel?: string
    nextLabel?: string
    slideAltPrefix?: string
}

export const EmblaCarousel: React.FC<PropType> = (props) => {
    const { slides, options, previousLabel = "Previous image", nextLabel = "Next image", slideAltPrefix = "Slide" } = props
    const [emblaRef, emblaApi] = useEmblaCarousel(options)
    const [canScrollPrev, setCanScrollPrev] = useState(false)
    const [canScrollNext, setCanScrollNext] = useState(false)

    const onSelect = useCallback((api: EmblaCarouselType) => {
        setCanScrollPrev(api.canScrollPrev())
        setCanScrollNext(api.canScrollNext())
    }, [])

    useEffect(() => {
        if (!emblaApi) return
        queueMicrotask(() => onSelect(emblaApi))
        emblaApi.on('reInit', onSelect)
        emblaApi.on('select', onSelect)
    }, [emblaApi, onSelect])

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    return (
        <div className="relative group w-full">
            <div className="overflow-hidden bg-slate-50" ref={emblaRef}>
                <div className="flex touch-pan-y -ml-4">
                    {slides.map((imgSrc, index) => (
                        <div className="flex-[0_0_100%] min-w-0 pl-4" key={index}>
                            <div className="relative h-[60vh] w-full flex items-center justify-center">
                                <img
                                    className="block max-h-full max-w-full object-contain"
                                    src={imgSrc}
                                    alt={`${slideAltPrefix} ${index + 1}`}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {canScrollPrev && (
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 text-slate-900 shadow-md transition-opacity hover:bg-white z-10"
                    onClick={(e) => { e.stopPropagation(); scrollPrev(); }}
                    aria-label={previousLabel}
                >
                    <ChevronLeft className="h-8 w-8" />
                </Button>
            )}

            {canScrollNext && (
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 text-slate-900 shadow-md transition-opacity hover:bg-white z-10"
                    onClick={(e) => { e.stopPropagation(); scrollNext(); }}
                    aria-label={nextLabel}
                >
                    <ChevronRight className="h-8 w-8" />
                </Button>
            )}

            {/* Dots (optional) */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 pointer-events-none">
                {slides.map((_, idx) => (
                    <div key={idx} className={`h-1.5 rounded-full transition-all ${idx === (emblaApi?.selectedScrollSnap() || 0) ? "w-6 bg-slate-800" : "w-1.5 bg-slate-300"}`} />
                ))}
            </div>
        </div>
    )
}
