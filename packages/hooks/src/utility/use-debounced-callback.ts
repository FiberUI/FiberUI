import { useState, useEffect, useCallback, useRef } from "react";

/**
 * Options for the useDebouncedCallback hook
 */
export interface UseDebouncedCallbackOptions {
    /** Delay in milliseconds before the callback executes (default: 500) */
    delay?: number;
    /** If true, execute immediately on the first call, then debounce subsequent calls */
    leading?: boolean;
}

/**
 * Return type for useDebouncedCallback hook
 */
export interface UseDebouncedCallbackReturn<T extends (...args: any[]) => any> {
    /** The debounced function */
    debouncedFn: (...args: Parameters<T>) => void;
    /** Whether a call is pending */
    isPending: boolean;
    /** Cancel the pending call */
    cancel: () => void;
    /** Immediately execute with the last arguments */
    flush: () => void;
}

/**
 * A React hook that returns a debounced version of a callback function.
 * The callback will only be invoked after the specified delay has passed
 * without being called again.
 *
 * @param callback - The function to debounce
 * @param options - Configuration options
 * @returns UseDebouncedCallbackReturn object with debounced function and controls
 *
 * @example
 * ```tsx
 * const { debouncedFn: handleSearch } = useDebouncedCallback(
 *     (query: string) => {
 *         console.log("Searching for:", query);
 *         fetchResults(query);
 *     },
 *     { delay: 300 }
 * );
 *
 * <input onChange={(e) => handleSearch(e.target.value)} />
 * ```
 */
export function useDebouncedCallback<T extends (...args: any[]) => any>(
    callback: T,
    options: UseDebouncedCallbackOptions = {},
): UseDebouncedCallbackReturn<T> {
    const { delay = 500, leading = false } = options;

    const [isPending, setIsPending] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const callbackRef = useRef<T>(callback);
    const lastArgsRef = useRef<Parameters<T> | null>(null);
    const isFirstCall = useRef(true);

    // Keep callback ref updated
    callbackRef.current = callback;

    // Cancel pending timeout
    const cancel = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setIsPending(false);
        lastArgsRef.current = null;
    }, []);

    // Flush and execute immediately
    const flush = useCallback(() => {
        if (timeoutRef.current && lastArgsRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
            callbackRef.current(...lastArgsRef.current);
            lastArgsRef.current = null;
        }
        setIsPending(false);
    }, []);

    // The debounced function
    const debouncedFn = useCallback(
        (...args: Parameters<T>) => {
            lastArgsRef.current = args;

            // Handle leading edge
            if (leading && isFirstCall.current) {
                isFirstCall.current = false;
                callbackRef.current(...args);
                return;
            }

            isFirstCall.current = false;
            setIsPending(true);

            // Clear previous timeout
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            // Set new timeout
            timeoutRef.current = setTimeout(() => {
                callbackRef.current(...args);
                setIsPending(false);
                timeoutRef.current = null;
                lastArgsRef.current = null;
            }, delay);
        },
        [delay, leading],
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
        debouncedFn,
        isPending,
        cancel,
        flush,
    };
}

export default useDebouncedCallback;
