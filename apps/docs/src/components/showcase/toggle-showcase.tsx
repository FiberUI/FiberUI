"use client";

import { Switch } from "@repo/ui/components/switch";
import { Checkbox } from "@repo/ui/components/checkbox";
import { Label } from "@repo/ui/components/label";

export const ToggleShowcase = () => {
    return (
        <section className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold">Switch & Checkbox</h2>
                <p className="text-muted-foreground mt-1">
                    Toggle controls for boolean selections
                </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2">
                {/* Switch Examples */}
                <div className="space-y-4">
                    <h3 className="text-muted-foreground text-sm font-medium">
                        Switch
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between rounded-lg border p-4">
                            <div>
                                <p className="text-sm font-medium">
                                    Airplane Mode
                                </p>
                                <p className="text-muted-foreground text-xs">
                                    Disable all wireless
                                </p>
                            </div>
                            <Switch id="airplane" />
                        </div>
                        <div className="flex items-center justify-between rounded-lg border p-4">
                            <div>
                                <p className="text-sm font-medium">Dark Mode</p>
                                <p className="text-muted-foreground text-xs">
                                    Use dark theme
                                </p>
                            </div>
                            <Switch id="darkmode" defaultSelected />
                        </div>
                        <div className="flex items-center justify-between rounded-lg border p-4 opacity-60">
                            <div>
                                <p className="text-sm font-medium">Disabled</p>
                                <p className="text-muted-foreground text-xs">
                                    Cannot toggle
                                </p>
                            </div>
                            <Switch id="disabled-switch" isDisabled />
                        </div>
                    </div>
                </div>

                {/* Checkbox Examples */}
                <div className="space-y-4">
                    <h3 className="text-muted-foreground text-sm font-medium">
                        Checkbox
                    </h3>
                    <div className="space-y-3 rounded-lg border p-4">
                        <div className="flex items-center gap-3">
                            <Checkbox id="terms" />
                            <Label htmlFor="terms" className="text-sm">
                                Accept terms and conditions
                            </Label>
                        </div>
                        <div className="flex items-center gap-3">
                            <Checkbox id="newsletter" defaultSelected />
                            <Label htmlFor="newsletter" className="text-sm">
                                Subscribe to newsletter
                            </Label>
                        </div>
                        <div className="flex items-center gap-3">
                            <Checkbox id="marketing" />
                            <Label htmlFor="marketing" className="text-sm">
                                Receive marketing emails
                            </Label>
                        </div>
                        <div className="flex items-center gap-3 opacity-60">
                            <Checkbox id="disabled-checkbox" isDisabled />
                            <Label
                                htmlFor="disabled-checkbox"
                                className="text-sm"
                            >
                                Disabled option
                            </Label>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
