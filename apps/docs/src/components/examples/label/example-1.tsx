import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";

interface Example1Props {}

export const Example1: React.FC<Example1Props> = ({}) => {
    return (
        <div className="flex w-80 flex-col gap-2 md:w-80">
            <Label htmlFor="name">Name</Label>
            <Input id="name" />
        </div>
    );
};
