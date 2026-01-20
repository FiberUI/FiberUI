"use client";

import { useIsMounted } from "@repo/hooks/use-is-mounted";

/* BASIC USAGE - Prevent Hydration Mismatch */
export const Example1 = () => {
    const isMounted = useIsMounted();

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
                <span
                    className={`h-3 w-3 rounded-full ${
                        isMounted ? "bg-green-500" : "bg-yellow-500"
                    }`}
                />
                <span className="text-sm">
                    {isMounted ? "Mounted (Client)" : "Not Mounted (SSR)"}
                </span>
            </div>
            <p className="text-muted-foreground text-xs">
                This indicator shows green only after the component mounts on
                the client.
            </p>
        </div>
    );
};
