import { useState, useEffect, useCallback, useRef } from "react";

/**
 * Options for the useDebouncedState hook
 */
export interface UseDebouncedStateOptions {
    /** Delay in milliseconds before the value updates (default: 500) */
    delay?: number;
    /** If true, update immediately on the first call, then debounce subsequent calls */
    leading?: boolean;
}

/**
 * Return type for useDebouncedState hook
 */
export interface UseDebouncedStateReturn<T> {
    /** The debounced value */
    debouncedValue: T;
    /** Whether a debounce is pending */
    isPending: boolean;
    /** Cancel the pending debounce and keep current debounced value */
    cancel: () => void;
    /** Immediately flush the pending value */
    flush: () => void;
}

/**
 * A React hook that debounces a value. The debounced value will only update
 * after the specified delay has passed without the value changing.
 *
 * @param value - The value to debounce
 * @param options - Configuration options
 * @returns UseDebouncedStateReturn object with debounced value and control functions
 *
 * @example
 * ```tsx
 * const [searchTerm, setSearchTerm] = useState("");
 * const { debouncedValue, isPending } = useDebouncedState(searchTerm, { delay: 300 });
 *
 * useEffect(() => {
 *     // This runs only after user stops typing for 300ms
 *     fetchSearchResults(debouncedValue);
 * }, [debouncedValue]);
 * ```
 */
export function useDebouncedState<T>(
    value: T,
    options: UseDebouncedStateOptions = {},
): UseDebouncedStateReturn<T> {
    const { delay = 500, leading = false } = options;

    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    const [isPending, setIsPending] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const isFirstRender = useRef(true);
    const latestValue = useRef<T>(value);

    // Keep track of the latest value for flush
    latestValue.current = value;

    // Cancel any pending timeout
    const cancel = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setIsPending(false);
    }, []);

    // Immediately update to the latest value
    const flush = useCallback(() => {
        cancel();
        setDebouncedValue(latestValue.current);
    }, [cancel]);

    useEffect(() => {
        // Handle leading edge
        if (leading && isFirstRender.current) {
            isFirstRender.current = false;
            setDebouncedValue(value);
            return;
        }

        isFirstRender.current = false;

        // Skip if value hasn't changed
        if (value === debouncedValue && !isPending) {
            return;
        }

        setIsPending(true);

        // Clear previous timeout
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Set new timeout
        timeoutRef.current = setTimeout(() => {
            setDebouncedValue(value);
            setIsPending(false);
            timeoutRef.current = null;
        }, delay);

        // Cleanup on unmount or when dependencies change
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [value, delay, leading]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return {
        debouncedValue,
        isPending,
        cancel,
        flush,
    };
}

export default useDebouncedState;
