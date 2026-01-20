import { useState, useEffect, useCallback } from "react";

type SetValue<T> = T | ((prevValue: T) => T);

/**
 * A React hook that syncs state with sessionStorage.
 * - SSR safe: Returns initialValue during server-side rendering
 * - Type-safe: Accepts generic type parameter
 * - Handles JSON serialization/deserialization automatically
 *
 * Note: Unlike localStorage, sessionStorage is not shared across tabs,
 * so this hook does not include cross-tab synchronization.
 *
 * @param key - The sessionStorage key to sync with
 * @param initialValue - The initial value to use if no stored value exists
 * @returns A tuple of [value, setValue, isLoading]
 */
export function useSessionStorageState<T>(
    key: string,
    initialValue: T,
): [T, (value: SetValue<T>) => void, boolean] {
    const [isLoading, setIsLoading] = useState(true);
    const [storedValue, setStoredValue] = useState<T>(initialValue);

    // Hydrate from sessionStorage on mount
    useEffect(() => {
        try {
            const item = sessionStorage.getItem(key);
            if (item !== null) {
                setStoredValue(JSON.parse(item) as T);
            }
        } catch (error) {
            console.warn(`Error reading sessionStorage key "${key}":`, error);
        } finally {
            setIsLoading(false);
        }
    }, [key]);

    // Update sessionStorage when value changes
    const setValue = useCallback(
        (value: SetValue<T>) => {
            try {
                setStoredValue((prev) => {
                    const valueToStore =
                        value instanceof Function ? value(prev) : value;

                    if (typeof window !== "undefined") {
                        sessionStorage.setItem(
                            key,
                            JSON.stringify(valueToStore),
                        );
                    }

                    return valueToStore;
                });
            } catch (error) {
                console.warn(
                    `Error setting sessionStorage key "${key}":`,
                    error,
                );
            }
        },
        [key],
    );

    return [storedValue, setValue, isLoading];
}

export default useSessionStorageState;
