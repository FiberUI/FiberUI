"use client";

import * as React from "react";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import {
    Select as AriaSelect,
    SelectValue as AriaSelectValue,
    Button as AriaButton,
    Popover as AriaPopover,
    ListBox as AriaListBox,
    ListBoxItem as AriaListBoxItem,
    ListBoxSection as AriaListBoxSection,
    Header as AriaHeader,
    composeRenderProps,
    type SelectProps as AriaSelectProps,
    type ButtonProps as AriaButtonProps,
    type PopoverProps as AriaPopoverProps,
    type ListBoxProps as AriaListBoxProps,
    type ListBoxItemProps as AriaListBoxItemProps,
    type SectionProps as AriaSectionProps,
} from "react-aria-components";
import { cn } from "tailwind-variants";

/* -----------------------------------------------------------------------------
 * Select (Root)
 * ---------------------------------------------------------------------------*/

interface SelectProps<T extends object> extends AriaSelectProps<T> {}

export const Select = <T extends object>(props: SelectProps<T>) => {
    return <AriaSelect data-slot="select" {...props} />;
};

/* -----------------------------------------------------------------------------
 * SelectTrigger
 * ---------------------------------------------------------------------------*/

interface SelectTriggerProps extends AriaButtonProps {
    size?: "sm" | "default";
}

export const SelectTrigger = ({
    className,
    size = "default",
    children,
    ...props
}: SelectTriggerProps) => {
    return (
        <AriaButton
            data-slot="select-trigger"
            data-size={size}
            className={cn(
                "border-input data-placeholder:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground",
                "focus-visible:border-ring focus-visible:ring-ring/50",
                "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                "dark:bg-input/30 dark:hover:bg-input/50",
                "shadow-xs flex items-center justify-between gap-2 whitespace-nowrap rounded-md border bg-transparent px-3 py-2 text-sm",
                "outline-none transition-[color,box-shadow] focus-visible:ring-[3px]",
                "disabled:cursor-not-allowed disabled:opacity-50",
                "data-[size=default]:h-9 data-[size=sm]:h-8",
                "*:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2",
                "[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
                className,
            )}
            {...props}
        >
            {composeRenderProps(children, (children) => (
                <>
                    {children}
                    <ChevronDownIcon className="size-4 opacity-50" />
                </>
            ))}
        </AriaButton>
    );
};

/* -----------------------------------------------------------------------------
 * SelectValue
 * ---------------------------------------------------------------------------*/

interface SelectValueProps<T extends object>
    extends React.ComponentProps<typeof AriaSelectValue<T>> {}

export const SelectValue = <T extends object>({
    className,

    ...props
}: SelectValueProps<T>) => {
    return (
        <AriaSelectValue
            data-slot="select-value"
            className={cn(
                "data-placeholder:text-muted-foreground flex-1 text-left",
                className,
            )}
            {...props}
        />
    );
};

/* -----------------------------------------------------------------------------
 * SelectContent
 * ---------------------------------------------------------------------------*/

interface SelectContentProps<T extends object>
    extends AriaPopoverProps,
        Pick<AriaListBoxProps<T>, "items"> {
    children: React.ReactNode;
}

export const SelectContent = <T extends object>({
    className,
    children,
    ...props
}: SelectContentProps<T>) => {
    return (
        <AriaPopover
            data-slot="select-content"
            className={cn(
                "bg-popover text-popover-foreground",
                "data-[entering]:animate-in data-[exiting]:animate-out",
                "data-[exiting]:fade-out-0 data-[entering]:fade-in-0",
                "data-[exiting]:zoom-out-95 data-[entering]:zoom-in-95",
                "data-[placement=bottom]:slide-in-from-top-2 data-[placement=left]:slide-in-from-right-2",
                "data-[placement=right]:slide-in-from-left-2 data-[placement=top]:slide-in-from-bottom-2",
                "relative z-50 overflow-hidden rounded-md border shadow-md",
                className,
            )}
            {...props}
        >
            <AriaListBox
                data-slot="select-listbox"
                className="max-h-[300px] overflow-y-auto p-1 outline-none"
            >
                {children}
            </AriaListBox>
        </AriaPopover>
    );
};

/* -----------------------------------------------------------------------------
 * SelectItem
 * ---------------------------------------------------------------------------*/

interface SelectItemProps extends Omit<AriaListBoxItemProps, "value"> {
    value?: string;
}

export const SelectItem = ({
    className,
    children,
    value,
    id,
    ...props
}: SelectItemProps) => {
    return (
        <AriaListBoxItem
            data-slot="select-item"
            className={cn(
                "focus:bg-accent focus:text-accent-foreground",
                "[&_svg:not([class*='text-'])]:text-muted-foreground",
                "outline-hidden relative flex cursor-default select-none items-center gap-2 rounded-sm py-1.5 pl-2 pr-8 text-sm",
                "data-disabled:pointer-events-none data-[disabled]:opacity-50",
                "[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
                className,
            )}
            {...props}
            id={id == undefined ? value : id}
        >
            {composeRenderProps(children, (children, { isSelected }) => (
                <>
                    <span className="flex flex-1 items-center gap-2 truncate">
                        {children}
                    </span>
                    {isSelected && (
                        <span
                            data-slot="select-item-indicator"
                            className="absolute right-2 flex size-3.5 items-center justify-center"
                        >
                            <CheckIcon className="size-4" />
                        </span>
                    )}
                </>
            ))}
        </AriaListBoxItem>
    );
};

/* -----------------------------------------------------------------------------
 * SelectGroup
 * ---------------------------------------------------------------------------*/

interface SelectGroupProps<T extends object> extends AriaSectionProps<T> {}

export const SelectGroup = <T extends object>({
    className,
    ...props
}: SelectGroupProps<T>) => {
    return (
        <AriaListBoxSection
            data-slot="select-group"
            className={cn("py-1", className)}
            {...props}
        />
    );
};

/* -----------------------------------------------------------------------------
 * SelectLabel
 * ---------------------------------------------------------------------------*/

interface SelectLabelProps extends React.ComponentProps<typeof AriaHeader> {}

export const SelectLabel = ({ className, ...props }: SelectLabelProps) => {
    return (
        <AriaHeader
            data-slot="select-label"
            className={cn(
                "text-muted-foreground px-2 py-1.5 text-xs font-medium",
                className,
            )}
            {...props}
        />
    );
};
