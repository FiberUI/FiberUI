"use client";

import { Skeleton } from "@repo/ui/components/skeleton";
import { SkeletonWrapper } from "./skeleton-wrapper";

export const Example1 = () => {
    return (
        <SkeletonWrapper>
            <div className="flex items-center gap-4">
                <Skeleton variant="circular" className="h-12 w-12" />
                <div className="flex-1 space-y-2">
                    <Skeleton variant="text" width="50%" />
                    <Skeleton variant="text" width="30%" size="xs" />
                </div>
            </div>
            <Skeleton variant="default" height={120} />
            <div className="space-y-2">
                <Skeleton variant="text" />
                <Skeleton variant="text" />
                <Skeleton variant="text" width="60%" />
            </div>
        </SkeletonWrapper>
    );
};
