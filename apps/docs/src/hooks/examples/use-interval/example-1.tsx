"use client";

import { useInterval } from "@repo/hooks/utility/use-interval";
import { Button } from "@repo/ui/components/button";
import { useState } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

export const Example1 = () => {
    const [count, setCount] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    // Increment every second when running, pass null to pause
    useInterval(
        () => {
            setCount((c) => c + 1);
        },
        isRunning ? 1000 : null,
    );

    return (
        <div className="flex flex-col items-center gap-4 rounded-lg border p-6">
            <div className="font-mono text-6xl font-bold tabular-nums">
                {count.toString().padStart(3, "0")}
            </div>

            <div className="flex gap-2">
                <Button
                    variant="outline"
                    size="icon"
                    onPress={() => setIsRunning((r) => !r)}
                    aria-label={isRunning ? "Pause" : "Start"}
                >
                    {isRunning ? (
                        <Pause className="h-4 w-4 fill-current" />
                    ) : (
                        <Play className="h-4 w-4" />
                    )}
                </Button>

                <Button
                    variant="outline"
                    size="icon"
                    onPress={() => {
                        setIsRunning(false);
                        setCount(0);
                    }}
                    aria-label="Reset"
                >
                    <RotateCcw className="h-4 w-4" />
                </Button>
            </div>

            <p className="text-muted-foreground text-xs">
                {isRunning ? "Counting… (1 tick/second)" : "Paused"}
            </p>
        </div>
    );
};
