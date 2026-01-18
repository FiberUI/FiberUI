"use client";

import { Button } from "@repo/ui/components/button";
import {
    Popover,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
} from "@repo/ui/components/popover";

export const Example2: React.FC = () => {
    return (
        <div className="grid grid-cols-2 gap-5">
            <Popover>
                <PopoverTrigger>
                    <Button>Top</Button>
                </PopoverTrigger>
                <PopoverContent showArrow placement="top">
                    <PopoverBody>This is TOP popover content</PopoverBody>
                </PopoverContent>
            </Popover>

            <Popover>
                <PopoverTrigger>
                    <Button>Right</Button>
                </PopoverTrigger>
                <PopoverContent showArrow placement="right">
                    <PopoverBody>This is RIGHT popover content</PopoverBody>
                </PopoverContent>
            </Popover>

            <Popover>
                <PopoverTrigger>
                    <Button>Left</Button>
                </PopoverTrigger>
                <PopoverContent showArrow placement="left">
                    <PopoverBody>This is LEFT popover content</PopoverBody>
                </PopoverContent>
            </Popover>

            <Popover>
                <PopoverTrigger>
                    <Button>Bottom</Button>
                </PopoverTrigger>
                <PopoverContent showArrow placement="bottom">
                    <PopoverBody>This is BOTTOM popover content</PopoverBody>
                </PopoverContent>
            </Popover>
        </div>
    );
};
