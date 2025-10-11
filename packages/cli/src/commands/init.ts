import { Command } from "commander";
import prompts from "prompts";
import chalk from "chalk";
import {
    configExists,
    writeConfig,
    detectTypeScript,
    detectAppRouter,
    detectSrcDirectory,
    createUtilsFile,
    createComponentsDirectory,
    type FiberConfig,
} from "@/utils/fs";

export const initCmd = (program: Command) => {
    program
        .command("init")
        .description("Initialize FiberUI in your project")
        .action(async () => {
            console.log(chalk.bold("\n🚀 Welcome to FiberUI!\n"));

            // Check if config already exists
            if (configExists()) {
                console.log(
                    chalk.yellow("⚠  fiberui.config.json already exists!"),
                );
                const { overwrite } = await prompts({
                    type: "confirm",
                    name: "overwrite",
                    message: "Would you like to overwrite it?",
                    initial: false,
                });

                if (!overwrite) {
                    console.log(chalk.gray("Initialization cancelled."));
                    return;
                }
            }

            // Detect project setup
            const hasTsConfig = detectTypeScript();
            const hasAppDir = detectAppRouter();
            const hasSrcDir = detectSrcDirectory();

            // Prompt user for configuration
            const answers = await prompts([
                {
                    type: "select",
                    name: "typescript",
                    message: "Would you like to use TypeScript?",
                    choices: [
                        { title: "Yes", value: true },
                        { title: "No", value: false },
                    ],
                    initial: hasTsConfig ? 0 : 1,
                },
                {
                    type: "select",
                    name: "baseColor",
                    message: "Which base color would you like to use?",
                    choices: [
                        { title: "Neutral", value: "neutral" },
                        { title: "Stone", value: "stone" },
                        { title: "Amber", value: "amber" },
                        { title: "Lime", value: "lime" },
                        { title: "Emerald", value: "emerald" },
                        { title: "Blue", value: "blue" },
                    ],
                    initial: 0,
                },
                {
                    type: "text",
                    name: "tailwindConfig",
                    message: "Where is your tailwind.config file?",
                    initial: (prev, values) =>
                        values.typescript
                            ? "tailwind.config.ts"
                            : "tailwind.config.js",
                },
                {
                    type: "text",
                    name: "tailwindCss",
                    message: "Where is your global CSS file?",
                    initial: hasAppDir
                        ? hasSrcDir
                            ? "src/app/globals.css"
                            : "app/globals.css"
                        : hasSrcDir
                          ? "src/styles/globals.css"
                          : "styles/globals.css",
                },
                {
                    type: "text",
                    name: "componentsAlias",
                    message: "Configure import alias for components:",
                    initial: "@/components",
                },
                {
                    type: "text",
                    name: "utilsAlias",
                    message: "Configure import alias for utils:",
                    initial: "@/lib/utils",
                },
            ]);

            // Handle user cancellation
            if (!answers.typescript || !answers.baseColor) {
                console.log(chalk.gray("\nInitialization cancelled."));
                return;
            }

            // Build config object
            const config: FiberConfig = {
                style: "default",
                tailwind: {
                    config: answers.tailwindConfig,
                    css: answers.tailwindCss,
                    baseColor: answers.baseColor,
                    cssVariables: true,
                },
                rsc: hasAppDir,
                tsx: answers.typescript,
                aliases: {
                    components: answers.componentsAlias,
                    utils: answers.utilsAlias,
                },
            };

            try {
                // Write config file
                await writeConfig(config);
                console.log(chalk.green("\n✅ fiberui.config.json created!"));

                // Create components directory
                await createComponentsDirectory(answers.componentsAlias);

                // Create utils file
                const utilsFile = await createUtilsFile(
                    answers.utilsAlias,
                    answers.typescript,
                );
                console.log(chalk.green(`✅ Created ${utilsFile}`));

                // Success message
                console.log(chalk.bold.green("\n✨ FiberUI initialized!\n"));
                console.log(chalk.gray("Next steps:"));
                console.log(
                    chalk.cyan(
                        "  1. Install dependencies: npm install clsx tailwind-merge react-aria",
                    ),
                );
                console.log(
                    chalk.cyan("  2. Add components: npx fibercli add button"),
                );
                console.log(chalk.cyan("  3. Start building! 🎉\n"));
            } catch (error) {
                console.error(
                    chalk.red("\n❌ Error during initialization:"),
                    error,
                );
                process.exit(1);
            }
        });
};
