"use client";

import { useState } from "react";
import { useDebouncedCallback } from "@repo/hooks/utility/use-debounced-callback";
import { Ban, Zap, Send } from "lucide-react";

/* CANCEL AND FLUSH - Control Functions */
export const Example2 = () => {
    const [inputValue, setInputValue] = useState("");
    const [logs, setLogs] = useState<string[]>([]);

    const { debouncedFn, isPending, cancel, flush } = useDebouncedCallback(
        (value: string) => {
            const timestamp = new Date().toLocaleTimeString();
            setLogs((prev) => [
                ...prev.slice(-4),
                `[${timestamp}] Sent: "${value}"`,
            ]);
        },
        { delay: 2000 },
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
        debouncedFn(value);
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex gap-2">
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                    placeholder="Type a message (2s delay)..."
                    className="border-input bg-background flex-1 rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={cancel}
                    disabled={!isPending}
                    className="inline-flex items-center gap-1.5 rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-50"
                    title="Cancel pending send"
                >
                    <Ban className="h-4 w-4" />
                </button>
                <button
                    onClick={flush}
                    disabled={!isPending}
                    className="inline-flex items-center gap-1.5 rounded-md bg-green-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700 disabled:opacity-50"
                    title="Send immediately"
                >
                    <Zap className="h-4 w-4" />
                </button>
            </div>

            <div className="flex items-center gap-2">
                <span className="text-muted-foreground text-sm">Status:</span>
                {isPending ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-500/20 px-2.5 py-0.5 text-xs font-medium text-yellow-600 dark:text-yellow-400">
                        <Send className="h-3 w-3" />
                        Sending in 2s...
                    </span>
                ) : (
                    <span className="bg-muted text-muted-foreground inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium">
                        Idle
                    </span>
                )}
            </div>

            <div className="bg-muted/30 rounded-md p-3">
                <p className="text-muted-foreground mb-2 text-xs font-medium">
                    Message Log
                </p>
                <div className="space-y-1 font-mono text-xs">
                    {logs.length === 0 ? (
                        <span className="text-muted-foreground italic">
                            No messages sent yet
                        </span>
                    ) : (
                        logs.map((log, i) => (
                            <div key={i} className="text-foreground">
                                {log}
                            </div>
                        ))
                    )}
                </div>
            </div>

            <p className="text-muted-foreground text-xs">
                <strong>Cancel</strong> prevents the pending callback.{" "}
                <strong>Flush</strong> executes it immediately.
            </p>
        </div>
    );
};
