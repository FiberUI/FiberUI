"use client";
import {
    FolderIcon,
    ImageIcon,
    FileTextIcon,
    FileCodeIcon,
} from "lucide-react";
import { GridList, GridListItem } from "@repo/ui/components/grid-list";

/* CUSTOM CONTENT EXAMPLE */
export const Example5 = () => {
    return (
        <GridList
            aria-label="Project files"
            selectionMode="multiple"
            className="w-[320px]"
        >
            <GridListItem id="src" textValue="src">
                <FolderIcon className="size-4 text-blue-500" />
                <div className="flex flex-1 items-center justify-between">
                    <span className="font-medium">src</span>
                    <span className="bg-muted text-muted-foreground rounded px-1.5 py-0.5 text-[10px] font-medium">
                        DIR
                    </span>
                </div>
            </GridListItem>
            <GridListItem id="readme" textValue="README.md">
                <FileTextIcon className="text-muted-foreground size-4" />
                <div className="flex flex-1 items-center justify-between">
                    <span>README.md</span>
                    <span className="text-muted-foreground text-xs">
                        2.1 KB
                    </span>
                </div>
            </GridListItem>
            <GridListItem id="package" textValue="package.json">
                <FileCodeIcon className="size-4 text-yellow-500" />
                <div className="flex flex-1 items-center justify-between">
                    <span>package.json</span>
                    <span className="text-muted-foreground text-xs">
                        1.4 KB
                    </span>
                </div>
            </GridListItem>
            <GridListItem id="tsconfig" textValue="tsconfig.json">
                <FileCodeIcon className="size-4 text-blue-400" />
                <div className="flex flex-1 items-center justify-between">
                    <span>tsconfig.json</span>
                    <span className="text-muted-foreground text-xs">
                        0.8 KB
                    </span>
                </div>
            </GridListItem>
            <GridListItem id="logo" textValue="logo.png">
                <ImageIcon className="size-4 text-green-500" />
                <div className="flex flex-1 items-center justify-between">
                    <span>logo.png</span>
                    <span className="text-muted-foreground text-xs">24 KB</span>
                </div>
            </GridListItem>
        </GridList>
    );
};
