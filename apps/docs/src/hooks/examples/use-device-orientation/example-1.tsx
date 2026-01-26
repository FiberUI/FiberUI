"use client";

import { useDeviceOrientation } from "@repo/hooks/device/use-device-orientation";
import { Button } from "@repo/ui/components/button";
import { Smartphone } from "lucide-react";

export function Example1() {
    const { orientation, requestPermission, error } = useDeviceOrientation();

    // Round values for display
    const alpha = orientation.alpha ? Math.round(orientation.alpha) : 0;
    const beta = orientation.beta ? Math.round(orientation.beta) : 0;
    const gamma = orientation.gamma ? Math.round(orientation.gamma) : 0;

    return (
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-3 gap-4 text-center">
                <div className="rounded-lg border p-4">
                    <div className="text-2xl font-bold">{alpha}°</div>
                    <div className="text-muted-foreground text-xs">
                        Alpha (Z)
                    </div>
                </div>
                <div className="rounded-lg border p-4">
                    <div className="text-2xl font-bold">{beta}°</div>
                    <div className="text-muted-foreground text-xs">
                        Beta (X)
                    </div>
                </div>
                <div className="rounded-lg border p-4">
                    <div className="text-2xl font-bold">{gamma}°</div>
                    <div className="text-muted-foreground text-xs">
                        Gamma (Y)
                    </div>
                </div>
            </div>

            {error && (
                <div className="text-destructive text-sm">{error.message}</div>
            )}

            <Button onClick={requestPermission} variant="outline">
                <Smartphone className="mr-2 h-4 w-4" />
                Request Permission (iOS)
            </Button>
        </div>
    );
}
