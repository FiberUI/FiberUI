"use client";
import { ListBox } from "@repo/ui/components/list-box";

/* EMPTY STATE */
export const Example6 = () => {
    return (
        <ListBox
            aria-label="Search results"
            selectionMode="single"
            renderEmptyState={() => (
                <div className="text-muted-foreground flex items-center justify-center py-6 text-sm italic">
                    No results found.
                </div>
            )}
        >
            {[]}
        </ListBox>
    );
};
