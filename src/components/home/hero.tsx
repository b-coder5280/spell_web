import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import Link from "next/link"
import { defaultHomePageSettings, HomePageSettings } from "@/lib/site-content"

export function Hero({ settings = defaultHomePageSettings }: { settings?: HomePageSettings }) {
    return (
        <section className="relative overflow-hidden bg-white pb-2 pt-6 sm:pt-8">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(23,43,69,0.06),transparent_70%)]" />
            <Container className="relative">
                <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
                    <h1 className="text-2xl font-bold leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                        {settings.heroTitleBefore} <span className="text-[#172b45]">{settings.heroTitleHighlight}</span> {settings.heroTitleAfter}
                    </h1>

                </div>
            </Container>
        </section>
    )
}

export function HeroActions({ settings = defaultHomePageSettings }: { settings?: HomePageSettings }) {
    return (
                    <div className="mt-6 flex flex-wrap justify-center gap-3">
                        <Button className="h-10 px-5 text-sm bg-[#172b45] text-white hover:bg-[#243e5c] border-0 shadow-md shadow-slate-900/15 focus-visible:ring-[#172b45]" asChild>
                            <Link href={settings.heroPrimaryButtonHref}>{settings.heroPrimaryButtonLabel}</Link>
                        </Button>
                        <Button variant="outline" className="h-10 px-5 text-sm border-[#172b45]/30 bg-white text-[#172b45] shadow-sm hover:bg-[#eef1f5] hover:text-[#14263d] focus-visible:ring-[#172b45]" asChild>
                            <Link href={settings.heroSecondaryButtonHref}>{settings.heroSecondaryButtonLabel}</Link>
                        </Button>
                    </div>
    )
}
