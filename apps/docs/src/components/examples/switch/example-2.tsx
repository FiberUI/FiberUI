"use client";

import { useState } from "react";
import { Switch } from "@repo/ui/components/switch";

/* CONTROLLED SWITCH EXAMPLE */
export const Example2 = () => {
    const [isEnabled, setIsEnabled] = useState(false);

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <Switch
                    id="notifications"
                    isSelected={isEnabled}
                    onChange={setIsEnabled}
                />
                <label htmlFor="notifications" className="text-sm">
                    Enable notifications
                </label>
            </div>
            <p className="text-muted-foreground text-sm">
                Notifications are{" "}
                <span className="text-foreground font-medium">
                    {isEnabled ? "enabled" : "disabled"}
                </span>
            </p>
        </div>
    );
};
