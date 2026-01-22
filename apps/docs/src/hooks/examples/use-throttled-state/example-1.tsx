"use client";

import { useState, useEffect } from "react";
import { useThrottledState } from "@repo/hooks/utility/use-throttled-state";

/* BASIC USAGE - Mouse Position Tracker */
export const Example1 = () => {
    const INTERVAL = 500;
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const { throttledValue, isThrottling } = useThrottledState(mousePos, {
        interval: INTERVAL,
    });
    const [updateCount, setUpdateCount] = useState(0);
    const [throttledUpdateCount, setThrottledUpdateCount] = useState(0);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
            setUpdateCount((c) => c + 1);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    useEffect(() => {
        setThrottledUpdateCount((c) => c + 1);
    }, [throttledValue]);

    return (
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/50 rounded-md p-3">
                    <p className="text-muted-foreground mb-1 text-xs font-medium">
                        Immediate Position
                    </p>
                    <p className="font-mono text-sm">
                        x: {mousePos.x}, y: {mousePos.y}
                    </p>
                    <p className="text-muted-foreground mt-2 text-xs">
                        Updates:{" "}
                        <span className="font-medium">{updateCount}</span>
                    </p>
                </div>
                <div className="rounded-md border border-purple-500/50 bg-purple-500/10 p-3">
                    <div className="mb-1 flex items-center gap-2">
                        <p className="text-xs font-medium text-purple-600 dark:text-purple-400">
                            Throttled ({INTERVAL}ms)
                        </p>
                        {isThrottling && (
                            <span className="h-2 w-2 animate-pulse rounded-full bg-purple-500" />
                        )}
                    </div>
                    <p className="font-mono text-sm">
                        x: {throttledValue.x}, y: {throttledValue.y}
                    </p>
                    <p className="text-muted-foreground mt-2 text-xs">
                        Updates:{" "}
                        <span className="font-medium text-purple-600 dark:text-purple-400">
                            {throttledUpdateCount}
                        </span>
                    </p>
                </div>
            </div>

            <p className="text-muted-foreground text-xs">
                Move your mouse around. The throttled value updates at most
                every {INTERVAL}ms.
            </p>
        </div>
    );
};
