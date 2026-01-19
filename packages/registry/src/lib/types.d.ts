// =============================================================================
// Registry Item Types
// Based on: https://ui.shadcn.com/schema/registry-item.json
// =============================================================================

/**
 * The type of a registry item. Determines the target path when resolved.
 */
export type RegistryItemType =
    | "registry:lib"
    | "registry:block"
    | "registry:component"
    | "registry:ui"
    | "registry:hook"
    | "registry:theme"
    | "registry:page"
    | "registry:file"
    | "registry:style"
    | "registry:base"
    | "registry:font"
    | "registry:item";

/**
 * The type of a file within a registry item.
 */
export type RegistryFileType =
    | "registry:lib"
    | "registry:block"
    | "registry:component"
    | "registry:ui"
    | "registry:hook"
    | "registry:theme"
    | "registry:page"
    | "registry:file"
    | "registry:style"
    | "registry:base"
    | "registry:item";

/**
 * A file that is part of a registry item.
 */
export interface RegistryItemFile {
    /** The path to the file relative to the registry root. */
    path: string;
    /** The type of the file. Determines target path when resolved. */
    type: RegistryFileType;
    /** The content of the file (populated after build). */
    content?: string;
    /** The target path of the file in the project. Required for registry:page and registry:file types. */
    target?: string;
}

/**
 * Tailwind configuration for the registry item.
 * @deprecated Use cssVars for Tailwind v4 projects.
 */
export interface RegistryItemTailwindConfig {
    config?: {
        content?: string[];
        theme?: Record<string, unknown>;
        plugins?: string[];
    };
}

/**
 * CSS variables for the registry item.
 */
export interface RegistryItemCssVars {
    /** CSS variables for the @theme directive (Tailwind v4 only). */
    theme?: Record<string, string>;
    /** CSS variables for the light theme. */
    light?: Record<string, string>;
    /** CSS variables for the dark theme. */
    dark?: Record<string, string>;
}

/**
 * CSS value - can be a string or nested object for at-rules and selectors.
 */
export type CssValue = string | { [key: string]: CssValue };

/**
 * Font metadata for registry:font items.
 */
export interface RegistryItemFont {
    /** The font family name (e.g., 'Inter', 'JetBrains Mono'). */
    family: string;
    /** The font provider. Currently only 'google' is supported. */
    provider: "google";
    /** The import name for the font from next/font/google (e.g., 'Inter', 'JetBrains_Mono'). */
    import: string;
    /** The CSS variable name for the font (e.g., '--font-sans', '--font-mono'). */
    variable: string;
    /** Array of font weights to include (e.g., ['400', '500', '600', '700']). */
    weight?: string[];
    /** Array of font subsets to include (e.g., ['latin', 'latin-ext']). */
    subsets?: string[];
}

/**
 * A registry item representing a component, hook, page, theme, etc.
 */
export interface RegistryItem {
    /** The unique name of the item in the registry. */
    name: string;
    /** The type of the item. Determines target path when resolved. */
    type: RegistryItemType;
    /** Human-readable title for the registry item. */
    title?: string;
    /** A brief description of the item. */
    description?: string;
    /** The author of the item. Recommended format: "username <url>" */
    author?: string;
    /** NPM dependencies required by the registry item. */
    dependencies?: string[];
    /** NPM dev dependencies required by the registry item. */
    devDependencies?: string[];
    /** Registry items that this item depends on. Use names for shadcn/ui items, URLs for other registries. */
    registryDependencies?: string[];
    /** The files that make up this registry item. */
    files?: RegistryItemFile[];
    /**
     * Tailwind configuration for the registry item.
     * @deprecated Use cssVars for Tailwind v4 projects.
     */
    tailwind?: RegistryItemTailwindConfig;
    /** CSS variables for the registry item. */
    cssVars?: RegistryItemCssVars;
    /** CSS definitions to add to the project's CSS file. */
    css?: Record<string, CssValue>;
    /** Environment variables required by the registry item. */
    envVars?: Record<string, string>;
    /** Additional metadata for the registry item. */
    meta?: Record<string, unknown>;
    /** Documentation for the registry item (markdown string). */
    docs?: string;
    /** Categories of the registry item. */
    categories?: string[];
    /** The name of the registry item to extend (for registry:style items only). */
    extends?: string;
    /** The style configuration (for registry:base items only). */
    style?: string;
    /** The icon library to use (for registry:base items only). */
    iconLibrary?: string;
    /** The base color configuration (for registry:base items only). */
    baseColor?: string;
    /** The theme configuration (for registry:base items only). */
    theme?: string;
    /** Font metadata (required for registry:font items). */
    font?: RegistryItemFont;
}

// =============================================================================
// Registry Types
// Based on: https://ui.shadcn.com/schema/registry.json
// =============================================================================

/**
 * A shadcn registry containing components, hooks, pages, etc.
 */
export interface Registry {
    /** JSON Schema reference for validation. */
    $schema?: string;
    /** The name of the registry. Used for data attributes and metadata. */
    name: string;
    /** The homepage URL of the registry. */
    homepage: string;
    /** The items in the registry. */
    items: RegistryItem[];
}
