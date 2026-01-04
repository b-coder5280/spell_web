import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface ThrustCardProps {
    title: string
    description: string
    tags: string[]
    className?: string
}

export function ThrustCard({ title, description, tags, className }: ThrustCardProps) {
    return (
        <div className={cn(
            "group relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-background p-6 transition-all hover:shadow-lg dark:hover:shadow-primary/5",
            className
        )}>
            <div className="space-y-4">
                <div className="flex items-start justify-between">
                    <h3 className="text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                        {title}
                    </h3>
                    <ArrowUpRight className="h-6 w-6 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 group-hover:text-primary" />
                </div>
                <p className="text-muted-foreground leading-relaxed">
                    {description}
                </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
                {tags.map((tag) => (
                    <span
                        key={tag}
                        className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    >
                        #{tag}
                    </span>
                ))}
            </div>
        </div>
    )
}
