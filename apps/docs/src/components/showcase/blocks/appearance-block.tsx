"use client";

import { Switch } from "@repo/ui/components/switch";
import { Checkbox } from "@repo/ui/components/checkbox";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@repo/ui/components/card";
import { Separator } from "@repo/ui/components/separator";

export const AppearanceBlock = () => {
    return (
        <Card>
            <CardHeader className="pb-3">
                <CardTitle className="text-base">Appearance</CardTitle>
                <CardDescription>
                    Customize your app experience.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium">Dark Mode</p>
                        <p className="text-muted-foreground text-xs">
                            Use dark theme
                        </p>
                    </div>
                    <Switch defaultSelected />
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium">Compact View</p>
                        <p className="text-muted-foreground text-xs">
                            Reduce spacing
                        </p>
                    </div>
                    <Switch />
                </div>

                <Separator />

                <div className="space-y-3">
                    <p className="text-sm font-medium">Show in sidebar</p>
                    <div className="flex items-center gap-3">
                        <Checkbox id="recents" defaultSelected />
                        <label htmlFor="recents" className="text-sm">
                            Recents
                        </label>
                    </div>
                    <div className="flex items-center gap-3">
                        <Checkbox id="favorites" defaultSelected />
                        <label htmlFor="favorites" className="text-sm">
                            Favorites
                        </label>
                    </div>
                    <div className="flex items-center gap-3">
                        <Checkbox id="shared" />
                        <label htmlFor="shared" className="text-sm">
                            Shared
                        </label>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
