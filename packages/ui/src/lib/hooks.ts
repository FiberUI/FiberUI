"use client";
import {
    mergeProps,
    mergeRefs as mergeRefsRA,
    useObjectRef,
} from "@react-aria/utils";

import { RefCallback, useEffect, useRef, useState } from "react";

import {
    Context,
    ForwardedRef,
    Ref,
    RefObject,
    useContext,
    useMemo,
} from "react";

export function usePresence(isOpen: boolean, duration = 150) {
    const [present, setPresent] = useState(isOpen);

    useEffect(() => {
        if (isOpen) {
            setPresent(true);
        } else {
            const timeout = setTimeout(() => setPresent(false), duration);
            return () => clearTimeout(timeout);
        }
    }, [isOpen, duration]);

    return present;
}

export type WithRef<T, E> = T & { ref?: ForwardedRef<E> };

export type ContextValue<T, E> = WithRef<T, E>;

// export function useContextPropsWithRef<
//     T extends Record<string, any>,
//     E extends Element,
// >(
//     props: T,
//     ref: ForwardedRef<E> | undefined,
//     context: Context<ContextValue<T, E>>,
// ): [T, RefObject<E | null>] {
//     const { ref: ctxRef, ...ctxProps } = useContext(context);

//     const mergedRef = useMergeRefs(ctxRef, ref);
//     const mergedProps = mergeProps(ctxProps, props) as unknown as T;

//     let mergedStyles = {};
//     if (
//         "style" in ctxProps &&
//         ctxProps.style &&
//         "style" in props &&
//         props.style
//     ) {
//         mergedStyles = { ...ctxProps.style, ...props.style };
//     }

//     const finalMergedProps = { ...mergedProps, style: mergedStyles };

//     return [finalMergedProps, mergedRef];
// }

// export function useContextProps<T, E extends Element>(props: T , ref: ForwardedRef<E> | undefined, context: Context<ContextValue<U, E>>): [T, RefObject<E | null>] {
//   let ctx = useSlottedContext(context, props.slot) || {};
//   // @ts-ignore - TS says "Type 'unique symbol' cannot be used as an index type." but not sure why.
//   let {ref: contextRef, ...contextProps} = ctx as any;
//   let mergedRef = useObjectRef(useMemo(() => mergeRefs(ref, contextRef), [ref, contextRef]));
//   let mergedProps = mergeProps(contextProps, props) as unknown as T;

//   // mergeProps does not merge `style`. Adding this there might be a breaking change.
//   if (
//     'style' in contextProps &&
//     contextProps.style &&
//     'style' in props &&
//     props.style
//   ) {
//     if (typeof contextProps.style === 'function' || typeof props.style === 'function') {
//       // @ts-ignore
//       mergedProps.style = (renderProps) => {
//         let contextStyle = typeof contextProps.style === 'function' ? contextProps.style(renderProps) : contextProps.style;
//         let defaultStyle = {...renderProps.defaultStyle, ...contextStyle};
//         let style = typeof props.style === 'function'
//           ? props.style({...renderProps, defaultStyle})
//           : props.style;
//         return {...defaultStyle, ...style};
//       };
//     } else {
//       // @ts-ignore
//       mergedProps.style = {...contextProps.style, ...props.style};
//     }
//   }

//   return [mergedProps, mergedRef];
// }

/**
 * Merges multiple refs into a single ref callback.
 * Compatible with react-aria's mergeRefs - can be used as a drop-in replacement.
 *
 * Handles both callback refs and mutable ref objects (useRef/createRef).
 * Safely ignores null/undefined refs.
 *
 * @param refs - Array of refs to merge
 * @returns A ref callback that updates all provided refs
 *
 * @example
 * // In FiberUI Button component
 * const mergedRef = useObjectRef(
 *   useMemo(() => mergeRefs(ref, localRef), [ref, localRef])
 * ) as RefObject<HTMLButtonElement>;
 *
 * @example
 * // In PopoverTrigger with multiple refs
 * const mergedRef = useObjectRef(
 *   useMemo(
 *     () => mergeRefs(ref, triggerRef, localRef),
 *     [ref, triggerRef, localRef]
 *   )
 * );
 */
export function mergeRefs<T = any>(...refs: Array<Ref<T> | undefined | null>) {
    return (value: T | null) => {
        refs.forEach((ref) => {
            if (typeof ref === "function") {
                ref(value);
            } else if (ref != null) {
                (ref as RefObject<T | null>).current = value;
            }
        });
    };
}

/**
 * Hook version that memoizes the merged ref callback.
 * Useful when you don't want to manually useMemo.
 *
 * @param refs - Array of refs to merge
 * @returns Memoized ref callback
 *
 * @example
 * const mergedRef = useMergedRefs(ref, localRef, triggerRef);
 * return <button ref={mergedRef}>Click me</button>;
 */
export function useMergedRefs<T = any>(
    ...refs: Array<Ref<T> | undefined | null>
) {
    return useMemo(
        () => mergeRefs(...refs),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [...refs],
    );
}
