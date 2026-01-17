"use client";

import { FullPagination, usePagination } from "@repo/ui/components/pagination";

/* WITH JUMP TO PAGE */
export const Example3 = () => {
    const pagination = usePagination({
        totalItems: 1000,
        itemsPerPage: 10,
    });

    return (
        <FullPagination
            pagination={pagination}
            showFirstLast={true}
            showJump={true}
        />
    );
};
