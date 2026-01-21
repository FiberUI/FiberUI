"use client";

import { useBattery } from "@repo/hooks/device/use-battery";

/* DETAILED INFO - All Battery Properties */
export const Example2 = () => {
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

    const rows = [
        { label: "Level", value: `${battery.levelPercent}%` },
        { label: "Status", value: battery.status },
        { label: "Charging", value: battery.isCharging ? "Yes" : "No" },
        {
            label: "Time to Full",
            value: battery.chargingTimeFormatted ?? "N/A",
        },
        {
            label: "Time Remaining",
            value: battery.dischargingTimeFormatted ?? "N/A",
        },
        { label: "Low Battery", value: battery.isLow ? "Yes (Warning)" : "No" },
        {
            label: "Critical",
            value: battery.isCritical ? "Yes (Critical)" : "No",
        },
    ];

    return (
        <div className="w-full max-w-sm overflow-hidden rounded-lg border">
            <div className="bg-muted/50 border-b px-4 py-2">
                <span className="text-sm font-medium">Battery Details</span>
            </div>
            <div className="divide-y">
                {rows.map((row) => (
                    <div
                        key={row.label}
                        className="flex justify-between px-4 py-2"
                    >
                        <span className="text-muted-foreground text-sm">
                            {row.label}
                        </span>
                        <span className="text-sm font-medium">{row.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
