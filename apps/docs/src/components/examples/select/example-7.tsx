"use client";

import { useState } from "react";
import { Label } from "@repo/ui/components/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@repo/ui/components/select";

/* SELECT IN A FORM LAYOUT */
export const Example7 = () => {
    const [country, setCountry] = useState<string>("");
    const [role, setRole] = useState<string>("");

    return (
        <div className="w-full max-w-sm space-y-4">
            <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select
                    id="country"
                    placeholder="Select your country"
                    selectedKey={country}
                    onSelectionChange={(key) => setCountry(key as string)}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="au">Australia</SelectItem>
                        <SelectItem value="de">Germany</SelectItem>
                        <SelectItem value="fr">France</SelectItem>
                        <SelectItem value="in">India</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select
                    id="role"
                    placeholder="Select your role"
                    selectedKey={role}
                    onSelectionChange={(key) => setRole(key as string)}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="developer">Developer</SelectItem>
                        <SelectItem value="designer">Designer</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="analyst">Analyst</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};
