import React, { useRef, forwardRef, createContext, useContext } from "react";
import {
    useOverlay,
    useOverlayTrigger,
    useOverlayPosition,
    DismissButton,
    FocusScope,
    OverlayContainer,
} from "react-aria";
import type { AriaOverlayProps, AriaPositionProps } from "react-aria";
import { useOverlayTriggerState } from "react-stately";
import type { OverlayTriggerProps } from "react-stately";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@repo/ui/lib/utils";

// ============================================================================
// Context
// ============================================================================

interface PopoverContextValue {
    state: ReturnType<typeof useOverlayTriggerState>;
    triggerRef: React.RefObject<HTMLButtonElement>;
    overlayRef: React.RefObject<HTMLDivElement>;
}

const PopoverContext = createContext<PopoverContextValue | null>(null);

const usePopoverContext = () => {
    const context = useContext(PopoverContext);
    if (!context) {
        throw new Error("Popover components must be used within Popover");
    }
    return context;
};

// ============================================================================
// Variants
// ============================================================================

const popoverVariants = cva(
    "z-50 rounded-md border bg-popover text-popover-foreground shadow-md outline-none",
    {
        variants: {
            size: {
                sm: "w-64",
                md: "w-80",
                lg: "w-96",
                full: "w-full",
            },
        },
        defaultVariants: {
            size: "md",
        },
    },
);

// ============================================================================
// Root Popover Component
// ============================================================================

interface PopoverProps extends OverlayTriggerProps {
    children: React.ReactNode;
}

export const Popover: React.FC<PopoverProps> = ({ children, ...props }) => {
    const state = useOverlayTriggerState(props);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    return (
        <PopoverContext.Provider value={{ state, triggerRef, overlayRef }}>
            {children}
        </PopoverContext.Provider>
    );
};

// ============================================================================
// Popover Trigger
// ============================================================================

interface PopoverTriggerProps {
    children: React.ReactElement;
    className?: string;
}

export const PopoverTrigger: React.FC<PopoverTriggerProps> = ({
    children,
    className,
}) => {
    const { state, triggerRef } = usePopoverContext();
    const { triggerProps } = useOverlayTrigger(
        { type: "dialog" },
        state,
        triggerRef,
    );

    return React.cloneElement(children, {
        ...triggerProps,
        ref: triggerRef,
        className: cn(className, children.props.className),
        "data-state": state.isOpen ? "open" : "closed",
    });
};

// ============================================================================
// Popover Content
// ============================================================================

interface PopoverContentProps
    extends AriaOverlayProps,
        VariantProps<typeof popoverVariants> {
    children: React.ReactNode;
    className?: string;
    placement?: AriaPositionProps["placement"];
    offset?: number;
    crossOffset?: number;
    containerPadding?: number;
    shouldFlip?: boolean;
    shouldUpdatePosition?: boolean;
}

export const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(
    (
        {
            children,
            className,
            size,
            placement = "bottom",
            offset = 8,
            crossOffset = 0,
            containerPadding = 12,
            shouldFlip = true,
            shouldUpdatePosition = true,
            isDismissable = true,
            shouldCloseOnBlur = true,
            isKeyboardDismissDisabled = false,
            ...props
        },
        forwardedRef,
    ) => {
        const { state, triggerRef, overlayRef } = usePopoverContext();

        // Merge refs
        const mergedRef = (node: HTMLDivElement | null) => {
            if (!node) {
                return;
            }

            overlayRef.current = node;
            if (typeof forwardedRef === "function") {
                forwardedRef(node);
            } else if (forwardedRef) {
                forwardedRef.current = node;
            }
        };

        // Handle overlay behavior
        const { overlayProps, underlayProps } = useOverlay(
            {
                ...props,
                isDismissable,
                shouldCloseOnBlur,
                isKeyboardDismissDisabled,
                isOpen: state.isOpen,
                onClose: state.close,
            },
            overlayRef,
        );

        // Handle positioning
        const { overlayProps: positionProps, placement: finalPlacement } =
            useOverlayPosition({
                targetRef: triggerRef,
                overlayRef,
                placement,
                offset,
                crossOffset,
                containerPadding,
                shouldFlip,
                shouldUpdatePosition,
                isOpen: state.isOpen,
            });

        if (!state.isOpen) {
            return null;
        }

        return (
            <OverlayContainer>
                {/* Underlay for dismissing */}
                {isDismissable && (
                    <div
                        {...underlayProps}
                        className="fixed inset-0 z-50"
                        style={{ background: "transparent" }}
                    />
                )}

                {/* Popover content */}
                <FocusScope restoreFocus>
                    <div
                        {...overlayProps}
                        {...positionProps}
                        ref={mergedRef}
                        className={cn(
                            popoverVariants({ size }),
                            "animate-in fade-in-0 zoom-in-95",
                            // Animation based on placement
                            {
                                "slide-in-from-top-2":
                                    finalPlacement === "bottom",
                                "slide-in-from-bottom-2":
                                    finalPlacement === "top",
                                "slide-in-from-left-2":
                                    finalPlacement === "right",
                                "slide-in-from-right-2":
                                    finalPlacement === "left",
                            },
                            className,
                        )}
                        data-state={state.isOpen ? "open" : "closed"}
                        data-placement={finalPlacement}
                    >
                        {/* Dismiss buttons for screen readers */}
                        <DismissButton onDismiss={state.close} />
                        {children}
                        <DismissButton onDismiss={state.close} />
                    </div>
                </FocusScope>
            </OverlayContainer>
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

export const PopoverHeader: React.FC<PopoverHeaderProps> = ({
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

export const PopoverBody: React.FC<PopoverBodyProps> = ({
    children,
    className,
}) => {
    return <div className={cn("px-4 py-3", className)}>{children}</div>;
};

// ============================================================================
// Popover Footer (Optional)
// ============================================================================

interface PopoverFooterProps {
    children: React.ReactNode;
    className?: string;
}

export const PopoverFooter: React.FC<PopoverFooterProps> = ({
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

// ============================================================================
// Popover Close (Optional helper)
// ============================================================================

interface PopoverCloseProps {
    children: React.ReactElement;
}

export const PopoverClose: React.FC<PopoverCloseProps> = ({ children }) => {
    const { state } = usePopoverContext();

    return React.cloneElement(children, {
        onClick: (e: React.MouseEvent) => {
            children.props.onClick?.(e);
            state.close();
        },
    });
};

// ============================================================================
// Export all
// ============================================================================

Popover.displayName = "Popover";
