import { useState, useCallback } from "react";

/**
 * Options for opening the EyeDropper
 */
export interface UseEyeDropperOptions {
    /** Signal to abort the selection */
    signal?: AbortSignal;
}

/**
 * Result from the EyeDropper API
 */
export interface EyeDropperResult {
    /** The selected color in hex sRGB format (e.g. #ff0000) */
    sRGBHex: string;
}

/**
 * Return type for the useEyeDropper hook
 */
export interface UseEyeDropperReturn {
    /** Open the eye dropper to select a color */
    open: (options?: UseEyeDropperOptions) => Promise<EyeDropperResult | null>;
    /** Whether the EyeDropper API is supported */
    isSupported: boolean;
    /** Whether the eye dropper is currently open */
    isLoading: boolean;
    /** The last selected color */
    color: string | null;
    /** Error from the last operation */
    error: Error | null;
}

// Add type definition for EyeDropper if not present in environment
interface EyeDropper {
    open(options?: { signal?: AbortSignal }): Promise<{ sRGBHex: string }>;
}

interface EyeDropperConstructor {
    new (): EyeDropper;
    prototype: EyeDropper;
}

declare global {
    interface Window {
        EyeDropper?: EyeDropperConstructor;
    }
}

/**
 * A React hook for using the EyeDropper API to select colors from the screen.
 *
 * @returns UseEyeDropperReturn object with open function and state
 *
 * @example
 * ```tsx
 * const { open, color, isSupported } = useEyeDropper();
 *
 * return (
 *     <div>
 *         <button onClick={open} disabled={!isSupported}>Pick Color</button>
 *         {color && <div style={{ backgroundColor: color }}>Selected: {color}</div>}
 *     </div>
 * );
 * ```
 */
export function useEyeDropper(): UseEyeDropperReturn {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [color, setColor] = useState<string | null>(null);

    // Check support
    const isSupported = typeof window !== "undefined" && "EyeDropper" in window;

    // Open eye dropper
    const open = useCallback(
        async (
            options?: UseEyeDropperOptions,
        ): Promise<EyeDropperResult | null> => {
            if (!isSupported) {
                setError(new Error("EyeDropper API is not supported"));
                return null;
            }

            setIsLoading(true);
            setError(null);

            try {
                // @ts-ignore - EyeDropper is experimental
                const eyeDropper = new window.EyeDropper();
                const result = await eyeDropper.open(options);
                setColor(result.sRGBHex);
                return result;
            } catch (err) {
                // User cancelation is common error
                const error =
                    err instanceof Error
                        ? err
                        : new Error("Failed to pick color");
                setError(error);
                return null;
            } finally {
                setIsLoading(false);
            }
        },
        [isSupported],
    );

    return {
        open,
        isSupported,
        isLoading,
        color,
        error,
    };
}

export default useEyeDropper;
