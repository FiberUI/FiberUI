import { Badge } from "@repo/ui/components/badge";
import { Check, X, AlertTriangle, Info } from "lucide-react";

/* BADGE WITH ICONS EXAMPLE */
export const Example3 = () => {
    return (
        <div className="flex flex-wrap gap-2">
            <Badge>
                <Check />
                Success
            </Badge>
            <Badge variant="destructive">
                <X />
                Error
            </Badge>
            <Badge variant="secondary">
                <AlertTriangle />
                Warning
            </Badge>
            <Badge variant="outline">
                <Info />
                Info
            </Badge>
        </div>
    );
};
