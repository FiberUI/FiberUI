"use client";

import { SkeletonCard } from "@repo/ui/components/skeleton";
import { SkeletonWrapper } from "./skeleton-wrapper";

export const Example4 = () => {
    return (
        <SkeletonWrapper className="grid w-full gap-4 sm:grid-cols-2">
            <SkeletonCard />
            <SkeletonCard animation="wave" />
        </SkeletonWrapper>
    );
};
