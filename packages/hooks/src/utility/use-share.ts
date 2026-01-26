import { useState, useCallback } from "react";

/**
 * Options for the share data
 */
export interface ShareData {
    /** Title of the shared content */
    title?: string;
    /** Text description of the shared content */
    text?: string;
    /** URL to share */
    url?: string;
    /** Array of files to share */
    files?: File[];
}

/**
 * Return type for the useShare hook
 */
export interface UseShareReturn {
    /** Share data using the native share sheet */
    share: (data: ShareData) => Promise<boolean>;
    /** Whether sharing is supported */
    isSupported: boolean;
    /** Whether a share operation is in progress */
    isSharing: boolean;
    /** Error from the last share attempt */
    error: Error | null;
    /** Check if specific data can be shared */
    canShare: (data: ShareData) => boolean;
}

/**
 * A React hook for using the Web Share API to share content via the triggering device's native sharing mechanism.
 *
 * @returns UseShareReturn object with share function and state
 *
 * @example
 * ```tsx
 * const { share, isSupported } = useShare();
 *
 * return (
 *     <button onClick={() => share({ title: "Check this out", url: "https://example.com" })}>
 *         Share
 *     </button>
 * );
 * ```
 */
export function useShare(): UseShareReturn {
    const [isSharing, setIsSharing] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    // Check support
    const isSupported =
        typeof navigator !== "undefined" &&
        typeof navigator.share === "function";

    // Can share check
    const canShare = useCallback((data: ShareData): boolean => {
        if (
            typeof navigator === "undefined" ||
            typeof navigator.canShare !== "function"
        ) {
            return false;
        }
        return navigator.canShare(data);
    }, []);

    // Share function
    const share = useCallback(
        async (data: ShareData): Promise<boolean> => {
            if (!isSupported) {
                setError(new Error("Web Share API is not supported"));
                return false;
            }

            setIsSharing(true);
            setError(null);

            try {
                await navigator.share(data);
                return true;
            } catch (err) {
                // AbortError is common when user cancels, we treat it as an error but you might want to ignore it
                const error =
                    err instanceof Error ? err : new Error("Failed to share");
                setError(error);
                return false;
            } finally {
                setIsSharing(false);
            }
        },
        [isSupported],
    );

    return {
        share,
        isSupported,
        isSharing,
        error,
        canShare,
    };
}

export default useShare;
