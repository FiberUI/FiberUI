"use client";

import { useIdle } from "@repo/hooks/performance/use-idle";
import { useState, useEffect } from "react";
import { Button } from "@repo/ui/components/button";
import { FileText, EyeOff } from "lucide-react";

export function Example3() {
    const { idle, isGranted, requestPermission } = useIdle();
    const [blurEnabled, setBlurEnabled] = useState(true);

    const isCurrentlyHidden = idle && blurEnabled && isGranted;

    return (
        <div className="mx-auto flex w-full max-w-lg flex-col gap-6">
            <div className="bg-muted/50 flex flex-col items-center justify-between gap-4 rounded-lg p-4 sm:flex-row">
                <div className="space-y-1 text-center sm:text-left">
                    <h3 className="text-sm font-bold">Privacy Protection</h3>
                    <p className="text-muted-foreground text-xs">
                        Hides sensitive content when you walk away.
                    </p>
                </div>
                <div className="flex gap-2">
                    {!isGranted && (
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={requestPermission}
                        >
                            Allow Sensor
                        </Button>
                    )}
                    <Button
                        size="sm"
                        variant={blurEnabled ? "default" : "secondary"}
                        onClick={() => setBlurEnabled(!blurEnabled)}
                        isDisabled={!isGranted}
                    >
                        {blurEnabled ? "Protection ON" : "Protection OFF"}
                    </Button>
                </div>
            </div>

            <div className="bg-background relative overflow-hidden rounded-xl border">
                {/* Simulated Document Content */}
                <div
                    className={`p-8 transition-all duration-1000 ${isCurrentlyHidden ? "scale-95 opacity-20 blur-xl grayscale" : ""}`}
                >
                    <div className="text-primary mb-6 flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        <h2 className="font-bold">Confidential Q3 Strategy</h2>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-muted h-4 w-3/4 rounded"></div>
                        <div className="bg-muted h-4 w-full rounded"></div>
                        <div className="bg-muted h-4 w-5/6 rounded"></div>
                        <div className="bg-primary/5 border-primary/20 !mb-6 mt-6 h-32 w-full rounded border"></div>
                        <div className="bg-muted h-4 w-2/3 rounded"></div>
                        <div className="bg-muted h-4 w-full rounded"></div>
                    </div>
                </div>

                {/* Privacy Overlay */}
                <div
                    className={`pointer-events-none absolute inset-0 flex flex-col items-center justify-center p-6 text-center transition-all duration-500 ${
                        isCurrentlyHidden
                            ? "bg-background/40 opacity-100"
                            : "opacity-0"
                    }`}
                >
                    <EyeOff className="text-muted-foreground mb-4 h-12 w-12" />
                    <h4 className="text-foreground text-lg font-bold">
                        Content Hidden
                    </h4>
                    <p className="text-foreground/80 mt-1 max-w-xs text-sm">
                        Document protected while you are away from the system.
                    </p>
                </div>
            </div>
        </div>
    );
}
