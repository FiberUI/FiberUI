"use client";

import { useIdle } from "@repo/hooks/performance/use-idle";
import { Button } from "@repo/ui/components/button";
import { Coffee, MonitorPlay } from "lucide-react";

export function Example1() {
    const { idle, isSupported, isGranted, requestPermission } = useIdle();

    return (
        <div className="mx-auto flex w-full max-w-sm flex-col items-center justify-center gap-6">
            <div className="text-center">
                <h3 className="text-lg font-medium">System Idle Detection</h3>
                <p className="text-muted-foreground text-sm">
                    Detects if the user is away from their keyboard entirely (1
                    min).
                </p>
            </div>

            <div
                className={`flex items-center justify-center rounded-full border-4 p-8 transition-all duration-700 ${
                    idle
                        ? "border-amber-500 bg-amber-500/10 shadow-[0_0_30px_rgba(245,158,11,0.3)] dark:bg-amber-500/20"
                        : "border-primary/50 bg-primary/10"
                }`}
            >
                {idle ? (
                    <Coffee className="h-16 w-16 animate-pulse text-amber-500" />
                ) : (
                    <MonitorPlay className="text-primary h-16 w-16" />
                )}
            </div>

            <div className="text-xl font-bold tracking-tight">
                Status:{" "}
                {idle ? (
                    <span className="text-amber-500">Away (Idle)</span>
                ) : (
                    <span className="text-primary">Active</span>
                )}
            </div>

            {!isSupported && (
                <div className="rounded-md bg-red-100 p-3 text-center text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400">
                    Idle Detection is not supported in this browser. Try
                    Chrome/Edge.
                </div>
            )}

            {isSupported && !isGranted && (
                <div className="flex w-full flex-col gap-3">
                    <p className="text-muted-foreground text-center text-sm">
                        This feature requires explicit permission.
                    </p>
                    <Button onClick={requestPermission} className="w-full">
                        Enable Idle Detection
                    </Button>
                </div>
            )}
        </div>
    );
}
