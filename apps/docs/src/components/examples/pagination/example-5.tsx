"use client";

import {
    FullPagination,
    usePagination,
    PaginationInfo,
} from "@repo/ui/components/pagination";

/* WITH PAGE INFO */
export const Example5 = () => {
    const pagination = usePagination({
        totalItems: 247,
        itemsPerPage: 10,
    });

    return (
        <div className="flex w-full flex-col gap-4">
            {/* Page X of Y format */}
            <FullPagination pagination={pagination} showInfo={true} />

            {/* Custom info component */}
            <div className="border-border flex flex-col items-start justify-between gap-2 rounded-lg border p-4 sm:flex-row sm:items-center">
                <PaginationInfo
                    currentPage={pagination.currentPage}
                    totalPages={pagination.totalPages}
                    totalItems={247}
                    startIndex={pagination.startIndex}
                    endIndex={pagination.endIndex}
                    showItemRange={true}
                />
                <span className="text-muted-foreground text-sm">
                    {pagination.itemsPerPage} items per page
                </span>
            </div>
        </div>
    );
};
