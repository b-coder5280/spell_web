"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { cn } from "@/lib/utils"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"

const navigation = [
    { name: "Research", href: "/research" },
    { name: "Professor", href: "/professor" },
    { name: "Members", href: "/members" },
    { name: "Publication", href: "/publication" },
    { name: "News", href: "/news" },
    { name: "Gallery", href: "/gallery" },
    { name: "Opening", href: "/opening" },
]

export function Header() {
    const [isOpen, setIsOpen] = React.useState(false)
    const pathname = usePathname()

    // Close mobile menu when route changes
    React.useEffect(() => {
        setIsOpen(false)
    }, [pathname])

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
            <Container>
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link href="/" className="flex items-center">
                            <div className="flex items-center justify-center h-14 w-auto">
                                <img
                                    src="/images/logo3.png"
                                    alt="SPELL Logo"
                                    className="h-full w-auto object-contain"
                                />
                            </div>
                        </Link>
                        <nav className="hidden md:flex items-center gap-6">
                            {navigation.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "text-sm font-medium transition-colors hover:text-primary",
                                        pathname === item.href
                                            ? "text-primary"
                                            : "text-muted-foreground"
                                    )}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </div>
                    <div className="hidden md:flex items-center gap-4">
                        <Button asChild size="sm">
                            <Link href="/opening">Join Us</Link>
                        </Button>
                    </div>
                    <button
                        className="md:hidden"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </Container>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-b bg-background"
                    >
                        <Container className="py-4 space-y-4">
                            {navigation.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "block text-sm font-medium transition-colors hover:text-primary",
                                        pathname === item.href
                                            ? "text-primary"
                                            : "text-muted-foreground"
                                    )}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <Button asChild className="w-full">
                                <Link href="/opening">Join Us</Link>
                            </Button>
                        </Container>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}
