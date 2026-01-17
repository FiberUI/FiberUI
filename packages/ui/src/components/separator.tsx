import { cn } from "@repo/ui/lib/utils";
import { SeparatorProps, useSeparator } from "react-aria";
import {} from "react-aria/i18n";

interface SeparatorComponentProps extends SeparatorProps {
    className?: string;
}

export const Separator: React.FC<SeparatorComponentProps> = (props) => {
    const { separatorProps } = useSeparator(props);

    return (
        <div
            {...separatorProps}
            className={cn(
                "shrink-0 bg-gray-500",

                props.orientation === "vertical"
                    ? "mx-2 my-0 h-full w-px"
                    : "mx-0 my-2 h-px w-full",

                props.className,
            )}
        />
    );
};
