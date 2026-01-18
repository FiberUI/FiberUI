"use client";
import {
    Separator as AriaSeparator,
    SeparatorProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";

const separatorStyles = tv({
    base: "bg-border",
    variants: {
        orientation: {
            horizontal: "h-px w-full",
            vertical: "h-full min-h-8 w-px",
        },
    },
    defaultVariants: {
        orientation: "horizontal",
    },
});

export const Separator = (props: SeparatorProps) => {
    return (
        <AriaSeparator
            data-slot="separator"
            {...props}
            className={separatorStyles({
                orientation: props.orientation,
                className: props.className,
            })}
        />
    );
};
