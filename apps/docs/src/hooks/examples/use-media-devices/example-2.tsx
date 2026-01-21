"use client";

import { useMediaDevices } from "@repo/hooks/device/use-media-devices";
import { Button } from "@repo/ui/components/button";
import { Camera, RefreshCw } from "lucide-react";

/* FILTERED USAGE - Cameras Only */
export const Example2 = () => {
    const { devices, isLoading } = useMediaDevices();

    const cameras = devices.filter((d) => d.kind === "videoinput");

    return (
        <div className="w-full max-w-sm rounded-lg border">
            <div className="bg-muted/50 flex items-center justify-between border-b px-4 py-3">
                <div className="flex items-center gap-2 font-medium">
                    <Camera className="h-4 w-4" />
                    <span>Cameras</span>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => window.location.reload()}
                    // title="Reload page to refresh devices"
                >
                    <RefreshCw className="h-3.5 w-3.5" />
                </Button>
            </div>

            <div className="p-4">
                {isLoading ? (
                    <div className="text-muted-foreground text-sm">
                        Scanning...
                    </div>
                ) : cameras.length === 0 ? (
                    <div className="text-muted-foreground py-8 text-center text-sm">
                        No cameras found
                    </div>
                ) : (
                    <ul className="space-y-4">
                        {cameras.map((camera, i) => (
                            <li
                                key={camera.deviceId || i}
                                className="flex gap-3"
                            >
                                <div className="bg-muted flex h-10 w-10 shrink-0 items-center justify-center rounded">
                                    <Camera className="text-muted-foreground h-5 w-5" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="truncate text-sm font-medium">
                                        {camera.label || `Camera ${i + 1}`}
                                    </div>
                                    <div className="text-muted-foreground truncate text-xs">
                                        {camera.deviceId
                                            ? `ID: ${camera.deviceId}`
                                            : "System Default"}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {cameras.length > 0 && cameras.some((c) => !c.label) && (
                <div className="border-t bg-yellow-500/10 px-4 py-3 text-xs text-yellow-600 dark:text-yellow-400">
                    Camera labels may be hidden until you grant camera
                    permissions to this site.
                </div>
            )}
        </div>
    );
};
