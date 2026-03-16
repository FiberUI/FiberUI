"use client";
import { InboxIcon } from "lucide-react";
import { GridList } from "@repo/ui/components/grid-list";

/* EMPTY STATE EXAMPLE */
export const Example6 = () => {
    return (
        <GridList
            aria-label="Notifications"
            selectionMode="multiple"
            renderEmptyState={() => (
                <div className="flex flex-col items-center justify-center gap-2 py-8 text-center">
                    <InboxIcon className="text-muted-foreground/40 size-10" />
                    <div>
                        <p className="text-foreground text-sm font-medium">
                            No notifications
                        </p>
                        <p className="text-muted-foreground text-xs">
                            You&apos;re all caught up! Check back later.
                        </p>
                    </div>
                </div>
            )}
            className="w-[300px]"
        >
            {[]}
        </GridList>
    );
};
