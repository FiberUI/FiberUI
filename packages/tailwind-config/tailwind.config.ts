import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        // Scan all apps
        "../../apps/**/*.{ts,tsx,js,jsx,mdx}",
        // 👇 Add this line to include your UI components
        "../../packages/ui/src/**/*.{ts,tsx,js,jsx,mdx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};

export default config;
