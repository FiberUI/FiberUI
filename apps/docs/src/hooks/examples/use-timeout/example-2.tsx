"use client";

import { useTimeout } from "@repo/hooks/utility/use-timeout";
import { useState, useCallback } from "react";
import { Search, Loader2 } from "lucide-react";

const MOCK_RESULTS = [
    "React Hooks Guide",
    "React Server Components",
    "React Performance Tips",
    "React Testing Library",
    "React Design Patterns",
];

export const Example2 = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<string[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    // Debounce the search — only fire 500ms after the user stops typing
    const { reset } = useTimeout(
        () => {
            if (query.trim()) {
                setIsSearching(true);

                // Simulate API delay
                setTimeout(() => {
                    setResults(
                        MOCK_RESULTS.filter((r) =>
                            r.toLowerCase().includes(query.toLowerCase()),
                        ),
                    );
                    setIsSearching(false);
                }, 300);
            } else {
                setResults([]);
            }
        },
        query ? 500 : null,
    );

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setQuery(e.target.value);
            setIsSearching(false);
            setResults([]);
            reset();
        },
        [reset],
    );

    return (
        <div className="mx-auto w-full max-w-sm space-y-3 p-6">
            <div className="relative">
                <Search className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
                <input
                    type="text"
                    value={query}
                    onChange={handleChange}
                    placeholder="Search articles..."
                    className="bg-background h-10 w-full rounded-lg border pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
                {isSearching && (
                    <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-blue-500" />
                )}
            </div>

            {results.length > 0 && (
                <ul className="space-y-1 rounded-lg border p-2">
                    {results.map((result) => (
                        <li
                            key={result}
                            className="text-muted-foreground hover:bg-muted cursor-pointer rounded-md px-3 py-2 text-sm transition-colors"
                        >
                            {result}
                        </li>
                    ))}
                </ul>
            )}

            {query && !isSearching && results.length === 0 && (
                <p className="text-muted-foreground text-center text-xs">
                    No results found for &quot;{query}&quot;
                </p>
            )}

            <p className="text-muted-foreground text-center text-xs">
                Search is debounced — waits 500ms after you stop typing.
            </p>
        </div>
    );
};
