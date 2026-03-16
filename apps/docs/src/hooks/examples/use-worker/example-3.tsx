"use client";

import { useWorker } from "@repo/hooks/performance/use-worker";
import { useState } from "react";
import { Button } from "@repo/ui/components/button";
import { Card } from "@repo/ui/components/card";
import { FileDown, FileJson, Loader2, Link } from "lucide-react";

// Mock raw API response payload
const rawDataString = `
[
    {"id": "a1", "timestamp": "2024-03-12T10:00:00Z", "type": "auth", "status": 200, "meta": {"ip": "192.168.1.1", "agent": "Mozilla"}},
    {"id": "b2", "timestamp": "2024-03-12T10:01:15Z", "type": "query", "status": 500, "meta": {"queryTime": "45ms"}},
    {"id": "c3", "timestamp": "2024-03-12T10:05:30Z", "type": "auth", "status": 401, "meta": {"ip": "10.0.0.5"}}
]
`;

// Simulate fetching and parsing a huge JSON string
const parseAndTransformData = (
    jsonString: string,
): { typeCounts: Record<string, number>; errors: number; items: any[] } => {
    // Artificial delay to simulate huge file processing
    const start = Date.now();
    while (Date.now() - start < 1500) {}

    // Parse the data
    const data = JSON.parse(jsonString);

    // Transform and aggregate the data
    const typeCounts: Record<string, number> = {};
    let errors = 0;

    const transformed = data.map((item: any) => {
        // Aggregate types
        typeCounts[item.type] = (typeCounts[item.type] || 0) + 1;

        // Count errors
        if (item.status >= 400) errors++;

        // Return flattened format
        return {
            id: item.id,
            time: new Date(item.timestamp).toLocaleTimeString(),
            type: item.type.toUpperCase(),
            error: item.status >= 400,
        };
    });

    return { typeCounts, errors, items: transformed };
};

export function Example3() {
    const { execute, result, loading, error } = useWorker(
        parseAndTransformData,
    );
    const [viewRaw, setViewRaw] = useState(false);

    return (
        <Card className="mx-auto flex w-full max-w-lg flex-col gap-6 bg-zinc-50 p-6 dark:bg-zinc-900/40">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-purple-500/10 p-2 text-purple-600">
                        <FileJson className="h-5 w-5" />
                    </div>
                    <div>
                        <h3 className="font-bold">Heavy JSON Parsing</h3>
                        <p className="text-muted-foreground mt-0.5 text-xs">
                            Parse and transform large datasets in the
                            background.
                        </p>
                    </div>
                </div>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setViewRaw(!viewRaw)}
                >
                    {viewRaw ? (
                        <Link className="h-4 w-4" />
                    ) : (
                        <FileDown className="h-4 w-4" />
                    )}
                </Button>
            </div>

            {viewRaw ? (
                <div className="max-h-48 overflow-auto rounded-md border border-zinc-800 bg-zinc-950 p-4 font-mono text-xs text-emerald-400">
                    <pre>{rawDataString.trim()}</pre>
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {!result ? (
                        <div className="text-muted-foreground bg-background flex flex-col items-center justify-center rounded-xl border border-dashed py-8 text-center">
                            <p className="mb-4 text-sm font-medium">
                                Ready to process 50MB of raw logs
                            </p>
                            <Button
                                onClick={() => execute(rawDataString)}
                                isDisabled={loading}
                                className="bg-purple-600 text-white hover:bg-purple-700"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                                        Decoding & Parsing...
                                    </>
                                ) : (
                                    "Start worker job"
                                )}
                            </Button>
                        </div>
                    ) : (
                        <div className="animate-in fade-in slide-in-from-bottom-2 flex flex-col gap-4">
                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-background flex flex-col items-center justify-center rounded-xl border p-4 text-center shadow-sm">
                                    <span className="text-3xl font-black text-purple-600 dark:text-purple-400">
                                        {result.items.length}
                                    </span>
                                    <span className="text-muted-foreground mt-1 text-xs font-bold uppercase tracking-wider">
                                        Rows Parsed
                                    </span>
                                </div>
                                <div className="bg-background flex flex-col items-center justify-center rounded-xl border p-4 text-center shadow-sm">
                                    <span className="text-3xl font-black text-red-500">
                                        {result.errors}
                                    </span>
                                    <span className="text-muted-foreground mt-1 text-xs font-bold uppercase tracking-wider">
                                        Errors Found
                                    </span>
                                </div>
                            </div>

                            <div className="bg-background overflow-hidden rounded-xl border text-sm">
                                <div className="bg-muted border-b px-4 py-2 text-xs font-semibold">
                                    Processed Logs Preview
                                </div>
                                <div className="max-h-32 divide-y overflow-auto">
                                    {result.items.map((item: any) => (
                                        <div
                                            key={item.id}
                                            className="hover:bg-muted/50 flex items-center justify-between px-4 py-2 transition-colors"
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="font-mono text-xs">
                                                    {item.id}
                                                </span>
                                                <span
                                                    className={`rounded px-2 py-0.5 text-[10px] font-bold ${item.type === "AUTH" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30" : "bg-orange-100 text-orange-700 dark:bg-orange-900/30"}`}
                                                >
                                                    {item.type}
                                                </span>
                                            </div>
                                            <span
                                                className={`font-mono text-xs ${item.error ? "font-bold text-red-500" : "text-muted-foreground"}`}
                                            >
                                                {item.error ? "FAILED" : "OK"}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Button
                                variant="outline"
                                onClick={() => execute(rawDataString)}
                                isDisabled={loading}
                                className="w-full"
                            >
                                {loading ? "Re-processing..." : "Process Again"}
                            </Button>
                        </div>
                    )}
                </div>
            )}

            {error && (
                <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm font-medium text-red-500">
                    {error.message}
                </div>
            )}
        </Card>
    );
}
