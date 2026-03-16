"use client";

import * as React from "react";
import { XIcon } from "lucide-react";
import {
    DialogTrigger as AriaDialogTrigger,
    Modal as AriaModal,
    ModalOverlay as AriaModalOverlay,
    Dialog as AriaDialog,
    Heading as AriaHeading,
    Button as AriaButton,
    composeRenderProps,
    type DialogTriggerProps as AriaDialogTriggerProps,
    type ModalOverlayProps as AriaModalOverlayProps,
    type DialogProps as AriaDialogProps,
    type HeadingProps as AriaHeadingProps,
    type ButtonProps as AriaButtonProps,
} from "react-aria-components";
import { cn, tv, type VariantProps } from "tailwind-variants";

/* -----------------------------------------------------------------------------
 * DialogTrigger (Root)
 * ---------------------------------------------------------------------------*/

interface DialogTriggerProps extends AriaDialogTriggerProps {}

export const DialogTrigger = (props: DialogTriggerProps) => {
    return <AriaDialogTrigger {...props} />;
};

/* -----------------------------------------------------------------------------
 * DialogOverlay
 * ---------------------------------------------------------------------------*/

const overlayStyles = tv({
    base: [
        "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm",
        "flex items-center justify-center",
    ],
    variants: {
        isEntering: {
            true: "animate-in fade-in-0 duration-200",
        },
        isExiting: {
            true: "animate-out fade-out-0 duration-150",
        },
    },
});

interface DialogOverlayProps extends AriaModalOverlayProps {
    children: React.ReactNode;
}

export const DialogOverlay = ({
    className,
    children,
    isDismissable = true,
    ...props
}: DialogOverlayProps) => {
    return (
        <AriaModalOverlay
            data-slot="dialog-overlay"
            isDismissable={isDismissable}
            className={composeRenderProps(
                className,
                (className, renderProps) =>
                    cn(overlayStyles({ ...renderProps }), className) || "",
            )}
            {...props}
        >
            <AriaModal data-slot="dialog-modal" className="outline-none">
                {children}
            </AriaModal>
        </AriaModalOverlay>
    );
};

/* -----------------------------------------------------------------------------
 * DialogContent
 * ---------------------------------------------------------------------------*/

const contentStyles = tv({
    base: [
        "bg-background text-foreground relative flex flex-col rounded-lg border shadow-lg outline-none",
        "max-h-[85vh] w-full",
    ],
    variants: {
        size: {
            sm: "max-w-sm",
            default: "max-w-lg",
            lg: "max-w-2xl",
            full: "h-[calc(100vh-2rem)] max-w-[calc(100vw-2rem)]",
        },
        isEntering: {
            true: "animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-2 duration-200",
        },
        isExiting: {
            true: "animate-out fade-out-0 zoom-out-95 slide-out-to-bottom-2 duration-150",
        },
    },
    defaultVariants: {
        size: "default",
    },
});

interface DialogContentProps
    extends AriaDialogProps,
        VariantProps<typeof contentStyles> {}

export const DialogContent = ({
    className,
    size,
    children,
    ...props
}: DialogContentProps) => {
    return (
        <AriaDialog
            data-slot="dialog-content"
            className={cn(contentStyles({ size }), className)}
            {...props}
        >
            {children}
        </AriaDialog>
    );
};

/* -----------------------------------------------------------------------------
 * DialogHeader
 * ---------------------------------------------------------------------------*/

interface DialogHeaderProps extends React.ComponentProps<"div"> {}

export const DialogHeader = ({
    className,
    children,
    ...props
}: DialogHeaderProps) => {
    return (
        <div
            data-slot="dialog-header"
            className={cn("flex flex-col gap-1.5 p-6 pb-0", className)}
            {...props}
        >
            {children}
        </div>
    );
};

/* -----------------------------------------------------------------------------
 * DialogTitle
 * ---------------------------------------------------------------------------*/

interface DialogTitleProps extends AriaHeadingProps {}

export const DialogTitle = ({ className, ...props }: DialogTitleProps) => {
    return (
        <AriaHeading
            data-slot="dialog-title"
            slot="title"
            className={cn(
                "text-lg font-semibold leading-none tracking-tight",
                className,
            )}
            {...props}
        />
    );
};

/* -----------------------------------------------------------------------------
 * DialogDescription
 * ---------------------------------------------------------------------------*/

interface DialogDescriptionProps extends React.ComponentProps<"p"> {}

export const DialogDescription = ({
    className,
    ...props
}: DialogDescriptionProps) => {
    return (
        <p
            data-slot="dialog-description"
            className={cn("text-muted-foreground text-sm", className)}
            {...props}
        />
    );
};

/* -----------------------------------------------------------------------------
 * DialogBody
 * ---------------------------------------------------------------------------*/

interface DialogBodyProps extends React.ComponentProps<"div"> {}

export const DialogBody = ({
    className,
    children,
    ...props
}: DialogBodyProps) => {
    return (
        <div
            data-slot="dialog-body"
            className={cn("flex-1 overflow-y-auto p-6", className)}
            {...props}
        >
            {children}
        </div>
    );
};

/* -----------------------------------------------------------------------------
 * DialogFooter
 * ---------------------------------------------------------------------------*/

interface DialogFooterProps extends React.ComponentProps<"div"> {}

export const DialogFooter = ({
    className,
    children,
    ...props
}: DialogFooterProps) => {
    return (
        <div
            data-slot="dialog-footer"
            className={cn(
                "flex flex-col-reverse gap-2 p-6 pt-0 sm:flex-row sm:justify-end",
                className,
            )}
            {...props}
        >
            {children}
        </div>
    );
};

/* -----------------------------------------------------------------------------
 * DialogClose
 * ---------------------------------------------------------------------------*/

interface DialogCloseProps extends AriaButtonProps {}

export const DialogClose = ({
    className,
    children,
    ...props
}: DialogCloseProps) => {
    if (children) {
        return (
            <AriaButton
                data-slot="dialog-close"
                slot="close"
                className={cn(className)}
                {...props}
            >
                {children}
            </AriaButton>
        );
    }

    return (
        <AriaButton
            data-slot="dialog-close"
            slot="close"
            className={cn(
                "ring-offset-background focus:ring-ring absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none",
                className,
            )}
            {...props}
        >
            <XIcon className="size-4" />
            <span className="sr-only">Close</span>
        </AriaButton>
    );
};
