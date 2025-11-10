"use client";

import { useOverlayTriggerState, OverlayTriggerState } from "react-stately";

import {
    useOverlayTrigger,
    usePopover,
    Overlay,
    DismissButton,
    AriaButtonProps,
    AriaPopoverProps,
    useButton,
    mergeProps,
    useOverlay,
} from "react-aria";

import {
    createContext,
    useContext,
    useRef,
    ReactNode,
    forwardRef,
    RefObject,
} from "react";

import { cn } from "@repo/ui/lib/utils";
import { Slot } from "@repo/ui/components/slot";
import { Button } from "@repo/ui/components/button";

interface PopoverProviderT {
    defaultOpen?: boolean;
    isOpen?: boolean;
    onOpenChange?: (val: boolean) => void;
    modal?: boolean;
}
// ============================================================================
// Popover Context
// ============================================================================

interface PopoverContextT extends PopoverProviderT {
    state: OverlayTriggerState;
    triggerRef: RefObject<HTMLButtonElement | null>;
}
const PopoverContext = createContext<PopoverContextT | null>(null);

const Popover = ({
    children,
    ...props
}: PopoverProviderT & { children: ReactNode }) => {
    const state = useOverlayTriggerState(props);
    const triggerRef = useRef<HTMLButtonElement>(null);

    return (
        <PopoverContext.Provider value={{ state, triggerRef, ...props }}>
            {children}
        </PopoverContext.Provider>
    );
};

// ============================================================================
// Popover Trigger
// ============================================================================

interface PopoverTriggerProps extends AriaButtonProps {
    asChild?: boolean;
    className?: string;
    children: ReactNode;
}

const PopoverTrigger = forwardRef<HTMLButtonElement, PopoverTriggerProps>(
    ({ asChild, className, children, ...props }, ref) => {
        const ctx = useContext(PopoverContext);
        if (!ctx) throw new Error("PopoverTrigger must be inside <Popover>");
        const { state, triggerRef } = ctx;

        const { triggerProps } = useOverlayTrigger(
            { type: "dialog" },
            state,
            triggerRef,
        );

        const internalRef = useRef<HTMLButtonElement>(null);

        const { buttonProps } = useButton(props, internalRef);

        const finalProps = mergeProps(triggerProps, buttonProps);

        const mergedRef = (node: HTMLButtonElement | null) => {
            triggerRef.current = node;
            internalRef.current = node;
            if (typeof ref === "function") {
                ref(node);
            } else if (ref) {
                /* eslint-disable */
                (ref as any).current = node;
            }
        };

        if (asChild) {
            return (
                <Slot {...finalProps} ref={mergedRef} className={className}>
                    {children}
                </Slot>
            );
        }

        return (
            <Button
                {...finalProps}
                ref={mergedRef}
                className={cn("outline-none", className)}
            >
                {children}
            </Button>
        );
    },
);
PopoverTrigger.displayName = "PopoverTrigger";

// ============================================================================
// Popover Content
// ============================================================================

interface PopoverContentProps
    extends Omit<AriaPopoverProps, "popoverRef" | "triggerRef"> {
    className?: string;
    children: ReactNode;
    asChild?: boolean;
}

const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(
    ({ asChild, className, children, ...props }, ref) => {
        const ctx = useContext(PopoverContext);

        if (!ctx) throw new Error("PopoverContent must be inside <Popover>");
        const { state, triggerRef } = ctx;

        const popoverRef = useRef<HTMLDivElement>(null);
        const mergedRef = (node: HTMLDivElement | null) => {
            popoverRef.current = node;
            if (typeof ref === "function") {
                ref(node);
            } else if (ref) {
                /* eslint-disable */
                (ref as any).current = node;
            }
        };

        // 🔹 Add overlayProps for dismissal behavior
        const { overlayProps } = useOverlay(
            {
                onClose: state.close,
                isOpen: state.isOpen,
                isDismissable: true,
                shouldCloseOnBlur: true,
            },
            popoverRef,
        );

        const { popoverProps, underlayProps } = usePopover(
            {
                ...props,
                popoverRef,
                triggerRef,
                offset: props.offset ?? 8,
                placement: props.placement ?? "bottom",
                isNonModal: !ctx.modal,
            },
            state,
        );

        const dataState = state.isOpen ? "open" : "closed";
        const side = props.placement?.split(" ")[0] ?? "bottom";

        const animation =
            "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2";

        const content = asChild ? (
            <Slot
                {...mergeProps(popoverProps, overlayProps)}
                ref={mergedRef}
                data-state={dataState}
                data-side={side}
                className={cn(animation, className)}
            >
                {children}
            </Slot>
        ) : (
            <div
                id="testing"
                {...mergeProps(popoverProps, overlayProps)}
                ref={mergedRef}
                data-state={dataState}
                data-side={side}
                className={cn(
                    animation,
                    "bg-popover text-popover-foreground absolute z-50 w-72 rounded-md border p-4 shadow-md outline-none",
                    className,
                )}
            >
                {children}
                <DismissButton onDismiss={state.close} />
            </div>
        );

        if (!state.isOpen) return null;

        return (
            <Overlay>
                {!ctx.modal && (
                    <div {...underlayProps} className="fixed inset-0 z-40" />
                )}
                {content}
            </Overlay>
        );
    },
);
PopoverContent.displayName = "PopoverContent";

// ============================================================================
// Popover Header (Optional)
// ============================================================================

interface PopoverHeaderProps {
    children: React.ReactNode;
    className?: string;
}

const PopoverHeader: React.FC<PopoverHeaderProps> = ({
    children,
    className,
}) => {
    return (
        <div className={cn("px-4 pb-2 pt-4", className)}>
            <h3 className="text-sm font-semibold leading-none">{children}</h3>
        </div>
    );
};

// ============================================================================
// Popover Body (Optional)
// ============================================================================

interface PopoverBodyProps {
    children: React.ReactNode;
    className?: string;
}

const PopoverBody: React.FC<PopoverBodyProps> = ({ children, className }) => {
    return <div className={cn("px-4 py-3", className)}>{children}</div>;
};

// ============================================================================
// Popover Footer (Optional)
// ============================================================================

interface PopoverFooterProps {
    children: React.ReactNode;
    className?: string;
}

const PopoverFooter: React.FC<PopoverFooterProps> = ({
    children,
    className,
}) => {
    return (
        <div
            className={cn(
                "flex items-center gap-2 border-t px-4 pb-4 pt-2",
                className,
            )}
        >
            {children}
        </div>
    );
};

export {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
};

// <Popover>
//     <PopoverTrigger></PopoverTrigger>
//     <PopoverContent>
//         <PopoverHeader></PopoverHeader>
//         <PopoverBody></PopoverBody>
//         <PopoverFooter></PopoverFooter>
//     </PopoverContent>
// </Popover>
