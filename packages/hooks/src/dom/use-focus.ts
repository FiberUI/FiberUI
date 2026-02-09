import { RefObject, useState, useCallback, useRef, useEffect } from "react";
import {
    useEventListener,
    EventListenerOptions,
} from "@repo/hooks/dom/use-event-listener";

/**
 * useFocus - Track focus state on an element
 *
 * @param ref - React ref pointing to the target element
 * @param callback - Optional callback when focus state changes
 * @param options - Optional event listener options
 * @returns boolean indicating if the element is currently focused
 *
 * @example
 * const ref = useRef<HTMLInputElement>(null);
 * const isFocused = useFocus(ref);
 *
 * // With callback
 * const isFocused = useFocus(ref, (focused) => console.log(focused));
 */
export function useFocus<T extends HTMLElement>(
    ref: RefObject<T | null>,
    callback?: (isFocused: boolean, event: FocusEvent) => void,
    options?: EventListenerOptions,
): boolean {
    const [isFocused, setIsFocused] = useState(false);
    const callbackRef = useRef(callback);

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    const handleFocus = useCallback((event: FocusEvent) => {
        setIsFocused(true);
        callbackRef.current?.(true, event);
    }, []);

    const handleBlur = useCallback((event: FocusEvent) => {
        setIsFocused(false);
        callbackRef.current?.(false, event);
    }, []);

    useEventListener("focus", handleFocus, ref, options);
    useEventListener("blur", handleBlur, ref, options);

    return isFocused;
}
