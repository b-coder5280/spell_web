import Link from "next/link"
import { Linkedin, Mail } from "lucide-react"
import { cn } from "@/lib/utils"

interface MemberCardProps {
    name: string
    role: string
    interest: string
    image?: string
    email?: string
    linkedin?: string
}

export function MemberCard({ name, role, interest, image, email, linkedin }: MemberCardProps) {
    return (
        <div className="group flex flex-col space-y-4">
            <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
                {/* Placeholder or Image */}
                {image ? (
                    <img src={image} alt={name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-muted-foreground text-sm">
                        [Photo]
                    </div>
                )}
            </div>

            <div className="space-y-1">
                <h3 className="font-bold text-lg">{name}</h3>
                <p className="text-sm font-medium text-primary">{role}</p>
                <p className="text-sm text-muted-foreground line-clamp-2" title={interest}>
                    "{interest}"
                </p>
            </div>

            <div className="flex gap-3 pt-2">
                {email && (
                    <Link href={`mailto:${email}`} className="text-muted-foreground hover:text-primary transition-colors">
                        <Mail className="h-4 w-4" />
                    </Link>
                )}
                {linkedin && (
                    <Link href={linkedin} className="text-muted-foreground hover:text-primary transition-colors">
                        <Linkedin className="h-4 w-4" />
                    </Link>
                )}
            </div>
        </div>
    )
}
