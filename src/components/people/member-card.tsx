import Link from "next/link"
import { Linkedin, Mail } from "lucide-react"

interface MemberCardProps {
    name: string
    role: string
    interest?: string
    image?: string
    email?: string
    linkedin?: string
    photoPlaceholder?: string
    linkedinLabel?: string
}

export function MemberCard({ name, role, interest, image, email, linkedin, photoPlaceholder = "[Photo]", linkedinLabel = "LinkedIn" }: MemberCardProps) {
    const showInterest = interest && interest.trim() !== "" && role !== "Intern"

    return (
        <div className="group flex h-full flex-col gap-6 rounded-md border border-slate-200 bg-white p-6 transition-all duration-300 hover:border-blue-800 hover:shadow-lg sm:flex-row sm:items-start">
            <div className="mx-auto h-52 w-40 shrink-0 overflow-hidden bg-slate-100 sm:mx-0">
                {image ? (
                    <img src={image} alt={name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-muted-foreground text-sm">
                        {photoPlaceholder}
                    </div>
                )}
            </div>

            <div className="flex min-w-0 flex-1 flex-col text-center sm:text-left">
                <h3 className="font-extrabold text-2xl leading-tight tracking-tight text-blue-950">{name}</h3>
                <p className="mt-3 text-sm font-bold text-blue-950">{role}</p>
                {showInterest && (
                    <p className="mt-1 text-sm font-medium leading-relaxed text-slate-800" title={interest}>
                        {interest}
                    </p>
                )}

                {(email || linkedin) && (
                    <div className="mt-5 flex flex-wrap justify-center gap-4 border-t border-dotted border-slate-300 pt-4 sm:justify-start">
                        {email && (
                            <Link href={`mailto:${email}`} className="inline-flex items-center gap-2 text-sm font-medium text-slate-950 transition-colors hover:text-blue-700">
                                <Mail className="h-4 w-4 text-blue-950" />
                                <span>{email}</span>
                            </Link>
                        )}
                        {linkedin && (
                            <Link href={linkedin} className="inline-flex items-center gap-2 text-sm font-medium text-slate-950 transition-colors hover:text-blue-700">
                                <Linkedin className="h-4 w-4 text-blue-950" />
                                <span>{linkedinLabel}</span>
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
