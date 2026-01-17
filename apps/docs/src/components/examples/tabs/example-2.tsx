"use client";

import { useState } from "react";
import type { Key } from "react-aria-components";
import { Tabs, TabList, Tab, TabPanel } from "@repo/ui/components/tabs";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@repo/ui/components/card";

/* CONTROLLED TABS EXAMPLE */
export const Example2 = () => {
    const [selectedTab, setSelectedTab] = useState<Key>("overview");

    return (
        <div className="w-full max-w-md space-y-4">
            <Tabs selectedKey={selectedTab} onSelectionChange={setSelectedTab}>
                <TabList aria-label="Dashboard">
                    <Tab id="overview">Overview</Tab>
                    <Tab id="analytics">Analytics</Tab>
                    <Tab id="reports">Reports</Tab>
                </TabList>
                <TabPanel id="overview">
                    <Card>
                        <CardHeader>
                            <CardTitle>Dashboard Overview</CardTitle>
                            <CardDescription>
                                Key metrics and summaries at a glance.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-muted rounded-lg p-4">
                                    <p className="text-2xl font-bold">1,234</p>
                                    <p className="text-muted-foreground text-xs">
                                        Total Users
                                    </p>
                                </div>
                                <div className="bg-muted rounded-lg p-4">
                                    <p className="text-2xl font-bold">567</p>
                                    <p className="text-muted-foreground text-xs">
                                        Active Today
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabPanel>
                <TabPanel id="analytics">
                    <Card>
                        <CardHeader>
                            <CardTitle>Analytics</CardTitle>
                            <CardDescription>
                                Detailed performance data and insights.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="border-muted flex h-32 items-center justify-center rounded-lg border-2 border-dashed">
                                <p className="text-muted-foreground text-sm">
                                    Analytics Chart
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </TabPanel>
                <TabPanel id="reports">
                    <Card>
                        <CardHeader>
                            <CardTitle>Reports</CardTitle>
                            <CardDescription>
                                Generate and view detailed reports.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <div className="bg-muted flex items-center justify-between rounded-lg p-3">
                                    <span className="text-sm">
                                        Monthly Report
                                    </span>
                                    <span className="text-muted-foreground text-xs">
                                        Jan 2024
                                    </span>
                                </div>
                                <div className="bg-muted flex items-center justify-between rounded-lg p-3">
                                    <span className="text-sm">
                                        Weekly Report
                                    </span>
                                    <span className="text-muted-foreground text-xs">
                                        Week 4
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabPanel>
            </Tabs>
            <p className="text-muted-foreground text-center text-sm">
                Selected:{" "}
                <span className="text-foreground font-medium">
                    {selectedTab}
                </span>
            </p>
        </div>
    );
};
