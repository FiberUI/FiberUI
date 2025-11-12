"use client";

import type { AriaListBoxProps, AriaListBoxSectionProps } from "react-aria";
import { Item, useListState } from "react-stately";
import { mergeProps, useFocusRing, useListBox, useOption } from "react-aria";
import { useRef } from "react";

function ListBoxSection(props: AriaListBoxSectionProps) {
    return <div>{props.heading}</div>;
}

export function ListBox<T extends object>(props: AriaListBoxProps<T>) {
    // Create state based on the incoming props
    const state = useListState(props);

    // Get props for the listbox element
    const ref = useRef(null);
    const { listBoxProps, labelProps } = useListBox(props, state, ref);

    return (
        <>
            <div {...labelProps}>{props.label}</div>
            <ul {...listBoxProps} ref={ref}>
                {[...state.collection].map((item) =>
                    item.type === "section" ? (
                        <ListBoxSection key={item.key} heading={item.key} />
                    ) : (
                        <Option key={item.key} item={item} state={state} />
                    ),
                )}
            </ul>
        </>
    );
}

export function Option({ item, state }: any) {
    // Get props for the option element
    const ref = useRef(null);
    const { optionProps } = useOption({ key: item.key }, state, ref);

    // Determine whether we should show a keyboard
    // focus ring for accessibility
    const { isFocusVisible, focusProps } = useFocusRing();

    return (
        <li
            {...mergeProps(optionProps, focusProps)}
            ref={ref}
            data-focus-visible={isFocusVisible}
        >
            {item.rendered}
        </li>
    );
}

export { Item };
