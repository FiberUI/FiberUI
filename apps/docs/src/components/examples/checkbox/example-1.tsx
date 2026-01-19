import { Checkbox } from "@repo/ui/components/checkbox";
import { Label } from "@repo/ui/components/label";

export const Example1 = () => {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
                <Checkbox id="terms" />
                <Label htmlFor="terms">Accept terms and conditions</Label>
            </div>
            <div className="flex items-start gap-3">
                <Checkbox id="terms-2" defaultSelected />
                <div className="space-y-2">
                    <Label htmlFor="terms-2">Accept terms and conditions</Label>
                    <p className="text-muted-foreground text-sm">
                        By clicking this checkbox, you agree to the terms and
                        conditions.
                    </p>
                </div>
            </div>
            <div className="group-[data] flex items-start gap-3">
                <Checkbox id="toggle" isDisabled />
                <Label htmlFor="toggle">Enable notifications</Label>
            </div>
            <Label
                htmlFor="toggle-2"
                className="hover:bg-accent/50 has-aria-checked:border-primary has-aria-checked:bg-primary/20 dark:has-aria-checked:border-primary flex items-start gap-3 rounded-lg border p-3"
            >
                <Checkbox id="toggle-2" defaultSelected className="" />
                <div className="grid gap-1.5 font-normal">
                    <p className="text-sm font-medium leading-none">
                        Enable notifications
                    </p>
                    <p className="text-muted-foreground text-sm">
                        You can enable or disable notifications at any time.
                    </p>
                </div>
            </Label>
        </div>
    );
};
