"use client";

import { useState } from "react";
import { useThrottledCallback } from "@repo/hooks/utility/use-throttled-callback";
import { MousePointer2, Ban } from "lucide-react";

/* BUTTON SPAM PROTECTION - Prevent Rapid Clicks */
export const Example2 = () => {
    const [clickCount, setClickCount] = useState(0);
    const [actualClicks, setActualClicks] = useState(0);

    const {
        throttledFn: handleClick,
        isThrottling,
        cancel,
    } = useThrottledCallback(
        () => {
            setActualClicks((c) => c + 1);
        },
        { interval: 1000, trailing: false },
    );

    const onClick = () => {
        setClickCount((c) => c + 1);
        handleClick();
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
                <button
                    onClick={onClick}
                    className={`inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-medium text-white transition-colors ${
                        isThrottling
                            ? "cursor-not-allowed bg-gray-500"
                            : "bg-purple-600 hover:bg-purple-700"
                    }`}
                >
                    <MousePointer2 className="h-4 w-4" />
                    {isThrottling ? "Throttled..." : "Click Me!"}
                </button>
                <button
                    onClick={() => {
                        cancel();
                        setClickCount(0);
                        setActualClicks(0);
                    }}
                    className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm"
                >
                    <Ban className="h-4 w-4" />
                    Reset
                </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-muted/50 rounded-md p-4">
                    <p className="text-muted-foreground mb-1 text-xs font-medium">
                        Button Clicks
                    </p>
                    <p className="text-3xl font-bold">{clickCount}</p>
                </div>
                <div className="rounded-md border border-purple-500/50 bg-purple-500/10 p-4">
                    <p className="mb-1 text-xs font-medium text-purple-600 dark:text-purple-400">
                        Actual Executions
                    </p>
                    <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                        {actualClicks}
                    </p>
                </div>
            </div>

            <p className="text-muted-foreground text-xs">
                With{" "}
                <code className="bg-muted rounded px-1">trailing: false</code>,
                rapid clicks only execute once per second. Great for preventing
                accidental double-submits!
            </p>
        </div>
    );
};
