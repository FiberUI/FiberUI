import { Textarea } from "@repo/ui/components/textarea";

export function Example2() {
    return (
        <Textarea
            isDisabled
            placeholder="Type your message here."
            className="w-80 sm:w-96"
        />
    );
}
