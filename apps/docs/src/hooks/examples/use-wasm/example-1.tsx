"use client";

import { useWasm } from "@repo/hooks/performance/use-wasm";
import { Card } from "@repo/ui/components/card";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

// Define the interface for the WASM module exports
interface SimpleWasmModule {
    add: (a: number, b: number) => number;
}

export function Example1() {
    // Note: Provide a valid URL to your .wasm file in a real project
    // This example simulates the loading state handler
    const { module, loading, error } =
        useWasm<SimpleWasmModule>("/example-math.wasm");

    return (
        <Card className="mx-auto flex max-w-sm flex-col gap-4 p-6 text-center">
            <h3 className="text-lg font-bold">WASM Loader State</h3>

            <div className="bg-muted/30 flex min-h-[140px] flex-col items-center justify-center rounded-lg p-6 transition-all">
                {loading && (
                    <div className="text-primary flex flex-col items-center gap-2">
                        <Loader2 className="h-8 w-8 animate-spin" />
                        <span className="text-sm font-medium">
                            Fetching & Compiling...
                        </span>
                    </div>
                )}

                {error && (
                    <div className="text-destructive flex flex-col items-center gap-2 text-center">
                        <AlertCircle className="h-8 w-8" />
                        <span className="text-sm font-medium">
                            Failed to load WebAssembly
                        </span>
                        <span className="mt-1 max-w-[200px] text-xs opacity-80">
                            {error.message ||
                                'Check network tab for details. Verify that "example-math.wasm" is served correctly.'}
                        </span>
                    </div>
                )}

                {!loading && !error && module && (
                    <div className="flex flex-col items-center gap-2 text-green-600 dark:text-green-400">
                        <CheckCircle2 className="h-8 w-8" />
                        <span className="text-sm font-bold">
                            WASM Module Ready
                        </span>
                        <span className="mt-1 pb-1 text-xs opacity-80">
                            module.add() is available
                        </span>
                    </div>
                )}
            </div>

            <p className="text-muted-foreground mt-2 text-xs">
                <code>useWasm</code> automatically handles fetching, WebAssembly
                compile streaming, and provides typescript safety for exports.
            </p>
        </Card>
    );
}
