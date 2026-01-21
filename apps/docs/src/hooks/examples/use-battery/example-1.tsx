"use client";

import { useBattery } from "@repo/hooks/device/use-battery";
import { Zap } from "lucide-react";

/* BASIC USAGE - Battery Status */
export const Example1 = () => {
    const battery = useBattery();

    if (battery.isLoading) {
        return (
            <span className="text-muted-foreground text-sm">Loading...</span>
        );
    }

    if (!battery.isSupported) {
        return (
            <div className="rounded-md border border-yellow-500/50 bg-yellow-500/10 p-4">
                <p className="text-sm text-yellow-600 dark:text-yellow-400">
                    Battery API is not supported in this browser
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
                <div
                    className={`w-25 flex h-10 items-center justify-end rounded-xl border-2 p-0.5 pr-0.5 ${
                        battery.isCharging
                            ? "border-green-500"
                            : battery.isCritical
                              ? "border-red-500"
                              : battery.isLow
                                ? "border-yellow-500"
                                : "border-muted-foreground"
                    }`}
                >
                    <div
                        className={`h-full rounded-lg transition-all ${
                            battery.isCharging
                                ? "bg-green-500"
                                : battery.isCritical
                                  ? "bg-red-500"
                                  : battery.isLow
                                    ? "bg-yellow-500"
                                    : "bg-primary"
                        }`}
                        style={{ width: `${battery.levelPercent}%` }}
                    />
                </div>
                <span className="text-2xl font-bold">
                    {battery.levelPercent}%
                </span>
                {battery.isCharging && (
                    <span className="text-sm text-green-500">
                        <Zap className="h-5 w-5" />
                    </span>
                )}
            </div>
            <p className="text-muted-foreground text-sm capitalize">
                Status: {battery.status}
            </p>
        </div>
    );
};
