import { Checkbox } from "@repo/ui/components/checkbox";

export const Example3 = () => {
    return (
        <div className="flex flex-col space-y-2">
            <Checkbox isDisabled>Disabled unchecked</Checkbox>
            <Checkbox isDisabled isSelected>
                Disabled checked
            </Checkbox>
        </div>
    );
};
