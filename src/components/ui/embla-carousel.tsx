"use client"

import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from './button'

type PropType = {
    slides: string[]
    options?: any
}

export const EmblaCarousel: React.FC<PropType> = (props) => {
    const { slides, options } = props
    const [emblaRef, emblaApi] = useEmblaCarousel(options)
    const [canScrollPrev, setCanScrollPrev] = useState(false)
    const [canScrollNext, setCanScrollNext] = useState(false)

    const onSelect = useCallback((api: any) => {
        setCanScrollPrev(api.canScrollPrev())
        setCanScrollNext(api.canScrollNext())
    }, [])

    useEffect(() => {
        if (!emblaApi) return
        onSelect(emblaApi)
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
            <div className="overflow-hidden bg-black" ref={emblaRef}>
                <div className="flex touch-pan-y -ml-4">
                    {slides.map((imgSrc, index) => (
                        <div className="flex-[0_0_100%] min-w-0 pl-4" key={index}>
                            <div className="relative h-[60vh] w-full flex items-center justify-center">
                                <img
                                    className="block max-h-full max-w-full object-contain"
                                    src={imgSrc}
                                    alt={`Slide ${index + 1}`}
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
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full transition-opacity z-10"
                    onClick={(e) => { e.stopPropagation(); scrollPrev(); }}
                >
                    <ChevronLeft className="h-8 w-8" />
                </Button>
            )}

            {canScrollNext && (
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full transition-opacity z-10"
                    onClick={(e) => { e.stopPropagation(); scrollNext(); }}
                >
                    <ChevronRight className="h-8 w-8" />
                </Button>
            )}

            {/* Dots (optional) */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 pointer-events-none">
                {slides.map((_, idx) => (
                    <div key={idx} className={`h-1.5 rounded-full transition-all ${idx === (emblaApi?.selectedScrollSnap() || 0) ? "w-6 bg-white" : "w-1.5 bg-white/50"}`} />
                ))}
            </div>
        </div>
    )
}
