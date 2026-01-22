import { useState, useEffect, useCallback, useRef } from "react";

/**
 * Options for the useThrottledState hook
 */
export interface UseThrottledStateOptions {
    /** Interval in milliseconds between updates (default: 500) */
    interval?: number;
    /** If true, also update on the trailing edge after throttle period ends */
    trailing?: boolean;
}

/**
 * Return type for useThrottledState hook
 */
export interface UseThrottledStateReturn<T> {
    /** The throttled value */
    throttledValue: T;
    /** Whether currently in a throttle period */
    isThrottling: boolean;
}

/**
 * A React hook that throttles a value. The throttled value updates at most
 * once per interval, regardless of how often the source value changes.
 *
 * @param value - The value to throttle
 * @param options - Configuration options
 * @returns UseThrottledStateReturn object with throttled value
 *
 * @example
 * ```tsx
 * const [scrollY, setScrollY] = useState(0);
 * const { throttledValue } = useThrottledState(scrollY, { interval: 100 });
 *
 * // throttledValue updates at most every 100ms, even if scrollY changes rapidly
 * ```
 */
export function useThrottledState<T>(
    value: T,
    options: UseThrottledStateOptions = {},
): UseThrottledStateReturn<T> {
    const { interval = 500, trailing = true } = options;

    const [throttledValue, setThrottledValue] = useState<T>(value);
    const [isThrottling, setIsThrottling] = useState(false);
    const lastExecuted = useRef<number>(0);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const latestValue = useRef<T>(value);

    // Keep track of the latest value
    latestValue.current = value;

    useEffect(() => {
        const now = Date.now();
        const timeSinceLastExecution = now - lastExecuted.current;

        // If enough time has passed, update immediately
        if (timeSinceLastExecution >= interval) {
            setThrottledValue(value);
            lastExecuted.current = now;
            setIsThrottling(false);
        } else {
            // Otherwise, schedule an update for the trailing edge
            setIsThrottling(true);

            if (trailing) {
                // Clear any existing timeout
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                }

                // Schedule update at the end of the interval
                const timeRemaining = interval - timeSinceLastExecution;
                timeoutRef.current = setTimeout(() => {
                    setThrottledValue(latestValue.current);
                    lastExecuted.current = Date.now();
                    setIsThrottling(false);
                    timeoutRef.current = null;
                }, timeRemaining);
            }
        }

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [value, interval, trailing]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return {
        throttledValue,
        isThrottling,
    };
}

export default useThrottledState;
