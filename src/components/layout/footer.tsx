import Link from "next/link"
import { Container } from "@/components/ui/container"
import { defaultSiteSettings, SiteSettings } from "@/lib/site-content"
import { resolveSiteNavigation } from "@/lib/page-builder"

export function Footer({ settings = defaultSiteSettings }: { settings?: SiteSettings }) {
    const copyright = settings.footerCopyright.replace("{year}", String(new Date().getFullYear()))
    const footerLinks = resolveSiteNavigation(settings.footerLinks, defaultSiteSettings.footerLinks)
    const structuredContactLines = [
        settings.footerAddress,
        settings.footerEmail ? `Email: ${settings.footerEmail}` : undefined,
        settings.footerTelephone ? `Tel: ${settings.footerTelephone}` : undefined,
        settings.footerOffice ? `Office: ${settings.footerOffice}` : undefined,
    ].filter(Boolean) as string[]
    const contactLines = structuredContactLines.length > 0 ? structuredContactLines : settings.footerContactLines

    return (
        <footer className="border-t bg-background py-12 md:py-16">
            <Container>
                <div className="grid gap-8 md:grid-cols-3">
                    <div className="space-y-4">
                        <div className="flex flex-col gap-4">
                            <div className="flex h-20 w-auto justify-start">
                                <img
                                    src={settings.footerLogoUrl || defaultSiteSettings.footerLogoUrl}
                                    alt={settings.footerLogoAlt}
                                    className="h-full w-auto object-contain"
                                />
                            </div>
                            <h3 className="text-xl font-bold text-primary leading-tight">{settings.footerLabName}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {settings.footerInstitution}
                        </p>
                    </div>
                    <div>
                        <h4 className="mb-4 text-sm font-semibold">{settings.footerLinksTitle}</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            {footerLinks.map((link) => (
                                <li key={`${link.name}-${link.href}`}>
                                    <Link href={link.href} target={link.target} rel={link.rel} className="hover:text-primary">{link.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-4 text-sm font-semibold">{settings.footerContactTitle}</h4>
                        <div className="space-y-2 text-sm text-muted-foreground">
                            {contactLines.map((line) => (
                                <p key={line}>{line}</p>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
                    {copyright}
                </div>
            </Container>
        </footer>
    )
}
