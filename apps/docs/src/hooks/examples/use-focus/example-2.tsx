"use client";

import { useRef } from "react";
import { useFocus } from "@repo/hooks/dom/use-focus";
import { Search } from "lucide-react";

export const Example2 = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    // We can track focus on the input specifically
    const isInputFocused = useFocus(inputRef);

    // In a real app, you might want to track the container too
    // const isContainerFocused = useFocus(containerRef);

    return (
        <div className="flex w-full max-w-md flex-col gap-4">
            <h3 className="font-semibold">Search Bar Focus Effect</h3>

            <div
                ref={containerRef}
                className={`flex items-center gap-2 rounded-full border px-4 py-2 transition-all duration-300 ${
                    isInputFocused
                        ? "border-primary ring-primary/10 scale-105 shadow-lg ring-4"
                        : "border-muted bg-muted/30"
                }`}
            >
                <Search
                    className={`h-5 w-5 ${isInputFocused ? "text-primary" : "text-muted-foreground"}`}
                />
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search documentation..."
                    className="placeholder:text-muted-foreground flex-1 bg-transparent text-sm outline-none"
                />
                <div className="text-muted-foreground bg-background/50 rounded border px-1.5 py-0.5 text-xs">
                    ⌘K
                </div>
            </div>

            <p className="text-muted-foreground text-center text-xs">
                The entire parent container styles change when the input inside
                receives focus.
            </p>
        </div>
    );
};
