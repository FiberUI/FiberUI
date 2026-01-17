"use client";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@repo/ui/components/select";
import { Label } from "@repo/ui/components/label";

export const SelectBlock = () => {
    return (
        <div className="space-y-4 rounded-xl border p-6">
            <div className="space-y-2">
                <Label>Country</Label>
                <Select placeholder="Select country">
                    <SelectTrigger className="w-full">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="au">Australia</SelectItem>
                        <SelectItem value="de">Germany</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label>Category</Label>
                <Select placeholder="Select category">
                    <SelectTrigger className="w-full">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Fruits</SelectLabel>
                            <SelectItem value="apple">Apple</SelectItem>
                            <SelectItem value="banana">Banana</SelectItem>
                        </SelectGroup>
                        <SelectGroup>
                            <SelectLabel>Vegetables</SelectLabel>
                            <SelectItem value="carrot">Carrot</SelectItem>
                            <SelectItem value="broccoli">Broccoli</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};
