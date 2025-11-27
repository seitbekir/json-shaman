import { Command, Option } from "commander";
import { version } from "../package.json";
import {
    initFile,
    get,
    set,
    remove,
    push,
    pop,
    shift,
    unshift,
} from "./actions";

const program = new Command();

program
    .name("jsons")
    .description("A CLI tool for manipulating JSON data")
    .version(version);

// Define commands, options, and actions here
program
    .option("-f, --file <path>", "Path to the JSON file")
    .addOption(
        new Option("-o, --output <style>")
            .choices(["quiet", "key-value", "json"])
            .default("key-value"),
    );

program
    .command("get")
    .description("Read a value from the JSON file by key")
    .option("-k, --key <key...>", "Key to read from the JSON file")
    .action(get);

program
    .command("set")
    .description("Set a value in the JSON file by key")
    .option("-k, --key <key>", "Key to set in the JSON file")
    .option("-v, --value <value>", "Value to set for the specified key")
    .action(set);

program
    .command("shift")
    .description("Shift a value from an array in the JSON file")
    .option("-k, --key <key>", "Key of the array to shift from")
    .option("-v, --value <value...>", "Value to push to the array")
    .action(shift);

program
    .command("pop")
    .description("Pop a value from an array in the JSON file")
    .option("-k, --key <key>", "Key of the array to pop from")
    .option("-v, --value <value...>", "Value to push to the array")
    .action(pop);

program
    .command("unshift")
    .description("Unshift a value to an array in the JSON file")
    .option("-k, --key <key>", "Key of the array to unshift to")
    .option("-v, --value <value...>", "Value to unshift to the array")
    .action(unshift);

program
    .command("push")
    .description("Push a value to an array in the JSON file")
    .option("-k, --key <key>", "Key of the array to push to")
    .option("-v, --value <value...>", "Value to push to the array")
    .action(push);

program
    .command("remove")
    .description("Remove a key from the JSON file")
    .option("-k, --key <key...>", "Key to remove from the JSON file")
    .action(remove);

// Attach action handlers
program.hook("preAction", (thisCommand) => {
    const filePath = thisCommand.opts().file;
    if (filePath) {
        initFile(thisCommand, filePath);
    } else {
        throw new Error(
            "Please provide a JSON file path using the -f or --file option.",
        );
    }
});

program.parse(process.argv);
