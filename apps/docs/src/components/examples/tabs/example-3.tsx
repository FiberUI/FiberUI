import { Tabs, TabsList, Tab, TabPanel } from "@repo/ui/components/tabs";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@repo/ui/components/card";
import { Lock } from "lucide-react";

/* DISABLED TABS EXAMPLE */
export const Example3 = () => {
    return (
        <div className="w-full max-w-md">
            <Tabs>
                <TabsList aria-label="Features">
                    <Tab id="active">Active</Tab>
                    <Tab id="disabled" isDisabled>
                        Disabled
                    </Tab>
                    <Tab id="premium" isDisabled>
                        <Lock className="size-3" />
                        Premium
                    </Tab>
                    <Tab id="settings">Settings</Tab>
                </TabsList>
                <TabPanel id="active" className="pt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Active Feature</CardTitle>
                            <CardDescription>
                                This feature is available and fully accessible.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground text-sm">
                                You have full access to this feature. Explore
                                all the available options and settings.
                            </p>
                        </CardContent>
                    </Card>
                </TabPanel>
                <TabPanel id="disabled" className="pt-4">
                    <Card>
                        <CardContent>
                            <p className="text-muted-foreground text-sm">
                                This content is not accessible.
                            </p>
                        </CardContent>
                    </Card>
                </TabPanel>
                <TabPanel id="premium" className="pt-4">
                    <Card>
                        <CardContent>
                            <p className="text-muted-foreground text-sm">
                                Premium content requires an upgrade.
                            </p>
                        </CardContent>
                    </Card>
                </TabPanel>
                <TabPanel id="settings" className="pt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Settings</CardTitle>
                            <CardDescription>
                                Adjust your preferences and configuration.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground text-sm">
                                Customize your experience with various settings
                                and options available here.
                            </p>
                        </CardContent>
                    </Card>
                </TabPanel>
            </Tabs>
        </div>
    );
};
