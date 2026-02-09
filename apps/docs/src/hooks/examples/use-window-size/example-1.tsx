"use client";

import { useWindowSize } from "@repo/hooks/dom/use-window-size";
import { Maximize2 } from "lucide-react";

export const Example1 = () => {
    const { width, height } = useWindowSize();
    const isMobile = width < 768;

    return (
        <div className="flex w-full max-w-md flex-col gap-4">
            <div className="flex items-center gap-2">
                <Maximize2 className="text-primary h-5 w-5" />
                <h3 className="font-semibold">Window Dimensions</h3>
            </div>

            <p className="text-muted-foreground text-sm">
                Resize your browser window to see updates.
            </p>

            <div className="bg-muted/50 grid grid-cols-2 gap-px overflow-hidden rounded-lg border">
                <div className="bg-background flex flex-col items-center justify-center p-6">
                    <span className="text-muted-foreground mb-1 text-xs uppercase tracking-wider">
                        Width
                    </span>
                    <span className="text-primary font-mono text-3xl font-bold">
                        {width}
                    </span>
                    <span className="text-muted-foreground text-xs">px</span>
                </div>
                <div className="bg-background flex flex-col items-center justify-center p-6">
                    <span className="text-muted-foreground mb-1 text-xs uppercase tracking-wider">
                        Height
                    </span>
                    <span className="text-primary font-mono text-3xl font-bold">
                        {height}
                    </span>
                    <span className="text-muted-foreground text-xs">px</span>
                </div>
            </div>

            <div
                className={`rounded-md px-3 py-2 text-center text-sm font-medium transition-colors ${
                    isMobile
                        ? "bg-blue-500/10 text-blue-600"
                        : "bg-green-500/10 text-green-600"
                }`}
            >
                Current Viewport: {isMobile ? "Mobile" : "Desktop"} (
                {width < 768 ? "<" : "≥"} 768px)
            </div>
        </div>
    );
};
