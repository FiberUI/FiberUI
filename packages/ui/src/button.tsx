import { useRef } from "react";
import { type AriaButtonOptions, useButton } from "react-aria";

interface ButtonProps extends AriaButtonOptions<"div"> {
    children: React.ReactNode;
    className?: string;
}

export const Button: React.FC<ButtonProps> = (props) => {
    const ref = useRef<HTMLButtonElement | null>(null);

    const { buttonProps, isPressed } = useButton(props, ref);

    return (
        <button {...buttonProps} className={"rounded-md bg-blue-600 px-4 py-2"}>
            {props.children}
        </button>
    );
};
