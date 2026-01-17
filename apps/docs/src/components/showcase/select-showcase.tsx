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

export const SelectShowcase = () => {
    return (
        <section className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold">Select</h2>
                <p className="text-muted-foreground mt-1">
                    Dropdown menu for selecting from options
                </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {/* Basic Select */}
                <div className="space-y-2">
                    <Label>Basic</Label>
                    <Select placeholder="Select a fruit">
                        <SelectTrigger className="w-full">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="apple">Apple</SelectItem>
                            <SelectItem value="banana">Banana</SelectItem>
                            <SelectItem value="orange">Orange</SelectItem>
                            <SelectItem value="grape">Grape</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Grouped Select */}
                <div className="space-y-2">
                    <Label>Grouped</Label>
                    <Select placeholder="Select food">
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
                                <SelectItem value="broccoli">
                                    Broccoli
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                {/* Disabled Select */}
                <div className="space-y-2">
                    <Label>Disabled</Label>
                    <Select placeholder="Disabled" isDisabled>
                        <SelectTrigger className="w-full">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="option">Option</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </section>
    );
};
