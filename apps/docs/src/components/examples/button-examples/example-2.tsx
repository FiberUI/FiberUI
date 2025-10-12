import { Button } from "@repo/ui/components/button";
import { Info, MenuSquareIcon } from "lucide-react";

export const Example2 = () => {
    return (
        <div className="flex gap-4">
            <Button size={"sm"} variant={"outline"}>
                Small
            </Button>
            <Button size={"default"} variant={"outline"}>
                Default
            </Button>
            <Button size={"lg"} variant={"outline"}>
                Large
            </Button>
            <Button size={"icon"} variant={"outline"}>
                <MenuSquareIcon />
            </Button>
        </div>
    );
};
