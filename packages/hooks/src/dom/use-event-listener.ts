import { RefObject, useEffect, useRef } from "react";

/**
 * Check if code is running in a browser environment.
 * This ensures SSR compatibility.
 */
const isBrowser = typeof window !== "undefined";

/**
 * Attaches an event listener to the window.
 *
 * @param eventName - The event name (e.g., 'resize', 'scroll', 'keydown').
 * @param handler - Callback function invoked when the event fires.
 * @param element - Leave undefined to attach to window.
 * @param options - Standard addEventListener options.
 */
export function useEventListener<K extends keyof WindowEventMap>(
    eventName: K,
    handler: (event: WindowEventMap[K]) => void,
    element?: null,
    options?: boolean | AddEventListenerOptions,
): void;

/**
 * Attaches an event listener to the document.
 *
 * @param eventName - The event name (e.g., 'visibilitychange', 'fullscreenchange').
 * @param handler - Callback function invoked when the event fires.
 * @param element - Pass "document" string to attach to document.
 * @param options - Standard addEventListener options.
 */
export function useEventListener<K extends keyof DocumentEventMap>(
    eventName: K,
    handler: (event: DocumentEventMap[K]) => void,
    element: "document",
    options?: boolean | AddEventListenerOptions,
): void;

/**
 * Attaches an event listener to an HTML element via ref.
 *
 * @param eventName - The event name (e.g., 'click', 'mouseenter', 'focus').
 * @param handler - Callback function invoked when the event fires.
 * @param element - A React ref pointing to the target element.
 * @param options - Standard addEventListener options.
 */
export function useEventListener<
    K extends keyof HTMLElementEventMap,
    T extends HTMLElement,
>(
    eventName: K,
    handler: (event: HTMLElementEventMap[K]) => void,
    element: RefObject<T | null>,
    options?: boolean | AddEventListenerOptions,
): void;

/**
 * Implementation
 */
export function useEventListener(
    eventName: string,
    handler: (event: Event) => void,
    element?: RefObject<HTMLElement | null> | "document" | null,
    options?: boolean | AddEventListenerOptions,
): void {
    // Store handler in ref to avoid effect re-runs when handler changes
    const handlerRef = useRef(handler);

    useEffect(() => {
        handlerRef.current = handler;
    }, [handler]);

    useEffect(() => {
        // SSR guard
        if (!isBrowser) return;

        // Resolve the target
        const target =
            element === "document" ? document : (element?.current ?? window);

        // Guard against null refs
        if (!target) return;

        // Wrapper that calls the latest handler
        const listener = (event: Event) => handlerRef.current(event);

        target.addEventListener(eventName, listener, options);

        return () => {
            target.removeEventListener(eventName, listener, options);
        };
    }, [eventName, element, options]);
}
