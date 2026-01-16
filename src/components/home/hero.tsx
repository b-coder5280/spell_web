"use client"

import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useRef } from "react"

export function Hero() {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    })

    const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
    const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0])

    return (
        <section ref={ref} className="relative flex min-h-[90vh] items-center justify-center overflow-hidden pt-16">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                {/* Animated Background is global, but we can add a hero-specific glow here */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-blue-500/20 blur-[120px]" />
            </div>

            <Container className="relative z-10">
                <motion.div
                    style={{ y: yText, opacity: opacityText }}
                    className="mx-auto flex max-w-4xl flex-col items-center text-center"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="space-y-6"
                    >

                        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl leading-tight">
                            Semiconductor <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 animate-gradient-x">Photonics and Electronics</span> Lab
                        </h1>


                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="mt-10 flex flex-col gap-4 sm:flex-row"
                    >
                        <Button size="lg" className="h-12 px-8 text-base bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 border-0 shadow-lg shadow-blue-500/25" asChild>
                            <Link href="/research">
                                Research Areas
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="h-12 px-8 text-base backdrop-blur-sm bg-white/5 border-white/10 hover:bg-white/10 text-white" asChild>
                            <Link href="/opening">Join Us</Link>
                        </Button>
                    </motion.div>
                </motion.div>
            </Container>

            {/* Scroll Indicator */}
            <motion.div
                style={{ opacity: opacityText }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/50"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <span className="text-xs uppercase tracking-widest">Scroll</span>
                <div className="h-12 w-[1px] bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
            </motion.div>
        </section>
    )
}
