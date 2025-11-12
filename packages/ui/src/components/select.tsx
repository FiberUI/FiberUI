"use client";

import React, { createContext, useContext, useRef, forwardRef } from "react";
import {
    HiddenSelect,
    AriaSelectProps,
    useButton,
    useSelect,
    useListBox,
    useOption,
    useOverlayTrigger,
    useOverlay,
    useFocusRing,
    mergeProps,
} from "react-aria";
import { Item, useSelectState } from "react-stately";
import { cn } from "@repo/ui/lib/utils";
import { CheckIcon, ChevronDownIcon } from "lucide-react";

const SelectContext = createContext<any>(null);

export function Select(
    props: Omit<AriaSelectProps<any>, "children"> & {
        children: React.ReactNode;
    },
) {
    const state = useSelectState(props);
    const triggerRef = useRef<HTMLButtonElement>(null);

    const { triggerProps, valueProps, menuProps } = useSelect(
        props,
        state,
        triggerRef,
    );
    const { buttonProps } = useButton(triggerProps, triggerRef);

    return (
        <SelectContext.Provider
            value={{ state, triggerRef, buttonProps, valueProps, menuProps }}
        >
            <div className="relative">{props.children}</div>
            <HiddenSelect
                state={state}
                triggerRef={triggerRef}
                label={props.label}
            />
        </SelectContext.Provider>
    );
}

// --------------------------------------------------
// Trigger
// --------------------------------------------------
export const SelectTrigger = forwardRef<
    HTMLButtonElement,
    React.ComponentProps<"button">
>(({ className, children, ...props }, ref) => {
    const { state, triggerRef, buttonProps } = useContext(SelectContext);
    const { focusProps, isFocusVisible } = useFocusRing();
    const combinedRef = (node: any) => {
        triggerRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as any).current = node;
    };

    return (
        <button
            {...mergeProps(buttonProps, focusProps, props)}
            ref={combinedRef}
            className={cn(
                "border-input bg-background flex w-full items-center justify-between rounded-md border px-3 py-2 text-sm shadow-sm",
                "focus-visible:ring-ring focus-visible:ring-2",
                isFocusVisible && "ring-ring ring-2",
                className,
            )}
        >
            {children}
            <ChevronDownIcon className="h-4 w-4 opacity-60" />
        </button>
    );
});
SelectTrigger.displayName = "SelectTrigger";

// --------------------------------------------------
// SelectValue
// --------------------------------------------------
export function SelectValue({ placeholder }: { placeholder?: string }) {
    const { state, valueProps } = useContext(SelectContext);
    return (
        <span {...valueProps} className="truncate">
            {state.selectedItem ? state.selectedItem.rendered : placeholder}
        </span>
    );
}

// --------------------------------------------------
// Content (popover)
// --------------------------------------------------
export function SelectContent({ className, ...props }: any) {
    const { state, menuProps, triggerRef } = useContext(SelectContext);

    const overlayRef = useRef(null);
    const { overlayProps } = useOverlay(
        { onClose: state.close, isOpen: state.isOpen, isDismissable: true },
        overlayRef,
    );

    if (!state.isOpen) return null;

    return (
        <div
            {...mergeProps(overlayProps, props)}
            ref={overlayRef}
            className={cn(
                "bg-popover absolute z-50 mt-1 w-[var(--trigger-width)] rounded-md border shadow-md",
                className,
            )}
            style={
                {
                    "--trigger-width": `${triggerRef.current?.clientWidth}px`,
                } as React.CSSProperties
            }
        >
            <SelectList menuProps={menuProps} state={state} />
        </div>
    );
}

// --------------------------------------------------
// Group + Label + ListBox
// --------------------------------------------------
export function SelectGroup({ children }: { children: React.ReactNode }) {
    return <div className="py-1">{children}</div>;
}

export function SelectLabel({ children }: { children: React.ReactNode }) {
    return (
        <div className="text-muted-foreground px-2 py-1 text-xs">
            {children}
        </div>
    );
}

function SelectList({ state, menuProps }: any) {
    const ref = useRef(null);
    const { listBoxProps } = useListBox({ ...menuProps }, state, ref);

    return (
        <ul
            {...listBoxProps}
            ref={ref}
            className="max-h-60 overflow-y-auto p-1"
        >
            {[...state.collection].map((item: any) =>
                item.type === "section" ? (
                    <li key={item.key}>
                        {item.rendered && (
                            <SelectLabel>{item.rendered}</SelectLabel>
                        )}
                        <ul>
                            {[...item.childNodes].map((node) => (
                                <SelectItem
                                    key={node.key}
                                    item={node}
                                    state={state}
                                />
                            ))}
                        </ul>
                    </li>
                ) : (
                    <Item key={item.key} item={item} state={state} />
                ),
            )}
        </ul>
    );
}

// --------------------------------------------------
// Item
// --------------------------------------------------
export function SelectItem({
    children,
    value,
}: {
    children: React.ReactNode;
    value: string;
}) {
    return (
        <Item key={value} textValue={value}>
            {children}
        </Item>
    );
}

function SelectItemInternal({ item, state }: any) {
    const ref = useRef(null);
    const { optionProps, isSelected, isFocused } = useOption(
        { key: item.key },
        state,
        ref,
    );

    return (
        <li
            {...optionProps}
            ref={ref}
            className={cn(
                "relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm",
                isFocused && "bg-accent text-accent-foreground",
                isSelected && "font-medium",
            )}
        >
            {isSelected && <CheckIcon className="h-4 w-4" />}
            {item.rendered}
        </li>
    );
}
