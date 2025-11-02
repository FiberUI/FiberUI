import { Separator } from "@repo/ui/components/separator";

export const Example1 = () => {
    return (
        <>
            {/* Horizontal Separator  */}
            <div className="mb-10 flex flex-col rounded-md border border-gray-500 p-2 text-lg">
                First Item
                <Separator />
                Second Item
                <Separator />
                Third Item
            </div>

            <Separator />

            {/* Vertical Separator */}
            <div className="mt-10 flex flex-row items-center rounded-md border border-gray-500 px-4 py-2 text-lg">
                Item 1
                <Separator orientation="vertical" />
                Item 2
                <Separator orientation="vertical" />
                Item 3
            </div>
        </>
    );
};
