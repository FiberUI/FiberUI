"use client";

import { useState, useEffect, useRef } from "react";
import { useDebouncedState } from "@repo/hooks/utility/use-debounced-state";

/* LEADING EDGE - Immediate First Update */
export const Example3 = () => {
    const [value, setValue] = useState("");
    const { debouncedValue: trailingValue } = useDebouncedState(value, {
        delay: 500,
        leading: false,
    });
    const { debouncedValue: leadingValue } = useDebouncedState(value, {
        delay: 500,
        leading: true,
    });

    const [trailingUpdates, setTrailingUpdates] = useState(0);
    const [leadingUpdates, setLeadingUpdates] = useState(0);
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        setTrailingUpdates((c) => c + 1);
    }, [trailingValue]);

    useEffect(() => {
        if (isFirstRender.current) return;
        setLeadingUpdates((c) => c + 1);
    }, [leadingValue]);

    return (
        <div className="flex flex-col gap-4">
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Type rapidly..."
                className="border-input bg-background w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="grid grid-cols-2 gap-4">
                <div className="rounded-md border p-3">
                    <div className="mb-2 flex items-center justify-between">
                        <span className="text-xs font-medium">
                            Trailing Edge (default)
                        </span>
                        <span className="rounded bg-blue-500/20 px-1.5 py-0.5 text-xs text-blue-600 dark:text-blue-400">
                            {trailingUpdates} updates
                        </span>
                    </div>
                    <code className="text-sm">
                        {trailingValue || (
                            <span className="text-muted-foreground italic">
                                waiting...
                            </span>
                        )}
                    </code>
                    <p className="text-muted-foreground mt-2 text-xs">
                        Updates after pause
                    </p>
                </div>

                <div className="rounded-md border border-green-500/50 bg-green-500/5 p-3">
                    <div className="mb-2 flex items-center justify-between">
                        <span className="text-xs font-medium text-green-600 dark:text-green-400">
                            Leading Edge
                        </span>
                        <span className="rounded bg-green-500/20 px-1.5 py-0.5 text-xs text-green-600 dark:text-green-400">
                            {leadingUpdates} updates
                        </span>
                    </div>
                    <code className="text-sm">
                        {leadingValue || (
                            <span className="text-muted-foreground italic">
                                waiting...
                            </span>
                        )}
                    </code>
                    <p className="text-muted-foreground mt-2 text-xs">
                        Updates immediately, then debounces
                    </p>
                </div>
            </div>

            <p className="text-muted-foreground text-xs">
                <strong>Leading edge</strong> fires immediately on first
                keystroke, then debounces. <strong>Trailing edge</strong> waits
                for the pause.
            </p>
        </div>
    );
};
