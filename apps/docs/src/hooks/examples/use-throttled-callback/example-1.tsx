"use client";

import { useState, useRef } from "react";
import { useThrottledCallback } from "@repo/hooks/utility/use-throttled-callback";

/* BASIC USAGE - Scroll Handler */
export const Example1 = () => {
    const [scrollY, setScrollY] = useState(0);
    const [callCount, setCallCount] = useState(0);
    const [throttledCallCount, setThrottledCallCount] = useState(0);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const { throttledFn: handleScroll } = useThrottledCallback(
        (scrollTop: number) => {
            setScrollY(scrollTop);
            setThrottledCallCount((c) => c + 1);
        },
        { interval: 150 },
    );

    const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
        setCallCount((c) => c + 1);
        handleScroll(e.currentTarget.scrollTop);
    };

    return (
        <div className="flex flex-col gap-4">
            <div
                ref={scrollContainerRef}
                onScroll={onScroll}
                className="bg-muted/30 h-40 overflow-y-auto rounded-md border"
            >
                <div className="p-4" style={{ height: "600px" }}>
                    <p className="text-muted-foreground sticky top-0 text-sm">
                        👆 Scroll me rapidly!
                    </p>
                    <div className="mt-4 space-y-4">
                        {Array.from({ length: 20 }).map((_, i) => (
                            <p
                                key={i}
                                className="text-muted-foreground text-xs"
                            >
                                Line {i + 1}
                            </p>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-muted/50 rounded-md p-3">
                    <p className="text-muted-foreground mb-1 text-xs font-medium">
                        Scroll Events
                    </p>
                    <p className="text-xl font-bold">{callCount}</p>
                </div>
                <div className="rounded-md border border-purple-500/50 bg-purple-500/10 p-3">
                    <p className="mb-1 text-xs font-medium text-purple-600 dark:text-purple-400">
                        Throttled Calls
                    </p>
                    <p className="text-xl font-bold text-purple-600 dark:text-purple-400">
                        {throttledCallCount}
                    </p>
                </div>
                <div className="bg-muted/50 rounded-md p-3">
                    <p className="text-muted-foreground mb-1 text-xs font-medium">
                        Scroll Position
                    </p>
                    <p className="text-xl font-bold">{Math.round(scrollY)}px</p>
                </div>
            </div>

            <p className="text-muted-foreground text-xs">
                <code className="bg-muted rounded px-1">
                    useThrottledCallback
                </code>{" "}
                limits how often the handler runs, improving scroll performance.
            </p>
        </div>
    );
};
