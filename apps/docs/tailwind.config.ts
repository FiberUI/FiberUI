import sharedConfig from "@repo/tailwind-config/tailwindConfig";
import type { Config } from "tailwindcss";

const config: Config = {
    presets: [sharedConfig],
    content: [
        "./src/**/*.{ts,tsx,js,jsx,mdx}",
        // If your shared config is relative, you can skip this line
        // but including it doesn't hurt
        "../../packages/ui/src/**/*.{ts,tsx,js,jsx,mdx}",
    ],
};

export default config;
