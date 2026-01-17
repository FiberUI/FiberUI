import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@repo/ui/components/select";

/* DISABLED SELECT AND ITEMS EXAMPLE */
export const Example4 = () => {
    return (
        <div className="flex flex-wrap items-start gap-4">
            {/* Disabled Select */}
            <Select placeholder="Disabled select" isDisabled>
                <SelectTrigger className="w-[180px]">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="option1">Option 1</SelectItem>
                    <SelectItem value="option2">Option 2</SelectItem>
                </SelectContent>
            </Select>

            {/* Select with Disabled Items */}
            <Select placeholder="Select an option">
                <SelectTrigger className="w-[180px]">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="disabled" isDisabled>
                        Disabled Item
                    </SelectItem>
                    <SelectItem value="premium" isDisabled>
                        Premium (Locked)
                    </SelectItem>
                    <SelectItem value="free">Free Option</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
};
