"use client";

import { useGeolocation } from "@repo/hooks/device/use-geolocation";
import { Button } from "@repo/ui/components/button";
import { useState } from "react";
import { Crosshair, Satellite, Wifi, RefreshCw } from "lucide-react";

/* HIGH ACCURACY - GPS Precision with Accuracy Indicator */
export const Example3 = () => {
    const [useHighAccuracy, setUseHighAccuracy] = useState(true);

    const {
        latitude,
        longitude,
        accuracy,
        altitude,
        isLoading,
        error,
        refetch,
    } = useGeolocation({
        enableHighAccuracy: useHighAccuracy,
        timeout: 15000,
    });

    const getAccuracyLevel = (acc: number | null) => {
        if (!acc) return { label: "Unknown", color: "gray", icon: Crosshair };
        if (acc <= 10)
            return { label: "Excellent", color: "green", icon: Satellite };
        if (acc <= 50) return { label: "Good", color: "blue", icon: Satellite };
        if (acc <= 100) return { label: "Fair", color: "yellow", icon: Wifi };
        return { label: "Poor", color: "red", icon: Wifi };
    };

    const accuracyInfo = getAccuracyLevel(accuracy);
    const AccuracyIcon = accuracyInfo.icon;

    return (
        <div className="flex w-full max-w-sm flex-col gap-4">
            {/* Accuracy Mode Toggle */}
            <div className="flex gap-2">
                <Button
                    variant={useHighAccuracy ? "default" : "outline"}
                    size="sm"
                    onClick={() => setUseHighAccuracy(true)}
                    className="flex-1 gap-2"
                >
                    <Satellite className="h-4 w-4" />
                    High Accuracy
                </Button>
                <Button
                    variant={!useHighAccuracy ? "default" : "outline"}
                    size="sm"
                    onClick={() => setUseHighAccuracy(false)}
                    className="flex-1 gap-2"
                >
                    <Wifi className="h-4 w-4" />
                    Low Power
                </Button>
            </div>

            {/* Position Card */}
            <div className="rounded-lg border p-4">
                {error ? (
                    <div className="text-sm text-red-500">{error.message}</div>
                ) : latitude && longitude ? (
                    <div className="space-y-4">
                        {/* Accuracy Indicator */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <AccuracyIcon
                                    className={`h-5 w-5 ${
                                        accuracyInfo.color === "green"
                                            ? "text-green-500"
                                            : accuracyInfo.color === "blue"
                                              ? "text-blue-500"
                                              : accuracyInfo.color === "yellow"
                                                ? "text-yellow-500"
                                                : accuracyInfo.color === "red"
                                                  ? "text-red-500"
                                                  : "text-gray-500"
                                    }`}
                                />
                                <span className="text-sm font-medium">
                                    {accuracyInfo.label} Accuracy
                                </span>
                            </div>
                            <span className="text-muted-foreground text-sm">
                                ±{accuracy ? Math.round(accuracy) : "—"}m
                            </span>
                        </div>

                        {/* Accuracy Visual Bar */}
                        <div className="bg-muted h-2 overflow-hidden rounded-full">
                            <div
                                className={`h-full transition-all duration-500 ${
                                    accuracyInfo.color === "green"
                                        ? "bg-green-500"
                                        : accuracyInfo.color === "blue"
                                          ? "bg-blue-500"
                                          : accuracyInfo.color === "yellow"
                                            ? "bg-yellow-500"
                                            : accuracyInfo.color === "red"
                                              ? "bg-red-500"
                                              : "bg-gray-500"
                                }`}
                                style={{
                                    width: accuracy
                                        ? `${Math.max(5, 100 - Math.min(accuracy, 100))}%`
                                        : "0%",
                                }}
                            />
                        </div>

                        {/* Coordinates */}
                        <div className="grid grid-cols-2 gap-3 text-sm">
                            <div className="bg-muted/50 rounded p-2">
                                <div className="text-muted-foreground text-xs">
                                    Latitude
                                </div>
                                <div className="font-mono font-medium">
                                    {latitude.toFixed(6)}°
                                </div>
                            </div>
                            <div className="bg-muted/50 rounded p-2">
                                <div className="text-muted-foreground text-xs">
                                    Longitude
                                </div>
                                <div className="font-mono font-medium">
                                    {longitude.toFixed(6)}°
                                </div>
                            </div>
                        </div>

                        {/* Altitude (if available) */}
                        {altitude !== null && (
                            <div className="text-muted-foreground text-sm">
                                Altitude: {Math.round(altitude)}m above sea
                                level
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="text-muted-foreground py-6 text-center text-sm">
                        {isLoading
                            ? "Acquiring GPS signal..."
                            : "Click refresh to get your position"}
                    </div>
                )}
            </div>

            {/* Refresh Button */}
            <Button onClick={refetch} isDisabled={isLoading} className="gap-2">
                <RefreshCw
                    className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
                />
                {isLoading ? "Getting Position..." : "Get Position"}
            </Button>

            {/* Mode Description */}
            <p className="text-muted-foreground text-center text-xs">
                {useHighAccuracy
                    ? "Using GPS for precise location (slower, uses more battery)"
                    : "Using Wi-Fi/Cell towers (faster, less accurate)"}
            </p>
        </div>
    );
};
