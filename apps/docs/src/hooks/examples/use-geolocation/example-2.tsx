"use client";

import { useGeolocation } from "@repo/hooks/device/use-geolocation";
import { Button } from "@repo/ui/components/button";
import { useState } from "react";
import { Navigation, Play, Square, MapPin } from "lucide-react";

/* WATCH MODE - Continuous Position Updates */
export const Example2 = () => {
    const [isWatching, setIsWatching] = useState(false);
    const [history, setHistory] = useState<
        Array<{ lat: number; lng: number; time: Date }>
    >([]);

    const {
        latitude,
        longitude,
        accuracy,
        speed,
        heading,
        isLoading,
        error,
        clearWatch,
    } = useGeolocation({
        watch: isWatching,
        enableHighAccuracy: true,
    });

    const startWatching = () => {
        setHistory([]);
        setIsWatching(true);
    };

    const stopWatching = () => {
        clearWatch();
        setIsWatching(false);
    };

    // Add to history when position updates
    if (isWatching && latitude && longitude) {
        const lastEntry = history[history.length - 1];
        if (
            !lastEntry ||
            lastEntry.lat !== latitude ||
            lastEntry.lng !== longitude
        ) {
            if (history.length < 10) {
                setHistory((prev) => [
                    ...prev,
                    { lat: latitude, lng: longitude, time: new Date() },
                ]);
            }
        }
    }

    return (
        <div className="flex w-full max-w-sm flex-col gap-4">
            {/* Current Position */}
            <div className="rounded-lg border p-4">
                <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Navigation className="text-primary h-5 w-5" />
                        <span className="font-medium">Live Tracking</span>
                    </div>
                    {isWatching && (
                        <span className="flex items-center gap-1.5 text-xs text-green-600 dark:text-green-400">
                            <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                            Active
                        </span>
                    )}
                </div>

                {error ? (
                    <div className="text-sm text-red-500">{error.message}</div>
                ) : latitude && longitude ? (
                    <div className="space-y-3">
                        <div className="font-mono text-sm">
                            {latitude.toFixed(6)}, {longitude.toFixed(6)}
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-center text-xs">
                            <div className="bg-muted rounded p-2">
                                <div className="text-muted-foreground">
                                    Accuracy
                                </div>
                                <div className="font-medium">
                                    {accuracy
                                        ? `±${Math.round(accuracy)}m`
                                        : "—"}
                                </div>
                            </div>
                            <div className="bg-muted rounded p-2">
                                <div className="text-muted-foreground">
                                    Speed
                                </div>
                                <div className="font-medium">
                                    {speed
                                        ? `${(speed * 3.6).toFixed(1)} km/h`
                                        : "—"}
                                </div>
                            </div>
                            <div className="bg-muted rounded p-2">
                                <div className="text-muted-foreground">
                                    Heading
                                </div>
                                <div className="font-medium">
                                    {heading ? `${Math.round(heading)}°` : "—"}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-muted-foreground py-4 text-center text-sm">
                        {isLoading
                            ? "Getting location..."
                            : "Start tracking to see position"}
                    </div>
                )}
            </div>

            {/* History */}
            {history.length > 0 && (
                <div className="rounded-lg border p-3">
                    <div className="text-muted-foreground mb-2 text-xs font-medium uppercase">
                        Position History ({history.length})
                    </div>
                    <div className="max-h-32 space-y-1 overflow-y-auto text-xs">
                        {history.map((entry, i) => (
                            <div
                                key={i}
                                className="bg-muted/50 flex items-center gap-2 rounded px-2 py-1"
                            >
                                <MapPin className="text-muted-foreground h-3 w-3" />
                                <span className="font-mono">
                                    {entry.lat.toFixed(4)},{" "}
                                    {entry.lng.toFixed(4)}
                                </span>
                                <span className="text-muted-foreground ml-auto">
                                    {entry.time.toLocaleTimeString()}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Control Button */}
            <Button
                onClick={isWatching ? stopWatching : startWatching}
                variant={isWatching ? "destructive" : "default"}
                className="gap-2"
            >
                {isWatching ? (
                    <>
                        <Square className="h-4 w-4" />
                        Stop Tracking
                    </>
                ) : (
                    <>
                        <Play className="h-4 w-4" />
                        Start Tracking
                    </>
                )}
            </Button>
        </div>
    );
};
