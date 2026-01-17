"use client";

import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Search, Filter, X } from "lucide-react";

export const SearchBlock = () => {
    return (
        <div className="space-y-3 rounded-xl border p-4">
            {/* Search with icon */}
            <div className="relative">
                <Search className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
                <Input placeholder="Search..." className="pl-9" />
            </div>

            {/* URL Input */}
            <div className="flex">
                <span className="bg-muted text-muted-foreground inline-flex items-center rounded-l-md border border-r-0 px-3 text-sm">
                    https://
                </span>
                <Input placeholder="example.com" className="rounded-l-none" />
            </div>

            {/* Filter tags */}
            <div className="flex flex-wrap gap-2">
                <span className="bg-primary/10 text-primary inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium">
                    React
                    <button className="hover:text-primary/80">
                        <X className="size-3" />
                    </button>
                </span>
                <span className="bg-primary/10 text-primary inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium">
                    TypeScript
                    <button className="hover:text-primary/80">
                        <X className="size-3" />
                    </button>
                </span>
                <Button size="sm" variant="ghost" className="h-5 px-2 text-xs">
                    <Filter className="size-3" />
                    Add filter
                </Button>
            </div>
        </div>
    );
};
