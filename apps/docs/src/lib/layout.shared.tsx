import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */

// SVG Icon for the logo - a simple, abstract fiber-like shape
const FiberUIIcon = () => (
    <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-slate-800"
    >
        <path
            d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
            fill="currentColor"
            fillOpacity="0.1"
        />
        <path
            d="M12 6C8.69 6 6 8.69 6 12C6 15.31 8.69 18 12 18"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M18 12C18 8.69 15.31 6 12 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="2 2"
        />
    </svg>
);

export function baseOptions(): BaseLayoutProps {
    return {
        nav: {
            title: (
                <>
                    <FiberUIIcon />
                    FiberUI
                </>
            ),
        },
        // see https://fumadocs.dev/docs/ui/navigation/links
        links: [],
        githubUrl: "https://github.com/rajatverma311201/fiberui",
    };
}
