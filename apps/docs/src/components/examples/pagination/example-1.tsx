"use client";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    PaginationEllipsis,
    usePagination,
} from "@repo/ui/components/pagination";

/* BASIC PAGINATION */
export const Example1 = () => {
    const pagination = usePagination({
        totalItems: 100,
        itemsPerPage: 10,
    });

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        onPress={pagination.previousPage}
                        isDisabled={!pagination.hasPreviousPage}
                    />
                </PaginationItem>

                {pagination.pageRange.map((page, index) =>
                    page === "ellipsis" ? (
                        <PaginationItem key={`ellipsis-${index}`}>
                            <PaginationEllipsis />
                        </PaginationItem>
                    ) : (
                        <PaginationItem key={page}>
                            <PaginationLink
                                page={page}
                                isActive={page === pagination.currentPage}
                                onPress={() => pagination.goToPage(page)}
                            />
                        </PaginationItem>
                    ),
                )}

                <PaginationItem>
                    <PaginationNext
                        onPress={pagination.nextPage}
                        isDisabled={!pagination.hasNextPage}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};
