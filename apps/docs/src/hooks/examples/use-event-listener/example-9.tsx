"use client";

import { useRef, useState } from "react";
import { useEventListener } from "@repo/hooks/dom/use-event-listener";
import { Smartphone } from "lucide-react";

/**
 * Example 9: Touch Events
 * Demonstrates Overload 3 - Element events with passive option for touch
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Touch_events
 * @see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#passive
 */
export const Example9 = () => {
    const touchAreaRef = useRef<HTMLDivElement>(null);
    const [touches, setTouches] = useState(0);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isTouching, setIsTouching] = useState(false);

    // Overload 3 with options: Element events with { passive: true }
    // passive: true improves scroll performance on touch devices
    useEventListener(
        "touchstart",
        (e) => {
            setIsTouching(true);
            setTouches((c) => c + 1);
            const touch = e.touches[0];
            if (touch && touchAreaRef.current) {
                const rect = touchAreaRef.current.getBoundingClientRect();
                setPosition({
                    x: Math.round(touch.clientX - rect.left),
                    y: Math.round(touch.clientY - rect.top),
                });
            }
        },
        touchAreaRef,
        { passive: true },
    );

    useEventListener(
        "touchmove",
        (e) => {
            const touch = e.touches[0];
            if (touch && touchAreaRef.current) {
                const rect = touchAreaRef.current.getBoundingClientRect();
                setPosition({
                    x: Math.round(touch.clientX - rect.left),
                    y: Math.round(touch.clientY - rect.top),
                });
            }
        },
        touchAreaRef,
        { passive: true },
    );

    useEventListener("touchend", () => setIsTouching(false), touchAreaRef, {
        passive: true,
    });

    return (
        <div className="flex w-full max-w-md flex-col gap-4">
            <div className="flex items-center gap-2">
                <Smartphone className="text-primary h-5 w-5" />
                <h3 className="font-semibold">Touch Events</h3>
                <span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs">
                    Overload 3
                </span>
            </div>

            <p className="text-muted-foreground text-sm">
                Listening to{" "}
                <code className="bg-muted rounded px-1">touchstart</code>,{" "}
                <code className="bg-muted rounded px-1">touchmove</code>, and{" "}
                <code className="bg-muted rounded px-1">touchend</code> with{" "}
                <code className="bg-muted rounded px-1">passive: true</code>.
            </p>

            <div
                ref={touchAreaRef}
                className={`relative flex h-40 items-center justify-center rounded-lg border-2 border-dashed transition-colors ${
                    isTouching ? "border-primary bg-primary/5" : "border-muted"
                }`}
            >
                {isTouching ? (
                    <>
                        <div
                            className="bg-primary pointer-events-none absolute h-4 w-4 rounded-full"
                            style={{
                                left: position.x,
                                top: position.y,
                                transform: "translate(-50%, -50%)",
                            }}
                        />
                        <span className="text-muted-foreground text-sm">
                            ({position.x}, {position.y})
                        </span>
                    </>
                ) : (
                    <span className="text-muted-foreground text-sm">
                        Touch here (mobile/tablet)
                    </span>
                )}
            </div>

            <p className="text-muted-foreground text-center text-sm">
                Touch count: <strong>{touches}</strong>
            </p>
        </div>
    );
};
