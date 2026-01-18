import { TooltipContent, TooltipTrigger } from "@repo/ui/components/tooltip";
import { Button } from "@repo/ui/components/button";

/* BASIC USAGE EXAMPLE */
export const Example1 = () => {
    return (
        <TooltipTrigger>
            <Button variant="outline">Hover me</Button>
            <TooltipContent>Add to library</TooltipContent>
        </TooltipTrigger>
    );
};
