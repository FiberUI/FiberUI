"use client";

import { useWasm } from "@repo/hooks/performance/use-wasm";
import { useState, useMemo } from "react";
import { Card } from "@repo/ui/components/card";
import { Button } from "@repo/ui/components/button";
import { Loader2 } from "lucide-react";

interface CounterWasm {
    increment: () => void;
    getCount: () => number;
}

export function Example2() {
    const [jsLogs, setJsLogs] = useState<string[]>([]);

    // Provide an import object to pass JavaScript functions into the WebAssembly instance
    const importObject = useMemo(() => {
        return {
            env: {
                // This function will be called FROM the WASM code
                logFromWasm: (val: number) => {
                    setJsLogs((prev) => [
                        ...prev.slice(-4),
                        `WASM logged value: ${val}`,
                    ]);
                },
            },
        };
    }, []);

    const { module, loading, error } = useWasm<CounterWasm>(
        "/example-imports.wasm",
        importObject,
    );

    return (
        <Card className="mx-auto flex max-w-sm flex-col gap-6 p-6">
            <div className="text-center">
                <h3 className="text-lg font-bold">Imports Memory Binding</h3>
                <p className="text-muted-foreground mt-1 text-xs">
                    Pass JS functions into the WASM instance via `importObject`.
                </p>
            </div>

            <div className="flex flex-col gap-3">
                <div className="bg-muted flex items-center justify-between rounded-md border px-3 py-2 text-sm">
                    <span>WASM Status:</span>
                    <span className="font-medium">
                        {loading ? (
                            <span className="text-primary flex items-center gap-1">
                                <Loader2 className="h-3 w-3 animate-spin" />{" "}
                                Compiling
                            </span>
                        ) : error ? (
                            <span className="text-destructive">Error</span>
                        ) : (
                            <span className="text-green-500">Ready</span>
                        )}
                    </span>
                </div>

                <Button
                    onClick={() => {
                        if (module) {
                            module.increment();
                            // In a real scenario, increment might call the logFromWasm import.
                            // For this demo mock if module doesn't exist.
                        } else {
                            // Simulation fallback since we don't have a real WASM loaded right now
                            importObject.env.logFromWasm(
                                Math.floor(Math.random() * 100),
                            );
                        }
                    }}
                    className="w-full"
                    isDisabled={loading}
                >
                    Trigger Action in WASM
                </Button>
            </div>

            <div className="flex flex-col">
                <span className="text-muted-foreground mb-2 pl-1 text-xs font-bold uppercase tracking-widest">
                    Browser Logs
                </span>
                <div className="flex min-h-[120px] flex-col justify-end gap-1 overflow-hidden rounded-lg border bg-zinc-950 p-4 font-mono text-xs text-green-400 shadow-inner">
                    {jsLogs.length === 0 ? (
                        <span className="text-zinc-500">
                            Waiting for WebAssembly calls...
                        </span>
                    ) : (
                        jsLogs.map((log, i) => (
                            <div
                                key={i}
                                className="animate-in slide-in-from-bottom-2 fade-in"
                            >{`> ${log}`}</div>
                        ))
                    )}
                </div>
            </div>
        </Card>
    );
}
