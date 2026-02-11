"use client"

import { Hero } from "@/components/home/hero"
import { Container } from "@/components/ui/container"
import { SectionTitle } from "@/components/ui/section-title"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { publications } from "@/data/publications"
import { ExternalLink, ChevronLeft, ChevronRight, Mail } from "lucide-react"
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

      {/* Recruitment Section */}
      <Container>
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 p-8 md:p-12 mb-8">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-72 h-72 bg-indigo-500/10 rounded-full blur-[80px]" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-2xl text-left">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                  Join Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Lab</span>
                </h2>
                <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                  차세대 반도체/광반도체 소재 및 소자 (페로브스카이트 LED, 태양전지, 뉴로모픽 소자 등) 및 인공지능 기반 소재 탐색, 소자 성능 예측 및 최적화 연구에 관심있는 대학원생을 모집합니다. 신소재/화공/물리/화학/컴공/AI 등 이공계 전 분야 지원 가능하며 학부 전공보다 연구에 대한 몰입도와 기초 역량을 우선적으로 고려합니다.
                  <br />
                  <br />
                  관심있는 학생들은 언제든지 김호범 교수님(e-mail: hobkim@gist.ac.kr, Tel: 062-715-2741)께 간단한 자기소개서(자유 양식)와 함께 컨택 바랍니다.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" variant="outline" className="h-12 px-8 border-slate-700 hover:bg-slate-800 text-white backdrop-blur-sm" asChild>
                    <Link href="mailto:hobkim@gist.ac.kr" className="inline-flex items-center gap-2">
                      <Mail className="h-5 w-5" /> Contact Prof. Kim
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="hidden lg:block shrink-0">
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
                  {featuredPubs.map((pub: any) => (
                    <div className="flex-[0_0_100%] min-w-0 overflow-hidden" key={pub.id}>
                      <div className="flex flex-col md:flex-row w-full min-w-0 h-auto md:h-[350px]">
                        {/* Image Side - Left */}
                        <div className="relative w-full md:w-[45%] flex items-center justify-center p-4 min-h-[220px] md:min-h-0 md:h-full shrink-0">
                          {pub.image ? (
                            <img
                              src={pub.image}
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
