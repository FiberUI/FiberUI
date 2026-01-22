"use client";

import { useGeolocation } from "@repo/hooks/device/use-geolocation";
import { Button } from "@repo/ui/components/button";
import { MapPin, Loader2, AlertCircle, RefreshCw } from "lucide-react";

/* REQUEST LOCATION - Basic Coordinates Display */
export const Example1 = () => {
    const {
        latitude,
        longitude,
        accuracy,
        isLoading,
        isSupported,
        error,
        errorMessage,
        refetch,
    } = useGeolocation();

    if (!isSupported) {
        return (
            <div className="rounded-md border border-yellow-500/50 bg-yellow-500/10 p-4">
                <p className="text-sm text-yellow-600 dark:text-yellow-400">
                    Geolocation API is not supported in this browser
                </p>
            </div>
        );
    }

    return (
        <div className="flex w-full max-w-sm flex-col gap-4">
            {/* Location Card */}
            <div className="rounded-lg border p-4">
                <div className="mb-3 flex items-center gap-2">
                    <MapPin className="text-primary h-5 w-5" />
                    <span className="font-medium">Your Location</span>
                </div>

                {isLoading ? (
                    <div className="text-muted-foreground flex items-center gap-2 py-4 text-sm">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Getting your location...</span>
                    </div>
                ) : error ? (
                    <div className="flex items-start gap-2 rounded-md bg-red-500/10 p-3 text-sm text-red-600 dark:text-red-400">
                        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                        <span>{errorMessage}</span>
                    </div>
                ) : latitude && longitude ? (
                    <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <div className="text-muted-foreground text-xs uppercase tracking-wide">
                                    Latitude
                                </div>
                                <div className="font-mono text-lg font-medium">
                                    {latitude.toFixed(6)}°
                                </div>
                            </div>
                            <div>
                                <div className="text-muted-foreground text-xs uppercase tracking-wide">
                                    Longitude
                                </div>
                                <div className="font-mono text-lg font-medium">
                                    {longitude.toFixed(6)}°
                                </div>
                            </div>
                        </div>
                        {accuracy && (
                            <div className="text-muted-foreground text-sm">
                                Accuracy: ±{Math.round(accuracy)} meters
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="text-muted-foreground py-4 text-center text-sm">
                        Click refresh to get your location
                    </div>
                )}
            </div>

            {/* Refresh Button */}
            <Button
                onClick={refetch}
                isDisabled={isLoading}
                variant="outline"
                className="gap-2"
            >
                <RefreshCw
                    className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
                />
                {isLoading ? "Getting Location..." : "Refresh Location"}
            </Button>
        </div>
    );
};
