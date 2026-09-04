"use client"

import { Hero } from "@/components/home/hero"
import { Container } from "@/components/ui/container"
import { SectionTitle } from "@/components/ui/section-title"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { Calendar, ChevronLeft, ChevronRight, ExternalLink, Mail, Newspaper } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import React, { useState, useCallback, useEffect } from "react"
import useEmblaCarousel from 'embla-carousel-react'
import type { EmblaCarouselType } from 'embla-carousel'
import type { SanityImageSource } from "@sanity/image-url/lib/types/types"
import { urlFor } from "@/sanity/lib/image"
import { defaultHomePageSettings, HomePageSettings } from "@/lib/site-content"

type OpeningResearchArea = {
    title?: string
    description?: string
}

type OpeningContent = {
    koreanDescription?: string[]
    englishIntro?: string
    researchAreas?: OpeningResearchArea[]
    openingPositions?: string[]
    eligibility?: string[]
    howToApply?: string
}

type FeaturedPublication = {
    _id: string
    title: string
    journal?: string
    volume?: string
    year?: number
    description?: string
    doi?: string
    image?: SanityImageSource
}

type LatestNewsItem = {
    _id?: string
    title?: string
    date?: string
    category?: string
    description?: string
    image?: string
    imageUrl?: string
}

export default function HomeClient({ opening, featuredPubs, latestNews = [], homePage = defaultHomePageSettings }: { opening: OpeningContent, featuredPubs: FeaturedPublication[], latestNews?: LatestNewsItem[], homePage?: HomePageSettings }) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
    const [, setCanScrollPrev] = useState(false)
    const [, setCanScrollNext] = useState(false)

    const [selectedIndex, setSelectedIndex] = useState(0)

    const onSelect = useCallback((api: EmblaCarouselType) => {
        setCanScrollPrev(api.canScrollPrev())
        setCanScrollNext(api.canScrollNext())
        setSelectedIndex(api.selectedScrollSnap())
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

    const korDesc = opening?.koreanDescription || []
    const englishIntro = opening?.englishIntro || ""
    const researchAreas = opening?.researchAreas || []
    const positions = opening?.openingPositions || []
    const eligibility = opening?.eligibility || []
    const howToApply = opening?.howToApply || ""
    const visibleNews = latestNews.filter((item) => item.title).slice(0, 3)

    return (
        <div className="flex flex-col gap-8 pb-12">
            <Hero settings={homePage} />

            {/* Recruitment Section */}
            <Container>
                <ScrollReveal>
                    <div className="relative mx-auto mb-8 max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8 md:p-12">
                        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
                        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-72 h-72 bg-indigo-500/10 rounded-full blur-[80px]" />

                        <div className="relative z-10 flex flex-col items-center justify-center gap-12 xl:flex-row xl:items-start">
                            <div className="mx-auto max-w-3xl text-left xl:mx-0">
                                <h2 className="mb-8 text-center text-3xl font-bold text-foreground md:text-5xl xl:text-left">
                                    {homePage.recruitmentTitleBefore} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">{homePage.recruitmentTitleHighlight}</span>
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
                                                        <li key={i} className="flex min-w-0 gap-2 text-left">
                                                            <span aria-hidden="true" className="shrink-0 font-bold text-blue-600">&bull;</span>
                                                            <span>
                                                                {parts[0]}
                                                                <Link href={`mailto:${emailMatch[0]}`} className="text-blue-500 hover:underline">{emailMatch[0]}</Link>
                                                                {parts[1]}
                                                            </span>
                                                        </li>
                                                    )
                                                }
                                                return (
                                                    <li key={i} className="flex min-w-0 gap-2 text-left">
                                                        <span aria-hidden="true" className="shrink-0 font-bold text-blue-600">&bull;</span>
                                                        <span>{desc}</span>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </div>

                                    {/* English Section */}
                                    <div className="pt-8 border-t border-slate-200 space-y-6">
                                        <p className="text-muted-foreground leading-relaxed">
                                            {englishIntro}
                                        </p>

                                        <div className="space-y-6">
                                            <div>
                                                <h4 className="font-semibold text-blue-500 mb-2">{homePage.researchAreasHeading}</h4>
                                                <ul className="text-muted-foreground space-y-1 text-sm list-disc pl-5">
                                                    {researchAreas.map((area, i) => (
                                                        <li key={i}><span className="font-medium text-foreground">{area.title}</span> {area.description}</li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div>
                                                <h4 className="font-semibold text-blue-500 mb-2">{homePage.openingPositionsHeading}</h4>
                                                <ul className="text-muted-foreground space-y-1 text-sm list-disc pl-5">
                                                    {positions.map((pos: string, i: number) => (
                                                        <li key={i}>{pos}</li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div>
                                                <h4 className="font-semibold text-blue-500 mb-2">{homePage.eligibilityHeading}</h4>
                                                <ul className="text-muted-foreground space-y-1 text-sm list-disc pl-5">
                                                    {eligibility.map((req: string, i: number) => (
                                                        <li key={i}>{req}</li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div>
                                                <h4 className="font-semibold text-blue-500 mb-2">{homePage.howToApplyHeading}</h4>
                                                <p className="text-muted-foreground text-sm whitespace-pre-line">
                                                    {howToApply}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap justify-center gap-4 pt-4 xl:justify-start">
                                            <Button size="lg" variant="outline" className="h-12 px-8 border-slate-200 hover:bg-slate-100 text-foreground backdrop-blur-sm group/btn" asChild>
                                                <Link href={`mailto:${homePage.contactEmail}`} className="inline-flex items-center gap-2">
                                                    <Mail className="h-5 w-5 text-blue-500 group-hover/btn:scale-110 transition-transform" /> {homePage.contactButtonLabel}
                                                </Link>
                                            </Button>
                                            <Button size="lg" variant="ghost" className="h-12 px-8 text-muted-foreground hover:text-foreground" asChild>
                                                <Link href={homePage.openingDetailsButtonHref}>{homePage.openingDetailsButtonLabel}</Link>
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
                            title={homePage.selectedPublicationTitle}
                            subtitle={homePage.selectedPublicationSubtitle}
                            align="center"
                        />

                        <div className="relative group mt-8 w-full max-w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                            <div className="overflow-hidden" ref={emblaRef}>
                                <div className="flex w-full">
                                    {featuredPubs.map((pub) => {
                                        const imageUrl = pub.image ? urlFor(pub.image).url() : "";
                                        return (
                                            <div className="flex-[0_0_100%] min-w-0 overflow-hidden" key={pub._id}>
                                                <div className="flex h-auto w-full min-w-0 flex-col md:min-h-[350px] md:flex-row">
                                                    {/* Image Side - Left */}
                                                    <div className="relative w-full md:w-[45%] flex items-center justify-center p-4 min-h-[220px] md:min-h-0 md:h-full shrink-0">
                                                        {imageUrl ? (
                                                            <img
                                                                src={imageUrl}
                                                                alt={pub.title}
                                                                className="w-auto h-auto max-w-full max-h-[300px] md:max-h-full object-contain filter drop-shadow-2xl"
                                                            />
                                                        ) : (
                                                            <div className="text-muted-foreground/50">{homePage.noPublicationImageLabel}</div>
                                                        )}
                                                    </div>

                                                    {/* Content Side - Right */}
                                                    <div className="relative flex w-full min-w-0 flex-col justify-center p-4 pb-2 sm:p-6 md:h-full md:w-[55%] md:pb-6">
                                                        <div className="mb-3 inline-flex w-fit max-w-full flex-wrap items-center rounded-full border border-blue-600/25 bg-blue-50 px-2.5 py-0.5 text-[11px] font-medium text-blue-700">
                                                            <span className="italic">{pub.journal}</span>
                                                            {pub.volume && <span className="ml-1 font-normal opacity-80">{pub.volume}</span>}
                                                            <span className="mx-1">&middot;</span> {pub.year}
                                                        </div>
                                                        <h3 className="mb-3 text-lg sm:text-xl font-semibold leading-tight text-foreground line-clamp-3">
                                                            {pub.title}
                                                        </h3>
                                                        {pub.description && (
                                                            <p className="mb-4 text-xs sm:text-sm leading-relaxed text-muted-foreground line-clamp-4">
                                                                {pub.description}
                                                            </p>
                                                        )}

                                                        <div className="flex flex-wrap gap-3">
                                                            {pub.doi && (
                                                                <Button asChild size="sm" className="inline-flex items-center justify-center whitespace-nowrap bg-slate-900 text-white shadow-sm transition-all hover:scale-105 hover:bg-slate-700">
                                                                    <Link href={pub.doi} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                                                                        {homePage.viewPaperLabel} <ExternalLink className="h-3.5 w-3.5" />
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
                                aria-label={homePage.carouselPreviousLabel}
                                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white rounded-full h-10 w-10 z-10 hidden md:flex"
                                onClick={scrollPrev}
                            >
                                <ChevronLeft className="h-6 w-6" />
                            </Button>

                            <Button
                                variant="ghost"
                                size="icon"
                                aria-label={homePage.carouselNextLabel}
                                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white rounded-full h-10 w-10 z-10 hidden md:flex"
                                onClick={scrollNext}
                            >
                                <ChevronRight className="h-6 w-6" />
                            </Button>

                            {/* Dots Indicator */}
                            <div className="static z-20 mt-4 flex justify-center gap-2 pb-4 pointer-events-none md:absolute md:bottom-4 md:left-0 md:right-0 md:mt-0 md:pb-0">
                                {featuredPubs.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => emblaApi && emblaApi.scrollTo(idx)}
                                        className={`h-1.5 rounded-full transition-all duration-300 pointer-events-auto ${idx === selectedIndex ? "w-8 bg-blue-500" : "w-1.5 bg-slate-300 hover:bg-slate-400"}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </ScrollReveal>
                </Container>
            )}

            {/* Quick News Demo */}
            <Container>
                <ScrollReveal className="w-full">
                    <div className="min-h-[350px] rounded-3xl border border-slate-200 bg-white/50 p-6 shadow-sm backdrop-blur-md sm:p-8 md:p-10">
                        <SectionTitle title={homePage.latestTitle} align="center" />
                        {visibleNews.length > 0 ? (
                            <>
                                <div className="grid gap-5 md:grid-cols-3">
                                    {visibleNews.map((item, index) => {
                                        const imageUrl = item.imageUrl || item.image

                                        return (
                                            <Link
                                                key={item._id || `${item.title}-${index}`}
                                                href="/news"
                                                className="group flex h-full min-h-[360px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
                                            >
                                                <div className="flex h-48 shrink-0 items-center justify-center border-b border-slate-100 bg-slate-50 p-5">
                                                    {imageUrl ? (
                                                        <img
                                                            src={imageUrl}
                                                            alt={item.title || "News image"}
                                                            className="max-h-full w-auto max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                                                            loading={index === 0 ? "eager" : "lazy"}
                                                            decoding="async"
                                                        />
                                                    ) : (
                                                        <div className="flex h-full w-full items-center justify-center text-slate-400">
                                                            <Newspaper className="h-8 w-8" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex flex-1 flex-col p-5">
                                                    <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-medium text-muted-foreground">
                                                        {item.date && (
                                                            <span className="inline-flex items-center gap-1">
                                                                <Calendar className="h-3.5 w-3.5" />
                                                                {item.date}
                                                            </span>
                                                        )}
                                                        {item.category && item.category !== "General" && (
                                                            <span className="rounded-full bg-blue-50 px-2 py-0.5 text-blue-700">{item.category}</span>
                                                        )}
                                                    </div>
                                                    <h3 className="line-clamp-3 text-base font-bold leading-snug text-slate-950 transition-colors group-hover:text-blue-700">
                                                        {item.title}
                                                    </h3>
                                                    {item.description && (
                                                        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                                                            {item.description}
                                                        </p>
                                                    )}
                                                </div>
                                            </Link>
                                        )
                                    })}
                                </div>
                                <div className="mt-8 flex justify-center">
                                    <Button variant="outline" asChild>
                                        <Link href="/news">View all news</Link>
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <div className="flex min-h-[160px] items-center justify-center text-center text-muted-foreground">
                                {homePage.latestPlaceholder}
                            </div>
                        )}
                    </div>
                </ScrollReveal>
            </Container>
        </div>
    );
}
