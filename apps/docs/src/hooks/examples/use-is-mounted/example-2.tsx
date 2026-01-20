"use client";

import { useIsMounted } from "@repo/hooks/use-is-mounted";

/* CLIENT-ONLY CONTENT - Window Dimensions */
export const Example2 = () => {
    const isMounted = useIsMounted();

    if (!isMounted) {
        return <div className="bg-muted h-16 w-48 animate-pulse rounded-md" />;
    }

    return (
        <div className="flex flex-col gap-1 rounded-md border p-4">
            <p className="text-sm font-medium">Window Size</p>
            <p className="text-2xl font-bold">
                {window.innerWidth} × {window.innerHeight}
            </p>
            <p className="text-muted-foreground text-xs">
                This would cause a hydration error without useIsMounted
            </p>
        </div>
    );
};
