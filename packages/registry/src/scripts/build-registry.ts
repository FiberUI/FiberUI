#!/usr/bin/env node
/**
 * Build script for generating shadcn-compatible registry JSON files.
 *
 * Usage: npx tsx scripts/build-registry.ts
 *
 * This script:
 * 1. Reads component definitions from lib/basic.ts & lib/hooks.ts
 * 2. Reads source files from packages/ui/src/ & packages/hooks/src/
 * 3. Transforms imports (@repo/ui -> @/)
 * 4. Outputs JSON files to apps/docs/public/r/
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
// import { FIBER_UI_COMPONENTS, REGISTRY_CONFIG } from "@/lib/basic";
import { FIBER_UI_HOOKS } from "@/lib/hooks";
import type { RegistryItem, RegistryItemFile } from "@/lib/types";

const MY_RESGISTRY_URL = "https://r.fiberui.com/r";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths relative to project root
const PROJECT_ROOT = path.resolve(__dirname, "../../../..");
// const COMPONENTS_SOURCE_PATH = path.join(
//     PROJECT_ROOT,
//     REGISTRY_CONFIG.sourceBasePath,
// );
const HOOKS_SOURCE_PATH = path.join(PROJECT_ROOT, "packages/hooks/src");
const OUTPUT_PATH = path.join(PROJECT_ROOT, "apps/docs/public/r");
const HOOKS_OUTPUT_PATH = path.join(OUTPUT_PATH, "hooks");

/**
 * Transform import paths from monorepo format to shadcn format
 * @repo/ui/lib/utils -> @/lib/utils
 */
function transformImports(content: string): string {
    return content
        .replace(/@repo\/ui\/lib\//g, "@/lib/")
        .replace(/@repo\/ui\/components\//g, "@/components/");
}

/**
 * Read file content and transform it for registry distribution
 */
function readAndTransformFile(
    filePath: string,
    sourceBasePath: string,
): string {
    const fullPath = path.join(sourceBasePath, filePath);

    if (!fs.existsSync(fullPath)) {
        throw new Error(`Source file not found: ${fullPath}`);
    }

    const content = fs.readFileSync(fullPath, "utf-8");
    return transformImports(content);
}

/**
 * Build a single registry item JSON
 */
function buildRegistryItem(
    item: RegistryItem,
    sourceBasePath: string,
): RegistryItem {
    const files: RegistryItemFile[] = (item.files || []).map((file) => ({
        ...file,

        content: readAndTransformFile(file.path, sourceBasePath),
    }));

    return {
        $schema: "https://ui.shadcn.com/schema/registry-item.json",
        ...item,
        files,
        registryDependencies: item.registryDependencies?.map(
            (dep) => `${MY_RESGISTRY_URL}/${dep}.json`,
        ),
    } as RegistryItem & { $schema: string };
}

/**
 * Ensure output directories exist
 */
function ensureOutputDirs(): void {
    if (!fs.existsSync(OUTPUT_PATH)) {
        fs.mkdirSync(OUTPUT_PATH, { recursive: true });
        console.log(`Created output directory: ${OUTPUT_PATH}`);
    }
    if (!fs.existsSync(HOOKS_OUTPUT_PATH)) {
        fs.mkdirSync(HOOKS_OUTPUT_PATH, { recursive: true });
        console.log(`Created output directory: ${HOOKS_OUTPUT_PATH}`);
    }
}

/**
 * Write registry item to JSON file
 */
function writeRegistryItem(item: RegistryItem, outputBasePath: string): void {
    const outputFile = path.join(outputBasePath, `${item.name}.json`);
    const content = JSON.stringify(item, null, 2);
    fs.writeFileSync(outputFile, content);
    console.log(`[OK] Generated: ${item.name}.json`);
}

/**
 * Build the main registry.json index
 */
function buildRegistryIndex(): void {
    const allItems = [...FIBER_UI_HOOKS];

    const registry = {
        $schema: "https://ui.shadcn.com/schema/registry.json",
        name: "fiberui",
        homepage: "https://fiberui.com",
        items: allItems.map((item) => ({
            name: item.name,
            type: item.type,
            title: item.title,
            description: item.description,
            dependencies: item.dependencies,
            registryDependencies: item.registryDependencies?.map(
                (dep) => `${MY_RESGISTRY_URL}/${dep}.json`,
            ),
        })),
    };

    const outputFile = path.join(OUTPUT_PATH, "registry.json");
    fs.writeFileSync(outputFile, JSON.stringify(registry, null, 2));
    console.log(`[OK] Generated: registry.json (registry index)`);
}

/**
 * Main build function
 */
function build(): void {
    console.log("\nBuilding Fiber UI Registry...\n");
    console.log(`Project Root: ${PROJECT_ROOT}`);
    // console.log(`Components Source: ${COMPONENTS_SOURCE_PATH}`);
    console.log(`Hooks Source: ${HOOKS_SOURCE_PATH}`);
    console.log(`Output: ${OUTPUT_PATH}\n`);

    try {
        ensureOutputDirs();

        // Build components
        // console.log("\n--- Building Components ---\n");
        // for (const item of FIBER_UI_COMPONENTS) {
        //     const builtItem = buildRegistryItem(item, COMPONENTS_SOURCE_PATH);
        //     writeRegistryItem(builtItem, OUTPUT_PATH);
        // }

        // Build hooks
        console.log("\n--- Building Hooks ---\n");
        for (const item of FIBER_UI_HOOKS) {
            const builtItem = buildRegistryItem(item, HOOKS_SOURCE_PATH);
            writeRegistryItem(builtItem, HOOKS_OUTPUT_PATH);
        }

        // Build registry index
        console.log("\n--- Building Index ---\n");
        buildRegistryIndex();

        console.log(
            `\nRegistry build complete! ${0} components and ${FIBER_UI_HOOKS.length} hooks generated.\n`,
        );
    } catch (error) {
        console.error("\n[ERROR] Build failed:", error);
        process.exit(1);
    }
}

// Run build
build();
