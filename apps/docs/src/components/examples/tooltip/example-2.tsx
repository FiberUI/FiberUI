import { TooltipContent, TooltipTrigger } from "@repo/ui/components/tooltip";
import { Button } from "@repo/ui/components/button";

/* TOOLTIP PLACEMENT EXAMPLE */
export const Example2 = () => {
    return (
        <div className="flex flex-wrap items-center justify-center gap-4">
            <TooltipTrigger>
                <Button variant="outline">Top</Button>
                <TooltipContent placement="top">Top tooltip</TooltipContent>
            </TooltipTrigger>

            <TooltipTrigger>
                <Button variant="outline">Bottom</Button>
                <TooltipContent placement="bottom">
                    Bottom tooltip
                </TooltipContent>
            </TooltipTrigger>

            <TooltipTrigger>
                <Button variant="outline">Left</Button>
                <TooltipContent placement="left">Left tooltip</TooltipContent>
            </TooltipTrigger>

            <TooltipTrigger>
                <Button variant="outline">Right</Button>
                <TooltipContent placement="right">Right tooltip</TooltipContent>
            </TooltipTrigger>
        </div>
    );
};
