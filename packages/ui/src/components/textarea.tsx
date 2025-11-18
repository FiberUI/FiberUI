"use client";

import { cn } from "@repo/ui/lib/utils";
import { ComponentProps, forwardRef, useRef } from "react";
import { AriaTextFieldOptions, useFocusRing, useTextField } from "react-aria";
import { mergeProps } from "@react-aria/utils";

type TextareaComponentProps = ComponentProps<"textarea">;

interface TextareaProps
    extends TextareaComponentProps,
        Omit<AriaTextFieldOptions<"textarea">, keyof TextareaComponentProps> {
    className?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className = "", ...restProps }, ref) => {
        const localRef = useRef<HTMLTextAreaElement>(null);

        const mergedRef = (node: HTMLTextAreaElement | null) => {
            if (!node) {
                return;
            }
            localRef.current = node;

            if (typeof ref == "function") {
                ref(node);
            } else if (ref) {
                ref.current = node;
            }
        };

        const { inputProps } = useTextField<"textarea">(
            restProps as AriaTextFieldOptions<"textarea">,
            localRef,
        );

        const { focusProps } = useFocusRing();

        return (
            <textarea
                {...mergeProps(inputProps, focusProps)}
                ref={mergedRef}
                className={cn(
                    "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input shadow-xs min-h-20 w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-base outline-none transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                    "resize-y",
                    className,
                )}
            />
        );
    },
);
Textarea.displayName = "Textarea";
