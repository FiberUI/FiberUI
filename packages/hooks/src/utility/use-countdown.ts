import { useState, useEffect, useRef, useCallback } from "react";

/**
 * Options for the useCountdown hook
 */
export interface UseCountdownOptions {
    /** Interval in milliseconds (default: 1000) */
    intervalMs?: number;
    /** Whether to increment instead of decrement (default: false) */
    isIncrement?: boolean;
    /** Value to stop at (default: 0) */
    countStop?: number;
    /** Callback when countdown completes */
    onComplete?: () => void;
}

/**
 * Return type for the useCountdown hook
 */
export interface UseCountdownReturn {
    /** Current count value */
    count: number;
    /** Start the countdown (optionally override duration) */
    start: (seconds?: number) => void;
    /** Stop/Pause the countdown */
    stop: () => void;
    /** Reset the countdown to initial value */
    reset: () => void;
    /** Whether the countdown is currently active */
    isRunning: boolean;
}

/**
 * A React hook for managing countdowns and timers.
 *
 * @param countStart - Starting count value (in seconds/units)
 * @param options - Configuration options for the countdown
 * @returns UseCountdownReturn object with count and control methods
 */
export function useCountdown(
    countStart: number,
    options: UseCountdownOptions = {},
): UseCountdownReturn {
    const {
        intervalMs = 1000,
        isIncrement = false,
        countStop = 0,
        onComplete,
    } = options;
    const [count, setCount] = useState(countStart);
    const [isRunning, setIsRunning] = useState(false);
    const callbackRef = useRef(onComplete);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Keep callback ref updated
    useEffect(() => {
        callbackRef.current = onComplete;
    }, [onComplete]);

    const stop = useCallback(() => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
        setIsRunning(false);
    }, []);

    const start = useCallback(
        (seconds?: number) => {
            if (isRunning) return;

            if (seconds !== undefined) {
                setCount(seconds);
            }

            setIsRunning(true);
            timerRef.current = setInterval(() => {
                setCount((prevCount) => {
                    const nextCount = isIncrement
                        ? prevCount + 1
                        : prevCount - 1;

                    if (
                        isIncrement
                            ? nextCount >= countStop
                            : nextCount <= countStop
                    ) {
                        stop();
                        callbackRef.current?.();
                        return countStop;
                    }

                    return nextCount;
                });
            }, intervalMs);
        },
        [countStop, intervalMs, isIncrement, isRunning, stop],
    );

    const reset = useCallback(() => {
        stop();
        setCount(countStart);
    }, [countStart, stop]);

    // Cleanup on unmount
    useEffect(() => {
        return () => stop();
    }, [stop]);

    return {
        count,
        start,
        stop,
        reset,
        isRunning,
    };
}
