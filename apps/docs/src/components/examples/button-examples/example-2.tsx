import { Button } from "@repo/ui/components/button";
import { BusIcon, Info, MenuSquareIcon } from "lucide-react";

export const Example2 = () => {
    return (
        <div>
            <div className="flex flex-wrap items-center justify-center gap-4">
                <Button size={"sm"} variant={"outline"}>
                    Small
                </Button>
                <Button size={"default"} variant={"outline"}>
                    Default
                </Button>
                <Button size={"lg"} variant={"outline"}>
                    Large
                </Button>
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-4">
                <Button size={"icon-sm"} variant={"outline"}>
                    <Info />
                </Button>
                <Button size={"icon"} variant={"outline"}>
                    <MenuSquareIcon />
                </Button>
                <Button size={"icon-lg"} variant={"outline"}>
                    <BusIcon />
                </Button>
            </div>
        </div>
    );
};
