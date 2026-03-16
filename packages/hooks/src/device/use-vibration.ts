import { useCallback } from "react";

/**
 * Provides a method to trigger device vibration.
 * Safe to use in environments where vibration is not supported.
 */
export function useVibration() {
    const vibrate = useCallback((pattern: number | number[] = 200) => {
        if (
            typeof window !== "undefined" &&
            typeof navigator !== "undefined" &&
            "vibrate" in navigator
        ) {
            // Return value is boolean in supported browsers
            try {
                navigator.vibrate(pattern);
            } catch (e) {
                console.warn("Vibration API failed", e);
            }
        }
    }, []);

    const isSupported =
        typeof window !== "undefined" &&
        typeof navigator !== "undefined" &&
        "vibrate" in navigator;

    return { vibrate, isSupported };
}
