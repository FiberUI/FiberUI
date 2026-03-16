"use client";

import { useHardwareConcurrency } from "@repo/hooks/performance/use-hardware-concurrency";
import { Card } from "@repo/ui/components/card";
import { Cpu } from "lucide-react";

export function Example1() {
    const cores = useHardwareConcurrency();

    return (
        <Card className="mx-auto flex max-w-sm flex-col items-center justify-center gap-4 p-8">
            <div className="bg-primary/10 text-primary flex items-center justify-center rounded-full p-4">
                <Cpu className="h-12 w-12" />
            </div>

            <div className="text-center">
                <h3 className="text-xl font-bold">Logical Cores Detected</h3>
                <p className="text-muted-foreground mt-1 text-sm">
                    Your device's processing capacity
                </p>
            </div>

            <div className="text-primary text-6xl font-black tabular-nums tracking-tighter">
                {cores}
            </div>
        </Card>
    );
}
