import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@repo/ui/components/select";

/* BASIC USAGE EXAMPLE */
export const Example1 = () => {
    return (
        <Select placeholder="Select a fruit">
            <SelectTrigger className="w-[180px]">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="orange">Orange</SelectItem>
                <SelectItem value="grape">Grape</SelectItem>
                <SelectItem value="mango">Mango</SelectItem>
            </SelectContent>
        </Select>
    );
};
