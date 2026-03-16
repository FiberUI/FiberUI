"use client";

import { Check } from "lucide-react";
import React from "react";
import {
    ListBox as AriaListBox,
    ListBoxItem as AriaListBoxItem,
    ListBoxProps as AriaListBoxProps,
    Collection,
    Header,
    ListBoxItemProps,
    ListBoxSection,
    SectionProps,
    composeRenderProps,
} from "react-aria-components";
import { cn, tv } from "tailwind-variants";
import { focusRing } from "@repo/ui/lib/utils";

interface ListBoxProps<T>
    extends Omit<AriaListBoxProps<T>, "layout" | "orientation"> {}

export function ListBox<T extends object>({
    children,
    ...props
}: ListBoxProps<T>) {
    return (
        <AriaListBox
            data-slot="list-box"
            {...props}
            className={cn(
                props.className,
                "border-border bg-popover w-[200px] rounded-lg border p-1 font-sans outline-0",
            )}
        >
            {children}
        </AriaListBox>
    );
}

export const itemStyles = tv({
    extend: focusRing,
    base: "group relative flex cursor-default select-none items-center gap-8 rounded-md px-2.5 py-1.5 text-sm will-change-transform forced-color-adjust-none",
    variants: {
        isSelected: {
            false: "text-popover-foreground hover:bg-accent pressed:bg-accent -outline-offset-2",
            true: "bg-primary text-primary-foreground -outline-offset-4 outline-white dark:outline-white forced-colors:bg-[Highlight] forced-colors:text-[HighlightText] forced-colors:outline-[HighlightText] [&+[data-selected]]:rounded-t-none [&:has(+[data-selected])]:rounded-b-none",
        },
        isDisabled: {
            true: "text-muted-foreground opacity-50 forced-colors:text-[GrayText]",
        },
    },
});

export function ListBoxItem(props: ListBoxItemProps) {
    let textValue =
        props.textValue ||
        (typeof props.children === "string" ? props.children : undefined);
    return (
        <AriaListBoxItem
            data-slot="list-box-item"
            {...props}
            textValue={textValue}
            className={itemStyles}
        >
            {composeRenderProps(props.children, (children) => (
                <>
                    {children}
                    <div className="bg-primary-foreground/20 absolute bottom-0 left-4 right-4 hidden h-px forced-colors:bg-[HighlightText] [.group[data-selected]:has(+[data-selected])_&]:block" />
                </>
            ))}
        </AriaListBoxItem>
    );
}

export const dropdownItemStyles = tv({
    base: "selected:pr-1 group flex cursor-default select-none items-center gap-4 rounded-lg py-2 pl-3 pr-3 text-sm no-underline outline outline-0 forced-color-adjust-none [-webkit-tap-highlight-color:transparent] [&[href]]:cursor-pointer",
    variants: {
        isDisabled: {
            false: "text-popover-foreground",
            true: "text-muted-foreground opacity-50 forced-colors:text-[GrayText]",
        },
        isPressed: {
            true: "bg-accent",
        },
        isFocused: {
            true: "bg-primary text-primary-foreground forced-colors:bg-[Highlight] forced-colors:text-[HighlightText]",
        },
    },
    compoundVariants: [
        {
            isFocused: false,
            isOpen: true,
            className: "bg-accent",
        },
    ],
});

export function DropdownItem(props: ListBoxItemProps) {
    let textValue =
        props.textValue ||
        (typeof props.children === "string" ? props.children : undefined);
    return (
        <AriaListBoxItem
            data-slot="dropdown-item"
            {...props}
            textValue={textValue}
            className={dropdownItemStyles}
        >
            {composeRenderProps(props.children, (children, { isSelected }) => (
                <>
                    <span className="group-selected:font-semibold flex flex-1 items-center gap-2 truncate font-normal">
                        {children}
                    </span>
                    <span className="flex w-5 items-center">
                        {isSelected && <Check className="h-4 w-4" />}
                    </span>
                </>
            ))}
        </AriaListBoxItem>
    );
}

export interface DropdownSectionProps<T> extends SectionProps<T> {
    title?: string;
    items?: any;
}

export function DropdownSection<T extends object>(
    props: DropdownSectionProps<T>,
) {
    return (
        <ListBoxSection
            data-slot="dropdown-section"
            className="after:block after:h-[5px] after:content-[''] first:-mt-[5px] last:after:hidden"
        >
            <Header className="text-muted-foreground border-y-border bg-muted/60 supports-[-moz-appearance:none]:bg-muted sticky -top-[5px] z-10 -mx-1 -mt-px truncate border-y px-4 py-1 text-sm font-semibold backdrop-blur-md [&+*]:mt-1">
                {props.title}
            </Header>
            <Collection items={props.items}>{props.children}</Collection>
        </ListBoxSection>
    );
}
