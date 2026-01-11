"use client"

import { useEffect, useRef } from "react"

export function AnimatedBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let width = canvas.width = window.innerWidth
        let height = canvas.height = window.innerHeight

        // Particles
        const particles: Particle[] = []
        const particleCount = 100 // Increased density
        const connectionDistance = 180 // Increased connection range
        const pulseSpeed = 2

        class Particle {
            x: number
            y: number
            vx: number
            vy: number
            size: number
            alpha: number

            constructor() {
                this.x = Math.random() * width
                this.y = Math.random() * height
                this.vx = (Math.random() - 0.5) * 0.8 // Faster movement
                this.vy = (Math.random() - 0.5) * 0.8
                this.size = Math.random() * 2.5 + 1
                this.alpha = Math.random() * 0.5 + 0.3 // Brighter particles
            }

            update() {
                this.x += this.vx
                this.y += this.vy

                if (this.x < 0 || this.x > width) this.vx *= -1
                if (this.y < 0 || this.y > height) this.vy *= -1
            }

            draw() {
                if (!ctx) return
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(100, 180, 255, ${this.alpha})` // Lighter Blue
                ctx.fill()
            }
        }

        // Initialize particles
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle())
        }

        // Animation Loop
        let animationFrameId: number

        const animate = () => {
            ctx.clearRect(0, 0, width, height)

            // Draw slightly brighter background gradient on canvas itself if needed, or let CSS handle it.
            // We leave it transparent to let CSS gradient underneath if any, or just transparent.

            // Update and draw particles
            particles.forEach((p, index) => {
                p.update()
                p.draw()

                // Draw connections
                for (let j = index + 1; j < particles.length; j++) {
                    const p2 = particles[j]
                    const dx = p.x - p2.x
                    const dy = p.y - p2.y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < connectionDistance) {
                        ctx.beginPath()
                        ctx.moveTo(p.x, p.y)
                        ctx.lineTo(p2.x, p2.y)
                        // Brighter connections
                        ctx.strokeStyle = `rgba(100, 180, 255, ${0.4 * (1 - distance / connectionDistance)})`
                        ctx.lineWidth = 1
                        ctx.stroke()
                    }
                }
            })

            animationFrameId = requestAnimationFrame(animate)
        }

        animate()

        // Handle Resize
        const handleResize = () => {
            width = canvas.width = window.innerWidth
            height = canvas.height = window.innerHeight
        }

        window.addEventListener("resize", handleResize)

        return () => {
            cancelAnimationFrame(animationFrameId)
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 -z-10 h-full w-full bg-slate-900 transition-colors duration-500"
        />
    )
}
