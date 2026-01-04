import { cn } from "@/lib/utils"

interface SectionTitleProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string
    subtitle?: string
    align?: "left" | "center"
}

export function SectionTitle({
    title,
    subtitle,
    align = "left",
    className,
    ...props
}: SectionTitleProps) {
    return (
        <div
            className={cn(
                "mb-12 space-y-4",
                align === "center" && "text-center",
                className
            )}
            {...props}
        >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                {title}
            </h2>
            {subtitle && (
                <p className={cn("max-w-[700px] text-lg text-muted-foreground", align === "center" && "mx-auto")}>
                    {subtitle}
                </p>
            )}
        </div>
    )
}
