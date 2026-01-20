"use client";
import {
    OverlayArrow,
    Popover as AriaPopover,
    PopoverProps as AriaPopoverProps,
    DialogTrigger,
    DialogTriggerProps,
    composeRenderProps,
    PopoverContext,
    useSlottedContext,
    Dialog,
} from "react-aria-components";
import React from "react";
import { tv, cn } from "tailwind-variants";

const popoverStyles = tv({
    base: "bg-popover text-popover-foreground z-50 rounded-md border p-4 shadow-md outline-none",
    variants: {
        isEntering: {
            true: "animate-in fade-in-0 zoom-in-95 duration-200",
        },
        isExiting: {
            true: "animate-out fade-out-0 zoom-out-95 duration-150",
        },
    },
});

// ============================================================================
// Popover (Wrapper)
// ============================================================================

export const Popover: React.FC<DialogTriggerProps> = (props) => {
    return <DialogTrigger {...props} />;
};

// ============================================================================
// PopoverTrigger
// ============================================================================

export const PopoverTrigger: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    return children;
};

// ============================================================================
// PopoverContent
// ============================================================================

export interface PopoverContentProps
    extends Omit<AriaPopoverProps, "children"> {
    showArrow?: boolean;
    children: React.ReactNode;
}

export const PopoverContent: React.FC<PopoverContentProps> = ({
    children,
    showArrow,
    className,
    ...props
}) => {
    const popoverContext = useSlottedContext(PopoverContext);
    const isSubmenu = popoverContext?.trigger === "SubmenuTrigger";
    let offset = showArrow ? 12 : 8;
    offset = isSubmenu ? offset - 6 : offset;

    return (
        <AriaPopover
            data-slot="popover-content"
            offset={offset}
            {...props}
            className={composeRenderProps(
                className,
                (className, renderProps) =>
                    cn(popoverStyles({ ...renderProps }), className) || "",
            )}
        >
            {showArrow && (
                <OverlayArrow className="group">
                    <svg
                        width={12}
                        height={12}
                        viewBox="0 0 12 12"
                        className="fill-popover stroke-border block group-data-[placement^=bottom]:rotate-180 group-data-[placement^=left]:-rotate-90 group-data-[placement^=right]:rotate-90"
                    >
                        <path d="M0 0 L6 6 L12 0" />
                    </svg>
                </OverlayArrow>
            )}
            <Dialog className="outline-none">{children}</Dialog>
        </AriaPopover>
    );
};

// ============================================================================
// PopoverHeader
// ============================================================================

export interface PopoverHeaderProps extends React.ComponentProps<"div"> {}

export const PopoverHeader: React.FC<PopoverHeaderProps> = ({
    children,
    className,
}) => {
    return (
        <div className={cn("pb-2", className)}>
            <h3 className="text-sm font-semibold leading-none">{children}</h3>
        </div>
    );
};

// ============================================================================
// PopoverBody
// ============================================================================

export interface PopoverBodyProps extends React.ComponentProps<"div"> {}
export const PopoverBody: React.FC<PopoverBodyProps> = ({
    children,
    className,
}) => {
    return <div className={cn("py-2", className)}>{children}</div>;
};

// ============================================================================
// PopoverFooter
// ============================================================================

export interface PopoverFooterProps extends React.ComponentProps<"div"> {}

export const PopoverFooter: React.FC<PopoverFooterProps> = ({
    children,
    className,
}) => {
    return <div className={cn("border-t pt-2", className)}>{children}</div>;
};
