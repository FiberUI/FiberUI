import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";

interface Example5Props {}

export const Example5: React.FC<Example5Props> = ({}) => {
    return (
        <div className="flex gap-3 sm:w-96">
            <Input type="email" placeholder="Email" />
            <Button type="submit" className="rounded-lg">
                Subscribe
            </Button>
        </div>
    );
};
