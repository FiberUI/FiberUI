"use client";
import { cn } from "@repo/ui/lib/utils";
import { motion } from "motion/react";
import { Loader2 } from "lucide-react";

interface LoaderProps {}

export const LoaderCircles: React.FC<LoaderProps> = ({}) => {
    return (
        <div className="space-x-2">
            {Array.from({ length: 3 }).map((_, idx) => (
                <motion.span
                    key={idx}
                    animate={{
                        y: [20, -20, 20],
                    }}
                    transition={{
                        duration: 0.75,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut",
                        delay: 0.1 * idx,
                    }}
                    className="inline-block h-4 w-4 rounded-full bg-black dark:bg-white"
                />
            ))}
        </div>
    );
};

export const LoaderCircles2: React.FC<LoaderProps> = ({}) => {
    return (
        <div className="space-x-4">
            {Array.from({ length: 5 }).map((_, idx) => (
                <motion.span
                    key={idx}
                    animate={{
                        scaleY: [0, 1, 0],
                    }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut",
                        delay: 0.1 * idx,
                    }}
                    className={cn(
                        "inline-block h-10 w-1.5 bg-black dark:bg-white",
                    )}
                />
            ))}
        </div>
    );
};

export const LoaderBars: React.FC<LoaderProps> = ({}) => {
    return (
        <div className="space-x-4">
            {Array.from({ length: 5 }).map((_, idx) => (
                <motion.span
                    key={idx}
                    animate={{
                        y: [20, -20, 20],
                    }}
                    transition={{
                        duration: 0.75,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut",
                        delay: 0.1 * idx,
                    }}
                    className="inline-block h-10 w-1.5 bg-black dark:bg-white"
                />
            ))}
        </div>
    );
};

export const LoaderSpinner: React.FC<LoaderProps> = ({}) => {
    return <Loader2 className="h-10 w-10 animate-spin" />;
};

export const LoaderPulse: React.FC<LoaderProps> = ({}) => {
    return (
        <div className="space-x-2">
            {Array.from({ length: 3 }).map((_, idx) => (
                <motion.span
                    key={idx}
                    animate={{
                        scale: [0.1, 1, 0.1],
                    }}
                    transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "linear",
                        delay: 0.25 * idx,
                    }}
                    className="inline-block h-4 w-4 rounded-full bg-black dark:bg-white"
                />
            ))}
        </div>
    );
};
