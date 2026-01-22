"use client";

import { useGeolocation } from "@repo/hooks/device/use-geolocation";
import { Button } from "@repo/ui/components/button";
import { useState, useMemo } from "react";
import { MapPin, Navigation, RotateCcw } from "lucide-react";

/* DISTANCE CALCULATOR - Distance from Reference Point */

// Famous landmarks for demo
const LANDMARKS = [
    { name: "Eiffel Tower", lat: 48.8584, lng: 2.2945 },
    { name: "Statue of Liberty", lat: 40.6892, lng: -74.0445 },
    { name: "Sydney Opera House", lat: -33.8568, lng: 151.2153 },
    { name: "Taj Mahal", lat: 27.1751, lng: 78.0421 },
    { name: "Big Ben", lat: 51.5007, lng: -0.1246 },
];

// Haversine formula to calculate distance between two points
function calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
): number {
    const R = 6371; // Earth's radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
            Math.cos((lat2 * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function formatDistance(km: number): string {
    if (km < 1) {
        return `${Math.round(km * 1000)} m`;
    }
    if (km < 10) {
        return `${km.toFixed(1)} km`;
    }
    return `${Math.round(km).toLocaleString()} km`;
}

export const Example4 = () => {
    const { latitude, longitude, isLoading, error, refetch } = useGeolocation();
    const [selectedLandmark, setSelectedLandmark] = useState(LANDMARKS[0]);

    const distance = useMemo(() => {
        if (!latitude || !longitude || !selectedLandmark) return null;
        return calculateDistance(
            latitude,
            longitude,
            selectedLandmark.lat,
            selectedLandmark.lng,
        );
    }, [latitude, longitude, selectedLandmark]);

    return (
        <div className="flex w-full max-w-sm flex-col gap-4">
            {/* Landmark Selector */}
            <div className="flex flex-col gap-1.5">
                <label className="text-muted-foreground text-sm font-medium">
                    Select a Landmark
                </label>
                <div className="relative">
                    <select
                        value={selectedLandmark?.name}
                        onChange={(e) => {
                            const landmark = LANDMARKS.find(
                                (l) => l.name === e.target.value,
                            );
                            if (landmark) setSelectedLandmark(landmark);
                        }}
                        className="border-input bg-background focus:ring-ring w-full appearance-none rounded-md border py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-2"
                    >
                        {LANDMARKS.map((landmark) => (
                            <option key={landmark.name} value={landmark.name}>
                                {landmark.name}
                            </option>
                        ))}
                    </select>
                    <MapPin className="text-muted-foreground pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2" />
                </div>
            </div>

            {/* Distance Display */}
            <div className="rounded-lg border p-4">
                {error ? (
                    <div className="text-sm text-red-500">
                        Could not get your location
                    </div>
                ) : latitude && longitude && distance !== null ? (
                    <div className="space-y-4 text-center">
                        <div>
                            <div className="text-muted-foreground text-sm">
                                Distance to {selectedLandmark?.name}
                            </div>
                            <div className="mt-1 text-3xl font-bold">
                                {formatDistance(distance)}
                            </div>
                        </div>

                        {/* Visual representation */}
                        <div className="flex items-center justify-center gap-3">
                            <div className="flex flex-col items-center">
                                <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
                                    <Navigation className="text-primary h-5 w-5" />
                                </div>
                                <span className="text-muted-foreground mt-1 text-xs">
                                    You
                                </span>
                            </div>
                            <div className="border-muted-foreground/30 flex-1 border-t-2 border-dashed" />
                            <div className="flex flex-col items-center">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10">
                                    <MapPin className="h-5 w-5 text-red-500" />
                                </div>
                                <span className="text-muted-foreground mt-1 text-xs">
                                    Landmark
                                </span>
                            </div>
                        </div>

                        {/* Coordinates */}
                        <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="bg-muted/50 rounded p-2">
                                <div className="text-muted-foreground">
                                    Your Position
                                </div>
                                <div className="font-mono">
                                    {latitude.toFixed(4)},{" "}
                                    {longitude.toFixed(4)}
                                </div>
                            </div>
                            <div className="bg-muted/50 rounded p-2">
                                <div className="text-muted-foreground">
                                    Landmark
                                </div>
                                <div className="font-mono">
                                    {selectedLandmark?.lat.toFixed(4)},{" "}
                                    {selectedLandmark?.lng.toFixed(4)}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-muted-foreground py-6 text-center text-sm">
                        {isLoading
                            ? "Getting your location..."
                            : "Get your location to calculate distance"}
                    </div>
                )}
            </div>

            {/* Refresh Button */}
            <Button
                onClick={refetch}
                disabled={isLoading}
                variant="outline"
                className="gap-2"
            >
                <RotateCcw
                    className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
                />
                {isLoading ? "Getting Location..." : "Update My Location"}
            </Button>
        </div>
    );
};
