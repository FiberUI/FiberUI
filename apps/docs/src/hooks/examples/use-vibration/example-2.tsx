"use client";

import { useVibration } from "@repo/hooks/device/use-vibration";
import { Button } from "@repo/ui/components/button";
import { AlertTriangle, CheckCircle, Info } from "lucide-react";

export function Example2() {
    const { vibrate, isSupported } = useVibration();

    // Vibrate patterns defined in milliseconds: [vibrate, pause, vibrate, pause, ...]
    const patterns = {
        success: [100, 50, 100], // Short double tap
        error: [500, 100, 500], // Two long vibrations
        sos: [
            100, 100, 100, 100, 100, 100, 300, 100, 300, 100, 300, 100, 100,
            100, 100,
        ], // ... --- ...
    };

    return (
        <div className="flex flex-col items-center justify-center gap-6">
            <div className="text-center">
                <h3 className="text-lg font-medium">Vibration Patterns</h3>
                <p className="text-muted-foreground max-w-sm text-sm">
                    Pass an array of numbers to define complex vibration
                    sequences.
                </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
                <Button
                    variant="outline"
                    onClick={() => vibrate(patterns.success)}
                    isDisabled={!isSupported}
                    className="gap-2 border-green-500/20 text-green-600 hover:bg-green-500/10 dark:text-green-400 dark:hover:bg-green-500/20"
                >
                    <CheckCircle className="h-4 w-4" />
                    Success Match
                </Button>

                <Button
                    variant="outline"
                    onClick={() => vibrate(patterns.error)}
                    isDisabled={!isSupported}
                    className="gap-2 border-red-500/20 text-red-600 hover:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20"
                >
                    <AlertTriangle className="h-4 w-4" />
                    Error Alert
                </Button>

                <Button
                    variant="outline"
                    onClick={() => vibrate(patterns.sos)}
                    isDisabled={!isSupported}
                    className="gap-2"
                >
                    <Info className="h-4 w-4" />
                    SOS Signal
                </Button>
            </div>

            <Button
                variant="ghost"
                onClick={() => vibrate(0)} // Pass 0 to stop
                isDisabled={!isSupported}
                className="text-muted-foreground mt-2 text-sm"
            >
                Stop Current Vibration
            </Button>
        </div>
    );
}
