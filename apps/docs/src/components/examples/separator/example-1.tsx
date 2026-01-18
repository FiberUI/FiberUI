import { Separator } from "@repo/ui/components/separator";

export const Example1 = () => {
    return (
        <div className="space-y-5">
            {/* Horizontal Separator  */}
            <div className="flex flex-col justify-center gap-2 rounded-md p-2 text-lg">
                First Item
                <Separator />
                Second Item
                <Separator />
                Third Item
            </div>

            <Separator />

            {/* Vertical Separator */}
            <div className="flex flex-row items-center gap-2 rounded-md px-4 py-2 text-lg">
                Item 1
                <Separator orientation="vertical" />
                Item 2
                <Separator orientation="vertical" />
                Item 3
            </div>
        </div>
    );
};
