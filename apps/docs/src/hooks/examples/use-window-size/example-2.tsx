"use client";

import { useWindowSize } from "@repo/hooks/dom/use-window-size";
import { Laptop, Smartphone, Tablet } from "lucide-react";

export const Example2 = () => {
    const { width } = useWindowSize();

    let deviceType = "desktop";
    let Icon = Laptop;
    let color = "text-blue-500";

    if (width < 768) {
        deviceType = "mobile";
        Icon = Smartphone;
        color = "text-green-500";
    } else if (width < 1024) {
        deviceType = "tablet";
        Icon = Tablet;
        color = "text-orange-500";
    }

    return (
        <div className="flex w-full max-w-md flex-col items-center gap-6">
            <h3 className="font-semibold">Responsive Component Switching</h3>

            <div className="flex flex-col items-center gap-2">
                <Icon
                    className={`h-16 w-16 ${color} transition-all duration-300`}
                />
                <p className="font-medium capitalize">{deviceType} Layout</p>
            </div>

            <div className="w-full space-y-2">
                <div className="text-muted-foreground flex justify-between text-xs">
                    <span>0px</span>
                    <span>768px</span>
                    <span>1024px</span>
                    <span>∞</span>
                </div>
                <div className="bg-muted h-2 w-full overflow-hidden rounded-full">
                    <div
                        className="bg-primary h-full transition-all duration-300"
                        style={{
                            width: `${Math.min((width / 1200) * 100, 100)}%`,
                        }}
                    />
                </div>
                <div className="flex justify-between font-mono text-xs">
                    <span
                        className={
                            width < 768
                                ? "font-bold text-green-600"
                                : "text-muted-foreground"
                        }
                    >
                        Mobile
                    </span>
                    <span
                        className={
                            width >= 768 && width < 1024
                                ? "font-bold text-orange-600"
                                : "text-muted-foreground"
                        }
                    >
                        Tablet
                    </span>
                    <span
                        className={
                            width >= 1024
                                ? "font-bold text-blue-600"
                                : "text-muted-foreground"
                        }
                    >
                        Desktop
                    </span>
                </div>
            </div>

            <p className="text-muted-foreground text-center text-sm">
                Resize the window to switch the rendered icon and layout logic.
            </p>
        </div>
    );
};
