import { Skeleton } from "@repo/ui/components/skeleton";
import {
    LoaderBars,
    LoaderBars2,
    LoaderCircles,
    LoaderSpinner,
} from "@repo/ui/components/loader";

export const LoadingShowcase = () => {
    return (
        <section className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold">Loading States</h2>
                <p className="text-muted-foreground mt-1">
                    Skeleton and loader components for loading states
                </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2">
                {/* Skeleton */}
                <div className="space-y-3">
                    <h3 className="text-muted-foreground text-sm font-medium">
                        Skeleton
                    </h3>
                    <div className="space-y-4 rounded-lg border p-4">
                        <div className="flex items-center gap-4">
                            <Skeleton className="size-12 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-3 w-24" />
                            </div>
                        </div>
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-20 w-full" />
                    </div>
                </div>

                {/* Loader */}
                <div className="space-y-3">
                    <h3 className="text-muted-foreground text-sm font-medium">
                        Loader
                    </h3>
                    <div className="flex flex-wrap items-stretch justify-between gap-6 rounded-lg border px-10 py-5">
                        <div className="flex flex-col items-center justify-end gap-5">
                            <LoaderBars2 />
                            <span className="text-muted-foreground text-xs">
                                Music Wave Loader
                            </span>
                        </div>
                        <div className="flex flex-col items-center justify-end gap-10">
                            <LoaderCircles />
                            <span className="text-muted-foreground text-xs">
                                Dots Waving Loader
                            </span>
                        </div>
                        <div className="flex flex-col items-center justify-end gap-5">
                            <LoaderSpinner />
                            <span className="text-muted-foreground text-xs">
                                Spinner Loader
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
