"use client";

import { useState } from "react";
import { useEventListener } from "@repo/hooks/dom/use-event-listener";
import { FolderSync } from "lucide-react";

/**
 * Example 10: Storage Event (Cross-Tab Sync)
 * Demonstrates Overload 1 - Window events for localStorage changes
 *
 * The 'storage' event fires when localStorage is modified in ANOTHER tab.
 * This enables cross-tab communication without WebSockets.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/storage_event
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API
 */
export const Example10 = () => {
    const [events, setEvents] = useState<
        Array<{ key: string | null; value: string | null; time: string }>
    >([]);

    // Overload 1: Window events - 'storage' is a WindowEventMap event
    // Note: This event only fires when localStorage is changed in a DIFFERENT tab
    useEventListener("storage", (e) => {
        setEvents((prev) => [
            {
                key: e.key,
                value: e.newValue,
                time: new Date().toLocaleTimeString(),
            },
            ...prev.slice(0, 4),
        ]);
    });

    const simulateChange = () => {
        // This won't trigger our listener - it only fires from other tabs
        // But we can show the code pattern
        const key = "demo-key";
        const value = `value-${Date.now()}`;
        localStorage.setItem(key, value);
    };

    return (
        <div className="flex w-full max-w-md flex-col gap-4">
            <div className="flex items-center gap-2">
                <FolderSync className="text-primary h-5 w-5" />
                <h3 className="font-semibold">Storage Event</h3>
                <span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs">
                    Overload 1
                </span>
            </div>

            <p className="text-muted-foreground text-sm">
                Listening to{" "}
                <code className="bg-muted rounded px-1">storage</code> on{" "}
                <strong>window</strong>. This event fires when localStorage
                changes in <em>another tab</em>.
            </p>

            <div className="bg-muted/50 space-y-2 rounded-lg p-4">
                <p className="text-muted-foreground text-xs">
                    Open this page in another tab, then run in DevTools:
                </p>
                <pre className="bg-muted overflow-x-auto rounded p-2 text-xs">
                    <code>{`localStorage.setItem("test", "hello")`}</code>
                </pre>
            </div>

            <button
                onClick={simulateChange}
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-4 py-2 text-sm transition-colors"
            >
                Set localStorage (same tab - won&apos;t trigger)
            </button>

            {events.length > 0 ? (
                <div className="space-y-2">
                    <p className="text-sm font-medium">Events received:</p>
                    {events.map((event, i) => (
                        <div
                            key={i}
                            className="bg-muted flex items-center justify-between rounded p-2 text-xs"
                        >
                            <code>
                                {event.key}: {event.value}
                            </code>
                            <span className="text-muted-foreground">
                                {event.time}
                            </span>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-muted-foreground text-center text-sm">
                    No storage events yet
                </p>
            )}
        </div>
    );
};
