"use client";

import { useClickOutside } from "@repo/hooks/dom/use-click-outside";
import { useRef, useState } from "react";

export function Example2() {
    const [count, setCount] = useState(0);
    const boxRef = useRef<HTMLDivElement>(null);
    const ignoreRef = useRef<HTMLButtonElement>(null);

    useClickOutside(boxRef, (event) => {
        // Example of ignoring a specific element manually if needed,
        // though typically you just put it inside the ref.
        // But here, the ignore button is outside the box.
        if (ignoreRef.current?.contains(event.target as Node)) {
            return;
        }
        setCount((c) => c + 1);
    });

    return (
        <div className="flex flex-col items-center gap-8 p-8">
            <div
                ref={boxRef}
                className="bg-secondary text-secondary-foreground flex h-32 w-32 items-center justify-center rounded-lg border shadow-sm"
            >
                <span className="text-center text-sm font-medium">
                    Click outside me
                    <br />
                    (triggers count)
                </span>
            </div>

            <div className="flex flex-col items-center gap-2">
                <p className="font-mono text-sm">Outside Clicks: {count}</p>
                <button
                    ref={ignoreRef}
                    className="bg-muted text-muted-foreground hover:bg-muted/80 rounded px-3 py-1 text-xs"
                >
                    I am ignored (won&apos;t trigger count)
                </button>
            </div>
        </div>
    );
}
