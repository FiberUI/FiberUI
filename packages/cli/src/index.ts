#!/usr/bin/env node

import { Command } from "commander";
import { registerCommands } from "@/commands/register-commands";

import pkg from "@/../package.json" with { type: "json" };

const program = new Command();

program
    .name("fiberui")
    .version(pkg.version)
    .description("FiberUI CLI — add components");

registerCommands(program);

program.parse();
