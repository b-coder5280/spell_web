"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface ScrollRevealProps {
    children: ReactNode
    className?: string
    width?: "fit-content" | "100%"
}

export function ScrollReveal({ children, width = "fit-content", className }: ScrollRevealProps) {
    return (
        <div style={{ width, overflow: "hidden" }} className={className}>
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 75 },
                    visible: { opacity: 1, y: 0 }
                }}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.5, ease: "easeOut" }}
                viewport={{ once: true }}
            >
                {children}
            </motion.div>
        </div>
    )
}
