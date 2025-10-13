"use client";

import { useRef } from "react";
import { type AriaButtonOptions, useButton } from "react-aria";
import { cn } from "@repo/ui/lib/utils";

import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
    "inline-flex items-center transition-colors font-medium cursor-pointer justify-center gap-2 whitespace-nowrap rounded-md text-sm  transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
    {
        variants: {
            variant: {
                default:
                    "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 focus-visible:ring-primary/20 dark:focus-visible:ring-primary/40",
                gradient:
                    "text-white from-indigo-600 to-purple-600 bg-gradient-to-br hover:from-purple-600 hover:to-indigo-600 text-primary-foreground shadow-xs hover:bg-primary/90",
                destructive:
                    "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
                outline:
                    "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
                secondary:
                    "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
                ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                default: "h-9 px-4 py-2 has-[>svg]:px-3",
                sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
                lg: "h-11 rounded-md px-6 has-[>svg]:px-4",
                icon: "h-9 w-9 rounded-md",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
);

interface ButtonProps
    extends AriaButtonOptions<"div">,
        VariantProps<typeof buttonVariants> {
    children: React.ReactNode;
    className?: string;
}

export const Button: React.FC<ButtonProps> = (props) => {
    const { variant, size, className } = props;

    const ref = useRef<HTMLButtonElement | null>(null);

    const { buttonProps } = useButton(props, ref);

    return (
        <button
            {...buttonProps}
            className={cn(buttonVariants({ variant, size, className }))}
        >
            {props.children}
        </button>
    );
};
