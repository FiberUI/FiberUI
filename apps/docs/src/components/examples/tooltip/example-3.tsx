import { TooltipContent, TooltipTrigger } from "@repo/ui/components/tooltip";
import { Button } from "@repo/ui/components/button";
import { Info, HelpCircle, Settings } from "lucide-react";

/* TOOLTIP WITH ICON BUTTONS */
export const Example3 = () => {
    return (
        <div className="flex items-center gap-2">
            <TooltipTrigger>
                <Button variant="ghost" size="icon">
                    <Info className="size-4" />
                </Button>
                <TooltipContent>More information</TooltipContent>
            </TooltipTrigger>

            <TooltipTrigger>
                <Button variant="ghost" size="icon">
                    <HelpCircle className="size-4" />
                </Button>
                <TooltipContent>Help & Support</TooltipContent>
            </TooltipTrigger>

            <TooltipTrigger>
                <Button variant="ghost" size="icon">
                    <Settings className="size-4" />
                </Button>
                <TooltipContent>Settings</TooltipContent>
            </TooltipTrigger>
        </div>
    );
};
