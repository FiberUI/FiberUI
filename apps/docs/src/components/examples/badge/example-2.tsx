import { Badge } from "@repo/ui/components/badge";

/* BADGE VARIANTS EXAMPLE */
export const Example2 = () => {
    return (
        <div className="flex flex-wrap gap-2">
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
        </div>
    );
};
