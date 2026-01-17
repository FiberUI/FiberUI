"use client";

import { forwardRef } from "react";
import { cn } from "@repo/ui/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

export const skeletonVariants = cva("bg-muted relative overflow-hidden", {
    variants: {
        variant: {
            default: "rounded-md",
            circular: "rounded-full",
            text: "rounded h-4 w-full",
            button: "rounded-lg h-9",
            avatar: "rounded-full aspect-square",
            card: "rounded-lg",
        },
        size: {
            xs: "h-2",
            sm: "h-4",
            md: "h-6",
            lg: "h-8",
            xl: "h-12",
            full: "h-full w-full",
        },
        animation: {
            pulse: "animate-pulse",
            wave: "skeleton-wave",
            none: "",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "md",
        animation: "pulse",
    },
});

interface SkeletonProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof skeletonVariants> {
    /** Width of the skeleton (CSS value) */
    width?: string | number;
    /** Height of the skeleton (CSS value) */
    height?: string | number;
}

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
    (
        { className, variant, size, animation, width, height, style, ...props },
        ref,
    ) => {
        const computedStyle = {
            ...style,
            width:
                width !== undefined
                    ? typeof width === "number"
                        ? `${width}px`
                        : width
                    : undefined,
            height:
                height !== undefined
                    ? typeof height === "number"
                        ? `${height}px`
                        : height
                    : undefined,
        };

        return (
            <>
                {animation === "wave" && (
                    <style>{`
                        @keyframes skeleton-wave-animation {
                            0% { transform: translateX(-100%); }
                            100% { transform: translateX(100%); }
                        }
                        .skeleton-wave::after {
                            content: "";
                            position: absolute;
                            inset: 0;
                            background: linear-gradient(
                                90deg,
                                transparent,
                                rgba(255, 255, 255, 0.15),
                                transparent
                            );
                            animation: skeleton-wave-animation 1.5s ease-in-out infinite;
                        }
                    `}</style>
                )}
                <div
                    ref={ref}
                    role="status"
                    aria-busy="true"
                    aria-label="Loading..."
                    className={cn(
                        skeletonVariants({ variant, size, animation }),
                        className,
                    )}
                    style={computedStyle}
                    {...props}
                />
            </>
        );
    },
);
Skeleton.displayName = "Skeleton";

interface SkeletonTextProps extends Omit<SkeletonProps, "variant"> {
    /** Number of text lines to render */
    lines?: number;
    /** Gap between lines */
    gap?: string;
}

const SkeletonText = forwardRef<HTMLDivElement, SkeletonTextProps>(
    ({ lines = 3, gap = "0.5rem", className, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn("flex flex-col", className)}
                style={{ gap }}
            >
                {Array.from({ length: lines }).map((_, i) => (
                    <Skeleton
                        key={i}
                        variant="text"
                        width={i === lines - 1 ? "60%" : "100%"}
                        {...props}
                    />
                ))}
            </div>
        );
    },
);
SkeletonText.displayName = "SkeletonText";

interface SkeletonAvatarProps extends Omit<SkeletonProps, "variant"> {
    /** Size of the avatar */
    avatarSize?: "sm" | "md" | "lg" | "xl";
}

const avatarSizes = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
    xl: "h-16 w-16",
};

const SkeletonAvatar = forwardRef<HTMLDivElement, SkeletonAvatarProps>(
    ({ avatarSize = "md", className, ...props }, ref) => {
        return (
            <Skeleton
                ref={ref}
                variant="circular"
                size="full"
                className={cn(avatarSizes[avatarSize], className)}
                {...props}
            />
        );
    },
);
SkeletonAvatar.displayName = "SkeletonAvatar";

interface SkeletonButtonProps extends Omit<SkeletonProps, "variant"> {
    /** Size of the button skeleton */
    buttonSize?: "sm" | "md" | "lg";
}

const buttonSizes = {
    sm: "h-8 w-20",
    md: "h-9 w-24",
    lg: "h-11 w-32",
};

const SkeletonButton = forwardRef<HTMLDivElement, SkeletonButtonProps>(
    ({ buttonSize = "md", className, ...props }, ref) => {
        return (
            <Skeleton
                ref={ref}
                variant="button"
                size="full"
                className={cn(buttonSizes[buttonSize], className)}
                {...props}
            />
        );
    },
);
SkeletonButton.displayName = "SkeletonButton";

interface SkeletonCardProps extends Omit<SkeletonProps, "variant"> {
    /** Show header placeholder */
    showHeader?: boolean;
    /** Show image placeholder */
    showImage?: boolean;
    /** Show action buttons */
    showActions?: boolean;
}

const SkeletonCard = forwardRef<HTMLDivElement, SkeletonCardProps>(
    (
        {
            showHeader = true,
            showImage = true,
            showActions = true,
            className,
            animation,
            ...props
        },
        ref,
    ) => {
        return (
            <div
                ref={ref}
                className={cn("border-border rounded-lg border p-4", className)}
                {...props}
            >
                {showHeader && (
                    <div className="mb-4 flex items-center gap-3">
                        <SkeletonAvatar avatarSize="md" animation={animation} />
                        <div className="flex-1 space-y-2">
                            <Skeleton
                                variant="text"
                                width="40%"
                                animation={animation}
                            />
                            <Skeleton
                                variant="text"
                                width="25%"
                                size="xs"
                                animation={animation}
                            />
                        </div>
                    </div>
                )}
                {showImage && (
                    <Skeleton
                        variant="card"
                        className="mb-4 aspect-video w-full"
                        animation={animation}
                    />
                )}
                <SkeletonText lines={3} animation={animation} />
                {showActions && (
                    <div className="mt-4 flex gap-2">
                        <SkeletonButton buttonSize="sm" animation={animation} />
                        <SkeletonButton buttonSize="sm" animation={animation} />
                    </div>
                )}
            </div>
        );
    },
);
SkeletonCard.displayName = "SkeletonCard";

export {
    Skeleton,
    SkeletonText,
    SkeletonAvatar,
    SkeletonButton,
    SkeletonCard,
    type SkeletonProps,
    type SkeletonTextProps,
    type SkeletonAvatarProps,
    type SkeletonButtonProps,
    type SkeletonCardProps,
};
