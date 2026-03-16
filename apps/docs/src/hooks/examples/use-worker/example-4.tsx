"use client";

import { useWorker } from "@repo/hooks/performance/use-worker";
import { Button } from "@repo/ui/components/button";
import { Card } from "@repo/ui/components/card";
import { AlertCircle, TerminalSquare } from "lucide-react";

// Functions in workers must throw standard Javascript Errors
const faultyWorkerFunction = (shouldCrash: boolean) => {
    // Artificial delay to mimic processing
    const start = Date.now();
    while (Date.now() - start < 800) {}

    if (shouldCrash) {
        throw new Error("Out of memory exception during AST traversal module.");
    }

    return "Process completed perfectly.";
};

export function Example4() {
    const { execute, result, loading, error } = useWorker(faultyWorkerFunction);

    return (
        <Card className="mx-auto flex max-w-md flex-col gap-6 border-red-500/20 bg-red-500/5 p-6">
            <div className="flex items-start gap-4">
                <div className="mt-1 rounded-xl bg-red-500/20 p-3 text-red-600 dark:text-red-400">
                    <AlertCircle className="h-6 w-6" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-red-600 dark:text-red-300">
                        Error Handling Bounds
                    </h3>
                    <p className="text-foreground/80 mt-1 text-sm">
                        If a Web Worker crashes or throws an exception, it is
                        caught safely by the hook without crashing the main
                        React tree.
                    </p>
                </div>
            </div>

            <div className="flex gap-3">
                <Button
                    onClick={() => execute(false)}
                    isDisabled={loading}
                    variant="outline"
                    className="flex-1"
                >
                    Run Safe Task
                </Button>

                <Button
                    onClick={() => execute(true)}
                    isDisabled={loading}
                    variant="destructive"
                    className="flex-1"
                >
                    Force Crash Script
                </Button>
            </div>

            <div className="bg-background mt-2 overflow-hidden rounded-md border">
                <div className="bg-muted/40 flex items-center justify-between border-b px-3 py-2">
                    <span className="text-muted-foreground text-xs font-semibold uppercase">
                        Console Output
                    </span>
                    <TerminalSquare className="text-muted-foreground h-3 w-3" />
                </div>
                <div className="flex min-h-[100px] flex-col justify-center bg-zinc-950 p-4 font-mono text-xs text-zinc-300">
                    {loading ? (
                        <span className="animate-pulse text-blue-400">
                            Running worker thread...
                        </span>
                    ) : error ? (
                        <div className="wrap-break-word flex flex-col gap-1 text-red-400">
                            <span className="font-bold">
                                &gt; Exception Caught in thread:
                            </span>
                            <span>{error.message}</span>
                        </div>
                    ) : result ? (
                        <span className="text-green-400">&gt; {result}</span>
                    ) : (
                        <span className="text-zinc-600">
                            &gt; Waiting for execution...
                        </span>
                    )}
                </div>
            </div>
        </Card>
    );
}
