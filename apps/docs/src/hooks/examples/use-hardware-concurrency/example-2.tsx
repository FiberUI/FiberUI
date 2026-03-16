"use client";

import { useHardwareConcurrency } from "@repo/hooks/performance/use-hardware-concurrency";
import { useState, useEffect } from "react";
import { Card } from "@repo/ui/components/card";

const Progress = ({
    value,
    className,
}: {
    value: number;
    className: string;
}) => (
    <div className={`bg-secondary overflow-hidden rounded-full ${className}`}>
        <div
            className="bg-primary h-full transition-all duration-300"
            style={{ width: `${value}%` }}
        />
    </div>
);

export function Example2() {
    const cores = useHardwareConcurrency();
    const [quality, setQuality] = useState("");
    const [details, setDetails] = useState("");

    useEffect(() => {
        // Automatically determine graphics or app feature quality based on cores
        if (cores >= 8) {
            setQuality("High");
            setDetails(
                "All animations, high-res textures, and background processing enabled.",
            );
        } else if (cores >= 4) {
            setQuality("Medium");
            setDetails(
                "Standard animations, optimized textures, balanced processing.",
            );
        } else {
            setQuality("Low");
            setDetails(
                "Reduced animations, low-res textures, strictly essential processing.",
            );
        }
    }, [cores]);

    return (
        <div className="mx-auto flex w-full max-w-md flex-col gap-6">
            <div className="text-center">
                <h3 className="text-lg font-medium">Auto-Tuning Quality</h3>
                <p className="text-muted-foreground text-sm">
                    Device features adjusted based on {cores} logical{" "}
                    {cores === 1 ? "core" : "cores"}.
                </p>
            </div>

            <Card className="flex flex-col gap-4 p-6">
                <div className="flex items-center justify-between">
                    <span className="font-medium">Applied Setting:</span>
                    <span
                        className={`rounded-md px-2 py-1 text-sm font-bold ${
                            quality === "High"
                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                : quality === "Medium"
                                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                                  : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                        }`}
                    >
                        {quality} Quality
                    </span>
                </div>

                <div className="space-y-4">
                    <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                            <span>Texture Resolution</span>
                            <span>
                                {quality === "Low"
                                    ? "512px"
                                    : quality === "Medium"
                                      ? "1024px"
                                      : "4096px"}
                            </span>
                        </div>
                        <Progress
                            value={
                                quality === "Low"
                                    ? 33
                                    : quality === "Medium"
                                      ? 66
                                      : 100
                            }
                            className="h-2"
                        />
                    </div>

                    <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                            <span>Background Tasks</span>
                            <span>
                                {quality === "Low"
                                    ? "1 Thread"
                                    : quality === "Medium"
                                      ? "2 Threads"
                                      : "4 Threads"}
                            </span>
                        </div>
                        <Progress
                            value={
                                quality === "Low"
                                    ? 25
                                    : quality === "Medium"
                                      ? 50
                                      : 100
                            }
                            className="h-2"
                        />
                    </div>
                </div>

                <p className="text-muted-foreground mt-2 border-t pt-4 text-xs">
                    {details}
                </p>
            </Card>
        </div>
    );
}
