"use client";

import * as React from "react";
import { CheckIcon } from "lucide-react";
import {
    GridList as AriaGridList,
    GridListItem as AriaGridListItem,
    composeRenderProps,
    type GridListProps as AriaGridListProps,
    type GridListItemProps as AriaGridListItemProps,
    Checkbox as AriaCheckbox,
} from "react-aria-components";
import { cn, tv } from "tailwind-variants";
import { focusRing } from "@repo/ui/lib/utils";

/* -----------------------------------------------------------------------------
 * GridList (Root)
 * ---------------------------------------------------------------------------*/

const gridListStyles = tv({
    base: "group/grid-list relative overflow-auto rounded-lg border",
});

interface GridListProps<T extends object> extends AriaGridListProps<T> {}

export const GridList = <T extends object>({
    className,
    children,
    ...props
}: GridListProps<T>) => {
    return (
        <AriaGridList
            data-slot="grid-list"
            className={cn(gridListStyles(), className)}
            {...props}
        >
            {children}
        </AriaGridList>
    );
};

/* -----------------------------------------------------------------------------
 * GridListItem
 * ---------------------------------------------------------------------------*/

const gridListItemStyles = tv({
    extend: focusRing,
    base: [
        "relative flex cursor-default gap-3 border-b px-3 py-2 text-sm outline-none",
        "last:border-b-0",
        "-outline-offset-2",
    ],
    variants: {
        isSelected: {
            false: "hover:bg-accent/50 dark:hover:bg-accent/30",
            true: "bg-primary/10 dark:bg-primary/20 z-20",
        },
        isDisabled: {
            true: "text-muted-foreground/50 cursor-not-allowed opacity-50",
        },
        isFocusVisible: {
            true: "outline-ring outline-2",
            false: "outline-0",
        },
    },
});

interface GridListItemProps extends AriaGridListItemProps {}

export const GridListItem = ({
    className,
    children,
    ...props
}: GridListItemProps) => {
    const textValue =
        props.textValue ||
        (typeof children === "string" ? children : undefined);

    return (
        <AriaGridListItem
            data-slot="grid-list-item"
            textValue={textValue}
            className={composeRenderProps(
                className,
                (className, renderProps) =>
                    cn(gridListItemStyles({ ...renderProps }), className) || "",
            )}
            {...props}
        >
            {composeRenderProps(children, (children, { selectionMode }) => (
                <>
                    {selectionMode === "multiple" && (
                        <AriaCheckbox
                            slot="selection"
                            className="flex items-center"
                        >
                            {({ isSelected }) => (
                                <div
                                    className={cn(
                                        "flex size-4 shrink-0 items-center justify-center rounded border transition-colors",
                                        isSelected
                                            ? "border-primary bg-primary text-primary-foreground"
                                            : "border-input",
                                    )}
                                >
                                    {isSelected && (
                                        <CheckIcon className="size-3" />
                                    )}
                                </div>
                            )}
                        </AriaCheckbox>
                    )}
                    {selectionMode === "single" && (
                        <AriaCheckbox
                            slot="selection"
                            className="flex items-center"
                        >
                            {({ isSelected }) => (
                                <div
                                    className={cn(
                                        "flex size-4 shrink-0 items-center justify-center rounded-full border transition-colors",
                                        isSelected
                                            ? "border-primary bg-primary"
                                            : "border-input",
                                    )}
                                >
                                    {isSelected && (
                                        <div className="bg-primary-foreground size-2 rounded-full" />
                                    )}
                                </div>
                            )}
                        </AriaCheckbox>
                    )}
                    <div className="flex flex-1 items-center gap-2">
                        {children}
                    </div>
                </>
            ))}
        </AriaGridListItem>
    );
};
