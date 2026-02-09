"use client";

import { useRef } from "react";
import { useHover } from "@repo/hooks/dom/use-hover";
import { MousePointer2 } from "lucide-react";

export const Example1 = () => {
    const ref = useRef<HTMLDivElement>(null);
    const isHovered = useHover(ref);

    return (
        <div className="flex w-full max-w-md flex-col gap-4">
            <div className="flex items-center gap-2">
                <MousePointer2 className="text-primary h-5 w-5" />
                <h3 className="font-semibold">Hover Detection</h3>
            </div>

            <p className="text-muted-foreground text-sm">
                Hover over the box below to see the state change.
            </p>

            <div
                ref={ref}
                className={`flex h-32 items-center justify-center rounded-lg border-2 transition-all duration-200 ${
                    isHovered
                        ? "border-primary bg-primary/10 text-primary scale-105 shadow-md"
                        : "border-muted bg-muted/20 text-muted-foreground"
                }`}
            >
                <div className="text-center">
                    <p className="text-lg font-bold">
                        {isHovered ? "Hovered!" : "Hover me"}
                    </p>
                    <p className="text-xs opacity-70">
                        {isHovered ? "(true)" : "(false)"}
                    </p>
                </div>
            </div>
        </div>
    );
};
