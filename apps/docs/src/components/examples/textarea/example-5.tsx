import { Label } from "@repo/ui/components/label";
import { Textarea } from "@repo/ui/components/textarea";

export function Example5() {
    return (
        <div className="grid w-full gap-1.5">
            <Label htmlFor="message-2">Your Message</Label>
            <Textarea
                placeholder="Type your message here."
                id="message-2"
                className="w-80 sm:w-96"
            />
            <p className="text-muted-foreground text-sm">
                Your message will be copied to the support team.
            </p>
        </div>
    );
}
