"use client";

import { useVibration } from "@repo/hooks/device/use-vibration";
import { Button } from "@repo/ui/components/button";
import { Vibrate } from "lucide-react";

export function Example1() {
    const { vibrate, isSupported } = useVibration();

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <div className="text-center">
                <h3 className="text-lg font-medium">Basic Vibration</h3>
                <p className="text-muted-foreground text-sm">
                    Trigger a simple 200ms haptic feedback.
                </p>
            </div>

            <Button
                onClick={() => vibrate(200)}
                isDisabled={!isSupported}
                className="gap-2"
            >
                <Vibrate className="h-4 w-4" />
                Vibrate Device
            </Button>

            {!isSupported && (
                <p className="text-destructive mt-2 text-sm">
                    Vibration API is not supported in this browser/device.
                </p>
            )}
        </div>
    );
}
