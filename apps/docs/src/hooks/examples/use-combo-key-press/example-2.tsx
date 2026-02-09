"use client";

import { useComboKeyPress } from "@repo/hooks/dom/use-combo-key-press";
import { Search } from "lucide-react";
import { useRef } from "react";

export const Example2 = () => {
    const searchInputRef = useRef<HTMLInputElement>(null);

    // Detect Ctrl+K (Common search shortcut)
    useComboKeyPress({ key: "k", ctrl: true }, (e) => {
        e.preventDefault();
        searchInputRef.current?.focus();
    });

    return (
        <div className="flex w-full max-w-md flex-col gap-4">
            <h3 className="font-semibold">Global Search Shortcut</h3>

            <div className="group relative">
                <Search className="text-muted-foreground group-focus-within:text-primary absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors" />
                <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search..."
                    className="bg-background focus:border-primary focus:ring-primary w-full rounded-lg border py-2 pl-10 pr-12 text-sm outline-none transition-all focus:ring-1"
                />
                <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1">
                    <kbd className="bg-muted text-muted-foreground hidden rounded border px-1.5 py-0.5 text-[10px] font-medium sm:inline-block">
                        ⌘K
                    </kbd>
                </div>
            </div>

            <p className="text-muted-foreground text-center text-xs">
                Press <kbd className="font-mono">Ctrl/Cmd + K</kbd> anywhere to
                focus the search bar.
            </p>
        </div>
    );
};
