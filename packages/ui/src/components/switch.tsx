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
            false: "group-pressed:bg-neutral-200 dark:group-pressed:bg-neutral-700 border-neutral-400 bg-neutral-100 dark:border-neutral-400 dark:bg-neutral-800",
            true: "forced-colors:bg-[Highlight]! group-pressed:bg-neutral-800 dark:group-pressed:bg-neutral-200 bg-neutral-700 dark:bg-neutral-300",
        },
        isDisabled: {
            true: "group-selected:bg-neutral-300 dark:group-selected:bg-neutral-800 forced-colors:group-selected:bg-[GrayText]! border-neutral-300 bg-neutral-100 dark:border-neutral-900 dark:bg-neutral-800 forced-colors:border-[GrayText]",
        },
    },
});

const handle = tv({
    base: "shadow-xs h-4 w-4 transform rounded-full outline-1 -outline-offset-1 outline-transparent transition duration-200 ease-in-out",
    variants: {
        isSelected: {
            false: "translate-x-0 bg-neutral-900 dark:bg-neutral-300",
            true: "translate-x-full bg-white dark:bg-neutral-900",
        },
        isDisabled: {
            true: "forced-colors:outline-[GrayText]",
        },
    },

    compoundVariants: [
        {
            isSelected: false,
            isDisabled: true,
            class: "bg-neutral-300 dark:bg-neutral-700",
        },
        {
            isSelected: true,
            isDisabled: true,
            class: "bg-neutral-50 dark:bg-neutral-700",
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
