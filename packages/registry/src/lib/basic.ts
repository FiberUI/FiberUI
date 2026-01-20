import { RegistryItem } from "@/lib/types";

/**
 * Fiber UI components registry.
 * This is the source of truth for generating registry JSON files.
 */
export const FIBER_UI_COMPONENTS: RegistryItem[] = [
    // =========================================================================
    // Utils (shared dependency)
    // =========================================================================
    {
        name: "utils",
        type: "registry:lib",
        title: "Utils",
        description:
            "Utility functions for Fiber UI components including cn() for class merging and focusRing for accessibility.",
        dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
        files: [
            {
                path: "lib/utils.ts",
                type: "registry:lib",
            },
        ],
    },

    // =========================================================================
    // Button
    // =========================================================================
    {
        name: "button",
        type: "registry:ui",
        title: "Button",
        description:
            "A button component built with React Aria for accessibility and Tailwind Variants for styling. Includes multiple variants: default, gradient, destructive, outline, secondary, ghost, link, adobe, and instagram.",
        dependencies: ["react-aria-components", "tailwind-variants"],
        registryDependencies: ["utils"],
        files: [
            {
                path: "components/button.tsx",
                type: "registry:ui",
            },
        ],
    },

    // =========================================================================
    // Switch
    // =========================================================================
    {
        name: "switch",
        type: "registry:ui",
        title: "Switch",
        description:
            "An accessible switch/toggle component built with React Aria. Supports disabled states and focus ring for accessibility.",
        dependencies: ["react-aria-components", "tailwind-variants"],
        registryDependencies: ["utils"],
        files: [
            {
                path: "components/switch.tsx",
                type: "registry:ui",
            },
        ],
    },

    // =========================================================================
    // Popover
    // =========================================================================
    {
        name: "popover",
        type: "registry:ui",
        title: "Popover",
        description:
            "A popover component with arrow support, header, body, and footer sections. Built with React Aria for accessibility.",
        dependencies: ["react-aria-components", "tailwind-variants"],
        registryDependencies: ["utils"],
        files: [
            {
                path: "components/popover.tsx",
                type: "registry:ui",
            },
        ],
    },
];

/**
 * Registry metadata
 */
export const REGISTRY_CONFIG = {
    name: "fiberui",
    homepage: "https://fiberui.com",
    /** Base path where component source files are located */
    sourceBasePath: "packages/ui/src",
    /** Output path for generated JSON files */
    outputPath: "apps/docs/public/r",
} as const;
