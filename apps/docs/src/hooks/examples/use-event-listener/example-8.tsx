"use client";

import { useRef, useState } from "react";
import { useEventListener } from "@repo/hooks/dom/use-event-listener";
import { Focus } from "lucide-react";

/**
 * Example 8: Focus/Blur on Input Element
 * Demonstrates Overload 3 - Element events on form inputs
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/focus_event
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/blur_event
 */
export const Example8 = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [focusCount, setFocusCount] = useState(0);

    // Overload 3: Element events - TypeScript knows these are FocusEvent
    useEventListener(
        "focus",
        () => {
            setIsFocused(true);
            setFocusCount((c) => c + 1);
        },
        inputRef,
    );

    useEventListener("blur", () => setIsFocused(false), inputRef);

    return (
        <div className="flex w-full max-w-md flex-col gap-4">
            <div className="flex items-center gap-2">
                <Focus className="text-primary h-5 w-5" />
                <h3 className="font-semibold">Focus/Blur Events</h3>
                <span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs">
                    Overload 3
                </span>
            </div>

            <p className="text-muted-foreground text-sm">
                Listening to{" "}
                <code className="bg-muted rounded px-1">focus</code> and{" "}
                <code className="bg-muted rounded px-1">blur</code> on an{" "}
                <strong>input element</strong> via ref.
            </p>

            <div className="space-y-3">
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Click to focus..."
                    className={`w-full rounded-lg border-2 bg-transparent px-4 py-3 outline-none transition-colors ${
                        isFocused
                            ? "border-primary bg-primary/5"
                            : "border-muted"
                    }`}
                />

                <div className="bg-muted/50 flex items-center justify-between rounded-lg p-3">
                    <span className="text-sm">Status</span>
                    <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                            isFocused
                                ? "bg-primary/20 text-primary"
                                : "bg-muted text-muted-foreground"
                        }`}
                    >
                        {isFocused ? "Focused" : "Blurred"}
                    </span>
                </div>

                <p className="text-muted-foreground text-center text-sm">
                    Focus events: <strong>{focusCount}</strong>
                </p>
            </div>

            <pre className="bg-muted rounded-lg p-3 text-xs">
                <code>{`useEventListener("focus", handler, inputRef);
useEventListener("blur", handler, inputRef);`}</code>
            </pre>
        </div>
    );
};
