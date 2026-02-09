"use client";
import { RefObject, useEffect, useRef } from "react";

/**
 * Check if code is running in a browser environment.
 * This ensures SSR compatibility.
 */
const isBrowser = typeof window !== "undefined";

/**
 * Extended options for useEventListener
 */
export interface EventListenerOptions extends AddEventListenerOptions {
    /** Prevent default browser behavior when event fires */
    preventDefault?: boolean;
    /** Stop event propagation when event fires */
    stopPropagation?: boolean;
}

/**
 * Attaches an event listener to the window.
 *
 * @param eventName - The event name (e.g., 'resize', 'scroll', 'keydown').
 * @param handler - Callback function invoked when the event fires.
 * @param element - Leave undefined to attach to window.
 * @param options - Extended addEventListener options with preventDefault/stopPropagation.
 */
export function useEventListener<K extends keyof WindowEventMap>(
    eventName: K,
    handler: (event: WindowEventMap[K]) => void,
    element?: null,
    options?: boolean | EventListenerOptions,
): void;

/**
 * Attaches an event listener to the document.
 *
 * @param eventName - The event name (e.g., 'visibilitychange', 'fullscreenchange').
 * @param handler - Callback function invoked when the event fires.
 * @param element - Pass "document" string to attach to document.
 * @param options - Extended addEventListener options with preventDefault/stopPropagation.
 */
export function useEventListener<K extends keyof DocumentEventMap>(
    eventName: K,
    handler: (event: DocumentEventMap[K]) => void,
    element: "document",
    options?: boolean | EventListenerOptions,
): void;

/**
 * Attaches an event listener to an HTML element via ref.
 *
 * @param eventName - The event name (e.g., 'click', 'mouseenter', 'focus').
 * @param handler - Callback function invoked when the event fires.
 * @param element - A React ref pointing to the target element.
 * @param options - Extended addEventListener options with preventDefault/stopPropagation.
 */
export function useEventListener<
    K extends keyof HTMLElementEventMap,
    T extends HTMLElement,
>(
    eventName: K,
    handler: (event: HTMLElementEventMap[K]) => void,
    element: RefObject<T | null>,
    options?: boolean | EventListenerOptions,
): void;

/**
 * Implementation
 */
export function useEventListener(
    eventName: string,
    handler: (event: Event) => void,
    element?: RefObject<HTMLElement | null> | "document" | null,
    options?: boolean | EventListenerOptions,
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

        // Extract custom options
        const extendedOptions = typeof options === "object" ? options : {};
        const { preventDefault, stopPropagation, ...nativeOptions } =
            extendedOptions;

        // Wrapper that calls the latest handler with optional prevent/stop
        const listener = (event: Event) => {
            if (preventDefault) event.preventDefault();
            if (stopPropagation) event.stopPropagation();
            handlerRef.current(event);
        };

        const listenerOptions =
            typeof options === "boolean" ? options : nativeOptions;

        target.addEventListener(eventName, listener, listenerOptions);

        return () => {
            target.removeEventListener(eventName, listener, listenerOptions);
        };
    }, [eventName, element, options]);
}
