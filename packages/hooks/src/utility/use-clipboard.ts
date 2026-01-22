import { useState, useCallback } from "react";

/**
 * Options for the useClipboard hook
 */
export interface UseClipboardOptions {
    /** Duration in milliseconds before `hasCopied` resets to false (default: 2000) */
    timeout?: number;
}

/**
 * Return type for the useClipboard hook
 */
export interface UseClipboardReturn {
    /** Copy text to clipboard */
    copy: (text: string) => Promise<boolean>;
    /** Read text from clipboard (requires permission) */
    read: () => Promise<string | null>;
    /** Whether copying is in progress */
    isCopying: boolean;
    /** Whether text was recently copied (resets after timeout) */
    hasCopied: boolean;
    /** The last copied text value */
    copiedValue: string | null;
    /** Error if copy/read operation failed */
    error: Error | null;
    /** Whether the Clipboard API is supported */
    isSupported: boolean;
    /** Reset hasCopied state manually */
    reset: () => void;
}

/**
 * A React hook that provides clipboard read/write functionality using the
 * Clipboard API. Includes copy state management for showing feedback to users.
 *
 * @param options - Configuration options for the hook
 * @returns UseClipboardReturn object with copy/read functions and state
 *
 * @example
 * ```tsx
 * const { copy, hasCopied, isSupported } = useClipboard();
 *
 * return (
 *     <button onClick={() => copy("Hello, World!")}>
 *         {hasCopied ? "Copied!" : "Copy"}
 *     </button>
 * );
 * ```
 */
export function useClipboard(
    options: UseClipboardOptions = {},
): UseClipboardReturn {
    const { timeout = 2000 } = options;

    const [isCopying, setIsCopying] = useState(false);
    const [hasCopied, setHasCopied] = useState(false);
    const [copiedValue, setCopiedValue] = useState<string | null>(null);
    const [error, setError] = useState<Error | null>(null);

    // Check if Clipboard API is supported
    const isSupported =
        typeof navigator !== "undefined" &&
        "clipboard" in navigator &&
        typeof navigator.clipboard.writeText === "function";

    // Reset hasCopied state
    const reset = useCallback(() => {
        setHasCopied(false);
        setCopiedValue(null);
        setError(null);
    }, []);

    // Copy text to clipboard
    const copy = useCallback(
        async (text: string): Promise<boolean> => {
            if (!isSupported) {
                setError(new Error("Clipboard API is not supported"));
                return false;
            }

            setIsCopying(true);
            setError(null);

            try {
                await navigator.clipboard.writeText(text);
                setCopiedValue(text);
                setHasCopied(true);

                // Reset hasCopied after timeout
                if (timeout > 0) {
                    setTimeout(() => {
                        setHasCopied(false);
                    }, timeout);
                }

                return true;
            } catch (err) {
                const error =
                    err instanceof Error
                        ? err
                        : new Error("Failed to copy to clipboard");
                setError(error);
                setHasCopied(false);
                setCopiedValue(null);
                return false;
            } finally {
                setIsCopying(false);
            }
        },
        [isSupported, timeout],
    );

    // Read text from clipboard
    const read = useCallback(async (): Promise<string | null> => {
        if (!isSupported) {
            setError(new Error("Clipboard API is not supported"));
            return null;
        }

        // Check if readText is available (not all browsers support it)
        if (typeof navigator.clipboard.readText !== "function") {
            setError(new Error("Reading from clipboard is not supported"));
            return null;
        }

        setError(null);

        try {
            const text = await navigator.clipboard.readText();
            return text;
        } catch (err) {
            const error =
                err instanceof Error
                    ? err
                    : new Error("Failed to read from clipboard");
            setError(error);
            return null;
        }
    }, [isSupported]);

    return {
        copy,
        read,
        isCopying,
        hasCopied,
        copiedValue,
        error,
        isSupported,
        reset,
    };
}

export default useClipboard;
