"use client";

import { useState } from "react";
import { useThrottledState } from "@repo/hooks/utility/use-throttled-state";

/* SLIDER INPUT - Throttled Value Updates */
export const Example2 = () => {
    const INTERVAL = 500;
    const [sliderValue, setSliderValue] = useState(50);
    const { throttledValue, isThrottling } = useThrottledState(sliderValue, {
        interval: INTERVAL,
        trailing: true,
    });

    return (
        <div className="flex flex-col gap-4">
            <div>
                <label className="text-muted-foreground mb-2 block text-sm font-medium">
                    Drag the slider rapidly
                </label>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderValue}
                    onChange={(e) => setSliderValue(Number(e.target.value))}
                    className="w-full"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/50 rounded-md p-4 text-center">
                    <p className="text-muted-foreground mb-1 text-xs font-medium">
                        Immediate
                    </p>
                    <p className="text-3xl font-bold">{sliderValue}</p>
                </div>
                <div className="relative rounded-md border border-purple-500/50 bg-purple-500/10 p-4 text-center">
                    <p className="mb-1 text-xs font-medium text-purple-600 dark:text-purple-400">
                        Throttled ({INTERVAL}ms)
                    </p>
                    <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                        {throttledValue}
                    </p>
                    {isThrottling && (
                        <span className="absolute right-2 top-2 h-2 w-2 animate-pulse rounded-full bg-purple-500" />
                    )}
                </div>
            </div>

            <p className="text-muted-foreground text-xs">
                The throttled value updates at most every {INTERVAL}ms. With{" "}
                <code className="bg-muted rounded px-1">trailing: true</code>,
                it also captures the final value when you stop.
            </p>
        </div>
    );
};
