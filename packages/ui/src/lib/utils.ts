import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const focusRing = tv({
    base: "outline outline-blue-600 dark:outline-blue-500 forced-colors:outline-[Highlight] outline-offset-2",
    variants: {
        isFocusVisible: {
            false: "outline-0",
            true: "outline-2",
        },
    },
});
