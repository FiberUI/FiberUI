import { Checkbox } from "@repo/ui/components/checkbox";

export const Example3 = () => {
    return (
        <div className="flex flex-col space-y-2">
            <div className="flex items-center gap-2">
                <Checkbox isDisabled />
                Disabled unchecked
            </div>

            <div className="flex items-center gap-2">
                <Checkbox isDisabled isSelected />
                Disabled checked
            </div>
        </div>
    );
};
