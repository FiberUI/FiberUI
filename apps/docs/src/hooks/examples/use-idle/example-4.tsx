"use client";

import { useIdle } from "@repo/hooks/performance/use-idle";
import { useState, useEffect } from "react";
import { Button } from "@repo/ui/components/button";
import { Card } from "@repo/ui/components/card";
import { Play, Pause, Square } from "lucide-react";

export function Example4() {
    const { idle, isGranted, requestPermission } = useIdle();
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [wasPausedByIdle, setWasPausedByIdle] = useState(false);

    // Timer logic
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isRunning) {
            interval = setInterval(() => {
                setSeconds((s) => s + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    // Idle Pause Logic
    useEffect(() => {
        if (!isGranted) return;

        if (idle && isRunning) {
            // User went idle while timer was running -> Auto pause
            setIsRunning(false);
            setWasPausedByIdle(true);
        } else if (!idle && !isRunning && wasPausedByIdle) {
            // User came back and it was paused by the idle detector -> Auto resume
            setIsRunning(true);
            setWasPausedByIdle(false);
        }
    }, [idle, isGranted, isRunning, wasPausedByIdle]);

    const formatTime = (secs: number) => {
        const m = Math.floor(secs / 60)
            .toString()
            .padStart(2, "0");
        const s = (secs % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    };

    return (
        <Card className="mx-auto flex max-w-sm flex-col items-center justify-center gap-6 p-6">
            <div className="relative w-full text-center">
                <h3 className="text-lg font-medium">Smart Time Tracker</h3>
                <p className="text-muted-foreground mt-1 text-sm">
                    Automatically pauses billing/tracking when you walk away.
                </p>

                {!isGranted && (
                    <Button
                        variant="link"
                        onClick={requestPermission}
                        className="mt-2 h-auto p-0 text-xs"
                    >
                        Enable Auto-Pause
                    </Button>
                )}
            </div>

            <div className="relative">
                <div
                    className={`text-6xl font-black tabular-nums tracking-tighter transition-colors ${
                        idle
                            ? "opacity-50"
                            : isRunning
                              ? "text-primary"
                              : "text-muted-foreground"
                    }`}
                >
                    {formatTime(seconds)}
                </div>

                {idle && wasPausedByIdle && (
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 animate-pulse whitespace-nowrap rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-bold text-amber-500">
                        Auto-Paused (Away)
                    </div>
                )}
            </div>

            <div className="mt-4 flex w-full gap-2">
                <Button
                    className="flex-1 gap-2"
                    variant={isRunning ? "outline" : "default"}
                    onClick={() => {
                        setIsRunning(!isRunning);
                        setWasPausedByIdle(false); // Reset auto-pause tracking on manual action
                    }}
                >
                    {isRunning ? (
                        <>
                            <Pause className="h-4 w-4" /> Pause
                        </>
                    ) : (
                        <>
                            <Play className="h-4 w-4" /> Start
                        </>
                    )}
                </Button>

                <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => {
                        setIsRunning(false);
                        setSeconds(0);
                        setWasPausedByIdle(false);
                    }}
                >
                    <Square className="h-4 w-4" />
                </Button>
            </div>
        </Card>
    );
}
