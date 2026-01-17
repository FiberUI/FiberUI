"use client";

import { Skeleton } from "@repo/ui/components/skeleton";
import { SkeletonWrapper } from "./skeleton-wrapper";

export const Example2 = () => {
    return (
        <SkeletonWrapper>
            <div className="flex items-center gap-4">
                <span className="text-muted-foreground w-8 text-sm">XS</span>
                <Skeleton size="xs" className="w-full" />
            </div>
            <div className="flex items-center gap-4">
                <span className="text-muted-foreground w-8 text-sm">SM</span>
                <Skeleton size="sm" className="w-full" />
            </div>
            <div className="flex items-center gap-4">
                <span className="text-muted-foreground w-8 text-sm">MD</span>
                <Skeleton size="md" className="w-full" />
            </div>
            <div className="flex items-center gap-4">
                <span className="text-muted-foreground w-8 text-sm">LG</span>
                <Skeleton size="lg" className="w-full" />
            </div>
            <div className="flex items-center gap-4">
                <span className="text-muted-foreground w-8 text-sm">XL</span>
                <Skeleton size="xl" className="w-full" />
            </div>
        </SkeletonWrapper>
    );
};
