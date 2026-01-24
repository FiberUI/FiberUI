"use client";

import { useMediaDevices } from "@repo/hooks/device/use-media-devices";
import { Button } from "@repo/ui/components/button";
import { Shield, ShieldCheck, Mic, Camera } from "lucide-react";

/* REQUEST PERMISSIONS - Reveal Device Labels */
export const Example1 = () => {
    const { devices, isLoading, hasPermission, requestPermission, refetch } =
        useMediaDevices();

    const handleRequestAudio = async () => {
        await requestPermission({ audio: true, video: false });
    };

    const handleRequestVideo = async () => {
        await requestPermission({ audio: false, video: true });
    };

    const handleRequestBoth = async () => {
        await requestPermission({ audio: true, video: true });
    };

    if (isLoading) {
        return (
            <span className="text-muted-foreground text-sm">
                Loading devices...
            </span>
        );
    }

    return (
        <div className="flex w-full max-w-sm flex-col gap-4">
            {/* Permission Status */}
            <div
                className={`flex items-center gap-2 rounded-lg border p-4 ${
                    hasPermission
                        ? "border-green-500/50 bg-green-500/10"
                        : "border-yellow-500/50 bg-yellow-500/10"
                }`}
            >
                {hasPermission ? (
                    <>
                        <ShieldCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
                        <div>
                            <div className="text-sm font-medium text-green-600 dark:text-green-400">
                                Permission Granted
                            </div>
                            <div className="text-muted-foreground text-xs">
                                Device labels are now visible
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <Shield className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                        <div>
                            <div className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
                                Permission Required
                            </div>
                            <div className="text-muted-foreground text-xs">
                                Grant access to see device names
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Permission Buttons */}
            {!hasPermission && (
                <div className="flex flex-wrap gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleRequestAudio}
                        className="gap-2"
                    >
                        <Mic className="h-4 w-4" />
                        Microphone
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleRequestVideo}
                        className="gap-2"
                    >
                        <Camera className="h-4 w-4" />
                        Camera
                    </Button>
                    <Button size="sm" onClick={handleRequestBoth}>
                        Request Both
                    </Button>
                </div>
            )}

            {/* Device Count */}
            <div className="text-muted-foreground flex items-center justify-between text-sm">
                <span>
                    {devices.length} device{devices.length !== 1 ? "s" : ""}{" "}
                    found
                </span>
                <Button variant="ghost" size="sm" onClick={refetch}>
                    Refresh
                </Button>
            </div>

            {/* Device List */}
            <div className="divide-y rounded-lg border">
                {devices.slice(0, 5).map((device, i) => (
                    <div key={device.deviceId + i} className="p-3 text-sm">
                        <div className="truncate font-medium">
                            {device.label || (
                                <span className="text-muted-foreground italic">
                                    Hidden (permission required)
                                </span>
                            )}
                        </div>
                        <div className="text-muted-foreground mt-0.5 text-xs capitalize">
                            {device.kind
                                .replace("input", " Input")
                                .replace("output", " Output")}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
