"use client";

import { useState, useEffect } from "react";
import { useEventListener } from "@repo/hooks/dom/use-event-listener";
import { Wifi, WifiOff } from "lucide-react";

/**
 * Example 7: Online/Offline Detection
 * Demonstrates Overload 1 - Window events for network status
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/online_event
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine
 */
export const Example7 = () => {
    const [isOnline, setIsOnline] = useState(true);
    const [lastChange, setLastChange] = useState<Date | null>(null);

    // Initialize on mount (SSR-safe)
    useEffect(() => {
        setIsOnline(navigator.onLine);
    }, []);

    // Overload 1: Window events - 'online' and 'offline' are WindowEventMap events
    useEventListener("online", () => {
        setIsOnline(true);
        setLastChange(new Date());
    });

    useEventListener("offline", () => {
        setIsOnline(false);
        setLastChange(new Date());
    });

    return (
        <div className="flex w-full max-w-md flex-col gap-4">
            <div className="flex items-center gap-2">
                {isOnline ? (
                    <Wifi className="text-primary h-5 w-5" />
                ) : (
                    <WifiOff className="text-destructive h-5 w-5" />
                )}
                <h3 className="font-semibold">Network Status</h3>
                <span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs">
                    Overload 1
                </span>
            </div>

            <p className="text-muted-foreground text-sm">
                Listening to{" "}
                <code className="bg-muted rounded px-1">online</code> and{" "}
                <code className="bg-muted rounded px-1">offline</code> on{" "}
                <strong>window</strong>. Toggle your network to test.
            </p>

            <div className="bg-muted/50 flex items-center justify-between rounded-lg p-4">
                <span className="text-sm">Connection</span>
                <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${
                        isOnline
                            ? "bg-green-500/20 text-green-500"
                            : "bg-red-500/20 text-red-500"
                    }`}
                >
                    {isOnline ? "Online" : "Offline"}
                </span>
            </div>

            {lastChange && (
                <p className="text-muted-foreground text-center text-xs">
                    Last changed: {lastChange.toLocaleTimeString()}
                </p>
            )}

            <pre className="bg-muted rounded-lg p-3 text-xs">
                <code>{`useEventListener("online", () => setIsOnline(true));
useEventListener("offline", () => setIsOnline(false));`}</code>
            </pre>
        </div>
    );
};
