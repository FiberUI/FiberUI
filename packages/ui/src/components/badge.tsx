import * as React from "react";
import { tv, type VariantProps, cn } from "tailwind-variants";

const badgeStyles = tv({
    base: "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-full border px-2 py-0.5 text-xs font-medium transition-[color,box-shadow] focus-visible:ring-[3px] [&>svg]:pointer-events-none [&>svg]:size-3",
    variants: {
        variant: {
            default:
                "bg-primary text-primary-foreground [a&]:hover:bg-primary/90 border-transparent",
            secondary:
                "bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90 border-transparent",
            destructive:
                "bg-destructive [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 border-transparent text-white",
            outline:
                "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});

interface BadgeProps
    extends React.ComponentProps<"span">,
        VariantProps<typeof badgeStyles> {}

export const Badge = ({ className, variant, ...props }: BadgeProps) => {
    return (
        <span
            data-slot="badge"
            className={cn(badgeStyles({ variant }), className)}
            {...props}
        />
    );
};

export { badgeStyles };
