"use client";

import { Tabs, TabList, Tab, TabPanel } from "@repo/ui/components/tabs";
import { Settings, User, Bell, CreditCard } from "lucide-react";

export const TabsShowcase = () => {
    return (
        <section className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold">Tabs</h2>
                <p className="text-muted-foreground mt-1">
                    Organize content into switchable panels
                </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
                {/* Basic Tabs */}
                <div className="space-y-3">
                    <h3 className="text-muted-foreground text-sm font-medium">
                        Basic
                    </h3>
                    <Tabs>
                        <TabList aria-label="Basic tabs">
                            <Tab id="tab1">Account</Tab>
                            <Tab id="tab2">Password</Tab>
                            <Tab id="tab3">Settings</Tab>
                        </TabList>
                        <TabPanel id="tab1">
                            <div className="bg-muted rounded-lg p-4">
                                <p className="text-sm">
                                    Manage your account settings and
                                    preferences.
                                </p>
                            </div>
                        </TabPanel>
                        <TabPanel id="tab2">
                            <div className="bg-muted rounded-lg p-4">
                                <p className="text-sm">
                                    Update your password and security settings.
                                </p>
                            </div>
                        </TabPanel>
                        <TabPanel id="tab3">
                            <div className="bg-muted rounded-lg p-4">
                                <p className="text-sm">
                                    Configure application preferences.
                                </p>
                            </div>
                        </TabPanel>
                    </Tabs>
                </div>

                {/* Tabs with Icons */}
                <div className="space-y-3">
                    <h3 className="text-muted-foreground text-sm font-medium">
                        With Icons
                    </h3>
                    <Tabs>
                        <TabList aria-label="Icon tabs">
                            <Tab id="profile">
                                <User className="size-4" />
                                Profile
                            </Tab>
                            <Tab id="billing">
                                <CreditCard className="size-4" />
                                Billing
                            </Tab>
                            <Tab id="notifications">
                                <Bell className="size-4" />
                                Alerts
                            </Tab>
                        </TabList>
                        <TabPanel id="profile">
                            <div className="bg-muted rounded-lg p-4">
                                <p className="text-sm">
                                    Edit your profile information.
                                </p>
                            </div>
                        </TabPanel>
                        <TabPanel id="billing">
                            <div className="bg-muted rounded-lg p-4">
                                <p className="text-sm">
                                    Manage billing and subscriptions.
                                </p>
                            </div>
                        </TabPanel>
                        <TabPanel id="notifications">
                            <div className="bg-muted rounded-lg p-4">
                                <p className="text-sm">
                                    Configure notification preferences.
                                </p>
                            </div>
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        </section>
    );
};
