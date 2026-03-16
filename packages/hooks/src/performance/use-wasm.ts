import { useState, useEffect } from "react";

interface WasmState<T> {
    module: T | null;
    loading: boolean;
    error: Error | null;
}

/**
 * Load and instantiate a WebAssembly module.
 *
 * @param url The URL of the `.wasm` file to load.
 * @param importObject Optional import object for the WebAssembly instance.
 */
export function useWasm<T = any>(
    url: string,
    importObject?: WebAssembly.Imports,
): WasmState<T> {
    const [state, setState] = useState<WasmState<T>>({
        module: null,
        loading: true,
        error: null,
    });

    useEffect(() => {
        let isMounted = true;

        const loadWasm = async () => {
            setState((prev) => ({ ...prev, loading: true, error: null }));
            try {
                // Determine if WebAssembly.instantiateStreaming is supported
                if ("instantiateStreaming" in WebAssembly) {
                    const response = await fetch(url);
                    const { instance } = await WebAssembly.instantiateStreaming(
                        response,
                        importObject,
                    );
                    if (isMounted) {
                        setState({
                            module: instance.exports as unknown as T,
                            loading: false,
                            error: null,
                        });
                    }
                } else {
                    // Fallback to WebAssembly.instantiate
                    const response = await fetch(url);
                    const buffer = await response.arrayBuffer();
                    const { instance } = await WebAssembly.instantiate(
                        buffer,
                        importObject,
                    );
                    if (isMounted) {
                        setState({
                            module: instance.exports as unknown as T,
                            loading: false,
                            error: null,
                        });
                    }
                }
            } catch (error) {
                if (isMounted) {
                    setState({
                        module: null,
                        loading: false,
                        error:
                            error instanceof Error
                                ? error
                                : new Error(String(error)),
                    });
                }
            }
        };

        loadWasm();

        return () => {
            isMounted = false;
        };
    }, [url, importObject]);

    return state;
}
