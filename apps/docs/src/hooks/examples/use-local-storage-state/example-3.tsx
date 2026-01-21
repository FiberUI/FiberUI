"use client";

import { useLocalStorageState } from "@repo/hooks/storage/use-local-storage-state";

/* FUNCTIONAL UPDATES - Counter */
export const Example3 = () => {
    const [count, setCount, isLoading] = useLocalStorageState("counter", 0);

    if (isLoading) {
        return (
            <span className="text-muted-foreground text-sm">Loading...</span>
        );
    }

    return (
        <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Count: {count}</span>
            <button
                className="bg-secondary text-secondary-foreground rounded-md px-3 py-1.5 text-sm"
                onClick={() => setCount((prev) => prev - 1)}
            >
                -
            </button>
            <button
                className="bg-secondary text-secondary-foreground rounded-md px-3 py-1.5 text-sm"
                onClick={() => setCount((prev) => prev + 1)}
            >
                +
            </button>
            <button
                className="bg-muted text-muted-foreground rounded-md px-3 py-1.5 text-sm"
                onClick={() => setCount(0)}
            >
                Reset
            </button>
        </div>
    );
};
