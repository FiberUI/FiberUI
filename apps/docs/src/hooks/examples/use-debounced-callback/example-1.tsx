"use client";

import { useState } from "react";
import { useDebouncedCallback } from "@repo/hooks/utility/use-debounced-callback";
import { Search, Loader2 } from "lucide-react";

/* BASIC USAGE - API Search Simulation */
export const Example1 = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<string[]>([]);
    const [searchCount, setSearchCount] = useState(0);

    const { debouncedFn: debouncedSearch, isPending } = useDebouncedCallback(
        (searchQuery: string) => {
            // Simulated API call
            setSearchCount((c) => c + 1);
            if (searchQuery.trim()) {
                setResults([
                    `Result for "${searchQuery}" #1`,
                    `Result for "${searchQuery}" #2`,
                    `Result for "${searchQuery}" #3`,
                ]);
            } else {
                setResults([]);
            }
        },
        { delay: 400 },
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        debouncedSearch(value);
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="relative">
                <Search className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
                <input
                    type="text"
                    value={query}
                    onChange={handleChange}
                    placeholder="Search users..."
                    className="border-input bg-background w-full rounded-md border py-2 pl-10 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {isPending && (
                    <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-blue-500" />
                )}
            </div>

            <div className="text-muted-foreground text-xs">
                API calls made:{" "}
                <span className="font-mono font-medium text-blue-500">
                    {searchCount}
                </span>
            </div>

            <div className="bg-muted/30 min-h-[100px] rounded-md p-3">
                {results.length > 0 ? (
                    <ul className="space-y-2">
                        {results.map((result, i) => (
                            <li
                                key={i}
                                className="bg-background rounded border px-3 py-2 text-sm"
                            >
                                {result}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-muted-foreground text-center text-sm italic">
                        {query ? "Searching..." : "Type to search for users..."}
                    </p>
                )}
            </div>

            <p className="text-muted-foreground text-xs">
                Using{" "}
                <code className="bg-muted rounded px-1">
                    useDebouncedCallback
                </code>{" "}
                to debounce the search function, reducing API calls while
                typing.
            </p>
        </div>
    );
};
