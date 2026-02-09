"use client";

import { useState, useEffect } from "react";
import { useEventListener } from "@repo/hooks/dom/use-event-listener";
import { Monitor } from "lucide-react";

/**
 * Example 1: Window Resize Event
 * Demonstrates Overload 1 - Window events (no element passed)
 */
export const Example1 = () => {
    const [size, setSize] = useState({ width: 0, height: 0 });

    // Overload 1: Window events - no element parameter needed
    useEventListener("resize", () => {
        setSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    });

    // Initialize dimensions on mount
    useEffect(() => {
        setSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    }, []);

    return (
        <div className="flex w-full max-w-md flex-col gap-4">
            <div className="flex items-center gap-2">
                <Monitor className="text-primary h-5 w-5" />
                <h3 className="font-semibold">Window Resize</h3>
                <span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs">
                    Overload 1
                </span>
            </div>

            <p className="text-muted-foreground text-sm">
                Listening to{" "}
                <code className="bg-muted rounded px-1">resize</code> on{" "}
                <strong>window</strong>. Resize your browser to see it update.
            </p>

            <div className="bg-muted/50 grid grid-cols-2 gap-4 rounded-lg p-4">
                <div className="text-center">
                    <p className="text-muted-foreground text-xs uppercase">
                        Width
                    </p>
                    <p className="text-primary text-2xl font-bold">
                        {size.width}
                        <span className="text-muted-foreground text-sm">
                            px
                        </span>
                    </p>
                </div>
                <div className="text-center">
                    <p className="text-muted-foreground text-xs uppercase">
                        Height
                    </p>
                    <p className="text-primary text-2xl font-bold">
                        {size.height}
                        <span className="text-muted-foreground text-sm">
                            px
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};
