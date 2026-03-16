import { useState, useEffect } from "react";

/**
 * Get the number of logical CPU cores (navigator.hardwareConcurrency).
 * Useful for auto-scaling thread pools or adjusting graphics settings.
 * Returns a fallback of 1 if not supported or during SSR.
 */
export function useHardwareConcurrency() {
    const [concurrency, setConcurrency] = useState<number>(1);

    useEffect(() => {
        if (
            typeof navigator !== "undefined" &&
            "hardwareConcurrency" in navigator
        ) {
            setConcurrency(navigator.hardwareConcurrency);
        }
    }, []);

    return concurrency;
}
