import { Switch } from "@repo/ui/components/switch";

/* DEFAULT SELECTED EXAMPLE */
export const Example4 = () => {
    return (
        <div className="flex items-center gap-2">
            <Switch id="dark-mode" defaultSelected />
            <label htmlFor="dark-mode" className="text-sm">
                Dark mode
            </label>
        </div>
    );
};
