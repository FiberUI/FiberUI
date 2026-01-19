"use client";

import { cn } from "@repo/ui/lib/utils";
import { Check, Minus } from "lucide-react";
import {
    Checkbox as AriaCheckbox,
    CheckboxProps as AriaCheckboxProps,
    composeRenderProps,
} from "react-aria-components";

export interface CheckboxProps extends Omit<AriaCheckboxProps, "children"> {
    className?: string;
}

export function Checkbox({ className, ...restProps }: CheckboxProps) {
    return (
        <AriaCheckbox
            {...restProps}
            className={composeRenderProps(
                className,
                (className, { isDisabled }) =>
                    cn(
                        "group flex items-center gap-2 text-sm transition [-webkit-tap-highlight-color:transparent]",
                        isDisabled && "cursor-not-allowed opacity-50",
                        className,
                    ),
            )}
        >
            {({ isSelected, isIndeterminate }) => (
                <span
                    className={cn(
                        "peer inline-flex items-center gap-2",
                        "border-primary ring-offset-background h-4 w-4 shrink-0 rounded-sm border",
                        "flex items-center justify-center overflow-hidden",
                        "group-data-[focus-visible]:ring-ring group-data-[focus-visible]:outline-none group-data-[focus-visible]:ring-2 group-data-[focus-visible]:ring-offset-2",
                        (isSelected || isIndeterminate) &&
                            "bg-primary text-primary-foreground",
                    )}
                    data-state={isSelected ? "checked" : null}
                    aria-checked={isSelected}
                    aria-hidden="true"
                >
                    {isIndeterminate ? (
                        <Minus className="h-4 w-4" />
                    ) : isSelected ? (
                        <Check className="h-4 w-4" />
                    ) : null}
                </span>
            )}
        </AriaCheckbox>
    );
}

Checkbox.displayName = "Checkbox";
