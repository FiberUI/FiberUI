import { useState, useCallback, useRef, useEffect } from "react";
import {
    useEventListener,
    EventListenerOptions,
} from "@repo/hooks/dom/use-event-listener";

/**
 * useKeyPress - Detect when a specific key is pressed
 *
 * @param targetKey - The key to listen for (e.g., "Escape", "Enter", "a")
 * @param callback - Optional callback when key is pressed
 * @param options - Optional event listener options
 * @returns boolean indicating if the key is currently pressed
 *
 * @example
 * // Using the boolean state
 * const isEscapePressed = useKeyPress("Escape");
 *
 * // Using the callback
 * useKeyPress("Enter", () => submitForm());
 *
 * // With options
 * useKeyPress("Tab", () => handleTab(), { preventDefault: true });
 */
export function useKeyPress(
    targetKey: string,
    callback?: (event: KeyboardEvent) => void,
    options?: EventListenerOptions,
): boolean {
    const [isPressed, setIsPressed] = useState(false);
    const callbackRef = useRef(callback);

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (event.key.localeCompare(targetKey) === 0) {
                setIsPressed(true);
                callbackRef.current?.(event);
            }
        },
        [targetKey],
    );

    const handleKeyUp = useCallback(
        (event: KeyboardEvent) => {
            if (event.key.localeCompare(targetKey) === 0) {
                setIsPressed(false);
            }
        },
        [targetKey],
    );

    useEventListener("keydown", handleKeyDown, null, options);
    useEventListener("keyup", handleKeyUp);

    return isPressed;
}
