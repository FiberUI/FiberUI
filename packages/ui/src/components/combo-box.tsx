"use client";

import * as React from "react";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import {
    ComboBox as AriaComboBox,
    ComboBoxProps as AriaComboBoxProps,
    Input as AriaInput,
    Button as AriaButton,
    Popover as AriaPopover,
    ListBox as AriaListBox,
    ListBoxItem as AriaListBoxItem,
    ListBoxSection as AriaListBoxSection,
    Header as AriaHeader,
    FieldError as AriaFieldError,
    Text as AriaText,
    composeRenderProps,
    type ListBoxItemProps as AriaListBoxItemProps,
    type SectionProps as AriaSectionProps,
    type ValidationResult,
} from "react-aria-components";
import { cn, tv } from "tailwind-variants";
import { Label } from "@repo/ui/components/label";

/* -----------------------------------------------------------------------------
 * ComboBox (Root)
 * ---------------------------------------------------------------------------*/

const comboBoxStyles = tv({
    base: "group flex flex-col gap-1.5",
});

const fieldGroupStyles = tv({
    base: [
        "border-input [&_svg:not([class*='text-'])]:text-muted-foreground",
        "focus-within:border-ring focus-within:ring-ring/50",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        "dark:bg-input/30 dark:hover:bg-input/50",
        "shadow-xs flex h-9 items-center rounded-md border bg-transparent text-sm",
        "outline-none transition-[color,box-shadow] focus-within:ring-[3px]",
        "group-data-[disabled]:cursor-not-allowed group-data-[disabled]:opacity-50",
    ],
});

export interface ComboBoxProps<T extends object>
    extends Omit<AriaComboBoxProps<T>, "children"> {
    label?: string;
    description?: string | null;
    errorMessage?: string | ((validation: ValidationResult) => string);
    placeholder?: string;
    children: React.ReactNode | ((item: T) => React.ReactNode);
}

export function ComboBox<T extends object>({
    label,
    description,
    errorMessage,
    children,
    items,
    placeholder,
    className,
    ...props
}: ComboBoxProps<T>) {
    return (
        <AriaComboBox
            data-slot="combo-box"
            className={cn(comboBoxStyles(), className)}
            {...props}
        >
            {label && <Label>{label}</Label>}
            <div className={fieldGroupStyles()}>
                <AriaInput
                    data-slot="combo-box-input"
                    placeholder={placeholder}
                    className="placeholder:text-muted-foreground flex-1 bg-transparent px-3 py-2 outline-none"
                />
                <AriaButton
                    data-slot="combo-box-button"
                    className="flex items-center justify-center pr-2 outline-none"
                >
                    <ChevronDownIcon className="size-4 opacity-50" />
                </AriaButton>
            </div>
            {description && (
                <AriaText
                    slot="description"
                    className="text-muted-foreground text-xs"
                >
                    {description}
                </AriaText>
            )}
            <AriaFieldError className="text-destructive text-xs">
                {errorMessage}
            </AriaFieldError>
            <AriaPopover
                data-slot="combo-box-popover"
                className={cn(
                    "bg-popover text-popover-foreground",
                    "data-entering:animate-in data-exiting:animate-out",
                    "data-exiting:fade-out-0 data-entering:fade-in-0",
                    "data-exiting:zoom-out-95 data-entering:zoom-in-95",
                    "data-[placement=bottom]:slide-in-from-top-2 data-[placement=left]:slide-in-from-right-2",
                    "data-[placement=right]:slide-in-from-left-2 data-[placement=top]:slide-in-from-bottom-2",
                    "w-(--trigger-width) relative z-50 overflow-hidden rounded-md border shadow-md",
                )}
            >
                <AriaListBox
                    data-slot="combo-box-listbox"
                    items={items}
                    className="max-h-[300px] overflow-y-auto p-1 outline-none"
                >
                    {children}
                </AriaListBox>
            </AriaPopover>
        </AriaComboBox>
    );
}

/* -----------------------------------------------------------------------------
 * ComboBoxItem
 * ---------------------------------------------------------------------------*/

interface ComboBoxItemProps extends Omit<AriaListBoxItemProps, "value"> {
    value?: string;
}

export function ComboBoxItem({
    className,
    children,
    value,
    id,
    ...props
}: ComboBoxItemProps) {
    return (
        <AriaListBoxItem
            data-slot="combo-box-item"
            className={cn(
                "focus:bg-accent focus:text-accent-foreground",
                "[&_svg:not([class*='text-'])]:text-muted-foreground",
                "outline-hidden relative flex cursor-default select-none items-center gap-2 rounded-sm py-1.5 pl-2 pr-8 text-sm",
                "data-disabled:pointer-events-none data-disabled:opacity-50",
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
                            data-slot="combo-box-item-indicator"
                            className="absolute right-2 flex size-3.5 items-center justify-center"
                        >
                            <CheckIcon className="size-4" />
                        </span>
                    )}
                </>
            ))}
        </AriaListBoxItem>
    );
}

/* -----------------------------------------------------------------------------
 * ComboBoxSection
 * ---------------------------------------------------------------------------*/

interface ComboBoxSectionProps<T extends object> extends AriaSectionProps<T> {}

export function ComboBoxSection<T extends object>({
    className,
    ...props
}: ComboBoxSectionProps<T>) {
    return (
        <AriaListBoxSection
            data-slot="combo-box-section"
            className={cn("py-1", className)}
            {...props}
        />
    );
}

/* -----------------------------------------------------------------------------
 * ComboBoxHeader
 * ---------------------------------------------------------------------------*/

interface ComboBoxHeaderProps extends React.ComponentProps<typeof AriaHeader> {}

export function ComboBoxHeader({ className, ...props }: ComboBoxHeaderProps) {
    return (
        <AriaHeader
            data-slot="combo-box-header"
            className={cn(
                "text-muted-foreground px-2 py-1.5 text-xs font-medium",
                className,
            )}
            {...props}
        />
    );
}
