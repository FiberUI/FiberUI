"use client";

import { Tabs, TabList, Tab, TabPanel } from "@repo/ui/components/tabs";
import { Card, CardContent } from "@repo/ui/components/card";
import { User, CreditCard, Settings } from "lucide-react";

export const TabsBlock = () => {
    return (
        <Card>
            <CardContent className="pt-6">
                <Tabs>
                    <TabList aria-label="Account">
                        <Tab id="account">
                            <User className="size-4" />
                            Account
                        </Tab>
                        <Tab id="billing">
                            <CreditCard className="size-4" />
                            Billing
                        </Tab>
                    </TabList>
                    <TabPanel id="account">
                        <div className="bg-muted space-y-2 rounded-lg p-4">
                            <p className="text-sm font-medium">
                                Account Details
                            </p>
                            <p className="text-muted-foreground text-xs">
                                Manage your personal information and
                                preferences.
                            </p>
                        </div>
                    </TabPanel>
                    <TabPanel id="billing">
                        <div className="bg-muted space-y-2 rounded-lg p-4">
                            <p className="text-sm font-medium">Billing Info</p>
                            <p className="text-muted-foreground text-xs">
                                View your subscription and payment details.
                            </p>
                        </div>
                    </TabPanel>
                </Tabs>
            </CardContent>
        </Card>
    );
};
