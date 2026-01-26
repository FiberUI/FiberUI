"use client";

import { useNetwork } from "@repo/hooks/device/use-network";
import { Wifi, WifiOff } from "lucide-react";

export const Example1 = () => {
    const { online } = useNetwork();

    return (
        <div
            className={`flex items-center gap-3 rounded-lg border p-4 ${
                online
                    ? "border-green-500/50 bg-green-500/10 text-green-700 dark:text-green-400"
                    : "text-destructive border-red-500/50 bg-red-500/10"
            }`}
        >
            <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    online ? "bg-green-500/20" : "bg-red-500/20"
                }`}
            >
                {online ? (
                    <Wifi className="h-5 w-5" />
                ) : (
                    <WifiOff className="h-5 w-5" />
                )}
            </div>
            <div>
                <p className="text-sm font-medium">
                    {online ? "You are online" : "You are offline"}
                </p>
                <p className="text-xs opacity-80">
                    {online
                        ? "Connection is active"
                        : "Check your internet connection"}
                </p>
            </div>
        </div>
    );
};
