"use client";

import { useState, useEffect } from "react";
import { useDebouncedState } from "@repo/hooks/utility/use-debounced-state";
import { X, Ban, Zap } from "lucide-react";

/* CANCEL AND FLUSH - Control Functions */
export const Example2 = () => {
    const [inputValue, setInputValue] = useState("");
    const { debouncedValue, isPending, cancel, flush } = useDebouncedState(
        inputValue,
        { delay: 2000 },
    );
    const [history, setHistory] = useState<string[]>([]);

    // Track when debounced value changes
    useEffect(() => {
        if (debouncedValue) {
            setHistory((prev) => [...prev.slice(-4), debouncedValue]);
        }
    }, [debouncedValue]);

    return (
        <div className="flex flex-col gap-4">
            <div className="flex gap-2">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type something (2s delay)..."
                    className="border-input bg-background max-w-lg flex-1 rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={cancel}
                    disabled={!isPending}
                    className="inline-flex items-center gap-1.5 rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-50"
                    title="Cancel pending update"
                >
                    <Ban className="h-4 w-4" />
                    Cancel
                </button>
                <button
                    onClick={flush}
                    disabled={!isPending}
                    className="inline-flex items-center gap-1.5 rounded-md bg-green-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700 disabled:opacity-50"
                    title="Immediately apply pending value"
                >
                    <Zap className="h-4 w-4" />
                    Flush
                </button>
            </div>

            <div className="flex items-center gap-2">
                <span className="text-muted-foreground text-sm">Status:</span>
                {isPending ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-500/20 px-2.5 py-0.5 text-xs font-medium text-yellow-600 dark:text-yellow-400">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-yellow-500" />
                        Pending...
                    </span>
                ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/20 px-2.5 py-0.5 text-xs font-medium text-green-600 dark:text-green-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                        Synced
                    </span>
                )}
            </div>

            <div className="bg-muted/30 rounded-md p-3">
                <p className="text-muted-foreground mb-2 text-xs font-medium">
                    Debounced Value History
                </p>
                <div className="flex flex-wrap gap-2">
                    {history.length === 0 ? (
                        <span className="text-muted-foreground text-sm italic">
                            No values yet
                        </span>
                    ) : (
                        history.map((val, i) => (
                            <p
                                key={i}
                                className="wrap-break-word bg-background rounded border px-2 py-1 text-xs"
                            >
                                {val}
                            </p>
                        ))
                    )}
                    {history.length > 0 && (
                        <button
                            onClick={() => setHistory([])}
                            className="text-muted-foreground hover:text-foreground"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}
                </div>
            </div>

            <p className="text-muted-foreground text-xs">
                <strong>Cancel</strong> discards pending changes.{" "}
                <strong>Flush</strong> applies them immediately.
            </p>
        </div>
    );
};
