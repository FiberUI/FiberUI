"use client";
import {
    GlobeIcon,
    CodeIcon,
    PaletteIcon,
    ServerIcon,
    SmartphoneIcon,
} from "lucide-react";
import { ComboBox, ComboBoxItem } from "@repo/ui/components/combo-box";

/* CUSTOM ITEMS WITH ICONS */
export const Example4 = () => {
    return (
        <ComboBox label="Technology" placeholder="Select a technology">
            <ComboBoxItem id="web" textValue="Web Development">
                <GlobeIcon />
                <div className="flex flex-col">
                    <span className="font-medium">Web Development</span>
                    <span className="text-muted-foreground text-xs">
                        HTML, CSS, JavaScript
                    </span>
                </div>
            </ComboBoxItem>
            <ComboBoxItem id="backend" textValue="Backend">
                <CodeIcon />
                <div className="flex flex-col">
                    <span className="font-medium">Backend</span>
                    <span className="text-muted-foreground text-xs">
                        Node.js, Python, Go
                    </span>
                </div>
            </ComboBoxItem>
            <ComboBoxItem id="design" textValue="Design">
                <PaletteIcon />
                <div className="flex flex-col">
                    <span className="font-medium">Design</span>
                    <span className="text-muted-foreground text-xs">
                        Figma, Sketch, Adobe XD
                    </span>
                </div>
            </ComboBoxItem>
            <ComboBoxItem id="devops" textValue="DevOps">
                <ServerIcon />
                <div className="flex flex-col">
                    <span className="font-medium">DevOps</span>
                    <span className="text-muted-foreground text-xs">
                        Docker, Kubernetes, CI/CD
                    </span>
                </div>
            </ComboBoxItem>
            <ComboBoxItem id="mobile" textValue="Mobile">
                <SmartphoneIcon />
                <div className="flex flex-col">
                    <span className="font-medium">Mobile</span>
                    <span className="text-muted-foreground text-xs">
                        React Native, Flutter, Swift
                    </span>
                </div>
            </ComboBoxItem>
        </ComboBox>
    );
};
