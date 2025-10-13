import { Button } from "@repo/ui/components/button";
import { Info } from "lucide-react";

/* BASIC USAGE EXAMPLES */
export const Example1 = () => {
    return (
        <div className="flex flex-wrap items-center justify-center gap-4">
            <Button>Default</Button>
            <Button variant={"outline"}>Outline</Button>
            <Button size={"icon"} variant={"outline"}>
                <Info />
            </Button>
        </div>
    );
};
