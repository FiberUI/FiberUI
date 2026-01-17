import { Tabs, TabList, Tab, TabPanel } from "@repo/ui/components/tabs";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@repo/ui/components/card";
import { User, Bell, Shield } from "lucide-react";

/* TABS WITH ICONS EXAMPLE */
export const Example5 = () => {
    return (
        <div className="w-full max-w-md">
            <Tabs>
                <TabList aria-label="Settings">
                    <Tab id="profile">
                        <User className="size-4" />
                        Profile
                    </Tab>
                    <Tab id="notifications">
                        <Bell className="size-4" />
                        Alerts
                    </Tab>
                    <Tab id="security">
                        <Shield className="size-4" />
                        Security
                    </Tab>
                </TabList>
                <TabPanel id="profile" className="pt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="size-5" />
                                Profile Settings
                            </CardTitle>
                            <CardDescription>
                                Update your profile information and avatar.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-4">
                                <div className="flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-xl font-bold text-white">
                                    U
                                </div>
                                <div className="space-y-1">
                                    <p className="font-medium">
                                        Upload a new avatar
                                    </p>
                                    <p className="text-muted-foreground text-sm">
                                        JPG, PNG or GIF. Max 2MB.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabPanel>
                <TabPanel id="notifications" className="pt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Bell className="size-5" />
                                Notification Settings
                            </CardTitle>
                            <CardDescription>
                                Configure your notification preferences.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">
                                        Email notifications
                                    </span>
                                    <span className="rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-600">
                                        On
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">
                                        Push notifications
                                    </span>
                                    <span className="rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-600">
                                        On
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">SMS alerts</span>
                                    <span className="bg-muted text-muted-foreground rounded-full px-2 py-0.5 text-xs font-medium">
                                        Off
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabPanel>
                <TabPanel id="security" className="pt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Shield className="size-5" />
                                Security Settings
                            </CardTitle>
                            <CardDescription>
                                Manage security and privacy settings.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">
                                        Two-factor authentication
                                    </span>
                                    <span className="rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-600">
                                        Enabled
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">
                                        Last password change
                                    </span>
                                    <span className="text-muted-foreground text-sm">
                                        30 days ago
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabPanel>
            </Tabs>
        </div>
    );
};
