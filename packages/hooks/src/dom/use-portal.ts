import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type UsePortalOptions = {
    /**
     * The ID of the container element.
     * @default "fiberui-portal"
     */
    id?: string;
    /**
     * A custom container element or ref to render the portal into.
     * If provided, `id` is ignored for creation purposes (though might be used if container is not found yet, but usually container takes precedence).
     */
    container?: HTMLElement | React.RefObject<HTMLElement | null>;
};

/**
 * A hook that manages a portal container in the DOM and returns a Portal component.
 *
 * @param options - Configuration options.
 * @returns An object containing the Portal component.
 */
export function usePortal(options: UsePortalOptions = {}) {
    const [container, setContainer] = useState<HTMLElement | null>(null);

    const { id = "fiberui-portal", container: customContainer } = options;

    useEffect(() => {
        // 1. If a custom container (element or ref) is provided, try to use it.
        if (customContainer) {
            const element =
                "current" in customContainer
                    ? customContainer.current
                    : customContainer;

            if (element) {
                setContainer(element);
                return;
            }
        }

        // 2. Otherwise, manage a DOM element with the given ID.
        // We only want to create/manage if we are NOT using a custom container
        // (or if custom container rendered null, but primarily for the ID case).
        if (!customContainer) {
            let element = document.getElementById(id);
            let created = false;

            if (!element) {
                created = true;
                element = document.createElement("div");
                element.setAttribute("id", id);
                document.body.appendChild(element);
            }

            setContainer(element);

            return () => {
                // Cleanup: only remove if we created it and it's empty
                if (created && element && element.parentNode) {
                    if (element.childNodes.length === 0) {
                        element.parentNode.removeChild(element);
                    }
                }
            };
        }
    }, [id, customContainer]);

    const Portal = React.useMemo(() => {
        const PortalComponent = ({
            children,
        }: {
            children: React.ReactNode;
        }) => {
            if (!container) return null;
            return createPortal(children, container);
        };
        return PortalComponent;
    }, [container]);

    return { Portal };
}
