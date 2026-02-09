"use client";

import { useState } from "react";
import { useEventListener } from "@repo/hooks/dom/use-event-listener";
import { Eye, EyeOff } from "lucide-react";

/**
 * Example 3: Document Visibility Event
 * Demonstrates Overload 2 - Document events ("document" string)
 */
export const Example3 = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [switches, setSwitches] = useState(0);

    // Overload 2: Document events - pass "document" string
    useEventListener(
        "visibilitychange",
        () => {
            const visible = document.visibilityState === "visible";
            setIsVisible(visible);
            setSwitches((c) => c + 1);
        },
        "document", // <-- String shorthand for document
    );

    return (
        <div className="flex w-full max-w-md flex-col gap-4">
            <div className="flex items-center gap-2">
                {isVisible ? (
                    <Eye className="text-primary h-5 w-5" />
                ) : (
                    <EyeOff className="text-muted-foreground h-5 w-5" />
                )}
                <h3 className="font-semibold">Document Visibility</h3>
                <span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs">
                    Overload 2
                </span>
            </div>

            <p className="text-muted-foreground text-sm">
                Listening to{" "}
                <code className="bg-muted rounded px-1">visibilitychange</code>{" "}
                on <strong>document</strong>. Switch tabs to trigger it.
            </p>

            <div className="bg-muted/50 flex items-center justify-between rounded-lg p-4">
                <span className="text-sm">Page Status</span>
                <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${
                        isVisible
                            ? "bg-green-500/20 text-green-500"
                            : "bg-red-500/20 text-red-500"
                    }`}
                >
                    {isVisible ? "Visible" : "Hidden"}
                </span>
            </div>

            <div className="text-muted-foreground text-center text-sm">
                Tab switches detected: <strong>{switches}</strong>
            </div>
        </div>
    );
};
