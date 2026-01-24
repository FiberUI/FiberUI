"use client";

import { useCountdown } from "@repo/hooks/utility/use-countdown";
import { Button } from "@repo/ui/components/button";
import { Play, Square, RotateCcw } from "lucide-react";

export const Example1 = () => {
    // 10 second countdown
    const { count, start, stop, reset, isRunning } = useCountdown(10, {
        intervalMs: 1000,
    });

    return (
        <div className="flex flex-col items-center gap-4 rounded-lg border p-6">
            <div className="font-mono text-6xl font-bold tabular-nums">
                {count.toString().padStart(2, "0")}s
            </div>

            <div className="flex gap-2">
                <Button
                    variant="outline"
                    size="icon"
                    onPress={() => start()}
                    isDisabled={isRunning || count === 0}
                    aria-label="Start"
                >
                    <Play className="h-4 w-4" />
                </Button>

                <Button
                    variant="outline"
                    size="icon"
                    onPress={stop}
                    isDisabled={!isRunning}
                    aria-label="Stop"
                >
                    <Square className="h-4 w-4 fill-current" />
                </Button>

                <Button
                    variant="outline"
                    size="icon"
                    onPress={reset}
                    aria-label="Reset"
                >
                    <RotateCcw className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
};
