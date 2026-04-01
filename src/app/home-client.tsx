"use client"

import { Hero } from "@/components/home/hero"
import { Container } from "@/components/ui/container"
import { SectionTitle } from "@/components/ui/section-title"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { ExternalLink, ChevronLeft, ChevronRight, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import React, { useState, useCallback, useEffect } from "react"
import useEmblaCarousel from 'embla-carousel-react'
import { urlFor } from "@/sanity/lib/image"

export default function HomeClient({ opening, featuredPubs }: { opening: any, featuredPubs: any[] }) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
    const [, setCanScrollPrev] = useState(false)
    const [, setCanScrollNext] = useState(false)

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

    const korDesc = opening?.koreanDescription || []
    const englishIntro = opening?.englishIntro || ""
    const researchAreas = opening?.researchAreas || []
    const positions = opening?.openingPositions || []
    const eligibility = opening?.eligibility || []
    const howToApply = opening?.howToApply || ""

    return (
        <div className="flex flex-col gap-8 pb-12">
            <Hero />

            {/* Recruitment Section */}
            <Container>
                <ScrollReveal>
                    <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 p-8 md:p-12 mb-8">
                        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
                        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-72 h-72 bg-indigo-500/10 rounded-full blur-[80px]" />

                        <div className="relative z-10 flex flex-col lg:flex-row items-start justify-between gap-12">
                            <div className="max-w-3xl text-left">
                                <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
                                    Join Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Lab</span>
                                </h2>

                                <div className="space-y-8">
                                    {/* Korean Section */}
                                    <div className="space-y-4">
                                        <ul className="mt-4 text-muted-foreground space-y-3">
                                            {korDesc.map((desc: string, i: number) => {
                                                const emailMatch = desc.match(/([\w.-]+@[\w.-]+\.\w+)/);
                                                if (emailMatch) {
                                                    const parts = desc.split(emailMatch[0]);
                                                    return (
                                                        <li key={i} className="flex gap-2 text-left">
                                                            <span className="text-blue-500 font-bold">•</span>
                                                            <span>
                                                                {parts[0]}
                                                                <Link href={`mailto:${emailMatch[0]}`} className="text-blue-500 hover:underline">{emailMatch[0]}</Link>
                                                                {parts[1]}
                                                            </span>
                                                        </li>
                                                    )
                                                }
                                                return (
                                                    <li key={i} className="flex gap-2 text-left">
                                                        <span className="text-blue-500 font-bold">•</span>
                                                        <span>{desc}</span>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </div>

                                    {/* English Section */}
                                    <div className="pt-8 border-t border-slate-800 space-y-6">
                                        <p className="text-slate-300 leading-relaxed">
                                            {englishIntro}
                                        </p>

                                        <div className="space-y-6">
                                            <div>
                                                <h4 className="font-semibold text-blue-500 mb-2">Research Areas</h4>
                                                <ul className="text-muted-foreground space-y-1 text-sm list-disc pl-5">
                                                    {researchAreas.map((area: any, i: number) => (
                                                        <li key={i}><span className="font-medium text-foreground">{area.title}</span> {area.description}</li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div>
                                                <h4 className="font-semibold text-blue-500 mb-2">Opening Positions</h4>
                                                <ul className="text-muted-foreground space-y-1 text-sm list-disc pl-5">
                                                    {positions.map((pos: string, i: number) => (
                                                        <li key={i}>{pos}</li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div>
                                                <h4 className="font-semibold text-blue-500 mb-2">Eligibility & Requirements</h4>
                                                <ul className="text-muted-foreground space-y-1 text-sm list-disc pl-5">
                                                    {eligibility.map((req: string, i: number) => (
                                                        <li key={i}>{req}</li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div>
                                                <h4 className="font-semibold text-blue-500 mb-2">How to Apply</h4>
                                                <p className="text-muted-foreground text-sm whitespace-pre-line">
                                                    {howToApply}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-4 pt-4">
                                            <Button size="lg" variant="outline" className="h-12 px-8 border-slate-700 hover:bg-slate-800 text-white backdrop-blur-sm group/btn" asChild>
                                                <Link href="mailto:hobkim@gist.ac.kr" className="inline-flex items-center gap-2">
                                                    <Mail className="h-5 w-5 text-blue-500 group-hover/btn:scale-110 transition-transform" /> Contact Prof. Kim
                                                </Link>
                                            </Button>
                                            <Button size="lg" variant="ghost" className="h-12 px-8 text-slate-400 hover:text-white" asChild>
                                                <Link href="/opening">View Full Opening Details</Link>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="hidden xl:block shrink-0 sticky top-0">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
                                    <div className="relative w-48 h-48 rounded-full border border-blue-500/30 bg-blue-500/5 flex items-center justify-center backdrop-blur-sm">
                                        <div className="w-36 h-36 rounded-full border border-blue-500/20 bg-blue-500/10 flex items-center justify-center">
                                            <div className="w-24 h-24 rounded-full bg-blue-500/20 flex items-center justify-center">
                                                <Mail className="w-12 h-12 text-blue-400" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </Container>

            {/* Selected Publication Section */}
            {featuredPubs.length > 0 && (
                <Container>
                    <ScrollReveal className="w-full overflow-hidden">
                        <SectionTitle
                            title="Selected Publication"
                            subtitle="Highlighting our latest breakthroughs."
                            align="center"
                        />

                        <div className="relative group mt-8 w-full max-w-full overflow-hidden">
                            <div className="overflow-hidden" ref={emblaRef}>
                                <div className="flex w-full">
                                    {featuredPubs.map((pub: any) => {
                                        const imageUrl = pub.image ? urlFor(pub.image).url() : "";
                                        return (
                                            <div className="flex-[0_0_100%] min-w-0 overflow-hidden" key={pub._id}>
                                                <div className="flex flex-col md:flex-row w-full min-w-0 h-auto md:h-[350px]">
                                                    {/* Image Side - Left */}
                                                    <div className="relative w-full md:w-[45%] flex items-center justify-center p-4 min-h-[220px] md:min-h-0 md:h-full shrink-0">
                                                        {imageUrl ? (
                                                            <img
                                                                src={imageUrl}
                                                                alt={pub.title}
                                                                className="w-auto h-auto max-w-full max-h-[300px] md:max-h-full object-contain filter drop-shadow-2xl"
                                                            />
                                                        ) : (
                                                            <div className="text-white/50">No Image Available</div>
                                                        )}
                                                    </div>

                                                    {/* Content Side - Right */}
                                                    <div className="relative flex flex-col justify-center p-4 sm:p-6 md:w-[55%] min-w-0 w-full md:h-full">
                                                        <div className="mb-3 inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-2.5 py-0.5 text-[11px] font-medium text-blue-300 w-fit">
                                                            <span className="italic">{pub.journal}</span>
                                                            {pub.volume && <span className="ml-1 font-normal opacity-80">{pub.volume}</span>}
                                                            <span className="mx-1">•</span> {pub.year}
                                                        </div>
                                                        <h3 className="mb-3 text-lg sm:text-xl font-semibold leading-tight text-white line-clamp-3">
                                                            {pub.title}
                                                        </h3>
                                                        {pub.description && (
                                                            <p className="mb-4 text-xs sm:text-sm leading-relaxed text-muted-foreground line-clamp-4">
                                                                {pub.description}
                                                            </p>
                                                        )}

                                                        <div className="flex flex-wrap gap-3">
                                                            {pub.doi && (
                                                                <Button asChild size="sm" className="bg-white text-black hover:bg-gray-200 shadow-lg shadow-white/5 transition-all hover:scale-105 whitespace-nowrap inline-flex items-center justify-center">
                                                                    <Link href={pub.doi} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                                                                        View Paper <ExternalLink className="h-3.5 w-3.5" />
                                                                    </Link>
                                                                </Button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
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

                            {/* Dots Indicator */}
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
