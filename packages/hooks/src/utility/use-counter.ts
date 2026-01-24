import { useState, useCallback } from "react";

/**
 * Options for the useCounter hook
 */
export interface UseCounterOpts {
    /** Default step value for increment/decrement (default: 1) */
    step?: number;
    /** Minimum value limit */
    min?: number;
    /** Maximum value limit */
    max?: number;
}

/**
 * Return type for the useCounter hook
 */
export interface UseCounterReturn {
    /** Current counter value */
    count: number;
    /** Reset counter to initial value */
    reset: () => void;
    /** Increment counter by step */
    increment: () => void;
    /** Decrement counter by step */
    decrement: () => void;
    /** Set counter to a specific value */
    setCount: (value: number) => void;
    /** Increment counter by specific value */
    incrementBy: (value: number) => void;
    /** Decrement counter by specific value */
    decrementBy: (value: number) => void;
    /** Whether count can be incremented (not at max) */
    canIncrement: boolean;
    /** Whether count can be decremented (not at min) */
    canDecrement: boolean;
}

/**
 * A React hook for managing a counter state with increment, decrement, and reset capabilities.
 *
 * @param initialCount - The initial value of the counter (default: 0)
 * @param options - Options object for step, min, and max limits
 * @returns UseCounterReturn object with count and control methods
 */

export const useCounter = (
    initialCount: number = 0,
    options: UseCounterOpts = {},
): UseCounterReturn => {
    const { step = 1, min, max } = options;

    const [count, setInternalCount] = useState(() => {
        let val = initialCount;
        if (min !== undefined) val = Math.max(val, min);
        if (max !== undefined) val = Math.min(val, max);
        return val;
    });

    const increment = useCallback(() => {
        setInternalCount((c) => {
            const next = c + step;
            if (max !== undefined && next > max) return max;
            if (min !== undefined && next < min) return min;
            return next;
        });
    }, [step, max, min]);

    const decrement = useCallback(() => {
        setInternalCount((c) => {
            const next = c - step;
            if (min !== undefined && next < min) return min;
            if (max !== undefined && next > max) return max;
            return next;
        });
    }, [step, min, max]);

    const setCount = useCallback(
        (val: number) => {
            setInternalCount(() => {
                let next = val;
                if (min !== undefined) next = Math.max(next, min);
                if (max !== undefined) next = Math.min(next, max);
                return next;
            });
        },
        [min, max],
    );

    const incrementBy = useCallback(
        (val: number) => {
            setInternalCount((c) => {
                const next = c + val;
                if (max !== undefined && next > max) return max;
                if (min !== undefined && next < min) return min;
                return next;
            });
        },
        [max, min],
    );

    const decrementBy = useCallback(
        (val: number) => {
            setInternalCount((c) => {
                const next = c - val;
                if (min !== undefined && next < min) return min;
                if (max !== undefined && next > max) return max;
                return next;
            });
        },
        [min, max],
    );

    const reset = useCallback(() => {
        let val = initialCount;
        if (min !== undefined) val = Math.max(val, min);
        if (max !== undefined) val = Math.min(val, max);
        setInternalCount(val);
    }, [initialCount, min, max]);

    return {
        count,
        setCount,
        reset,
        increment,
        decrement,
        incrementBy,
        decrementBy,
        canIncrement: max === undefined || count < max,
        canDecrement: min === undefined || count > min,
    };
};
