import { useEffect, useRef } from "react";

/**
 * A declarative React hook for `setInterval`.
 *
 * - **Stale Closure Safe:** Always executes the latest version of the callback without restarting the timer.
 * - **Pausable:** Pass `null` as the delay to pause the interval.
 * - **Auto-Cleanup:** Clears the interval when the component unmounts or delay changes.
 *
 * @param callback - The function to execute on every tick.
 * @param delay - The delay in milliseconds. Pass `null` to pause.
 *
 * @example
 * ```tsx
 * // Basic usage
 * useInterval(() => {
 * setCount(count + 1);
 * }, 1000);
 *
 * // Pausable usage
 * useInterval(() => {
 * console.log("Polling...");
 * }, isPaused ? null : 3000);
 * ```
 */
export function useInterval(
  callback: () => void,
  delay: number | null
): void {
  // 1. Keep a reference to the latest callback.
  // This avoids the "stale closure" problem where the interval
  // executes an old version of the function that sees old state.
  const savedCallback = useRef(callback);

  // Update the ref each render so the interval always sees the latest state
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // 2. Set up the interval.
  useEffect(() => {
    // Don't schedule if no delay is specified.
    // Note: 0 is a valid value for delay (it pushes to the next event loop tick).
    if (delay === null) {
      return;
    }

    const handler = () => {
      savedCallback.current();
    };

    const id = setInterval(handler, delay);

    // Cleanup: Clear interval when component unmounts or delay changes
    return () => clearInterval(id);
  }, [delay]);
}

export default useInterval;