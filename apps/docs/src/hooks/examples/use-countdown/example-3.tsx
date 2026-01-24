"use client";

import { useCountdown } from "@repo/hooks/utility/use-countdown";
import { useEffect } from "react";

export const Example3 = () => {
    // Event Countdown: Simulate counting down 1 hour (3600s)
    // We increment to simulate a "stopwatch" or elapsed time style
    const { count, start, isRunning } = useCountdown(0, {
        isIncrement: true,
        countStop: Infinity,
    });

    useEffect(() => {
        start();
    }, [start]);

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, "0")}:${m
            .toString()
            .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    };

    return (
        <div className="flex flex-col items-center justify-center gap-2 rounded-lg border bg-zinc-950 p-8 text-white">
            <div className="text-xs font-medium uppercase tracking-widest text-zinc-400">
                Session Duration
            </div>
            <div className="font-mono text-5xl font-bold tabular-nums">
                {formatTime(count)}
            </div>
            <div className="flex items-center gap-2 text-sm text-zinc-500">
                <span
                    className={`h-2 w-2 rounded-full ${isRunning ? "animate-pulse bg-green-500" : "bg-red-500"}`}
                />
                {isRunning ? "Recording Live" : "Stopped"}
            </div>
        </div>
    );
};
