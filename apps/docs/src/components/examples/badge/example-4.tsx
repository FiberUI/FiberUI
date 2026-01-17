import { Badge } from "@repo/ui/components/badge";
import { RefreshCw, Loader2 } from "lucide-react";

/* BADGE WITH LOADING SPINNER - SYNCING EXAMPLE */
export const Example4 = () => {
    return (
        <div className="flex flex-wrap items-center gap-3">
            <Badge variant="secondary">
                <Loader2 className="animate-spin" />
                Syncing
            </Badge>
            <Badge variant="outline">
                <Loader2 className="animate-spin" />
                Loading...
            </Badge>
            <Badge>
                <Loader2 className="animate-spin" />
                Processing
            </Badge>
            <Badge variant="secondary">
                <RefreshCw className="animate-spin" />
                Refreshing
            </Badge>
        </div>
    );
};
