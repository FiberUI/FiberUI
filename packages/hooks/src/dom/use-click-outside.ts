import { RefObject, useEffect, useRef } from "react";

type Handler = (event: MouseEvent | TouchEvent) => void;

/**
 * A hook that detects clicks outside of the specified element and calls the provided handler.
 *
 * @param ref - The ref of the element to detect clicks outside of.
 * @param handler - The function to call when a click outside occurs.
 * @param mouseEvent - The mouse event to listen for. Defaults to "mousedown".
 */
export function useClickOutside<T extends HTMLElement = HTMLElement>(
    ref: RefObject<T | null>,
    handler: Handler,
    mouseEvent: "mousedown" | "mouseup" = "mousedown",
): void {
    const savedHandler = useRef<Handler>(handler);

    // Update the saved handler if it changes, to avoid re-running the effect
    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(() => {
        const listener = (event: MouseEvent | TouchEvent) => {
            const el = ref?.current;

            // Do nothing if clicking ref's element or descendent elements
            if (!el || el.contains(event.target as Node)) {
                return;
            }

            savedHandler.current(event);
        };

        document.addEventListener(mouseEvent, listener);
        document.addEventListener("touchstart", listener);

        return () => {
            document.removeEventListener(mouseEvent, listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, mouseEvent]);
}
