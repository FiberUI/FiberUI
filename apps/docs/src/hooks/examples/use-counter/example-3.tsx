"use client";

import { useCounter } from "@repo/hooks/utility/use-counter";
import { Button } from "@repo/ui/components/button";
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from "lucide-react";

export const Example3 = () => {
    // Pagination: Start at page 1, total pages = 20
    const totalPages = 20;
    const {
        count: page,
        increment,
        decrement,
        reset: goToFirst,
        incrementBy,
    } = useCounter(1, { step: 1 });

    // Helpers to keep within bounds
    const nextPage = () => {
        if (page < totalPages) increment();
    };

    const prevPage = () => {
        if (page > 1) decrement();
    };

    const goToLast = () => {
        const diff = totalPages - page;
        if (diff > 0) incrementBy(diff);
    };

    // Simulating fetching data for current page
    const items = Array.from({ length: 5 }, (_, i) => ({
        id: (page - 1) * 5 + i + 1,
        name: `Item ${(page - 1) * 5 + i + 1}`,
    }));

    return (
        <div className="w-full max-w-md space-y-4">
            {/* Limit simulation */}
            <div className="rounded-lg border bg-zinc-50 p-4 dark:bg-zinc-900">
                <h4 className="mb-2 text-sm font-medium text-zinc-500">
                    Page {page} of {totalPages}
                </h4>
                <div className="space-y-1">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="rounded bg-white p-2 text-sm shadow-sm dark:bg-zinc-800"
                        >
                            {item.name}
                        </div>
                    ))}
                </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-1">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={goToFirst}
                    isDisabled={page === 1}
                    aria-label="First page"
                >
                    <ChevronsLeft className="h-4 w-4" />
                </Button>

                <Button
                    variant="outline"
                    size="icon"
                    onClick={prevPage}
                    isDisabled={page === 1}
                    aria-label="Previous page"
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>

                <div className="mx-2 min-w-[3ch] text-center text-sm font-medium">
                    {page}
                </div>

                <Button
                    variant="outline"
                    size="icon"
                    onClick={nextPage}
                    isDisabled={page === totalPages}
                    aria-label="Next page"
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>

                <Button
                    variant="ghost"
                    size="icon"
                    onClick={goToLast}
                    isDisabled={page === totalPages}
                    aria-label="Last page"
                >
                    <ChevronsRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
};
