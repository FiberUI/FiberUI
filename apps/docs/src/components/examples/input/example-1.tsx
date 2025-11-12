import { Input } from "@repo/ui/components/input";

interface Example1Props {}

export const Example1: React.FC<Example1Props> = ({}) => {
    return (
        <div className="sm:w-80">
            <Input type="email" placeholder="Email" />
        </div>
    );
};
