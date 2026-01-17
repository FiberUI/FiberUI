import { Tabs, TabList, Tab, TabPanel } from "@repo/ui/components/tabs";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@repo/ui/components/card";

/* DEFAULT SELECTED TAB EXAMPLE */
export const Example4 = () => {
    return (
        <div className="w-full max-w-md">
            <Tabs defaultSelectedKey="billing">
                <TabList aria-label="Account settings">
                    <Tab id="profile">Profile</Tab>
                    <Tab id="billing">Billing</Tab>
                    <Tab id="team">Team</Tab>
                </TabList>
                <TabPanel id="profile" className="pt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile</CardTitle>
                            <CardDescription>
                                Manage your public profile information.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-4">
                                <div className="bg-muted flex size-12 items-center justify-center rounded-full text-lg font-medium">
                                    JD
                                </div>
                                <div>
                                    <p className="font-medium">John Doe</p>
                                    <p className="text-muted-foreground text-sm">
                                        john@example.com
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabPanel>
                <TabPanel id="billing" className="pt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Billing</CardTitle>
                            <CardDescription>
                                View and manage your billing details.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">
                                        Current Plan
                                    </span>
                                    <span className="bg-primary/10 text-primary rounded-full px-2 py-1 text-xs font-medium">
                                        Pro
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">
                                        Next billing date
                                    </span>
                                    <span className="text-muted-foreground text-sm">
                                        Feb 1, 2024
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabPanel>
                <TabPanel id="team" className="pt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Team</CardTitle>
                            <CardDescription>
                                Invite and manage team members.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <div className="bg-muted flex items-center gap-3 rounded-lg p-2">
                                    <div className="bg-background flex size-8 items-center justify-center rounded-full text-sm font-medium">
                                        JD
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">
                                            John Doe
                                        </p>
                                        <p className="text-muted-foreground text-xs">
                                            Owner
                                        </p>
                                    </div>
                                </div>
                                <div className="bg-muted flex items-center gap-3 rounded-lg p-2">
                                    <div className="bg-background flex size-8 items-center justify-center rounded-full text-sm font-medium">
                                        JS
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">
                                            Jane Smith
                                        </p>
                                        <p className="text-muted-foreground text-xs">
                                            Member
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabPanel>
            </Tabs>
        </div>
    );
};
