import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@repo/ui/components/card";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
} from "@repo/ui/components/popover";
import { Button } from "@repo/ui/components/button";
import { TooltipTrigger, TooltipContent } from "@repo/ui/components/tooltip";
import { Separator } from "@repo/ui/components/separator";
import { HelpCircle, Info, Settings } from "lucide-react";

export const OverlaysBlock = () => {
    return (
        <Card>
            <CardHeader className="pb-3">
                <CardTitle className="text-base">Overlays</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                    <Popover>
                        <PopoverTrigger>
                            <Button variant="outline" size="sm">
                                <Settings className="mr-2 size-4" />
                                Settings
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-64">
                            <PopoverBody>
                                <p className="text-sm">
                                    Configure your preferences here.
                                </p>
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>

                    <TooltipTrigger>
                        <Button variant="ghost" size="icon-sm">
                            <HelpCircle className="size-4" />
                        </Button>
                        <TooltipContent>Need help?</TooltipContent>
                    </TooltipTrigger>

                    <TooltipTrigger>
                        <Button variant="ghost" size="icon-sm">
                            <Info className="size-4" />
                        </Button>
                        <TooltipContent placement="right">
                            More info
                        </TooltipContent>
                    </TooltipTrigger>
                </div>

                <Separator />

                <p className="text-muted-foreground text-xs">
                    Popovers, tooltips, and modals for contextual content.
                </p>
            </CardContent>
        </Card>
    );
};
