import { useState, useCallback, useEffect, useRef } from "react";

/**
 * Return type for the useWakeLock hook
 */
export interface UseWakeLockReturn {
    /** Whether the wake lock is currently active */
    isActive: boolean;
    /** Whether the Screen Wake Lock API is supported */
    isSupported: boolean;
    /** Request a wake lock */
    request: () => Promise<boolean>;
    /** Release the wake lock */
    release: () => Promise<boolean>;
    /** Error from the last operation */
    error: Error | null;
}

// Type definitions for Screen Wake Lock API
// These are often already in lib.dom.d.ts but strictly typing local interfaces helps if libs are old
interface WakeLockSentinel extends EventTarget {
    readonly released: boolean;
    readonly type: "screen";
    release(): Promise<void>;
    onrelease: ((this: WakeLockSentinel, ev: Event) => void) | null;
}

interface WakeLock {
    request(type: "screen"): Promise<WakeLockSentinel>;
}

// Extend Navigator if not already defined correctly in environment
// We use a safe augmentation or just cast usage
declare global {
    interface Navigator {
        // Only add if not present, but TS merging rules make this hard if it conflicts.
        // Best to just rely on usage casting if conflict exists.
        // wakeLock?: WakeLock;
    }
}

/**
 * A React hook that provides access to the Screen Wake Lock API,
 * allowing you to prevent the device screen from dimming or locking.
 *
 * @returns UseWakeLockReturn object with state and controls
 */
export function useWakeLock(): UseWakeLockReturn {
    const [isActive, setIsActive] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const sentinelRef = useRef<WakeLockSentinel | null>(null);

    // Check support
    const isSupported =
        typeof navigator !== "undefined" && "wakeLock" in navigator;

    // Release function
    const release = useCallback(async () => {
        if (!sentinelRef.current) return false;

        try {
            await sentinelRef.current.release();
            sentinelRef.current = null;
            setIsActive(false);
            return true;
        } catch (err) {
            const error =
                err instanceof Error
                    ? err
                    : new Error("Failed to release lock");
            setError(error);
            return false;
        }
    }, []);

    // Request function
    const request = useCallback(async () => {
        if (!isSupported) {
            setError(new Error("Screen Wake Lock API is not supported"));
            return false;
        }

        try {
            const sentinel = await navigator.wakeLock!.request("screen");
            sentinelRef.current = sentinel;
            setIsActive(true);
            setError(null);

            // Handle automatic release (e.g. user switches tabs)
            sentinel.onrelease = () => {
                // If it was released externally (not by us calling release())
                // we should update state.
                if (sentinelRef.current === sentinel) {
                    // Released by system
                    setIsActive(false);
                    sentinelRef.current = null;
                }
            };

            return true;
        } catch (err) {
            const error =
                err instanceof Error
                    ? err
                    : new Error("Failed to request lock");
            setError(error);
            return false;
        }
    }, [isSupported]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (sentinelRef.current) {
                sentinelRef.current.release().catch(() => {});
            }
        };
    }, []);

    return {
        isActive,
        isSupported,
        request,
        release,
        error,
    };
}

export default useWakeLock;
