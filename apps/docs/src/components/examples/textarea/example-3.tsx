import { Label } from "@repo/ui/components/label";
import { Textarea } from "@repo/ui/components/textarea";

export function Example3() {
    return (
        <div className="grid w-full gap-1.5">
            <Label htmlFor="message">Your message</Label>
            <Textarea
                placeholder="Type your message here."
                id="message"
                className="w-80 sm:w-96"
            />
        </div>
    );
}
