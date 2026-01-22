import { useState, useEffect, useCallback, useRef } from "react";

/**
 * Options for the useThrottledCallback hook
 */
export interface UseThrottledCallbackOptions {
    /** Interval in milliseconds between executions (default: 500) */
    interval?: number;
    /** If true, also execute on the trailing edge after throttle period ends */
    trailing?: boolean;
}

/**
 * Return type for useThrottledCallback hook
 */
export interface UseThrottledCallbackReturn<T extends (...args: any[]) => any> {
    /** The throttled function */
    throttledFn: (...args: Parameters<T>) => void;
    /** Whether currently in a throttle period */
    isThrottling: boolean;
    /** Cancel any pending trailing call */
    cancel: () => void;
}

/**
 * A React hook that returns a throttled version of a callback function.
 * The callback will execute at most once per interval, regardless of
 * how many times it's called.
 *
 * @param callback - The function to throttle
 * @param options - Configuration options
 * @returns UseThrottledCallbackReturn object with throttled function
 *
 * @example
 * ```tsx
 * const { throttledFn: handleScroll } = useThrottledCallback(
 *     (e: Event) => {
 *         console.log("Scroll position:", window.scrollY);
 *     },
 *     { interval: 100 }
 * );
 *
 * useEffect(() => {
 *     window.addEventListener("scroll", handleScroll);
 *     return () => window.removeEventListener("scroll", handleScroll);
 * }, [handleScroll]);
 * ```
 */
export function useThrottledCallback<T extends (...args: any[]) => any>(
    callback: T,
    options: UseThrottledCallbackOptions = {},
): UseThrottledCallbackReturn<T> {
    const { interval = 500, trailing = true } = options;

    const [isThrottling, setIsThrottling] = useState(false);
    const lastExecuted = useRef<number>(0);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const callbackRef = useRef<T>(callback);
    const lastArgsRef = useRef<Parameters<T> | null>(null);

    // Keep callback ref updated
    callbackRef.current = callback;

    // Cancel any pending trailing call
    const cancel = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setIsThrottling(false);
        lastArgsRef.current = null;
    }, []);

    // The throttled function
    const throttledFn = useCallback(
        (...args: Parameters<T>) => {
            const now = Date.now();
            const timeSinceLastExecution = now - lastExecuted.current;

            lastArgsRef.current = args;

            // If enough time has passed, execute immediately
            if (timeSinceLastExecution >= interval) {
                callbackRef.current(...args);
                lastExecuted.current = now;
                setIsThrottling(false);

                // Clear any pending trailing call
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                    timeoutRef.current = null;
                }
            } else {
                // We're in a throttle period
                setIsThrottling(true);

                // Schedule trailing call if enabled and not already scheduled
                if (trailing && !timeoutRef.current) {
                    const timeRemaining = interval - timeSinceLastExecution;
                    timeoutRef.current = setTimeout(() => {
                        if (lastArgsRef.current) {
                            callbackRef.current(...lastArgsRef.current);
                            lastExecuted.current = Date.now();
                        }
                        setIsThrottling(false);
                        timeoutRef.current = null;
                        lastArgsRef.current = null;
                    }, timeRemaining);
                }
            }
        },
        [interval, trailing],
    );

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return {
        throttledFn,
        isThrottling,
        cancel,
    };
}

export default useThrottledCallback;
