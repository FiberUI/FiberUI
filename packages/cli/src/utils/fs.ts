import fs from "fs-extra";
import path from "path";

export interface FiberConfig {
    style: "default";
    tailwind: {
        config: string;
        css: string;
        baseColor: "amber" | "lime" | "emerald" | "blue" | "neutral" | "stone";
        cssVariables: boolean;
    };
    rsc: boolean;
    tsx: boolean;
    aliases: {
        components: string;
        utils: string;
    };
}

/**
 * Check if a file exists at the given path
 */
export function fileExists(filePath: string): boolean {
    return fs.existsSync(path.resolve(process.cwd(), filePath));
}

/**
 * Check if the fiberui.config.json file exists
 */
export function configExists(): boolean {
    return fileExists("fiberui.config.json");
}

/**
 * Load the fiberui.config.json file
 */
export async function loadConfig(): Promise<FiberConfig | null> {
    const configPath = path.resolve(process.cwd(), "fiberui.config.json");

    if (!fs.existsSync(configPath)) {
        return null;
    }

    try {
        return await fs.readJson(configPath);
    } catch (error) {
        console.error("Error reading config file:", error);
        return null;
    }
}

/**
 * Write the fiberui.config.json file
 */
export async function writeConfig(config: FiberConfig): Promise<void> {
    const configPath = path.resolve(process.cwd(), "fiberui.config.json");
    await fs.writeJson(configPath, config, { spaces: 2 });
}

/**
 * Detect if TypeScript is configured in the project
 */
export function detectTypeScript(): boolean {
    return fileExists("tsconfig.json");
}

/**
 * Detect if the project uses Next.js App Router (React Server Components)
 */
export function detectAppRouter(): boolean {
    return fileExists("app") || fileExists("src/app");
}

/**
 * Detect if the project has a src directory
 */
export function detectSrcDirectory(): boolean {
    return fileExists("src");
}

/**
 * Create a directory if it doesn't exist
 */
export async function ensureDirectory(dirPath: string): Promise<void> {
    const fullPath = path.resolve(process.cwd(), dirPath);
    await fs.ensureDir(fullPath);
}

/**
 * Create the utils file with the cn function
 */
export async function createUtilsFile(
    utilsAlias: string,
    isTypeScript: boolean,
): Promise<string> {
    const libDir = path.resolve(
        process.cwd(),
        path.dirname(utilsAlias.replace("@/", "src/")),
    );

    await fs.ensureDir(libDir);

    const utilsFile = path.join(libDir, `utils.${isTypeScript ? "ts" : "js"}`);

    if (fs.existsSync(utilsFile)) {
        return utilsFile; // Already exists, don't overwrite
    }

    const utilsContent = isTypeScript
        ? `import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`
        : `import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
`;

    await fs.writeFile(utilsFile, utilsContent);
    return utilsFile;
}

/**
 * Create the components directory
 */
export async function createComponentsDirectory(
    componentsAlias: string,
): Promise<string> {
    const componentsDir = path.resolve(
        process.cwd(),
        componentsAlias.replace("@/", "src/"),
    );

    await fs.ensureDir(componentsDir);
    return componentsDir;
}

/**
 * Write a component file
 */
export async function writeComponent(
    componentsAlias: string,
    componentName: string,
    componentCode: string,
    isTypeScript: boolean,
): Promise<string> {
    const componentsDir = path.resolve(
        process.cwd(),
        componentsAlias.replace("@/", "src/"),
    );

    await fs.ensureDir(componentsDir);

    const extension = isTypeScript ? "tsx" : "jsx";
    const componentPath = path.join(
        componentsDir,
        `${componentName}.${extension}`,
    );

    await fs.writeFile(componentPath, componentCode);
    return componentPath;
}

/**
 * Check if a component already exists
 */
export function componentExists(
    componentsAlias: string,
    componentName: string,
    isTypeScript: boolean,
): boolean {
    const componentsDir = path.resolve(
        process.cwd(),
        componentsAlias.replace("@/", "src/"),
    );

    const extension = isTypeScript ? "tsx" : "jsx";
    const componentPath = path.join(
        componentsDir,
        `${componentName}.${extension}`,
    );

    return fs.existsSync(componentPath);
}
