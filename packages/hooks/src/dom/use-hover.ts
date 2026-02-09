import { RefObject, useState, useCallback, useRef, useEffect } from "react";
import {
    useEventListener,
    EventListenerOptions,
} from "@repo/hooks/dom/use-event-listener";

/**
 * useHover - Track hover state on an element
 *
 * @param ref - React ref pointing to the target element
 * @param callback - Optional callback when hover state changes
 * @param options - Optional event listener options
 * @returns boolean indicating if the element is currently hovered
 *
 * @example
 * const ref = useRef<HTMLDivElement>(null);
 * const isHovered = useHover(ref);
 *
 * // With callback
 * const isHovered = useHover(ref, (hovered) => console.log(hovered));
 */
export function useHover<T extends HTMLElement>(
    ref: RefObject<T | null>,
    callback?: (isHovered: boolean, event: MouseEvent) => void,
    options?: EventListenerOptions,
): boolean {
    const [isHovered, setIsHovered] = useState(false);
    const callbackRef = useRef(callback);

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    const handleMouseEnter = useCallback((event: MouseEvent) => {
        setIsHovered(true);
        callbackRef.current?.(true, event);
    }, []);

    const handleMouseLeave = useCallback((event: MouseEvent) => {
        setIsHovered(false);
        callbackRef.current?.(false, event);
    }, []);

    useEventListener("mouseenter", handleMouseEnter, ref, options);
    useEventListener("mouseleave", handleMouseLeave, ref, options);

    return isHovered;
}
