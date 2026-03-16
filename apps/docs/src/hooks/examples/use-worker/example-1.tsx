"use client";

import { useWorker } from "@repo/hooks/performance/use-worker";
import { useState } from "react";
import { Button } from "@repo/ui/components/button";
import { Card } from "@repo/ui/components/card";
import { Loader2, Calculator } from "lucide-react";

// This function will seamlessly run in a background thread
// It must not use external variables from the React component
function calculateFibonacci(n: number): number {
    if (n <= 1) return n;
    return calculateFibonacci(n - 1) + calculateFibonacci(n - 2);
}

export function Example1() {
    const { execute, result, loading, error } = useWorker(calculateFibonacci);
    const [num, setNum] = useState(40); // 40 is high enough to freeze main thread normally

    return (
        <Card className="mx-auto flex max-w-sm flex-col gap-6 p-6">
            <div className="flex items-center gap-3 border-b pb-4">
                <div className="bg-primary/10 text-primary rounded-lg p-2">
                    <Calculator className="h-5 w-5" />
                </div>
                <div>
                    <h3 className="font-bold">Heavy Math Processing</h3>
                    <p className="text-muted-foreground mt-0.5 text-xs">
                        Calculating recursive Fibonacci without freezing the UI.
                    </p>
                </div>
            </div>

            <div className="flex flex-col gap-3 text-sm">
                <p>
                    Try calculating Fibonacci({num}). If this ran on the main
                    thread, the UI would freeze completely until it finished.
                </p>

                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        onClick={() => setNum((n) => Math.max(1, n - 1))}
                        isDisabled={loading}
                    >
                        -
                    </Button>
                    <div className="bg-muted/50 flex flex-1 items-center justify-center rounded-md border font-mono font-bold">
                        {num}
                    </div>
                    <Button
                        variant="outline"
                        onClick={() => setNum((n) => n + 1)}
                        isDisabled={loading}
                    >
                        +
                    </Button>
                </div>

                <Button
                    onClick={() => execute(num)}
                    isDisabled={loading}
                    className="mt-2 w-full"
                >
                    {loading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Calculating...
                        </>
                    ) : (
                        "Calculate off-thread"
                    )}
                </Button>
            </div>

            {error && (
                <div className="rounded-md border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-500">
                    {error.message}
                </div>
            )}

            {result !== undefined && !loading && (
                <div className="flex flex-col items-center justify-center rounded-lg border border-green-500/20 bg-green-500/10 p-4 text-green-700 dark:text-green-400">
                    <span className="mb-1 text-xs font-bold uppercase tracking-wider">
                        Result
                    </span>
                    <span className="font-mono text-2xl font-black tracking-tighter">
                        {result.toLocaleString()}
                    </span>
                </div>
            )}
        </Card>
    );
}
