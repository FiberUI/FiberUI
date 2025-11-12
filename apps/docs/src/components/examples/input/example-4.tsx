import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";

interface Example4Props {}

export const Example4: React.FC<Example4Props> = ({}) => {
    return (
        <div className="flex flex-col gap-3 sm:w-80">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="Email" />
        </div>
    );
};
