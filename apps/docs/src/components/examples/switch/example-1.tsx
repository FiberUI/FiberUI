import { Switch } from "@repo/ui/components/switch";

/* BASIC USAGE EXAMPLE */
export const Example1 = () => {
    return (
        <div className="flex items-center gap-2">
            <Switch id="airplane-mode" />
            <label htmlFor="airplane-mode" className="text-sm">
                Airplane Mode
            </label>
        </div>
    );
};
