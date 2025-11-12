import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";

interface Example2Props {}

export const Example2: React.FC<Example2Props> = ({}) => {
    return (
        <div className="flex flex-col gap-3 sm:w-80">
            <Label htmlFor="picture">Picture</Label>
            <Input id="picture" type="file" />
        </div>
    );
};
