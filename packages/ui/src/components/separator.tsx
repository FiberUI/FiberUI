import { cn } from "@repo/ui/lib/utils";
import { SeparatorProps, useSeparator } from "react-aria";
import {} from "react-aria/i18n";

interface SeparatorComponentProps extends SeparatorProps {}

export const Separator: React.FC<SeparatorComponentProps> = (props) => {
    const { separatorProps } = useSeparator(props);

    return (
        <div
            {...separatorProps}
            // style={{
            //     width: props.orientation === "vertical" ? "1px" : "100%",
            //     height: props.orientation === "vertical" ? "100%" : "1px",
            //     margin: props.orientation === "vertical" ? "0 5px" : "5px 0",
            // }}
            className={cn(
                "bg-gray-500",
                props.orientation === "vertical"
                    ? "mx-2 my-0 h-full w-px"
                    : "mx-0 my-2 h-px w-full",
            )}
        />
    );
};
