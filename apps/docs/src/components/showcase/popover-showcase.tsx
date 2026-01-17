"use client";

import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@repo/ui/components/popover";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { Settings } from "lucide-react";

export const PopoverShowcase = () => {
    return (
        <section className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold">Popover</h2>
                <p className="text-muted-foreground mt-1">
                    Floating content panel for contextual information
                </p>
            </div>

            <div className="flex flex-wrap gap-4">
                {/* Basic Popover */}
                <Popover>
                    <PopoverTrigger>
                        <Button variant="outline">Open Popover</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-64">
                        <div className="space-y-2">
                            <h4 className="font-medium">Popover Title</h4>
                            <p className="text-muted-foreground text-sm">
                                This is a simple popover with some content.
                            </p>
                        </div>
                    </PopoverContent>
                </Popover>

                {/* Settings Popover */}
                <Popover>
                    <PopoverTrigger>
                        <Button variant="outline" size="icon">
                            <Settings className="size-4" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                        <div className="space-y-4">
                            <h4 className="font-medium">Quick Settings</h4>
                            <div className="space-y-2">
                                <Label htmlFor="width">Width</Label>
                                <Input id="width" defaultValue="100%" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="height">Height</Label>
                                <Input id="height" defaultValue="auto" />
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        </section>
    );
};
