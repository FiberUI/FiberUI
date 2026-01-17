"use client";

import { FullPagination, usePagination } from "@repo/ui/components/pagination";

/* WITH ITEMS PER PAGE SELECTOR */
export const Example4 = () => {
    const pagination = usePagination({
        totalItems: 500,
        itemsPerPage: 10,
        onPageChange: (page) => console.log("Page changed to:", page),
        onItemsPerPageChange: (count) => console.log("Items per page:", count),
    });

    return (
        <FullPagination
            pagination={pagination}
            showPerPage={true}
            perPageOptions={[5, 10, 25, 50, 100]}
        />
    );
};
