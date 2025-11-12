"use client";

import { forwardRef, useRef } from "react";
import { AriaButtonProps, useButton } from "react-aria";
import { cn } from "@repo/ui/lib/utils";

import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
    "inline-flex items-center transition-colors  font-medium cursor-pointer justify-center gap-2 whitespace-nowrap rounded-full text-sm  transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
    {
        variants: {
            variant: {
                default:
                    "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 focus-visible:ring-primary/20 dark:focus-visible:ring-primary/40",
                gradient:
                    "text-white dark:text-white from-indigo-600 to-purple-600 bg-gradient-to-br hover:from-purple-600 hover:to-indigo-600 text-primary-foreground shadow-xs hover:bg-primary/90",
                destructive:
                    "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
                outline:
                    "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
                secondary:
                    "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
                ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
                link: "text-primary underline-offset-4 hover:underline",

                adobe:
                    "bg-[#3B63FB] text-white font-semibold rounded-full shadow-sm hover:bg-[#274dea] " +
                    "active:bg-[#274dea] focus-visible:ring-1 focus-visible:ring-[#274dea]/40 " +
                    "focus-visible:ring-offset-0",

                instagram:
                    "text-white font-semibold rounded-full shadow-sm " +
                    "bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#515BD4] " +
                    "hover:opacity-90 active:opacity-80 " +
                    "focus-visible:ring-2 focus-visible:ring-[#DD2A7B]/40 focus-visible:ring-offset-2",
            },
            size: {
                default: "h-9 px-4 py-2 has-[>svg]:px-3",
                sm: "h-8 rounded-full gap-1.5 px-3 has-[>svg]:px-2.5",
                lg: "h-11 rounded-full px-6 has-[>svg]:px-4",
                icon: "h-9 w-9 rounded-md",
                "icon-sm": "h-8 w-8 rounded-md ",
                "icon-lg": "h-10 w-10 rounded-md ",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
);

interface ButtonProps
    extends AriaButtonProps<"button">,
        VariantProps<typeof buttonVariants> {
    className?: string;
    disabled?: boolean | undefined;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ variant, size, className, children, ...restProps }, forwardedRef) => {
        const internalRef = useRef<HTMLButtonElement | null>(null);

        // Merge refs properly
        const mergedRef = (node: HTMLButtonElement | null) => {
            internalRef.current = node;
            if (typeof forwardedRef === "function") {
                forwardedRef(node);
            } else if (forwardedRef) {
                forwardedRef.current = node;
            }
        };

        const { buttonProps, isPressed } = useButton(restProps, internalRef);

        return (
            <button
                {...restProps}
                {...buttonProps}
                ref={mergedRef}
                className={cn(buttonVariants({ variant, size }), className)}
                // Ensure disabled state is properly handled
                disabled={restProps.isDisabled || restProps.disabled}
                // Add data attribute for pressed state if needed
                data-pressed={isPressed ? "true" : undefined}
            >
                {children}
            </button>
        );
    },
);

Button.displayName = "Button";
