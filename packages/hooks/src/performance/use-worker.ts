import { useState, useEffect, useRef, useCallback } from "react";

/**
 * Run heavy JavaScript functions in a background Web Worker.
 *
 * @param workerFunction The function that will be executed in the worker. Should be self-contained.
 */
export function useWorker<TArgs extends any[], TReturn>(
    workerFunction: (...args: TArgs) => TReturn,
) {
    const [result, setResult] = useState<TReturn | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | undefined>(undefined);
    const workerRef = useRef<Worker | null>(null);

    // Initialize worker
    useEffect(() => {
        const code = `
            self.onmessage = async function(e) {
                try {
                    const fn = ${workerFunction.toString()};
                    const result = await fn(...e.data);
                    self.postMessage({ status: 'SUCCESS', result });
                } catch (error) {
                    self.postMessage({ status: 'ERROR', error: error.message });
                }
            }
        `;

        const blob = new Blob([code], { type: "application/javascript" });
        const url = URL.createObjectURL(blob);
        const worker = new Worker(url);

        workerRef.current = worker;

        worker.onmessage = (e) => {
            if (e.data.status === "SUCCESS") {
                setResult(e.data.result);
                setError(undefined);
            } else {
                setError(new Error(e.data.error));
            }
            setLoading(false);
        };

        worker.onerror = (e) => {
            setError(new Error(e.message));
            setLoading(false);
        };

        return () => {
            worker.terminate();
            URL.revokeObjectURL(url);
        };
    }, [workerFunction]);

    const execute = useCallback((...args: TArgs) => {
        if (!workerRef.current) return;
        setLoading(true);
        setError(undefined);
        workerRef.current.postMessage(args);
    }, []);

    return { execute, loading, result, error };
}
