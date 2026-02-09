"use client";

import { useRef, useState } from "react";
import { useEventListener } from "@repo/hooks/dom/use-event-listener";
import { MousePointer2 } from "lucide-react";

/**
 * Example 5: Multiple Listeners on Same Element
 * Demonstrates Overload 3 - Calling useEventListener multiple times with same ref
 */
export const Example5 = () => {
    const areaRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    // Overload 3: Multiple listeners on the same ref
    useEventListener(
        "mousemove",
        (e) => setPosition({ x: e.offsetX, y: e.offsetY }),
        areaRef,
    );

    useEventListener("mouseenter", () => setIsHovering(true), areaRef);
    useEventListener("mouseleave", () => setIsHovering(false), areaRef);

    return (
        <div className="flex w-full max-w-md flex-col gap-4">
            <div className="flex items-center gap-2">
                <MousePointer2 className="text-primary h-5 w-5" />
                <h3 className="font-semibold">Multiple Listeners</h3>
                <span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs">
                    Overload 3
                </span>
            </div>

            <p className="text-muted-foreground text-sm">
                Three listeners on one element:{" "}
                <code className="bg-muted rounded px-1">mousemove</code>,{" "}
                <code className="bg-muted rounded px-1">mouseenter</code>, and{" "}
                <code className="bg-muted rounded px-1">mouseleave</code>.
            </p>

            <div
                ref={areaRef}
                className={`relative h-40 rounded-lg border-2 border-dashed transition-colors ${
                    isHovering ? "border-primary bg-primary/5" : "border-muted"
                }`}
            >
                {isHovering ? (
                    <div
                        className="bg-primary pointer-events-none absolute h-3 w-3 rounded-full"
                        style={{
                            left: position.x,
                            top: position.y,
                            transform: "translate(-50%, -50%)",
                        }}
                    />
                ) : (
                    <div className="text-muted-foreground flex h-full items-center justify-center">
                        Hover here
                    </div>
                )}
            </div>

            <div className="text-muted-foreground text-center text-sm">
                Position:{" "}
                <code className="font-mono">
                    ({position.x}, {position.y})
                </code>
            </div>

            <pre className="bg-muted rounded-lg p-3 text-xs">
                <code>{`useEventListener("mousemove", handler, areaRef);
useEventListener("mouseenter", handler, areaRef);
useEventListener("mouseleave", handler, areaRef);`}</code>
            </pre>
        </div>
    );
};
