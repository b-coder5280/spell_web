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
    { name: "Publications", href: "/publication" },
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
                <div className="flex h-16 items-center justify-between gap-8">
                    <div className="flex min-w-0 items-center">
                        <Link href="/" className="flex shrink-0 items-center">
                            <div className="flex h-14 w-auto items-center justify-center overflow-hidden">
                                <img
                                    src="/images/logo_2.jpg"
                                    alt="SPELL Logo"
                                    className="h-14 max-h-14 w-auto object-contain"
                                />
                            </div>
                        </Link>
                    </div>
                    <div className="hidden min-w-0 items-center justify-end gap-6 lg:flex">
                        <nav className="hidden min-w-0 items-center gap-6 lg:flex">
                            {navigation.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "shrink-0 whitespace-nowrap text-sm font-medium transition-colors hover:text-primary",
                                        pathname === item.href
                                            ? "text-primary"
                                            : "text-muted-foreground"
                                    )}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                        <Button asChild size="sm">
                            <Link href="/opening">Join Us</Link>
                        </Button>
                    </div>
                    <button
                        className="lg:hidden"
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
                        className="lg:hidden border-b bg-background"
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
