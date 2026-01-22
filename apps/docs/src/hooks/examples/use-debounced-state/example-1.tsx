"use client";

import { useState } from "react";
import { useDebouncedState } from "@repo/hooks/utility/use-debounced-state";
import { Search, Loader2 } from "lucide-react";

/* BASIC USAGE - Debounced Search Input */
export const Example1 = () => {
    const [inputValue, setInputValue] = useState("");
    const { debouncedValue, isPending } = useDebouncedState(inputValue, {
        delay: 500,
    });

    return (
        <div className="flex flex-col gap-4">
            <div className="relative">
                <Search className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type to search..."
                    className="border-input bg-background w-full rounded-md border py-2 pl-10 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {isPending && (
                    <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-blue-500" />
                )}
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-muted/50 rounded-md p-3">
                    <p className="text-muted-foreground mb-1 text-xs font-medium">
                        Immediate Value
                    </p>
                    <p className="wrap-break-word font-mono">
                        {inputValue || (
                            <span className="text-muted-foreground italic">
                                empty
                            </span>
                        )}
                    </p>
                </div>
                <div className="rounded-md border border-blue-500/50 bg-blue-500/10 p-3">
                    <p className="mb-1 text-xs font-medium text-blue-600 dark:text-blue-400">
                        Debounced Value (500ms)
                    </p>
                    <p className="wrap-break-word font-mono">
                        {debouncedValue || (
                            <span className="text-muted-foreground italic">
                                empty
                            </span>
                        )}
                    </p>
                </div>
            </div>

            <p className="text-muted-foreground text-xs">
                The debounced value updates 500ms after you stop typing
            </p>
        </div>
    );
};
