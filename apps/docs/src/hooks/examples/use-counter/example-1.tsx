"use client";

import { useCounter } from "@repo/hooks/utility/use-counter";
import { Button } from "@repo/ui/components/button";
import { Plus, Minus, RotateCcw } from "lucide-react";

export const Example1 = () => {
    const { count, increment, decrement, reset } = useCounter(0, { step: 1 });

    return (
        <div className="flex flex-col items-center gap-4 rounded-lg border p-6">
            <div className="text-4xl font-bold tabular-nums">{count}</div>

            <div className="flex gap-2">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={decrement}
                    aria-label="Decrement"
                >
                    <Minus className="h-4 w-4" />
                </Button>

                <Button
                    variant="outline"
                    size="icon"
                    onClick={reset}
                    aria-label="Reset"
                >
                    <RotateCcw className="h-4 w-4" />
                </Button>

                <Button
                    variant="outline"
                    size="icon"
                    onClick={increment}
                    aria-label="Increment"
                >
                    <Plus className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
};
