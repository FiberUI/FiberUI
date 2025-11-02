"use client";

import Image, { ImageProps } from "next/image";
import { cn } from "@repo/ui/lib/utils"; // if you have one, else remove cn

const sizeMap = {
    xs: 20,
    sm: 28,
    md: 36, // default
    lg: 48,
    xl: 64,
} as const;

export type LogoSize = keyof typeof sizeMap;

interface LogoProps extends Partial<ImageProps> {
    size?: LogoSize;
    className?: string;
    logoPath?: string;
}

export const FiberUILogo: React.FC<LogoProps> = ({
    size = "md",
    className,
    alt = "Fiber UI Logo",
    logoPath = "/logo.svg",
    ...props
}) => {
    const dimension = sizeMap[size];
    return (
        <>
            <Image
                src={logoPath}
                alt={alt}
                width={dimension}
                height={dimension}
                className={cn("select-none", className)}
                {...props}
            />
        </>
    );
};
