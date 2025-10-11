import { type Command } from "commander";
import { addCmd } from "@/commands/add";
import { initCmd } from "@/commands/init";
import { listCmd } from "./list";

export const registerCommands = (program: Command) => {
    initCmd(program);
    addCmd(program);
    listCmd(program);
};
