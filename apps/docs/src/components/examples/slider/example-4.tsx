import { Slider } from "@repo/ui/components/slider";

/* DISABLED SLIDER EXAMPLE */
export const Example4 = () => {
    return (
        <div className="w-full max-w-xs space-y-4">
            <Slider defaultValue={[50]} isDisabled />
        </div>
    );
};
