import { cn } from "@repo/ui/lib/utils";
import { forwardRef, Children, cloneElement } from "react";

// @ts-ignore
export const Slot = forwardRef(({ children, ...props }: any, ref) => {
    const child = Children.only(children);

    return cloneElement(child, {
        ...child.props, // keep child's props
        ...props, // inject trigger props after (important!)
        ref: ref,
        className: cn(props.className, child.props.className),
    });
});

Slot.displayName = "Slot";
