"use client";

import { useState, useRef } from "react";
import { useVibration } from "@repo/hooks/device/use-vibration";
import { Button } from "@repo/ui/components/button";
import { Crosshair, Target } from "lucide-react";

export function Example3() {
    const { vibrate, isSupported } = useVibration();
    const [score, setScore] = useState(0);
    const targetRef = useRef<HTMLDivElement>(null);

    const handleShoot = () => {
        // Simple haptic feedback on every click/shot
        vibrate(50);

        // Randomly hit or miss
        const hit = Math.random() > 0.5;
        if (hit) {
            setScore((s) => s + 10);
            // Strong feedback for a hit!
            vibrate([100, 50, 200]);

            // Visual feedback
            if (targetRef.current) {
                targetRef.current.animate(
                    [
                        { transform: "scale(1)", color: "inherit" },
                        { transform: "scale(1.2)", color: "green" },
                        { transform: "scale(1)", color: "inherit" },
                    ],
                    { duration: 300 },
                );
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center gap-6">
            <div className="text-center">
                <h3 className="text-lg font-medium">Game Haptics</h3>
                <p className="text-muted-foreground max-w-sm text-sm">
                    Combine actions with rapid haptic feedback.
                </p>
            </div>

            <div className="flex items-center gap-4">
                <span className="text-2xl font-bold tracking-tight">
                    Score: {score}
                </span>
                <Button variant="outline" size="sm" onClick={() => setScore(0)}>
                    Reset
                </Button>
            </div>

            <div
                ref={targetRef}
                className="border-primary/50 relative flex items-center justify-center rounded-full border-2 border-dashed p-12"
            >
                <Target className="absolute h-16 w-16 opacity-20" />

                <Button
                    size="lg"
                    className="relative z-10 h-24 w-24 rounded-full"
                    onClick={handleShoot}
                    isDisabled={!isSupported}
                >
                    <Crosshair className="h-8 w-8" />
                </Button>
            </div>

            {!isSupported && (
                <p className="text-destructive text-sm">
                    Requires a mobile device with vibration support.
                </p>
            )}
        </div>
    );
}
