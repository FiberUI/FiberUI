"use client";

import { Skeleton } from "@repo/ui/components/skeleton";
import { SkeletonWrapper } from "./skeleton-wrapper";

export const Example3 = () => {
    return (
        <SkeletonWrapper>
            <div>
                <p className="text-muted-foreground mb-2 text-sm">
                    Pulse (default)
                </p>
                <Skeleton animation="pulse" height={60} />
            </div>
            <div>
                <p className="text-muted-foreground mb-2 text-sm">Wave</p>
                <Skeleton animation="wave" height={60} />
            </div>
            <div>
                <p className="text-muted-foreground mb-2 text-sm">None</p>
                <Skeleton animation="none" height={60} />
            </div>
        </SkeletonWrapper>
    );
};
