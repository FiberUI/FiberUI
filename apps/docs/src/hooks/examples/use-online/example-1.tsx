"use client";

import { useOnline } from "@repo/hooks/dom/use-online";
import { Wifi, WifiOff } from "lucide-react";

export const Example1 = () => {
    const isOnline = useOnline();

    return (
        <div className="flex w-full max-w-md flex-col gap-4">
            <div className="flex items-center gap-2">
                {isOnline ? (
                    <Wifi className="text-primary h-5 w-5" />
                ) : (
                    <WifiOff className="text-destructive h-5 w-5" />
                )}
                <h3 className="font-semibold">Network Status</h3>
            </div>

            <p className="text-muted-foreground text-sm">
                Toggle your network connection (or go offline in DevTools) to
                see the state change.
            </p>

            <div
                className={`flex items-center justify-between rounded-lg border p-4 transition-colors ${
                    isOnline
                        ? "border-green-500/20 bg-green-500/10"
                        : "border-red-500/20 bg-red-500/10"
                }`}
            >
                <div className="flex items-center gap-3">
                    <div
                        className={`h-3 w-3 rounded-full ${
                            isOnline ? "bg-green-500" : "bg-red-500"
                        }`}
                    />
                    <span className="font-medium">
                        {isOnline ? "You are Online" : "You are Offline"}
                    </span>
                </div>
            </div>

            {!isOnline && (
                <div className="text-muted-foreground text-xs">
                    Last check: {new Date().toLocaleTimeString()}
                </div>
            )}
        </div>
    );
};
