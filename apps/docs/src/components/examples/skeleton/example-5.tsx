"use client";

import {
    Skeleton,
    SkeletonAvatar,
    SkeletonText,
    SkeletonButton,
} from "@repo/ui/components/skeleton";
import { SkeletonWrapper } from "./skeleton-wrapper";

export const Example5 = () => {
    return (
        <SkeletonWrapper>
            <div className="border-border w-full rounded-lg border p-6">
                <div className="flex items-start gap-4">
                    <SkeletonAvatar avatarSize="xl" />
                    <div className="flex-1">
                        <Skeleton variant="text" width="40%" className="mb-1" />
                        <Skeleton
                            variant="text"
                            width="25%"
                            size="xs"
                            className="mb-4"
                        />
                        <SkeletonText lines={2} />
                        <div className="mt-4 flex gap-2">
                            <SkeletonButton buttonSize="sm" />
                            <SkeletonButton buttonSize="sm" />
                        </div>
                    </div>
                </div>
            </div>
        </SkeletonWrapper>
    );
};
