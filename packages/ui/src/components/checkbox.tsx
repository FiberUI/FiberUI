"use client";

import { Check, Minus } from "lucide-react";
import {
    Checkbox as AriaCheckbox,
    CheckboxProps as AriaCheckboxProps,
    composeRenderProps,
} from "react-aria-components";
import { tv, type VariantProps, cn } from "tailwind-variants";

const checkboxVariants = tv({
    base: "ring-offset-background group-data-focus-visible:ring-ring border-primary group-data-focus-visible:outline-none group-data-focus-visible:ring-2 group-data-focus-visible:ring-offset-2 flex h-5 w-5 shrink-0 items-center justify-center overflow-hidden rounded-md border",
    variants: {
        size: {
            default: "h-5 w-5",
            sm: "h-4 w-4",
            lg: "h-6 w-6",
        },
    },
    defaultVariants: {
        size: "default",
    },
});

const checkboxIconVariants = tv({
    base: "animate-in fade-in zoom-in transition-all duration-200 ease-out",
    variants: {
        size: {
            default: "h-4 w-4",
            sm: "h-3 w-3",
            lg: "h-5 w-5",
        },
    },
    defaultVariants: {
        size: "default",
    },
});

export interface CheckboxProps
    extends Omit<AriaCheckboxProps, "children">,
        VariantProps<typeof checkboxVariants> {
    className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = (props) => {
    const { className, size, ...restProps } = props;
    return (
        <AriaCheckbox
            {...restProps}
            className={composeRenderProps(
                className,
                (className, { isDisabled }) =>
                    cn(
                        "group flex cursor-pointer items-center gap-2 text-sm [-webkit-tap-highlight-color:transparent]",
                        isDisabled && "cursor-not-allowed opacity-50",
                        className,
                    ) || "",
            )}
        >
            {({
                isHovered,
                isPressed,
                isDisabled,
                isSelected,
                isIndeterminate,
            }) => (
                <span
                    className={cn(
                        checkboxVariants({ size }),
                        (isSelected || isIndeterminate) &&
                            "bg-primary text-primary-foreground",
                    )}
                    data-hovered={isHovered}
                    data-pressed={isPressed}
                    data-disabled={isDisabled}
                    data-state={isSelected ? "checked" : null}
                    aria-checked={isSelected}
                    aria-hidden="true"
                >
                    {isIndeterminate ? (
                        <Minus className={checkboxIconVariants({ size })} />
                    ) : isSelected ? (
                        <Check className={checkboxIconVariants({ size })} />
                    ) : null}
                </span>
            )}
        </AriaCheckbox>
    );
};

Checkbox.displayName = "Checkbox";
