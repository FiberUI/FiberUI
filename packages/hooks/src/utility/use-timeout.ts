import { useEffect, useRef, useCallback } from "react";

/**
 * Return type for useTimeout hook.
 */
export interface UseTimeoutReturn {
    /**
     * Clears the active timeout safely.
     */
    clear: () => void;
    /**
     * Resets the timeout (clears existing and starts a new one).
     */
    reset: () => void;
}

/**
 * A React hook for handling `setTimeout` with manual controls.
 *
 * - **Auto-Cleanup:** Clears timeout on unmount.
 * - **Resettable:** Great for delaying actions (like hiding a tooltip).
 * - **Stale Closure Safe:** Callback always has access to fresh state.
 *
 * @param callback - The function to execute after the delay.
 * @param delay - The delay in milliseconds. Pass `null` to prevent execution.
 * @returns An object containing `clear` and `reset` functions.
 *
 * @example
 * ```tsx
 * const { reset, clear } = useTimeout(() => {
 * setShowModal(false);
 * }, 5000);
 *
 * // Reset the timer if the user moves their mouse
 * <div onMouseMove={reset}>
 * Don't hide me yet!
 * </div>
 * ```
 */
export function useTimeout(
    callback: () => void,
    delay: number | null,
): UseTimeoutReturn {
    const savedCallback = useRef(callback);
    const timeoutId = useRef<number | null>(null);

    // 1. Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // 2. Define control functions (memoized to be stable dependencies)

    const clear = useCallback(() => {
        if (timeoutId.current) {
            clearTimeout(timeoutId.current);
            timeoutId.current = null;
        }
    }, []);

    const set = useCallback(() => {
        if (delay === null) return;

        timeoutId.current = setTimeout(() => {
            savedCallback.current();
        }, delay);
    }, [delay]);

    const reset = useCallback(() => {
        clear();
        set();
    }, [clear, set]);

    // 3. Set up the timeout on mount or delay change
    useEffect(() => {
        set();
        return clear;
    }, [delay, set, clear]);

    return { clear, reset };
}

export default useTimeout;
