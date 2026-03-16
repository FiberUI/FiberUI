"use client";
import { GridList, GridListItem } from "@repo/ui/components/grid-list";

/* DISABLED ITEMS EXAMPLE */
export const Example4 = () => {
    return (
        <GridList
            aria-label="Select a plan"
            selectionMode="single"
            disabledKeys={["enterprise", "custom"]}
            className="w-[300px]"
        >
            <GridListItem id="free">
                <div className="flex flex-col">
                    <span className="font-medium">Free</span>
                    <span className="text-muted-foreground text-xs">
                        For personal projects
                    </span>
                </div>
            </GridListItem>
            <GridListItem id="pro">
                <div className="flex flex-col">
                    <span className="font-medium">Pro</span>
                    <span className="text-muted-foreground text-xs">
                        For professional developers
                    </span>
                </div>
            </GridListItem>
            <GridListItem id="team">
                <div className="flex flex-col">
                    <span className="font-medium">Team</span>
                    <span className="text-muted-foreground text-xs">
                        For small teams
                    </span>
                </div>
            </GridListItem>
            <GridListItem id="enterprise">
                <div className="flex flex-col">
                    <span className="font-medium">Enterprise</span>
                    <span className="text-muted-foreground text-xs">
                        Coming soon
                    </span>
                </div>
            </GridListItem>
            <GridListItem id="custom">
                <div className="flex flex-col">
                    <span className="font-medium">Custom</span>
                    <span className="text-muted-foreground text-xs">
                        Coming soon
                    </span>
                </div>
            </GridListItem>
        </GridList>
    );
};
