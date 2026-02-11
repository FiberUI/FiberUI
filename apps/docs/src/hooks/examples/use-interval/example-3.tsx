"use client";

import { useInterval } from "@repo/hooks/utility/use-interval";
import { Button } from "@repo/ui/components/button";
import { useState } from "react";
import { RotateCcw } from "lucide-react";

export const Example3 = () => {
    const [progress, setProgress] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    // Increment progress by a random amount every 150ms
    useInterval(
        () => {
            setProgress((prev) => {
                const next = prev + Math.random() * 4 + 1;
                if (next >= 100) {
                    setIsRunning(false);
                    return 100;
                }
                return next;
            });
        },
        isRunning ? 150 : null,
    );

    const handleStart = () => {
        setProgress(0);
        setIsRunning(true);
    };

    const isComplete = progress >= 100;

    return (
        <div className="mx-auto w-full max-w-sm space-y-4 p-6">
            <div className="flex items-center justify-between text-sm">
                <span className="font-medium">
                    {isComplete
                        ? "Upload Complete!"
                        : isRunning
                          ? "Uploading..."
                          : "Ready to upload"}
                </span>
                <span className="font-mono text-xs tabular-nums">
                    {Math.round(progress)}%
                </span>
            </div>

            {/* Progress bar */}
            <div className="bg-muted h-3 w-full overflow-hidden rounded-full">
                <div
                    className={`h-full rounded-full transition-all duration-150 ${
                        isComplete
                            ? "bg-green-500"
                            : "bg-linear-to-r from-blue-500 to-violet-500"
                    }`}
                    style={{ width: `${Math.min(progress, 100)}%` }}
                />
            </div>

            <div className="flex gap-2">
                <Button
                    className="flex-1"
                    onPress={handleStart}
                    isDisabled={isRunning}
                >
                    {isComplete ? (
                        <>
                            <RotateCcw className="mr-2 h-4 w-4" />
                            Upload Again
                        </>
                    ) : (
                        "Start Upload"
                    )}
                </Button>
            </div>

            <p className="text-muted-foreground text-center text-xs">
                Progress ticks every 150ms. Interval stops automatically at
                100%.
            </p>
        </div>
    );
};
