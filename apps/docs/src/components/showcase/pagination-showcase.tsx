"use client";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
} from "@repo/ui/components/pagination";

export const PaginationShowcase = () => {
    return (
        <section className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold">Pagination</h2>
                <p className="text-muted-foreground mt-1">
                    Navigate through pages of content
                </p>
            </div>

            <div className="space-y-4">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink page={1}>1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink page={2} isActive>
                                2
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink page={3}>3</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink page={10}>10</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </section>
    );
};
