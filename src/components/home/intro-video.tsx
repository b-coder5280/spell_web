"use client"

import { useEffect, useRef, type ReactNode } from "react"

import { Container } from "@/components/ui/container"
import styles from "./intro-video.module.css"

export function IntroVideo({ children }: { children?: ReactNode }) {
  const videoRef = useRef<HTMLVideoElement>(null)


  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)")
    const syncPlayback = () => {
      if (preference.matches) videoRef.current?.pause()
      else void videoRef.current?.play().catch(() => {})
    }
    syncPlayback()
    preference.addEventListener("change", syncPlayback)
    return () => preference.removeEventListener("change", syncPlayback)
  }, [])

  return (
    <section id="intro-video" aria-label="SPELL lab introduction video" className={styles.section}>
      <Container>
      <div className={styles.frame}>
        <video
          ref={videoRef}
          className={styles.media}
          muted
          loop
          playsInline
          controls
          preload="metadata"
          poster="/images/SPELL-homepage-v41-poster.jpg"
          aria-label="SPELL lab introduction"


        >
          <source src="/images/SPELL-homepage-v41.mp4" type="video/mp4" />
          <source src="/images/SPELL-homepage-v41.webm" type="video/webm" />
          Your browser does not support embedded video. <a href="/images/SPELL-homepage-v41.mp4">Download the video</a>.
        </video>

      </div>
      {children}
      </Container>

    </section>
  )
}