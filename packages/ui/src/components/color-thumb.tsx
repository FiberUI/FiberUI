"use client";
import {
    ColorThumb as AriaColorThumb,
    ColorThumbProps as AriaColorThumbProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";

export interface ColorThumbProps extends AriaColorThumbProps {}

const thumbStyles = tv({
    base: "size-4.5 left-1/2 top-1/2 box-border rounded-full border-2 border-white shadow-[0_0_0_1px_black,inset_0_0_0_1px_black]",
    variants: {
        isFocusVisible: {
            true: "size-6",
        },
        isDragging: {
            true: "size-6",
        },
        isDisabled: {
            true: "border-muted bg-muted",
        },
    },
});

export const ColorThumb: React.FC<ColorThumbProps> = (props) => {
    return (
        <AriaColorThumb
            {...props}
            style={({ defaultStyle, isDisabled }) => ({
                ...defaultStyle,
                backgroundColor: isDisabled
                    ? undefined
                    : defaultStyle.backgroundColor,
            })}
            className={thumbStyles}
        />
    );
};
