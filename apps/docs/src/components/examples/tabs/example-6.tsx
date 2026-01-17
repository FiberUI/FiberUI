"use client";

import { useState } from "react";
import { Tabs, TabsList, Tab, TabPanel } from "@repo/ui/components/tabs";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@repo/ui/components/card";

/* DYNAMIC TABS EXAMPLE */
export const Example6 = () => {
    const [tabs] = useState([
        {
            id: "1",
            title: "Project Alpha",
            description: "Main development project",
            status: "Active",
            progress: 75,
        },
        {
            id: "2",
            title: "Project Beta",
            description: "Research and development",
            status: "In Progress",
            progress: 45,
        },
        {
            id: "3",
            title: "Project Gamma",
            description: "Client deliverable",
            status: "Review",
            progress: 90,
        },
    ]);

    return (
        <div className="w-full max-w-md">
            <Tabs>
                <TabsList aria-label="Projects" items={tabs}>
                    {(item) => <Tab id={item.id}>{item.title}</Tab>}
                </TabsList>
                {tabs.map((item) => (
                    <TabPanel key={item.id} id={item.id} className="pt-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>{item.title}</CardTitle>
                                <CardDescription>
                                    {item.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">Status</span>
                                    <span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs font-medium">
                                        {item.status}
                                    </span>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <span>Progress</span>
                                        <span className="font-medium">
                                            {item.progress}%
                                        </span>
                                    </div>
                                    <div className="bg-muted h-2 rounded-full">
                                        <div
                                            className="bg-primary h-full rounded-full transition-all"
                                            style={{
                                                width: `${item.progress}%`,
                                            }}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabPanel>
                ))}
            </Tabs>
        </div>
    );
};
