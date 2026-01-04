"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Hero } from "@/components/home/hero"
import { Container } from "@/components/ui/container"
import { SectionTitle } from "@/components/ui/section-title"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { StaggeredReveal, StaggeredItem } from "@/components/ui/staggered-reveal"
import { thrusts } from "@/data/research"
import { X, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  return (
    <div className="flex flex-col gap-24 pb-24">
      <Hero />

      {/* Research Keywords Section */}
      <Container>
        <ScrollReveal className="w-full">
          <SectionTitle
            title="Core Technologies"
            subtitle="We focus on cutting-edge research in semiconductor and photonics fields."
            align="center"
          />
          <StaggeredReveal className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {thrusts.map((thrust) => (
              <StaggeredItem key={thrust.id}>
                <motion.div
                  layoutId={`card-container-${thrust.id}`}
                  onClick={() => setSelectedId(thrust.id)}
                  className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:shadow-lg hover:shadow-cyan-500/20 transition-all hover:scale-105 duration-300 cursor-pointer"
                >
                  <motion.span layoutId={`card-title-${thrust.id}`} className="text-center font-semibold text-foreground">{thrust.title}</motion.span>
                </motion.div>
              </StaggeredItem>
            ))}
          </StaggeredReveal>
        </ScrollReveal>
      </Container>

      {/* Details Modal */}
      <AnimatePresence>
        {selectedId && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              {thrusts.filter(t => t.id === selectedId).map(thrust => (
                <motion.div
                  layoutId={`card-container-${thrust.id}`}
                  key={thrust.id}
                  className="pointer-events-auto relative w-full max-w-2xl overflow-hidden rounded-2xl bg-card shadow-2xl"
                >
                  <div className="relative h-64 w-full">
                    <img src={thrust.image} alt={thrust.title} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute right-4 top-4 text-white hover:bg-white/20"
                      onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                    >
                      <X className="h-6 w-6" />
                    </Button>
                    <motion.h2 layoutId={`card-title-${thrust.id}`} className="absolute bottom-6 left-6 text-3xl font-bold text-white">
                      {thrust.title}
                    </motion.h2>
                  </div>

                  <div className="p-8">
                    <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
                      {thrust.description}
                    </p>

                    <div className="rounded-xl bg-slate-50 dark:bg-slate-900/50 p-6 border">
                      <h4 className="mb-2 font-semibold flex items-center gap-2 text-foreground">
                        <ArrowRight className="h-4 w-4 text-primary" /> Key Research Details
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {thrust.details}
                      </p>
                    </div>

                    <div className="mt-8 flex gap-2">
                      {thrust.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium border-transparent bg-secondary text-secondary-foreground"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Quick News Demo */}
      <Container className="bg-slate-50/50 dark:bg-slate-900/50 py-16 rounded-3xl backdrop-blur-md border border-slate-200 dark:border-slate-800">
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
