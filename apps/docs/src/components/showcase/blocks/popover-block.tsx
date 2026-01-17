"use client";

import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@repo/ui/components/popover";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";

export const PopoverBlock = () => {
    return (
        <div className="flex flex-wrap items-center gap-3 rounded-xl border p-6">
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline">Open Popover</Button>
                </PopoverTrigger>
                <PopoverContent className="w-72">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <h4 className="font-medium">Dimensions</h4>
                            <p className="text-muted-foreground text-xs">
                                Set the dimensions for the layer.
                            </p>
                        </div>
                        <div className="grid gap-2">
                            <div className="grid grid-cols-3 items-center gap-4">
                                <Label htmlFor="width">Width</Label>
                                <Input
                                    id="width"
                                    defaultValue="100%"
                                    className="col-span-2 h-8"
                                />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                                <Label htmlFor="height">Height</Label>
                                <Input
                                    id="height"
                                    defaultValue="auto"
                                    className="col-span-2 h-8"
                                />
                            </div>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
};
