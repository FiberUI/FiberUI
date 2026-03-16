"use client";
import { GridList, GridListItem } from "@repo/ui/components/grid-list";

/* BASIC USAGE EXAMPLE */
export const Example1 = () => {
    return (
        <GridList aria-label="Favorite frameworks" className="w-[300px]">
            <GridListItem>React</GridListItem>
            <GridListItem>Next.js</GridListItem>
            <GridListItem>Vue</GridListItem>
            <GridListItem>Svelte</GridListItem>
            <GridListItem>Angular</GridListItem>
        </GridList>
    );
};
