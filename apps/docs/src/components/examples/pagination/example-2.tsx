"use client";

import { FullPagination, usePagination } from "@repo/ui/components/pagination";

/* WITH FIRST/LAST PAGE BUTTONS */
export const Example2 = () => {
    const pagination = usePagination({
        totalItems: 500,
        itemsPerPage: 10,
        initialPage: 25,
    });

    return (
        <FullPagination
            pagination={pagination}
            showFirstLast={true}
            showPrevNext={true}
            showPageNumbers={true}
        />
    );
};
