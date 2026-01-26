import { useState, useCallback, useEffect } from "react";

/**
 * Return type for the usePictureInPicture hook
 */
export interface UsePictureInPictureReturn {
    /** Whether Picture-in-Picture is currently active */
    isActive: boolean;
    /** Whether Picture-in-Picture is supported by the browser */
    isSupported: boolean;
    /** Whether the PiP window is currently active */
    window: PictureInPictureWindow | null;
    /** Enter Picture-in-Picture mode for a video element */
    enter: (element: HTMLVideoElement) => Promise<void>;
    /** Exit Picture-in-Picture mode */
    exit: () => Promise<void>;
    /** Toggle Picture-in-Picture mode */
    toggle: (element: HTMLVideoElement) => Promise<void>;
}

/**
 * A React hook for managing Picture-in-Picture mode for video elements.
 *
 * @returns UsePictureInPictureReturn object with state and control methods
 */
export function usePictureInPicture(): UsePictureInPictureReturn {
    const [isActive, setIsActive] = useState(false);
    const [pipWindow, setPipWindow] = useState<PictureInPictureWindow | null>(
        null,
    );

    // Check support
    const isSupported =
        typeof document !== "undefined" &&
        "pictureInPictureEnabled" in document;

    // Handle enter PiP
    const enter = useCallback(
        async (element: HTMLVideoElement) => {
            if (!isSupported || !element) return;

            try {
                if (element.requestPictureInPicture) {
                    const window = await element.requestPictureInPicture();
                    setPipWindow(window);
                    setIsActive(true);
                }
            } catch (err) {
                console.error("Failed to enter Picture-in-Picture:", err);
            }
        },
        [isSupported],
    );

    // Handle exit PiP
    const exit = useCallback(async () => {
        if (!isSupported || !document.pictureInPictureElement) return;

        try {
            await document.exitPictureInPicture();
            setPipWindow(null);
            setIsActive(false);
        } catch (err) {
            console.error("Failed to exit Picture-in-Picture:", err);
        }
    }, [isSupported]);

    // Toggle PiP
    const toggle = useCallback(
        async (element: HTMLVideoElement) => {
            if (isActive) {
                await exit();
            } else {
                await enter(element);
            }
        },
        [isActive, enter, exit],
    );

    // Listen for PiP events
    useEffect(() => {
        if (!isSupported) return;

        const onEnter = (e: Event) => {
            const target = e.target as HTMLVideoElement;
            // We can't easily get the pipWindow here without the promise return,
            // but we know it's active.
            setIsActive(true);
        };

        const onExit = () => {
            setIsActive(false);
            setPipWindow(null);
        };

        // Note: These events fire on the video element, not document.
        // But since we don't hold the ref to the element in the hook state (to avoid re-renders or complexity),
        // we rely on the manual enter/exit calls for primary state logic.
        // However, external toggles (like browser UI) need to be caught.
        // To do this properly globally is hard without the ref properly passed.
        // A common pattern is to just listen to document for 'enterpictureinpicture' but that event is on the element.
        // Better approach: User passes ref? Or we return a ref?
        // Or we just rely on the user to use the toggle controls provided.
        // For robustness, let's keep it simple: controls drive the state.
        // But if the user closes the PiP window via the "X" button, we need to know.

        // We can listen to 'leavepictureinpicture' on the document (capturing phase) to detect exit?
        // Actually, 'leavepictureinpicture' bubbles? MDN says "The event bubbles".
        const handleLeave = () => {
            if (!document.pictureInPictureElement) {
                setIsActive(false);
                setPipWindow(null);
            }
        };

        const handleEnter = () => {
            if (document.pictureInPictureElement) {
                setIsActive(true);
            }
        };

        document.addEventListener("leavepictureinpicture", handleLeave, true);
        document.addEventListener("enterpictureinpicture", handleEnter, true);

        return () => {
            document.removeEventListener(
                "leavepictureinpicture",
                handleLeave,
                true,
            );
            document.removeEventListener(
                "enterpictureinpicture",
                handleEnter,
                true,
            );
        };
    }, [isSupported]);

    return {
        isActive,
        isSupported,
        window: pipWindow,
        enter,
        exit,
        toggle,
    };
}

export default usePictureInPicture;
