"use client";

import { useHardwareConcurrency } from "@repo/hooks/performance/use-hardware-concurrency";
import { Card } from "@repo/ui/components/card";

export function Example4() {
    const cores = useHardwareConcurrency();

    // Determine grid columns dynamically based on cores
    const columns = cores >= 16 ? 8 : cores >= 8 ? 6 : cores >= 4 ? 4 : 2;
    // Generate items based on dynamic columns
    const items = Array.from({ length: columns * 3 });

    return (
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
            <div className="text-center">
                <h3 className="text-lg font-medium">Dynamic Layout Scaling</h3>
                <p className="text-muted-foreground text-sm">
                    Rendering complexity ({items.length} nodes across {columns}{" "}
                    columns) adjusted for {cores} cores.
                </p>
            </div>

            <div
                className="grid gap-2"
                style={{
                    gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                }}
            >
                {items.map((_, i) => (
                    <Card
                        key={i}
                        className="flex aspect-square flex-col items-center justify-center bg-zinc-50 p-2 text-xs transition-colors hover:bg-zinc-100 dark:bg-zinc-900/50 dark:hover:bg-zinc-800"
                    >
                        <span className="font-mono opacity-50">Node</span>
                        <span className="font-bold">{i + 1}</span>
                    </Card>
                ))}
            </div>

            <div className="text-muted-foreground bg-muted/50 rounded-lg p-4 text-center text-xs">
                Devices with fewer cores will render a smaller, simpler grid
                structure to maintain 60 FPS, while powerful workstations will
                render denser data visualization.
            </div>
        </div>
    );
}
