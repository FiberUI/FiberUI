import { Button } from "@repo/ui/components/button";
import { Textarea } from "@repo/ui/components/textarea";

export function Example4() {
    return (
        <div className="grid w-full gap-2">
            <Textarea
                placeholder="Type your message here."
                className="w-80 sm:w-96"
            />
            <Button>Send message</Button>
        </div>
    );
}
