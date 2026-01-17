"use client";

import { useState } from "react";
import { Switch } from "@repo/ui/components/switch";
import { Label } from "@repo/ui/components/label";

/* SWITCH IN FORM LAYOUT */
export const Example5 = () => {
    const [settings, setSettings] = useState({
        marketing: false,
        social: true,
        security: true,
    });

    const updateSetting = (key: keyof typeof settings, value: boolean) => {
        setSettings((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <div className="w-full max-w-md space-y-6">
            <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                    <Label htmlFor="marketing">Marketing emails</Label>
                    <p className="text-muted-foreground text-sm">
                        Receive emails about new products and features.
                    </p>
                </div>
                <Switch
                    id="marketing"
                    isSelected={settings.marketing}
                    onChange={(val) => updateSetting("marketing", val)}
                />
            </div>
            <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                    <Label htmlFor="social">Social notifications</Label>
                    <p className="text-muted-foreground text-sm">
                        Receive notifications for friend requests and mentions.
                    </p>
                </div>
                <Switch
                    id="social"
                    isSelected={settings.social}
                    onChange={(val) => updateSetting("social", val)}
                />
            </div>
            <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                    <Label htmlFor="security">Security alerts</Label>
                    <p className="text-muted-foreground text-sm">
                        Get notified about security updates and login attempts.
                    </p>
                </div>
                <Switch
                    id="security"
                    isSelected={settings.security}
                    onChange={(val) => updateSetting("security", val)}
                />
            </div>
        </div>
    );
};
