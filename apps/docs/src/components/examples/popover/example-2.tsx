"use client";

import {
    Popover,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
} from "@repo/ui/components/popover";

interface Example2Props {}

export const Example2: React.FC<Example2Props> = ({}) => {
    return (
        <>
            <div className="grid grid-cols-2 gap-5">
                <Popover>
                    <PopoverTrigger>Top</PopoverTrigger>
                    <PopoverContent placement="top">
                        <PopoverBody>This is TOP popover content</PopoverBody>
                    </PopoverContent>
                </Popover>

                {/* --------------------------------------------------- */}

                <Popover>
                    <PopoverTrigger>Right</PopoverTrigger>
                    <PopoverContent placement="right">
                        <PopoverBody>This is RIGHT popover content</PopoverBody>
                    </PopoverContent>
                </Popover>

                {/* --------------------------------------------------- */}

                <Popover>
                    <PopoverTrigger>Left</PopoverTrigger>
                    <PopoverContent placement="left">
                        <PopoverBody>This is LEFT popover content</PopoverBody>
                    </PopoverContent>
                </Popover>

                {/* --------------------------------------------------- */}

                <Popover>
                    <PopoverTrigger>Bottom</PopoverTrigger>
                    <PopoverContent placement="bottom">
                        <PopoverBody>
                            This is BOTTOM popover content
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
            </div>
        </>
    );
};
