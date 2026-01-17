"use client";

import { Checkbox } from "@repo/ui/components/checkbox";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@repo/ui/components/card";

export const CheckboxBlock = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                    <Checkbox id="terms" defaultSelected />
                    <div>
                        <label htmlFor="terms" className="text-sm font-medium">
                            Accept terms
                        </label>
                        <p className="text-muted-foreground text-xs">
                            I agree to the terms and conditions
                        </p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <Checkbox id="newsletter" />
                    <div>
                        <label
                            htmlFor="newsletter"
                            className="text-sm font-medium"
                        >
                            Newsletter
                        </label>
                        <p className="text-muted-foreground text-xs">
                            Receive weekly newsletter
                        </p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <Checkbox id="analytics" defaultSelected />
                    <div>
                        <label
                            htmlFor="analytics"
                            className="text-sm font-medium"
                        >
                            Analytics
                        </label>
                        <p className="text-muted-foreground text-xs">
                            Allow usage analytics
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
