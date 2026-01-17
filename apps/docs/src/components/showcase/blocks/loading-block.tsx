import { Skeleton } from "@repo/ui/components/skeleton";
import {
    LoaderBars2,
    LoaderCircles,
    LoaderSpinner,
} from "@repo/ui/components/loader";

export const LoadingBlock = () => {
    return (
        <div className="grid gap-4 sm:grid-cols-2">
            {/* Skeleton Card */}
            <div className="space-y-4 rounded-xl border p-4">
                <div className="flex items-center gap-4">
                    <Skeleton className="size-12 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="h-3 w-20" />
                    </div>
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-16 w-full" />
            </div>

            {/* Loaders */}
            <div className="flex flex-wrap items-center justify-around gap-4 rounded-xl border p-4">
                <LoaderBars2 />
                <LoaderCircles />
                <LoaderSpinner />
            </div>
        </div>
    );
};
