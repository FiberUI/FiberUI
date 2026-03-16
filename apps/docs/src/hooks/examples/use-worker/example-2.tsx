"use client";

import { useWorker } from "@repo/hooks/performance/use-worker";
import { useState } from "react";
import { Button } from "@repo/ui/components/button";
import { Card } from "@repo/ui/components/card";
import { Database, Loader2, ArrowRight } from "lucide-react";

// Self-contained massive array sorter using a fake dataset
const sortMassiveArray = (
    size: number,
): { count: number; timeTaken: number; sample: any[] } => {
    const start = performance.now();

    // Generate massive array
    const data = Array.from({ length: size }).map((_, i) => ({
        id: i,
        name: `User ${Math.random().toString(36).substring(7)}`,
        score: Math.floor(Math.random() * 100000),
    }));

    // Perform an expensive sort operation
    data.sort((a, b) => b.score - a.score);

    const timeTaken = Math.round(performance.now() - start);

    // Return metadata and top 5 scores
    return {
        count: data.length,
        timeTaken,
        sample: data.slice(0, 5),
    };
};

export function Example2() {
    const { execute, result, loading } = useWorker(sortMassiveArray);
    const [arraySize, setArraySize] = useState(500000);

    return (
        <Card className="mx-auto flex max-w-md flex-col gap-6 p-6">
            <div className="flex items-center gap-3 border-b pb-4">
                <div className="rounded-lg bg-blue-500/10 p-2 text-blue-500">
                    <Database className="h-5 w-5" />
                </div>
                <div>
                    <h3 className="font-bold">Massive Array Sorting</h3>
                    <p className="text-muted-foreground mt-0.5 text-xs">
                        Generating and sorting datasets asynchronously.
                    </p>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground font-medium">
                        Records to Sort:
                    </span>
                    <span className="bg-muted rounded px-2 py-1 font-bold tabular-nums">
                        {arraySize.toLocaleString()}
                    </span>
                </div>

                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setArraySize(100000)}
                        className="flex-1"
                    >
                        100K
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setArraySize(500000)}
                        className="flex-1"
                    >
                        500K
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setArraySize(1000000)}
                        className="flex-1"
                    >
                        1M
                    </Button>
                </div>

                <Button
                    onClick={() => execute(arraySize)}
                    isDisabled={loading}
                    className="mt-2 bg-blue-600 text-white hover:bg-blue-700"
                >
                    {loading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                            Sorting Data In Background...
                        </>
                    ) : (
                        "Start Worker Process"
                    )}
                </Button>

                {/* Keep UI interactive during processing */}
                <div className="mt-2 rounded border bg-zinc-100 p-2 text-center text-xs dark:bg-zinc-900">
                    Try typing here while sorting:{" "}
                    <input
                        type="text"
                        className="bg-background ml-2 w-24 border px-1 outline-none"
                        placeholder="Responsive!"
                    />
                </div>
            </div>

            {result && !loading && (
                <div className="animate-in slide-in-from-bottom-2 fade-in mt-2 flex flex-col gap-2">
                    <div className="text-muted-foreground mb-1 flex items-center justify-between text-xs font-bold uppercase tracking-wider">
                        <span>Top 5 Results</span>
                        <span className="bg-primary text-primary-foreground rounded-full px-2 py-0.5 lowercase">
                            {result.timeTaken}ms
                        </span>
                    </div>

                    <div className="flex flex-col gap-1 rounded-lg bg-zinc-950 p-2 font-mono text-sm text-zinc-300">
                        {result.sample.map((s, i) => (
                            <div
                                key={s.id}
                                className="flex justify-between border-b border-zinc-800 px-2 py-1 last:border-0"
                            >
                                <span>
                                    {i + 1}. {s.name}
                                </span>
                                <span className="text-green-400">
                                    {s.score}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </Card>
    );
}
