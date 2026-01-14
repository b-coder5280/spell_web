"use client"

import { Hero } from "@/components/home/hero"
import { Container } from "@/components/ui/container"
import { SectionTitle } from "@/components/ui/section-title"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { publications } from "@/data/publications"
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import React, { useState, useCallback, useEffect } from "react"
import useEmblaCarousel from 'embla-carousel-react'

export default function Home() {
  const featuredIds = ["p5", "p9", "p19", "p20", "p34", "p36", "p38"];
  const featuredPubs = featuredIds.map(id => publications.find(p => p.id === id)).filter(Boolean);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const [selectedIndex, setSelectedIndex] = useState(0)

  const onSelect = useCallback((api: any) => {
    setCanScrollPrev(api.canScrollPrev())
    setCanScrollNext(api.canScrollNext())
    setSelectedIndex(api.selectedScrollSnap())
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
    <div className="flex flex-col gap-8 pb-12">
      <Hero />

      {/* Representative Publication Section */}
      {featuredPubs.length > 0 && (
        <Container>
          <ScrollReveal className="w-full overflow-hidden">
            <SectionTitle
              title="Representative Publication"
              subtitle="Highlighting our latest breakthroughs in semiconductor research."
              align="center"
            />

            <div className="relative group mt-8 w-full max-w-full overflow-hidden">
              <div className="overflow-hidden rounded-3xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm shadow-xl" ref={emblaRef}>
                <div className="flex w-full">
                  {featuredPubs.map((pub: any) => (
                    <div className="flex-[0_0_100%] min-w-0 overflow-hidden" key={pub.id}>
                      <div className="flex flex-col md:flex-row w-full min-w-0 h-auto md:h-[350px]">
                        {/* Image Side - Left */}
                        <div className="relative w-full md:w-[40%] bg-black/40 flex items-center justify-center p-4 min-h-[200px] md:min-h-0 md:h-full shrink-0">
                          {pub.image ? (
                            <img
                              src={pub.image}
                              alt={pub.title}
                              className="w-auto h-auto max-w-full max-h-[280px] md:max-h-full object-contain rounded-lg shadow-xl"
                            />
                          ) : (
                            <div className="text-white/50">No Image Available</div>
                          )}
                        </div>

                        {/* Content Side - Right */}
                        <div className="relative flex flex-col justify-center p-4 sm:p-6 md:w-[60%] bg-slate-900/30 min-w-0 w-full md:h-full">
                          <div className="mb-3 inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-2.5 py-0.5 text-[11px] font-medium text-blue-300 w-fit">
                            {pub.journal} • {pub.year}
                          </div>
                          <h3 className="mb-3 text-lg sm:text-xl font-bold leading-tight text-white line-clamp-3">
                            {pub.title}
                          </h3>
                          {pub.description && (
                            <p className="mb-4 text-xs sm:text-sm leading-relaxed text-muted-foreground line-clamp-4">
                              {pub.description}
                            </p>
                          )}

                          <div className="flex flex-wrap gap-3">
                            {pub.doi && (
                              <Button asChild size="sm" className="bg-white text-black hover:bg-gray-200 shadow-lg shadow-white/5 transition-all hover:scale-105">
                                <Link href={pub.doi} target="_blank" rel="noopener noreferrer">
                                  View Paper <ExternalLink className="ml-2 h-3.5 w-3.5" />
                                </Link>
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Buttons */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white rounded-full h-10 w-10 z-10 hidden md:flex"
                onClick={scrollPrev}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white rounded-full h-10 w-10 z-10 hidden md:flex"
                onClick={scrollNext}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>

              {/* Dots Indicator - Absolute Bottom inside group but outside overflow for safety, or absolute relative to group */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 pointer-events-none z-20">
                {featuredPubs.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => emblaApi && emblaApi.scrollTo(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 pointer-events-auto ${idx === selectedIndex ? "w-8 bg-blue-500" : "w-1.5 bg-slate-600 hover:bg-slate-400"}`}
                  />
                ))}
              </div>
            </div>

          </ScrollReveal>
        </Container>
      )}

      {/* Quick News Demo */}
      <Container className="bg-slate-900/50 py-16 rounded-3xl backdrop-blur-md border border-slate-800">
        <ScrollReveal className="w-full">
          <SectionTitle title="Latest at SPELL" align="center" />
          <div className="text-center text-muted-foreground">
            (News content to be implemented)
          </div>
        </ScrollReveal>
      </Container>
    </div>
  );
}
