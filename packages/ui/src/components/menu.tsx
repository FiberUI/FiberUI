"use client";

import { Check, ChevronRight } from "lucide-react";
import React from "react";
import {
    Menu as AriaMenu,
    MenuItem as AriaMenuItem,
    MenuProps,
    MenuItemProps,
    MenuSection as AriaMenuSection,
    MenuSectionProps as AriaMenuSectionProps,
    MenuTrigger as AriaMenuTrigger,
    SubmenuTrigger as AriaSubmenuTrigger,
    Separator,
    SeparatorProps,
    composeRenderProps,
    Header,
    Collection,
    SubmenuTriggerProps,
    MenuTriggerProps as AriaMenuTriggerProps,
    Popover as AriaPopover,
    PopoverProps as AriaPopoverProps,
} from "react-aria-components";
import { cn, tv } from "tailwind-variants";
import { dropdownItemStyles } from "@repo/ui/components/list-box";

/* -----------------------------------------------------------------------------
 * Popover (menu-specific, NO Dialog wrapping)
 * ---------------------------------------------------------------------------*/

const menuPopoverStyles = tv({
    base: [
        "bg-popover text-popover-foreground",
        "z-50 min-w-[150px] overflow-auto rounded-md border p-1 shadow-md outline-none",
    ],
    variants: {
        isEntering: {
            true: "animate-in fade-in-0 zoom-in-95 duration-200",
        },
        isExiting: {
            true: "animate-out fade-out-0 zoom-out-95 duration-150",
        },
    },
});

/* -----------------------------------------------------------------------------
 * MenuTrigger
 * ---------------------------------------------------------------------------*/

interface MenuTriggerProps extends AriaMenuTriggerProps {
    placement?: AriaPopoverProps["placement"];
}

export function MenuTrigger(props: MenuTriggerProps) {
    const [trigger, menu] = React.Children.toArray(props.children) as [
        React.ReactElement,
        React.ReactElement,
    ];
    return (
        <AriaMenuTrigger data-slot="menu-trigger" {...props}>
            {trigger}
            <AriaPopover
                placement={props.placement}
                offset={8}
                className={composeRenderProps(
                    "" as string,
                    (className, renderProps) =>
                        cn(menuPopoverStyles({ ...renderProps }), className) ||
                        "",
                )}
            >
                {menu}
            </AriaPopover>
        </AriaMenuTrigger>
    );
}

/* -----------------------------------------------------------------------------
 * SubmenuTrigger
 * ---------------------------------------------------------------------------*/

export function SubmenuTrigger(props: SubmenuTriggerProps) {
    const [trigger, menu] = React.Children.toArray(props.children) as [
        React.ReactElement,
        React.ReactElement,
    ];
    return (
        <AriaSubmenuTrigger data-slot="submenu-trigger" {...props}>
            {trigger}
            <AriaPopover
                offset={-2}
                crossOffset={-4}
                className={composeRenderProps(
                    "" as string,
                    (className, renderProps) =>
                        cn(menuPopoverStyles({ ...renderProps }), className) ||
                        "",
                )}
            >
                {menu}
            </AriaPopover>
        </AriaSubmenuTrigger>
    );
}

/* -----------------------------------------------------------------------------
 * Menu
 * ---------------------------------------------------------------------------*/

export function Menu<T extends object>(props: MenuProps<T>) {
    return (
        <AriaMenu
            data-slot="menu"
            {...props}
            className={cn(
                "max-h-[inherit] overflow-auto font-sans outline-none [clip-path:inset(0_0_0_0_round_.75rem)]",
                props.className,
            )}
        />
    );
}

/* -----------------------------------------------------------------------------
 * MenuItem
 * ---------------------------------------------------------------------------*/

export function MenuItem(props: MenuItemProps) {
    const textValue =
        props.textValue ||
        (typeof props.children === "string" ? props.children : undefined);
    return (
        <AriaMenuItem
            data-slot="menu-item"
            textValue={textValue}
            {...props}
            className={dropdownItemStyles}
        >
            {composeRenderProps(
                props.children,
                (children, { selectionMode, isSelected, hasSubmenu }) => (
                    <>
                        {selectionMode !== "none" && (
                            <span className="flex w-4 items-center">
                                {isSelected && (
                                    <Check aria-hidden className="h-4 w-4" />
                                )}
                            </span>
                        )}
                        <span className="group-selected:font-semibold flex flex-1 items-center gap-2 truncate font-normal">
                            {children}
                        </span>
                        {hasSubmenu && (
                            <ChevronRight
                                aria-hidden
                                className="absolute right-2 h-4 w-4"
                            />
                        )}
                    </>
                ),
            )}
        </AriaMenuItem>
    );
}

/* -----------------------------------------------------------------------------
 * MenuSeparator
 * ---------------------------------------------------------------------------*/

export function MenuSeparator(props: SeparatorProps) {
    return (
        <Separator
            data-slot="menu-separator"
            {...props}
            className="border-border mx-3 my-1 border-b"
        />
    );
}

/* -----------------------------------------------------------------------------
 * MenuSection
 * ---------------------------------------------------------------------------*/

export interface MenuSectionProps<T> extends AriaMenuSectionProps<T> {
    title?: string;
    items?: Iterable<T>;
}

export function MenuSection<T extends object>(props: MenuSectionProps<T>) {
    return (
        <AriaMenuSection
            data-slot="menu-section"
            {...props}
            className="after:block after:h-[5px] after:content-[''] first:-mt-[5px]"
        >
            {props.title && (
                <Header className="text-muted-foreground border-y-border bg-muted/60 supports-[-moz-appearance:none]:bg-muted sticky -top-[5px] z-10 -mx-1 -mt-px truncate border-y px-4 py-1 text-sm font-semibold backdrop-blur-md [&+*]:mt-1">
                    {props.title}
                </Header>
            )}
            <Collection items={props.items}>{props.children}</Collection>
        </AriaMenuSection>
    );
}
