import { Switch } from "@repo/ui/components/switch";

/* DISABLED SWITCH EXAMPLE */
export const Example3 = () => {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
                <Switch id="disabled-off" isDisabled />
                <label
                    htmlFor="disabled-off"
                    className="text-muted-foreground text-sm"
                >
                    Disabled (off)
                </label>
            </div>
            <div className="flex items-center gap-2">
                <Switch id="disabled-on" isDisabled isSelected />
                <label
                    htmlFor="disabled-on"
                    className="text-muted-foreground text-sm"
                >
                    Disabled (on)
                </label>
            </div>
        </div>
    );
};
