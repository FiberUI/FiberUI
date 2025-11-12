import { Input } from "@repo/ui/components/input";

interface Example3Props {}

export const Example3: React.FC<Example3Props> = ({}) => {
    return (
        <div className="sm:w-80">
            <Input type="email" placeholder="Email disabled" disabled={true} />
        </div>
    );
};
