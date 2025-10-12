"use client";
import { cn } from "@repo/ui/lib/utils";
import { motion } from "motion/react";

interface LoaderProps {}
export const LoaderCircles: React.FC<LoaderProps> = ({}) => {
    return (
        <div className="relative space-x-4">
            {Array.from({ length: 4 }).map((_, idx) => (
                <motion.span
                    key={idx}
                    animate={{
                        scale: [0, 1],
                        opacity: [1, 0],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut",
                        delay: 0.4 * idx,
                    }}
                    className={cn(
                        "absolute inline-block h-20 w-20 rounded-full border-8 border-black",
                    )}
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
                    className={cn("inline-block h-10 w-1.5 bg-black")}
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
                        duration: 1,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut",
                        delay: 0.1 * idx,
                    }}
                    className="inline-block h-10 w-1.5 bg-black"
                />
            ))}
        </div>
    );
};
