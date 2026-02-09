"use client";

import { useState, useCallback } from "react";
import { useEventListener } from "@repo/hooks/dom/use-event-listener";
import { Keyboard } from "lucide-react";

/**
 * Example 4: Keyboard Events
 * Demonstrates Overload 1 - Window events for global keyboard input
 */
export const Example4 = () => {
    const [lastKey, setLastKey] = useState<string | null>(null);
    const [history, setHistory] = useState<string[]>([]);

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        const parts: string[] = [];
        if (event.metaKey || event.ctrlKey) parts.push("⌘");
        if (event.shiftKey) parts.push("⇧");
        if (event.altKey) parts.push("⌥");

        const key =
            event.key.length === 1 ? event.key.toUpperCase() : event.key;
        if (!["Control", "Shift", "Alt", "Meta"].includes(event.key)) {
            parts.push(key);
        }

        const combo = parts.join("+");
        if (combo) {
            setLastKey(combo);
            setHistory((prev) => [combo, ...prev.slice(0, 4)]);
        }
    }, []);

    // Overload 1: Window events - no element needed for global keyboard
    useEventListener("keydown", handleKeyDown);

    return (
        <div className="flex w-full max-w-md flex-col gap-4">
            <div className="flex items-center gap-2">
                <Keyboard className="text-primary h-5 w-5" />
                <h3 className="font-semibold">Keyboard Events</h3>
                <span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs">
                    Overload 1
                </span>
            </div>

            <p className="text-muted-foreground text-sm">
                Listening to{" "}
                <code className="bg-muted rounded px-1">keydown</code> on{" "}
                <strong>window</strong>. Press any key or combination.
            </p>

            <div className="bg-muted/50 flex h-24 items-center justify-center rounded-lg">
                {lastKey ? (
                    <kbd className="bg-background rounded-lg border px-4 py-2 text-2xl font-bold shadow-sm">
                        {lastKey}
                    </kbd>
                ) : (
                    <span className="text-muted-foreground">
                        Press any key...
                    </span>
                )}
            </div>

            {history.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {history.map((key, i) => (
                        <kbd
                            key={i}
                            className="bg-muted rounded px-2 py-1 text-xs"
                        >
                            {key}
                        </kbd>
                    ))}
                </div>
            )}

            <pre className="bg-muted rounded-lg p-3 text-xs">
                <code>{`useEventListener("keydown", handler);`}</code>
            </pre>
        </div>
    );
};
