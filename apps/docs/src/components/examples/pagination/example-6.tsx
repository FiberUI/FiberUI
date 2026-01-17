"use client";

import { FullPagination, usePagination } from "@repo/ui/components/pagination";

/* ALL FEATURES COMBINED */
export const Example6 = () => {
    const pagination = usePagination({
        totalItems: 1500,
        itemsPerPage: 25,
        siblingCount: 1,
    });

    return (
        <div className="w-full">
            <FullPagination
                pagination={pagination}
                showFirstLast={true}
                showPrevNext={true}
                showPageNumbers={true}
                showInfo={true}
                showItemRange={true}
                showJump={true}
                showPerPage={true}
                perPageOptions={[10, 25, 50, 100]}
                size="default"
                className="flex-wrap justify-center gap-3"
            />
        </div>
    );
};
