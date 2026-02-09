import { useState, useCallback, useRef, useEffect } from "react";
import {
    useEventListener,
    EventListenerOptions,
} from "@repo/hooks/dom/use-event-listener";

interface KeyCombo {
    /** The main key (e.g., "a", "s", "Escape", "Enter") */
    key: string;
    /** Require Ctrl key (Cmd on Mac for cross-platform shortcuts) */
    ctrl?: boolean;
    /** Require Meta key (Cmd on Mac, Win on Windows) */
    meta?: boolean;
    /** Require Shift key */
    shift?: boolean;
    /** Require Alt key (Option on Mac) */
    alt?: boolean;
}

/**
 * useComboKeyPress - Detect keyboard shortcuts with modifier keys
 *
 * @param combo - The key combination to detect
 * @param callback - Optional callback when combo is pressed
 * @param options - Optional event listener options (preventDefault defaults to true)
 * @returns boolean indicating if the combo is currently pressed
 *
 * @example
 * // Using the boolean state
 * const isSavePressed = useComboKeyPress({ key: "s", ctrl: true });
 *
 * // With callback (Ctrl+S or Cmd+S on Mac)
 * useComboKeyPress({ key: "s", ctrl: true }, () => save());
 *
 * // Ctrl+Shift+A
 * const isSelectAllPressed = useComboKeyPress(
 *   { key: "a", ctrl: true, shift: true },
 *   () => selectAll()
 * );
 */
export function useComboKeyPress(
    combo: KeyCombo,
    callback?: (event: KeyboardEvent) => void,
    options: EventListenerOptions = { preventDefault: true },
): boolean {
    const [isPressed, setIsPressed] = useState(false);
    const callbackRef = useRef(callback);

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    const matchesCombo = useCallback(
        (event: KeyboardEvent): boolean => {
            const keyMatches =
                event.key.localeCompare(combo.key, undefined, {
                    sensitivity: "base",
                }) === 0;

            const ctrlMatches = combo.ctrl
                ? event.ctrlKey || event.metaKey
                : !event.ctrlKey && !event.metaKey;
            const shiftMatches = combo.shift ? event.shiftKey : !event.shiftKey;
            const altMatches = combo.alt ? event.altKey : !event.altKey;

            return keyMatches && ctrlMatches && shiftMatches && altMatches;
        },
        [combo],
    );

    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (matchesCombo(event)) {
                setIsPressed(true);
                callbackRef.current?.(event);
            }
        },
        [matchesCombo],
    );

    const handleKeyUp = useCallback(
        (event: KeyboardEvent) => {
            if (matchesCombo(event)) {
                setIsPressed(false);
            }
        },
        [matchesCombo],
    );

    useEventListener("keydown", handleKeyDown, null, options);
    useEventListener("keyup", handleKeyUp);

    return isPressed;
}
