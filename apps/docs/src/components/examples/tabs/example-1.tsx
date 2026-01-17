import { Tabs, TabsList, Tab, TabPanel } from "@repo/ui/components/tabs";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@repo/ui/components/card";

/* BASIC USAGE EXAMPLE */
export const Example1 = () => {
    return (
        <div className="w-full max-w-md">
            <Tabs>
                <TabsList aria-label="Settings">
                    <Tab id="account">Account</Tab>
                    <Tab id="password">Password</Tab>
                    <Tab id="notifications">Notifications</Tab>
                </TabsList>
                <TabPanel id="account" className="pt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Account Settings</CardTitle>
                            <CardDescription>
                                Manage your account settings and preferences.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground text-sm">
                                Configure your account details, profile
                                information, and personal preferences here.
                            </p>
                        </CardContent>
                    </Card>
                </TabPanel>
                <TabPanel id="password" className="pt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Password & Security</CardTitle>
                            <CardDescription>
                                Change your password and security settings.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground text-sm">
                                Update your password, enable two-factor
                                authentication, and manage security preferences.
                            </p>
                        </CardContent>
                    </Card>
                </TabPanel>
                <TabPanel id="notifications" className="pt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Notification Preferences</CardTitle>
                            <CardDescription>
                                Configure how you receive notifications.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground text-sm">
                                Choose which notifications you want to receive
                                via email, push, or in-app alerts.
                            </p>
                        </CardContent>
                    </Card>
                </TabPanel>
            </Tabs>
        </div>
    );
};
