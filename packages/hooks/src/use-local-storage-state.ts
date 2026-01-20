import { useState, useEffect, useCallback, useRef } from "react";

type SetValue<T> = T | ((prevValue: T) => T);

/**
 * A React hook that syncs state with localStorage.
 * - SSR safe: Returns initialValue during server-side rendering
 * - Type-safe: Accepts generic type parameter
 * - Handles JSON serialization/deserialization automatically
 *
 * @param key - The localStorage key to sync with
 * @param initialValue - The initial value to use if no stored value exists
 * @returns A tuple of [value, setValue, isLoading]
 */
export function useLocalStorageState<T>(
    key: string,
    initialValue: T,
): [T, (value: SetValue<T>) => void, boolean] {
    const initialValueRef = useRef(initialValue);
    const [isLoading, setIsLoading] = useState(true);
    const [storedValue, setStoredValue] = useState<T>(initialValue);

    // Hydrate from localStorage on mount
    useEffect(() => {
        try {
            const item = localStorage.getItem(key);
            if (item !== null) {
                setStoredValue(JSON.parse(item) as T);
            }
        } catch (error) {
            console.warn(`Error reading localStorage key "${key}":`, error);
        } finally {
            setIsLoading(false);
        }
    }, [key]);

    // Update localStorage when value changes
    const setValue = useCallback(
        (value: SetValue<T>) => {
            try {
                setStoredValue((prev) => {
                    const valueToStore =
                        value instanceof Function ? value(prev) : value;

                    if (typeof window !== "undefined") {
                        localStorage.setItem(key, JSON.stringify(valueToStore));
                    }

                    return valueToStore;
                });
            } catch (error) {
                console.warn(`Error setting localStorage key "${key}":`, error);
            }
        },
        [key],
    );

    // Listen for changes from other tabs/windows
    useEffect(() => {
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === key && event.newValue !== null) {
                try {
                    setStoredValue(JSON.parse(event.newValue) as T);
                } catch (error) {
                    console.warn(
                        `Error parsing storage event for key "${key}":`,
                        error,
                    );
                }
            } else if (event.key === key && event.newValue === null) {
                setStoredValue(initialValueRef.current);
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, [key]);

    return [storedValue, setValue, isLoading];
}

export default useLocalStorageState;
