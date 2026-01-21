#!/usr/bin/env node
/**
 * Build script for generating shadcn-compatible registry JSON files.
 *
 * Usage: npx tsx scripts/build-registry.ts
 *
 * This script:
 * 1. Reads component definitions from lib/basic.ts
 * 2. Reads source files from packages/ui/src/
 * 3. Transforms imports (@repo/ui -> @/)
 * 4. Outputs JSON files to apps/docs/public/r/
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { FIBER_UI_COMPONENTS, REGISTRY_CONFIG } from "@/lib/basic";
import type { RegistryItem, RegistryItemFile } from "@/lib/types";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths relative to project root
const PROJECT_ROOT = path.resolve(__dirname, "../../..");
const SOURCE_PATH = path.join(PROJECT_ROOT, REGISTRY_CONFIG.sourceBasePath);
const OUTPUT_PATH = path.join(PROJECT_ROOT, REGISTRY_CONFIG.outputPath);

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
function readAndTransformFile(filePath: string): string {
    const fullPath = path.join(SOURCE_PATH, filePath);

    if (!fs.existsSync(fullPath)) {
        throw new Error(`Source file not found: ${fullPath}`);
    }

    const content = fs.readFileSync(fullPath, "utf-8");
    return transformImports(content);
}

/**
 * Build a single registry item JSON
 */
function buildRegistryItem(item: RegistryItem): RegistryItem {
    const files: RegistryItemFile[] = (item.files || []).map((file) => ({
        ...file,
        content: readAndTransformFile(file.path),
    }));

    return {
        $schema: "https://ui.shadcn.com/schema/registry-item.json",
        ...item,
        files,
    } as RegistryItem & { $schema: string };
}

/**
 * Ensure output directory exists
 */
function ensureOutputDir(): void {
    if (!fs.existsSync(OUTPUT_PATH)) {
        fs.mkdirSync(OUTPUT_PATH, { recursive: true });
        console.log(`Created output directory: ${OUTPUT_PATH}`);
    }
}

/**
 * Write registry item to JSON file
 */
function writeRegistryItem(item: RegistryItem): void {
    const outputFile = path.join(OUTPUT_PATH, `${item.name}.json`);
    const content = JSON.stringify(item, null, 2);
    fs.writeFileSync(outputFile, content);
    console.log(`[OK] Generated: ${item.name}.json`);
}

/**
 * Build the main registry.json index
 */
function buildRegistryIndex(): void {
    const registry = {
        $schema: "https://ui.shadcn.com/schema/registry.json",
        name: REGISTRY_CONFIG.name,
        homepage: REGISTRY_CONFIG.homepage,
        items: FIBER_UI_COMPONENTS.map((item) => ({
            name: item.name,
            type: item.type,
            title: item.title,
            description: item.description,
            dependencies: item.dependencies,
            registryDependencies: item.registryDependencies,
        })),
    };

    const outputFile = path.join(OUTPUT_PATH, "index.json");
    fs.writeFileSync(outputFile, JSON.stringify(registry, null, 2));
    console.log(`[OK] Generated: index.json (registry index)`);
}

/**
 * Main build function
 */
function build(): void {
    console.log("\nBuilding Fiber UI Registry...\n");
    console.log(`Source: ${SOURCE_PATH}`);
    console.log(`Output: ${OUTPUT_PATH}\n`);

    try {
        ensureOutputDir();

        // Build each component
        for (const item of FIBER_UI_COMPONENTS) {
            const builtItem = buildRegistryItem(item);
            writeRegistryItem(builtItem);
        }

        // Build registry index
        buildRegistryIndex();

        console.log(
            `\nRegistry build complete! ${FIBER_UI_COMPONENTS.length} items generated.\n`,
        );
    } catch (error) {
        console.error("\n[ERROR] Build failed:", error);
        process.exit(1);
    }
}

// Run build
build();
