"use client";

import { useLocalStorageState } from "@repo/hooks/storage/use-local-storage-state";

const colors = ["blue", "green", "purple", "orange", "pink"] as const;
type ButtonColor = (typeof colors)[number];

const colorClasses: Record<ButtonColor, string> = {
    blue: "bg-blue-600  hover:bg-blue-700",
    green: "bg-green-600    hover:bg-green-700",
    purple: "bg-purple-600  hover:bg-purple-700",
    orange: "bg-orange-600  hover:bg-orange-700",
    pink: "bg-pink-600  hover:bg-pink-700",
};

/* BASIC USAGE - Button Color Preference */
export const Example1 = () => {
    const [color, setColor, isLoading] = useLocalStorageState<ButtonColor>(
        "button-color",
        "blue",
    );

    if (isLoading) {
        return (
            <span className="text-muted-foreground text-sm">Loading...</span>
        );
    }

    const nextColor = () => {
        const currentIndex = colors.indexOf(color);
        const nextIndex = (currentIndex + 1) % colors.length;
        setColor(colors[nextIndex] as (typeof colors)[number]);
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <button
                className={`rounded-md px-6 py-3 text-sm font-medium text-white transition-colors ${colorClasses[color]}`}
                onClick={nextColor}
            >
                Click to Change Color
            </button>
            <p className="text-muted-foreground text-sm">
                Current: <span className="font-medium capitalize">{color}</span>
            </p>
        </div>
    );
};
