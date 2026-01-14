import { cn } from "@/lib/utils"

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    as?: React.ElementType
}

export function Container({
    as: Component = "div",
    className,
    children,
    ...props
}: ContainerProps) {
    return (
        <Component
            className={cn(
                "mx-auto px-4 box-border overflow-hidden",
                className
            )}
            style={{ maxWidth: '66%', width: '100%' }}
            {...props}
        >
            {children}
        </Component>
    )
}
