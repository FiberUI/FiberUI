"use client";

import { useHardwareConcurrency } from "@repo/hooks/performance/use-hardware-concurrency";
import { useState, useEffect } from "react";
import { Button } from "@repo/ui/components/button";
import { Loader2 } from "lucide-react";

export function Example3() {
    const cores = useHardwareConcurrency();
    const [workers, setWorkers] = useState<{ id: number; status: string }[]>(
        [],
    );
    const [isSimulating, setIsSimulating] = useState(false);

    useEffect(() => {
        // Initialize pool based on available cores (leaving 1 for main thread if possible)
        const poolSize = Math.max(1, cores - 1);
        const initialPool = Array.from({ length: poolSize }).map((_, i) => ({
            id: i + 1,
            status: "Idle",
        }));
        setWorkers(initialPool);
    }, [cores]);

    const simulateWork = () => {
        setIsSimulating(true);

        // Randomly assign work to the available scaled threads
        const updatedWorkers = workers.map((w) => ({
            ...w,
            status: "Working...",
        }));

        setWorkers(updatedWorkers);

        // Simulate finishing work at random times
        updatedWorkers.forEach((w) => {
            setTimeout(
                () => {
                    setWorkers((current) =>
                        current.map((cw) =>
                            cw.id === w.id ? { ...cw, status: "Done" } : cw,
                        ),
                    );
                },
                1000 + Math.random() * 2000,
            );
        });

        // Reset overall simulation state
        setTimeout(() => setIsSimulating(false), 3500);
    };

    return (
        <div className="mx-auto flex w-full max-w-lg flex-col gap-6">
            <div className="text-center">
                <h3 className="text-lg font-medium">Auto-Scaled Thread Pool</h3>
                <p className="text-muted-foreground text-sm">
                    Simulating a background worker pool scaled to max{" "}
                    {Math.max(1, cores - 1)} background threads.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {workers.map((worker) => (
                    <div
                        key={worker.id}
                        className={`flex flex-col items-center justify-center rounded-xl border p-3 text-sm transition-all duration-500 ${
                            worker.status === "Working..."
                                ? "border-primary/50 bg-primary/10 text-primary"
                                : worker.status === "Done"
                                  ? "border-green-500/50 bg-green-500/10 text-green-600 dark:text-green-400"
                                  : "border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50"
                        }`}
                    >
                        <span className="mb-1 font-bold">
                            Worker {worker.id}
                        </span>
                        <div className="flex items-center gap-2">
                            {worker.status === "Working..." && (
                                <Loader2 className="h-3 w-3 animate-spin" />
                            )}
                            <span className="text-xs">{worker.status}</span>
                        </div>
                    </div>
                ))}
            </div>

            <Button
                onClick={simulateWork}
                isDisabled={isSimulating}
                className="w-full self-center sm:w-auto"
            >
                {isSimulating
                    ? "Processing Dataset..."
                    : "Start Heavy Processing"}
            </Button>
        </div>
    );
}
