"use client";

import { useRef, useState } from "react";
import { useEventListener } from "@repo/hooks/dom/use-event-listener";
import { MousePointerClick } from "lucide-react";

/**
 * Example 2: Element Click Event
 * Demonstrates Overload 3 - Element events (ref passed)
 */
export const Example2 = () => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [clicks, setClicks] = useState(0);

    // Overload 3: Element events - pass a ref
    useEventListener("click", () => setClicks((c) => c + 1), buttonRef);

    return (
        <div className="flex w-full max-w-md flex-col gap-4">
            <div className="flex items-center gap-2">
                <MousePointerClick className="text-primary h-5 w-5" />
                <h3 className="font-semibold">Element Click</h3>
                <span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs">
                    Overload 3
                </span>
            </div>

            <p className="text-muted-foreground text-sm">
                Listening to{" "}
                <code className="bg-muted rounded px-1">click</code> on a{" "}
                <strong>button element</strong> via ref.
            </p>

            <button
                ref={buttonRef}
                className="bg-primary text-primary-foreground hover:bg-primary/90 h-20 rounded-lg text-lg font-medium transition-colors"
            >
                Clicked {clicks} times
            </button>
        </div>
    );
};
