import { useState, useEffect } from "react";

/**
 * A simple hook that returns true after the component has mounted.
 * Useful for preventing hydration mismatches in client components.
 *
 * @returns boolean - false during SSR, true after mount
 *
 * @example
 * ```tsx
 * const isMounted = useIsMounted();
 *
 * if (!isMounted) {
 *     return <Skeleton />;
 * }
 *
 * return <ClientOnlyComponent />;
 * ```
 */
export function useIsMounted(): boolean {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return isMounted;
}

export default useIsMounted;
