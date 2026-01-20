"use client";

import { useSessionStorageState } from "@repo/hooks/use-session-storage-state";

interface FilterState {
    search: string;
    category: string;
    sortBy: "date" | "name" | "price";
}

/* SESSION FILTERS - Temporary Filter State */
export const Example3 = () => {
    const [filters, setFilters, isLoading] =
        useSessionStorageState<FilterState>("product-filters", {
            search: "",
            category: "all",
            sortBy: "date",
        });

    const updateFilter = <K extends keyof FilterState>(
        key: K,
        value: FilterState[K],
    ) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const resetFilters = () => {
        setFilters({
            search: "",
            category: "all",
            sortBy: "date",
        });
    };

    if (isLoading) {
        return (
            <span className="text-muted-foreground text-sm">Loading...</span>
        );
    }

    return (
        <div className="flex w-full max-w-md flex-col gap-3">
            <input
                className="bg-background rounded-md border px-3 py-2 text-sm"
                value={filters.search}
                onChange={(e) => updateFilter("search", e.target.value)}
                placeholder="Search..."
            />
            <div className="flex gap-2">
                <select
                    className="bg-background flex-1 rounded-md border px-3 py-2 text-sm"
                    value={filters.category}
                    onChange={(e) => updateFilter("category", e.target.value)}
                >
                    <option value="all">All Categories</option>
                    <option value="electronics">Electronics</option>
                    <option value="clothing">Clothing</option>
                </select>
                <select
                    className="bg-background flex-1 rounded-md border px-3 py-2 text-sm"
                    value={filters.sortBy}
                    onChange={(e) =>
                        updateFilter(
                            "sortBy",
                            e.target.value as FilterState["sortBy"],
                        )
                    }
                >
                    <option value="date">Sort by Date</option>
                    <option value="name">Sort by Name</option>
                    <option value="price">Sort by Price</option>
                </select>
            </div>
            <button
                className="bg-muted text-muted-foreground rounded-md px-3 py-2 text-sm"
                onClick={resetFilters}
            >
                Reset Filters
            </button>
        </div>
    );
};
