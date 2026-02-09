"use client";

import { useRef } from "react";
import { useFocus } from "@repo/hooks/dom/use-focus";
import { Focus } from "lucide-react";

export const Example1 = () => {
    const ref = useRef<HTMLInputElement>(null);
    const isFocused = useFocus(ref);

    return (
        <div className="flex w-full max-w-md flex-col gap-4">
            <div className="flex items-center gap-2">
                <Focus className="text-primary h-5 w-5" />
                <h3 className="font-semibold">Focus Detection</h3>
            </div>

            <p className="text-muted-foreground text-sm">
                Focus the input below to see the state change.
            </p>

            <div className="relative">
                <input
                    ref={ref}
                    type="text"
                    placeholder="Click to focus..."
                    className={`border-input ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                        isFocused ? "border-primary" : ""
                    }`}
                />

                <div
                    className={`mt-2 text-sm transition-colors ${
                        isFocused
                            ? "text-primary font-medium"
                            : "text-muted-foreground"
                    }`}
                >
                    Status: {isFocused ? "Focused" : "Not Focused"}
                </div>
            </div>
        </div>
    );
};
