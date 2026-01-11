import Link from "next/link"
import { Container } from "@/components/ui/container"

export function Footer() {
    return (
        <footer className="border-t bg-background py-12 md:py-16">
            <Container>
                <div className="grid gap-8 md:grid-cols-3">
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-primary">Semiconductor Photonics and Electronics Lab</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Gwangju Institute of Science and Technology (GIST)
                        </p>
                    </div>
                    <div>
                        <h4 className="mb-4 text-sm font-semibold">Links</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/research" className="hover:text-primary">Research</Link></li>
                            <li><Link href="/publication" className="hover:text-primary">Publications</Link></li>
                            <li><Link href="/members" className="hover:text-primary">Members</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-4 text-sm font-semibold">Contact</h4>
                        <div className="space-y-2 text-sm text-muted-foreground">
                            <p>123 Cheomdan-gwagiro, Buk-gu, Gwangju 61005, Korea</p>
                            <p>Email: hobkim@gist.ac.kr </p>
                            <p>Tel: +82-62-715-2741 </p>
                            <p>Office: Materials Science and Engineering Building (S5) Rm:909</p>
                        </div>
                    </div>
                </div>
                <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} SPELL Lab. All rights reserved.
                </div>
            </Container>
        </footer>
    )
}
