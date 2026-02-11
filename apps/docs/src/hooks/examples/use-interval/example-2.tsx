"use client";

import { useInterval } from "@repo/hooks/utility/use-interval";
import { Button } from "@repo/ui/components/button";
import { useState } from "react";
import { Wifi, WifiOff, Trash2 } from "lucide-react";

export const Example2 = () => {
    const [isPolling, setIsPolling] = useState(false);
    const [logs, setLogs] = useState<string[]>([]);

    // Poll every 2 seconds when active, null to pause
    useInterval(
        () => {
            const now = new Date().toLocaleTimeString();
            setLogs((prev) =>
                [`[${now}] Polled — 200 OK`, ...prev].slice(0, 8),
            );
        },
        isPolling ? 2000 : null,
    );

    return (
        <div className="mx-auto w-full max-w-sm space-y-4 p-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {isPolling ? (
                        <Wifi className="h-4 w-4 text-green-500" />
                    ) : (
                        <WifiOff className="h-4 w-4 text-zinc-500" />
                    )}
                    <span className="text-sm font-medium">
                        API Polling {isPolling ? "(Active)" : "(Paused)"}
                    </span>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant={isPolling ? "destructive" : "default"}
                        size="sm"
                        onPress={() => setIsPolling((p) => !p)}
                    >
                        {isPolling ? "Stop" : "Start"} Polling
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onPress={() => setLogs([])}
                        aria-label="Clear logs"
                    >
                        <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                </div>
            </div>

            <div className="h-48 overflow-y-auto rounded-lg border bg-zinc-950 p-3 font-mono text-xs text-green-400">
                {logs.length === 0 ? (
                    <span className="text-zinc-600">
                        No logs yet. Start polling to begin.
                    </span>
                ) : (
                    logs.map((log, i) => (
                        <div
                            key={i}
                            className="border-b border-zinc-800 py-1 last:border-0"
                        >
                            {log}
                        </div>
                    ))
                )}
            </div>

            <p className="text-muted-foreground text-center text-xs">
                Polls every 2 seconds. Pass <code>null</code> as the delay to
                pause.
            </p>
        </div>
    );
};
