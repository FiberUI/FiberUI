import { useState, useEffect, useCallback } from "react";

/**
 * IndexedDB hook state
 */
export interface UseIndexedDBState<T> {
    /** Data retrieved from the store */
    data: T[];
    /** Whether the database is loading */
    isLoading: boolean;
    /** Error message if any */
    error: string | null;
    /** Whether IndexedDB is supported */
    isSupported: boolean;
}

/**
 * IndexedDB hook return type
 */
export interface UseIndexedDBReturn<T> extends UseIndexedDBState<T> {
    /** Add an item to the store */
    add: (item: T) => Promise<IDBValidKey | null>;
    /** Update an item in the store */
    update: (item: T) => Promise<IDBValidKey | null>;
    /** Delete an item by key */
    remove: (key: IDBValidKey) => Promise<boolean>;
    /** Get a single item by key */
    getByKey: (key: IDBValidKey) => Promise<T | null>;
    /** Clear all items from the store */
    clear: () => Promise<boolean>;
    /** Refresh data from the store */
    refresh: () => Promise<void>;
}

/**
 * IndexedDB configuration options
 */
export interface UseIndexedDBOptions {
    /** Name of the database */
    dbName: string;
    /** Name of the object store */
    storeName: string;
    /** Database version (increment to trigger upgrade) */
    version?: number;
    /** Key path for the object store */
    keyPath?: string;
}

/**
 * Opens an IndexedDB database
 */
function openDatabase(
    dbName: string,
    storeName: string,
    version: number,
    keyPath: string,
): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, version);

        request.onerror = () => {
            reject(
                new Error(`Failed to open database: ${request.error?.message}`),
            );
        };

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;
            if (!db.objectStoreNames.contains(storeName)) {
                db.createObjectStore(storeName, {
                    keyPath,
                    autoIncrement: !keyPath,
                });
            }
        };
    });
}

/**
 * A React hook for interacting with IndexedDB.
 * Provides CRUD operations for storing large amounts of structured data.
 *
 * @param options - Configuration options for the database
 * @returns State and methods for interacting with IndexedDB
 *
 * @example
 * ```tsx
 * interface Todo {
 *     id: string;
 *     text: string;
 *     completed: boolean;
 * }
 *
 * const { data, add, remove, isLoading } = useIndexedDB<Todo>({
 *     dbName: "myApp",
 *     storeName: "todos",
 *     keyPath: "id",
 * });
 * ```
 */
export function useIndexedDB<T>(
    options: UseIndexedDBOptions,
): UseIndexedDBReturn<T> {
    const { dbName, storeName, version = 1, keyPath = "id" } = options;

    const [state, setState] = useState<UseIndexedDBState<T>>({
        data: [],
        isLoading: true,
        error: null,
        isSupported: true,
    });

    const [db, setDb] = useState<IDBDatabase | null>(null);

    // Initialize database
    useEffect(() => {
        if (typeof window === "undefined" || !("indexedDB" in window)) {
            setState((s) => ({
                ...s,
                isSupported: false,
                isLoading: false,
                error: "IndexedDB is not supported",
            }));
            return;
        }

        let mounted = true;

        (async () => {
            try {
                const database = await openDatabase(
                    dbName,
                    storeName,
                    version,
                    keyPath,
                );
                if (mounted) {
                    setDb(database);
                }
            } catch (error) {
                if (mounted) {
                    setState((s) => ({
                        ...s,
                        isLoading: false,
                        error:
                            error instanceof Error
                                ? error.message
                                : "Failed to open database",
                    }));
                }
            }
        })();

        return () => {
            mounted = false;
        };
    }, [dbName, storeName, version, keyPath]);

    // Fetch all data when database is ready
    const refresh = useCallback(async () => {
        if (!db) return;

        setState((s) => ({ ...s, isLoading: true }));

        try {
            const transaction = db.transaction(storeName, "readonly");
            const store = transaction.objectStore(storeName);
            const request = store.getAll();

            request.onsuccess = () => {
                setState((s) => ({
                    ...s,
                    data: request.result,
                    isLoading: false,
                    error: null,
                }));
            };

            request.onerror = () => {
                setState((s) => ({
                    ...s,
                    isLoading: false,
                    error: request.error?.message ?? "Failed to fetch data",
                }));
            };
        } catch (error) {
            setState((s) => ({
                ...s,
                isLoading: false,
                error:
                    error instanceof Error
                        ? error.message
                        : "Failed to fetch data",
            }));
        }
    }, [db, storeName]);

    // Load initial data when db is ready
    useEffect(() => {
        if (db) {
            refresh();
        }
    }, [db, refresh]);

    // Add item
    const add = useCallback(
        async (item: T): Promise<IDBValidKey | null> => {
            if (!db) return null;

            return new Promise((resolve) => {
                try {
                    const transaction = db.transaction(storeName, "readwrite");
                    const store = transaction.objectStore(storeName);
                    const request = store.add(item);

                    request.onsuccess = () => {
                        refresh();
                        resolve(request.result);
                    };

                    request.onerror = () => {
                        setState((s) => ({
                            ...s,
                            error:
                                request.error?.message ?? "Failed to add item",
                        }));
                        resolve(null);
                    };
                } catch (error) {
                    setState((s) => ({
                        ...s,
                        error:
                            error instanceof Error
                                ? error.message
                                : "Failed to add item",
                    }));
                    resolve(null);
                }
            });
        },
        [db, storeName, refresh],
    );

    // Update item
    const update = useCallback(
        async (item: T): Promise<IDBValidKey | null> => {
            if (!db) return null;

            return new Promise((resolve) => {
                try {
                    const transaction = db.transaction(storeName, "readwrite");
                    const store = transaction.objectStore(storeName);
                    const request = store.put(item);

                    request.onsuccess = () => {
                        refresh();
                        resolve(request.result);
                    };

                    request.onerror = () => {
                        setState((s) => ({
                            ...s,
                            error:
                                request.error?.message ??
                                "Failed to update item",
                        }));
                        resolve(null);
                    };
                } catch (error) {
                    setState((s) => ({
                        ...s,
                        error:
                            error instanceof Error
                                ? error.message
                                : "Failed to update item",
                    }));
                    resolve(null);
                }
            });
        },
        [db, storeName, refresh],
    );

    // Remove item
    const remove = useCallback(
        async (key: IDBValidKey): Promise<boolean> => {
            if (!db) return false;

            return new Promise((resolve) => {
                try {
                    const transaction = db.transaction(storeName, "readwrite");
                    const store = transaction.objectStore(storeName);
                    const request = store.delete(key);

                    request.onsuccess = () => {
                        refresh();
                        resolve(true);
                    };

                    request.onerror = () => {
                        setState((s) => ({
                            ...s,
                            error:
                                request.error?.message ??
                                "Failed to delete item",
                        }));
                        resolve(false);
                    };
                } catch (error) {
                    setState((s) => ({
                        ...s,
                        error:
                            error instanceof Error
                                ? error.message
                                : "Failed to delete item",
                    }));
                    resolve(false);
                }
            });
        },
        [db, storeName, refresh],
    );

    // Get by key
    const getByKey = useCallback(
        async (key: IDBValidKey): Promise<T | null> => {
            if (!db) return null;

            return new Promise((resolve) => {
                try {
                    const transaction = db.transaction(storeName, "readonly");
                    const store = transaction.objectStore(storeName);
                    const request = store.get(key);

                    request.onsuccess = () => {
                        resolve(request.result ?? null);
                    };

                    request.onerror = () => {
                        setState((s) => ({
                            ...s,
                            error:
                                request.error?.message ?? "Failed to get item",
                        }));
                        resolve(null);
                    };
                } catch (error) {
                    setState((s) => ({
                        ...s,
                        error:
                            error instanceof Error
                                ? error.message
                                : "Failed to get item",
                    }));
                    resolve(null);
                }
            });
        },
        [db, storeName],
    );

    // Clear all
    const clear = useCallback(async (): Promise<boolean> => {
        if (!db) return false;

        return new Promise((resolve) => {
            try {
                const transaction = db.transaction(storeName, "readwrite");
                const store = transaction.objectStore(storeName);
                const request = store.clear();

                request.onsuccess = () => {
                    refresh();
                    resolve(true);
                };

                request.onerror = () => {
                    setState((s) => ({
                        ...s,
                        error:
                            request.error?.message ?? "Failed to clear store",
                    }));
                    resolve(false);
                };
            } catch (error) {
                setState((s) => ({
                    ...s,
                    error:
                        error instanceof Error
                            ? error.message
                            : "Failed to clear store",
                }));
                resolve(false);
            }
        });
    }, [db, storeName, refresh]);

    return {
        ...state,
        add,
        update,
        remove,
        getByKey,
        clear,
        refresh,
    };
}

export default useIndexedDB;
