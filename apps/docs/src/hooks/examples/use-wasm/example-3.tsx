"use client";

import { useWasm } from "@repo/hooks/performance/use-wasm";
import { Card } from "@repo/ui/components/card";
import { AlertTriangle, FileCode2 } from "lucide-react";

export function Example3() {
    // Pointing to an invalid URL to demonstrate the error boundary logic
    const { loading, error } = useWasm("/404-not-found-missing.wasm");

    return (
        <Card className="mx-auto flex max-w-md flex-col gap-4 border-red-500/20 bg-red-500/5 p-6">
            <div className="flex items-start gap-4">
                <div className="mt-1 rounded-xl bg-red-500/20 p-3 text-red-600 dark:text-red-400">
                    <AlertTriangle className="h-6 w-6" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-red-600 dark:text-red-400">
                        Compilation Error Handling
                    </h3>
                    <p className="text-foreground/80 mt-1 text-sm">
                        The hook guarantees a safe error state if the `.wasm`
                        file cannot be reached, the MIME type is rejected, or
                        the binaries fail to compile correctly.
                    </p>
                </div>
            </div>

            <div className="bg-background mt-4 overflow-hidden rounded-md border">
                <div className="bg-muted/40 flex items-center justify-between border-b px-3 py-2">
                    <span className="text-muted-foreground text-xs font-semibold uppercase">
                        Hook State Output
                    </span>
                    <FileCode2 className="text-muted-foreground h-3 w-3" />
                </div>
                <div className="bg-zinc-950 p-4 font-mono text-xs text-zinc-300">
                    <div className="flex">
                        <span className="mr-2 text-blue-400">loading:</span>{" "}
                        <span className="text-orange-300">
                            {loading ? "true" : "false"},
                        </span>
                    </div>
                    <div className="flex">
                        <span className="mr-2 text-blue-400">module:</span>{" "}
                        <span className="text-purple-400">null,</span>
                    </div>
                    <div className="flex">
                        <span className="mr-2 text-blue-400">error:</span>{" "}
                        <span className="text-zinc-100">
                            {error ? `Error: "${error.message}"` : "null"}
                        </span>
                    </div>
                </div>
            </div>
        </Card>
    );
}
