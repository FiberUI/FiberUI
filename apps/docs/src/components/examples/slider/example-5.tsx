"use client";

import { useState } from "react";
import { Slider } from "@repo/ui/components/slider";
import { Label } from "@repo/ui/components/label";

/* SLIDER WITH STEP AND CUSTOM RANGE */
export const Example5 = () => {
    const [volume, setVolume] = useState([75]);
    const [brightness, setBrightness] = useState([50]);

    return (
        <div className="w-full max-w-xs space-y-6">
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <Label>Volume</Label>
                    <span className="text-muted-foreground text-sm">
                        {volume[0]}%
                    </span>
                </div>
                <Slider
                    value={volume}
                    onChange={(v) => setVolume(v as number[])}
                    minValue={0}
                    maxValue={100}
                    step={5}
                />
            </div>
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <Label>Brightness</Label>
                    <span className="text-muted-foreground text-sm">
                        {brightness[0]}%
                    </span>
                </div>
                <Slider
                    value={brightness}
                    onChange={(v) => setBrightness(v as number[])}
                    minValue={0}
                    maxValue={100}
                    step={10}
                />
            </div>
        </div>
    );
};
