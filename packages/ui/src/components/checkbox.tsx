"use client";

import { cn } from "@repo/ui/lib/utils";
import { forwardRef, useRef } from "react";
import { AriaCheckboxProps, useCheckbox, useFocusRing } from "react-aria";
import { useToggleState } from "react-stately";
import { Check } from "lucide-react";

// type CheckboxComponentProps = ComponentProps<"input">;

// interface CheckboxProps
//     extends CheckboxComponentProps,
//         Omit<AriaCheckboxProps, keyof CheckboxComponentProps> {
//     className?: string;
// }

interface CheckboxProps extends AriaCheckboxProps {
    className?: string;
}
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    ({ className, children, ...restProps }, forwardedRef) => {
        const localRef = useRef<HTMLInputElement>(null);

        const mergedRef = (node: HTMLInputElement | null) => {
            if (!node) return;
            localRef.current = node;
            if (typeof forwardedRef === "function") {
                forwardedRef(node);
            } else if (forwardedRef) {
                forwardedRef.current = node;
            }
        };

        const state = useToggleState(restProps as AriaCheckboxProps);
        const { inputProps, isSelected, isDisabled, labelProps } = useCheckbox(
            restProps as AriaCheckboxProps,
            state,
            localRef,
        );
        const { focusProps, isFocusVisible, isFocused } = useFocusRing();

        return (
            <>
                <input
                    role="checkbox"
                    {...inputProps}
                    {...focusProps}
                    ref={mergedRef}
                    type="checkbox"
                    className="peer sr-only"
                    aria-checked={isSelected}
                    data-disabled={isDisabled || undefined}
                    disabled={isDisabled} // Add this
                />
                <label
                    htmlFor={restProps.id}
                    {...labelProps}
                    className="peer inline-flex items-center gap-2"
                    data-disabled={isDisabled || undefined}
                    aria-disabled={isDisabled || undefined}
                >
                    <div
                        className={cn(
                            "border-primary ring-offset-background h-4 w-4 shrink-0 rounded-sm border",
                            "flex items-center justify-center overflow-hidden",
                            isFocusVisible &&
                                isFocused &&
                                "ring-ring outline-none ring-2 ring-offset-2",
                            isSelected && "bg-primary text-primary-foreground",
                            isDisabled && "cursor-not-allowed opacity-50",
                            className,
                        )}
                        // data-
                        aria-hidden="true" // Decorative, input handles semantics
                        data-state={isSelected ? "checked" : null}
                    >
                        {isSelected && <Check className="h-4 w-4" />}
                    </div>
                    {children}
                </label>
            </>
        );
    },
);

Checkbox.displayName = "Checkbox";
