"use client";
import {
    Switch as AriaSwitch,
    SwitchProps as AriaSwitchProps,
    SwitchRenderProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { cn, focusRing } from "@repo/ui/lib/utils";

export interface SwitchProps extends Omit<AriaSwitchProps, "children"> {}

const track = tv({
    extend: focusRing,
    base: "box-border flex h-5 w-9 shrink-0 cursor-default items-center rounded-full border border-transparent px-px font-sans shadow-inner transition duration-200 ease-in-out",
    variants: {
        isSelected: {
            false: "group-pressed:bg-accent border-input bg-input",
            true: "forced-colors:bg-[Highlight]! group-pressed:bg-primary/80 bg-primary",
        },
        isDisabled: {
            true: "group-selected:bg-primary/50 forced-colors:group-selected:bg-[GrayText]! border-input bg-muted forced-colors:border-[GrayText]",
        },
    },
});

const handle = tv({
    base: "shadow-xs h-4 w-4 transform rounded-full outline-1 -outline-offset-1 outline-transparent transition duration-200 ease-in-out",
    variants: {
        isSelected: {
            false: "bg-foreground translate-x-0",
            true: "bg-primary-foreground translate-x-full",
        },
        isDisabled: {
            true: "forced-colors:outline-[GrayText]",
        },
    },

    compoundVariants: [
        {
            isSelected: false,
            isDisabled: true,
            class: "bg-muted-foreground/50",
        },
        {
            isSelected: true,
            isDisabled: true,
            class: "bg-primary-foreground/70",
        },
    ],
});

export function Switch({ className, ...restProps }: SwitchProps) {
    return (
        <AriaSwitch
            {...restProps}
            className={cn(
                className,
                "group relative flex items-center gap-2 text-sm text-neutral-800 transition [-webkit-tap-highlight-color:transparent] disabled:text-neutral-300 dark:text-neutral-200 dark:disabled:text-neutral-600 forced-colors:disabled:text-[GrayText]",
            )}
        >
            {(renderProps: SwitchRenderProps) => (
                <>
                    <div className={track(renderProps)}>
                        <span className={handle(renderProps)} />
                    </div>
                </>
            )}
        </AriaSwitch>
    );
}
