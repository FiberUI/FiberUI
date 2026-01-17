"use client";

import { useState } from "react";
import { Switch } from "@repo/ui/components/switch";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@repo/ui/components/card";

export const SettingsBlock = () => {
    const [notifications, setNotifications] = useState(true);
    const [marketing, setMarketing] = useState(false);
    const [updates, setUpdates] = useState(true);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium">
                            Push Notifications
                        </p>
                        <p className="text-muted-foreground text-xs">
                            Receive push notifications
                        </p>
                    </div>
                    <Switch
                        isSelected={notifications}
                        onChange={setNotifications}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium">Marketing Emails</p>
                        <p className="text-muted-foreground text-xs">
                            Receive marketing emails
                        </p>
                    </div>
                    <Switch isSelected={marketing} onChange={setMarketing} />
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium">Product Updates</p>
                        <p className="text-muted-foreground text-xs">
                            Get notified about updates
                        </p>
                    </div>
                    <Switch isSelected={updates} onChange={setUpdates} />
                </div>
            </CardContent>
        </Card>
    );
};
