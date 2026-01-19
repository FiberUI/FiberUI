"use client";

// import { cn } from "@repo/ui/lib/utils";
import { forwardRef } from "react";
import {
    Button as AriaButton,
    ButtonProps as AriaButtonProps,
} from "react-aria-components";
import { tv, type VariantProps, cn } from "tailwind-variants";

export const buttonVariants = tv({
    base: "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium outline-none transition-colors focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
    variants: {
        variant: {
            default:
                "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 focus-visible:ring-primary/20 dark:focus-visible:ring-primary/40",
            gradient:
                "text-primary-foreground shadow-xs hover:bg-primary/90 bg-linear-to-br from-indigo-600 to-purple-600 hover:from-purple-600 hover:to-indigo-600",
            destructive:
                "bg-destructive shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 text-white",
            outline:
                "bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 border",
            secondary:
                "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
            link: "text-primary underline-offset-4 hover:underline",

            adobe: "rounded-full bg-[#3B63FB] font-semibold text-white shadow-sm hover:bg-[#274dea] focus-visible:ring-1 focus-visible:ring-[#274dea]/40 focus-visible:ring-offset-0 active:bg-[#274dea]",

            instagram:
                "bg-linear-to-tr rounded-full from-[#F58529] via-[#DD2A7B] to-[#515BD4] font-semibold text-white shadow-sm hover:opacity-90 focus-visible:ring-2 focus-visible:ring-[#DD2A7B]/40 focus-visible:ring-offset-2 active:opacity-80",
        },
        size: {
            default: "h-9 px-4 py-2 has-[>svg]:px-3",
            sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",
            lg: "h-11 px-6 has-[>svg]:px-4",
            icon: "h-9 w-9",
            "icon-sm": "h-8 w-8",
            "icon-lg": "h-10 w-10",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
});

interface ButtonProps
    extends AriaButtonProps,
        VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (props, ref) => {
        const { variant, size, className, children, ...restProps } = props;

        return (
            <AriaButton
                {...restProps}
                ref={ref}
                className={cn(buttonVariants({ variant, size }), className)}
            >
                {children}
            </AriaButton>
        );
    },
);

Button.displayName = "Button";
