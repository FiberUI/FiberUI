"use client";

import { useCounter } from "@repo/hooks/utility/use-counter";
import { Button } from "@repo/ui/components/button";
import { ShoppingCart, Plus, Minus } from "lucide-react";

export const Example2 = () => {
    // Quantity selector usually starts at 1, step 1, min 1, max 10
    const { count, increment, decrement, canIncrement, canDecrement } =
        useCounter(1, {
            min: 1,
            max: 10,
        });

    return (
        <div className="w-full max-w-sm rounded-lg border p-4 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <h3 className="font-medium">Coffee Beans</h3>
                    <p className="text-muted-foreground text-sm">
                        $12.00 / bag
                    </p>
                </div>
                <div className="bg-primary/10 text-primary rounded-full p-2">
                    <ShoppingCart className="h-5 w-5" />
                </div>
            </div>

            <div className="flex items-center justify-between border-t pt-4">
                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={decrement}
                        isDisabled={!canDecrement}
                    >
                        <Minus className="h-3 w-3" />
                    </Button>

                    <span className="w-8 text-center font-medium tabular-nums">
                        {count}
                    </span>

                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={increment}
                        isDisabled={!canIncrement}
                    >
                        <Plus className="h-3 w-3" />
                    </Button>
                </div>

                <div className="font-medium">
                    Total: ${(count * 12).toFixed(2)}
                </div>
            </div>

            <p className="text-muted-foreground mt-2 text-right text-xs">
                Max 10 items
            </p>
        </div>
    );
};
