"use client";

import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Textarea } from "@repo/ui/components/textarea";
import { Label } from "@repo/ui/components/label";
import {
    Popover,
    PopoverBody,
    PopoverContent,
    PopoverFooter,
    PopoverHeader,
    PopoverTrigger,
} from "@repo/ui/components/popover";

// import {
//     Popover,
//     PopoverContent,
//     PopoverTrigger,
// } from "@repo/ui/components/popover";

import React, { useState } from "react";
// import { Select, Item } from "@repo/ui/components/select";

interface PlaygroundProps {}

export const Playground: React.FC<PlaygroundProps> = ({}) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="h-[750px]">
            <div className="flex justify-center">
                <div className="w-96">
                    <Label htmlFor="sample">Hello</Label>
                    <Input id="sample" placeholder="her is input" />
                </div>
                <div className="w-96">
                    <Label htmlFor="sample">Hello</Label>
                    <Input type="file" id="sample" placeholder="her is input" />
                </div>
                <div className="w-96">
                    <Label htmlFor="sample-color">Choose Color</Label>
                    <Input
                        type="color"
                        id="sample-color"
                        placeholder="her is input"
                    />
                </div>
                <div className="w-96">
                    <Label htmlFor="sample-textarea">Input Textarea</Label>
                    <Textarea
                        type="textarea"
                        id="sample-textarea"
                        placeholder="her is input"
                    />
                </div>
                <Button onPress={() => setOpen((o) => !o)}>
                    Outside Popover Btn
                </Button>
                {/* ############################################################## */}
                {/* // Basic usage */}
                <Popover>
                    <PopoverTrigger asChild>
                        <Button>Open Popover</Button>
                    </PopoverTrigger>
                    <PopoverContent>This is a simple popover</PopoverContent>
                </Popover>
                {/* // With header and footer */}
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline">Settings</Button>
                    </PopoverTrigger>
                    <PopoverContent placement="bottom start">
                        <PopoverHeader>Account Settings</PopoverHeader>
                        <PopoverBody>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium">
                                        Username
                                    </label>
                                    <input className="mt-1 w-full rounded border px-3 py-2" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">
                                        Email
                                    </label>
                                    <input className="mt-1 w-full rounded border px-3 py-2" />
                                </div>
                            </div>
                        </PopoverBody>
                        <PopoverFooter>
                            <Button size="sm">Save</Button>
                        </PopoverFooter>
                    </PopoverContent>
                </Popover>
                {/* // Controlled const [isOpen, setIsOpen] = useState(false); */}
                <Popover isOpen={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button>Controlled</Button>
                    </PopoverTrigger>
                    <PopoverContent>Controlled popover content</PopoverContent>
                </Popover>
                {/* // Different placements */}
                <Popover>
                    <PopoverTrigger>Top</PopoverTrigger>
                    <PopoverContent placement="top">
                        Appears above
                    </PopoverContent>
                </Popover>
                {/* // Non-dismissable (modal-like) */}
                <Popover>
                    <PopoverTrigger asChild>
                        <Button>Important</Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <PopoverBody>Must close explicitly</PopoverBody>
                        <PopoverFooter>
                            <Button>Close</Button>
                        </PopoverFooter>
                    </PopoverContent>
                </Popover>
                {/* ############################################################## */}
                {/* <Popover>
                    <PopoverTrigger>Open</PopoverTrigger>
                    <PopoverContent placement="bottom">
                        <ul className="p-2">
                            <li className="p-1">mango</li>
                            <li className="p-1">apple</li>
                            <li className="p-1">orange</li>
                            <li className="p-1">pear</li>
                        </ul>
                    </PopoverContent>
                </Popover> */}
                {/* <Popover>
                    <PopoverTrigger className="rounded-md border px-3 py-2">
                        Open Popover
                    </PopoverTrigger>
                    <PopoverContent className="w-56">
                        <ul className="p-2">
                            <li className="p-1">Mango</li>
                            <li className="p-1">Apple</li>
                            <li className="p-1">Orange</li>
                            <li className="p-1">Pear</li>
                        </ul>
                    </PopoverContent>
                </Popover> */}
                {/* <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline">Open popover asChild</Button>
                    </PopoverTrigger>
                    <PopoverContent
                        asChild
                        className="w-80 rounded border bg-gray-50 p-4"
                        placement="bottom"
                    >
                        <div className="bg- grid gap-4 border bg-green-500">
                            <div className="space-y-2">
                                <h4 className="font-medium leading-none">
                                    Dimensions
                                </h4>
                                <p className="text-muted-foreground text-sm">
                                    Set the dimensions for the layer.
                                </p>
                            </div>
                            <div className="grid gap-2">
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <label htmlFor="width">Width</label>
                                    <input
                                        id="width"
                                        defaultValue="100%"
                                        className="col-span-2 h-8"
                                    />
                                </div>
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <label htmlFor="maxWidth">Max. width</label>
                                    <input
                                        id="maxWidth"
                                        defaultValue="300px"
                                        className="col-span-2 h-8"
                                    />
                                </div>
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <label htmlFor="height">Height</label>
                                    <input
                                        id="height"
                                        defaultValue="25px"
                                        className="col-span-2 h-8"
                                    />
                                </div>
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <label htmlFor="maxHeight">
                                        Max. height
                                    </label>
                                    <input
                                        id="maxHeight"
                                        defaultValue="none"
                                        className="col-span-2 h-8"
                                    />
                                </div>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover> */}
                {/* <Select label="Favorite Color">
                    <Item>Red</Item>
                    <Item>Orange</Item>
                    <Item>Yellow</Item>
                    <Item>Green</Item>
                    <Item>Blue</Item>
                    <Item>Purple</Item>
                    <Item>Black</Item>
                    <Item>White</Item>
                    <Item>Lime</Item>
                    <Item>Fushsia</Item>
                </Select> */}
                <Button onPress={() => alert("HELLO")}>Hello</Button>
            </div>
        </div>
    );
};
