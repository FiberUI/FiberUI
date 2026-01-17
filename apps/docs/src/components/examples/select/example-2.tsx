"use client";

import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@repo/ui/components/select";

/* CONTROLLED SELECT EXAMPLE */
export const Example2 = () => {
    const [value, setValue] = useState<string>("dark");

    return (
        <div className="space-y-4">
            <Select
                placeholder="Select a theme"
                selectedKey={value}
                onSelectionChange={(key) => setValue(key as string)}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                </SelectContent>
            </Select>
            <p className="text-muted-foreground text-sm">
                Selected:{" "}
                <span className="text-foreground font-medium">{value}</span>
            </p>
        </div>
    );
};
