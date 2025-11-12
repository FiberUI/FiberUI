"use client";
import { cn } from "@repo/ui/lib/utils";
import { motion } from "motion/react";

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

export const LoaderBars2: React.FC<LoaderProps> = ({}) => {
    return (
        <div className="flex h-20 items-end gap-4">
            {Array.from({ length: 5 }).map((_, idx) => (
                <motion.span
                    key={idx}
                    animate={{
                        height: [0, 40, 0],
                    }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        repeatType: "loop",
                        // ease: "",
                        delay: 0.1 * idx,
                    }}
                    className="h- inline-block w-2 rounded bg-black dark:bg-white"
                />
            ))}
        </div>
    );
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

export const LoaderDotsPulsingSpinner = ({
    size = "2.8rem",
    speed = "0.9s",
}) => {
    const delays = [-0.875, -0.75, -0.625, -0.5, -0.375, -0.25, -0.125, 0];

    return (
        <div
            className="relative flex items-center justify-start"
            style={{
                height: size,
                width: size,
            }}
        >
            <style>{`
        @keyframes pulse0112 {
          0%, 100% {
            transform: scale(0);
            opacity: 0.5;
          }
          50% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>

            {[0, 45, 90, 135, 180, 225, 270, 315].map((rotation, index) => (
                <div
                    key={index}
                    className="absolute left-0 top-0 flex h-full w-full items-center justify-start"
                    style={{
                        transform: `rotate(${rotation}deg)`,
                    }}
                >
                    <div
                        className={cn("block bg-black dark:bg-white")}
                        style={{
                            height: "20%",
                            width: "20%",
                            borderRadius: "50%",
                            transform: "scale(0)",
                            opacity: 0.5,
                            animation: `pulse0112 calc(${speed} * 1.111) ease-in-out infinite`,
                            animationDelay: `calc(${speed} * ${delays[index]})`,
                            boxShadow: "0 0 20px rgba(18, 31, 53, 0.3)",
                        }}
                    />
                </div>
            ))}
        </div>
    );
};

export const LoaderSpinner: React.FC<LoaderProps> = ({}) => {
    return (
        <>
            <svg
                className="text-primary h-10 w-10 animate-spin"
                viewBox="0 0 24 24"
            >
                <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    className="opacity-25"
                />
                <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                    pathLength="100"
                    strokeDasharray="60 140"
                    strokeDashoffset="0"
                />
            </svg>
        </>
    );
};
