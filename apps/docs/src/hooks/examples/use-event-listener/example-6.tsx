"use client";

import { useState, useRef } from "react";
import { useEventListener } from "@repo/hooks/dom/use-event-listener";
import { ArrowDown } from "lucide-react";

/**
 * Example 6: Scroll with Passive Option
 * Demonstrates Overload 1 - Window events with options parameter
 */
export const Example6 = () => {
    const [scrollY, setScrollY] = useState(0);
    const lastY = useRef(0);
    const [direction, setDirection] = useState<"up" | "down" | null>(null);

    // Overload 1 with options: { passive: true } for better scroll performance
    useEventListener(
        "scroll",
        () => {
            const y = window.scrollY;
            setDirection(
                y > lastY.current ? "down" : y < lastY.current ? "up" : null,
            );
            lastY.current = y;
            setScrollY(y);
        },
        null,
        { passive: true }, // <-- Options parameter
    );

    const progress = Math.min(
        100,
        Math.round(
            (scrollY /
                (document.documentElement.scrollHeight - window.innerHeight)) *
                100,
        ) || 0,
    );

    return (
        <div className="flex w-full max-w-md flex-col gap-4">
            <div className="flex items-center gap-2">
                <ArrowDown
                    className={`text-primary h-5 w-5 transition-transform ${
                        direction === "up" ? "rotate-180" : ""
                    }`}
                />
                <h3 className="font-semibold">Scroll with Options</h3>
                <span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs">
                    Overload 1
                </span>
            </div>

            <p className="text-muted-foreground text-sm">
                Listening to{" "}
                <code className="bg-muted rounded px-1">scroll</code> on{" "}
                <strong>window</strong> with{" "}
                <code className="bg-muted rounded px-1">passive: true</code> for
                performance.
            </p>

            <div className="bg-muted/50 space-y-3 rounded-lg p-4">
                <div className="flex items-center justify-between">
                    <span className="text-sm">Scroll Y</span>
                    <span className="font-mono text-sm">{scrollY}px</span>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-sm">Direction</span>
                    <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                            direction === "down"
                                ? "bg-blue-500/20 text-blue-500"
                                : direction === "up"
                                  ? "bg-green-500/20 text-green-500"
                                  : "bg-muted text-muted-foreground"
                        }`}
                    >
                        {direction?.toUpperCase() || "IDLE"}
                    </span>
                </div>

                <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span className="font-mono">{progress}%</span>
                    </div>
                    <div className="bg-muted h-2 overflow-hidden rounded-full">
                        <div
                            className="bg-primary h-full transition-all"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
