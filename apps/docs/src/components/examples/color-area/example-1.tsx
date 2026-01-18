"use client";

import { useState } from "react";
import { parseColor, Color } from "react-aria-components";
import { ColorArea } from "@repo/ui/components/color-area";
import { Label } from "@repo/ui/components/label";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@repo/ui/components/select";
import { Switch } from "@repo/ui/components/switch";

type ColorSpace = "rgb" | "hsl" | "hsb";
type Channel =
    | "red"
    | "green"
    | "blue"
    | "hue"
    | "saturation"
    | "lightness"
    | "brightness"
    | "alpha";

const CHANNEL_OPTIONS: Record<ColorSpace, Channel[]> = {
    rgb: ["red", "green", "blue", "alpha"],
    hsl: ["hue", "saturation", "lightness", "alpha"],
    hsb: ["hue", "saturation", "brightness", "alpha"],
};

const DEFAULT_COLORS: Record<ColorSpace, string> = {
    rgb: "rgb(128, 0, 128)",
    hsl: "hsl(300, 100%, 25%)",
    hsb: "hsb(300, 100%, 50%)",
};

/* INTERACTIVE COLOR AREA PLAYGROUND */
export const Example1: React.FC = () => {
    const [colorSpace, setColorSpace] = useState<ColorSpace>("hsb");
    const [xChannel, setXChannel] = useState<string>("default");
    const [yChannel, setYChannel] = useState<string>("default");
    const [isDisabled, setIsDisabled] = useState(false);
    const [color, setColor] = useState<Color>(parseColor(DEFAULT_COLORS.hsb));

    const handleColorSpaceChange = (newSpace: string) => {
        if (!newSpace || !DEFAULT_COLORS[newSpace as ColorSpace]) return;
        setColorSpace(newSpace as ColorSpace);
        setXChannel("default");
        setYChannel("default");
        setColor(parseColor(DEFAULT_COLORS[newSpace as ColorSpace]));
    };

    const channels = CHANNEL_OPTIONS[colorSpace];

    return (
        <div className="flex gap-8">
            {/* Left: Controls */}
            <div className="flex flex-col gap-4">
                <div className="space-y-1.5">
                    <Label>colorSpace</Label>
                    <Select
                        defaultValue={colorSpace}
                        value={colorSpace}
                        onChange={(key) =>
                            handleColorSpaceChange(key as string)
                        }
                    >
                        <SelectTrigger className="w-32">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="rgb">RGB</SelectItem>
                            <SelectItem value="hsl">HSL</SelectItem>
                            <SelectItem value="hsb">HSB</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-1.5">
                    <Label>xChannel</Label>
                    <Select
                        defaultValue="default"
                        value={xChannel}
                        onChange={(key) => setXChannel(key as string)}
                    >
                        <SelectTrigger className="w-32">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="default">Default</SelectItem>
                            {channels.map((ch) => (
                                <SelectItem key={ch} value={ch}>
                                    {ch}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-1.5">
                    <Label>yChannel</Label>
                    <Select
                        defaultValue="default"
                        value={yChannel}
                        onChange={(key) => setYChannel(key as string)}
                    >
                        <SelectTrigger className="w-32">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="default">Default</SelectItem>
                            {channels.map((ch) => (
                                <SelectItem key={ch} value={ch}>
                                    {ch}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center gap-2">
                    <Switch isSelected={isDisabled} onChange={setIsDisabled} />
                    <Label>isDisabled</Label>
                </div>
            </div>

            {/* Right: ColorArea + Output */}
            <div className="flex flex-col gap-4">
                <ColorArea
                    value={color}
                    onChange={setColor}
                    xChannel={
                        xChannel === "default"
                            ? undefined
                            : (xChannel as Channel)
                    }
                    yChannel={
                        yChannel === "default"
                            ? undefined
                            : (yChannel as Channel)
                    }
                    isDisabled={isDisabled}
                />

                <div className="flex items-center gap-3">
                    <div
                        className="size-10 rounded-md border shadow-sm"
                        style={{ backgroundColor: color.toString("css") }}
                    />
                    <div className="text-sm">
                        <p className="font-mono font-medium">
                            {color.toString("hex")}
                        </p>
                        <p className="text-muted-foreground font-mono">
                            {color.toString(colorSpace)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
