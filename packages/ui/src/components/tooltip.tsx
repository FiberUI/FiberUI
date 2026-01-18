"use client";
import React from "react";
import {
    Tooltip as AriaTooltip,
    TooltipTrigger as AriaTooltipTrigger,
    TooltipProps as AriaTooltipProps,
    TooltipTriggerComponentProps,
    OverlayArrow,
    composeRenderProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { cn } from "@repo/ui/lib/utils";

const tooltipStyles = tv({
    base: "bg-secondary text-secondary-foreground z-50 rounded-md px-3 py-1.5 text-xs shadow-md",
    variants: {
        isEntering: {
            true: "animate-in fade-in-0 zoom-in-95 duration-200",
        },
        isExiting: {
            true: "animate-out fade-out-0 zoom-out-95 duration-150",
        },
    },
});

export interface TooltipProps extends Omit<AriaTooltipProps, "children"> {
    children: React.ReactNode;
}

export const TooltipTrigger = (props: TooltipTriggerComponentProps) => {
    return <AriaTooltipTrigger delay={750} {...props} />;
};

export const TooltipContent = ({
    children,
    className,
    ...props
}: TooltipProps) => {
    return (
        <AriaTooltip
            data-slot="tooltip"
            offset={8}
            {...props}
            className={composeRenderProps(className, (className, renderProps) =>
                cn(tooltipStyles({ ...renderProps }), className),
            )}
        >
            <OverlayArrow>
                {({ placement }) => (
                    <svg
                        width={8}
                        height={8}
                        viewBox="0 0 8 8"
                        className={cn(
                            "fill-secondary scale-110",
                            placement?.startsWith("top") && "",
                            placement?.startsWith("bottom") && "-rotate-180",
                            placement?.startsWith("right") && "rotate-90",
                            placement?.startsWith("left") && "-rotate-90",
                        )}
                    >
                        <path d="M0 0 L4 4 L8 0" />
                    </svg>
                )}
            </OverlayArrow>
            {children}
        </AriaTooltip>
    );
};
