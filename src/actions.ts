import type { OptionValues, Command } from "commander";
import editJsonFile, { type JsonEditor } from "edit-json-file";

import { outputValues, readValueAsJson, type OutputStyle } from "./output";

function prep(self: Command) {
    const parentOpts = self.parent?.opts() ?? {};

    const json: JsonEditor = parentOpts?.json;

    if (!json) {
        throw new Error(
            "JSON file not initialized. Please provide a valid file path.",
        );
    }

    return {
        json,
        output: parentOpts.output as OutputStyle,
    };
}

export function initFile(self: Command, path: string): void {
    const json = editJsonFile(path);

    self.opts().json = json;
}

export function get(opts: OptionValues, self: Command): void {
    const { json, output } = prep(self);

    const keys = opts.key as string[];

    const results = keys.map((key) => [key, json.get(key)]) as [
        string,
        unknown,
    ][];

    outputValues(results, output);
}

export function set(opts: OptionValues, self: Command): void {
    const { json } = prep(self);

    const key = opts.key as string;
    const value = readValueAsJson(opts.value as string);

    json.set(key, value);
    json.save();
}

export function shift(opts: OptionValues, self: Command): void {
    const { json, output } = prep(self);
    const key = opts.key as string;

    const arr = json.get(key) as unknown[];

    if (!Array.isArray(arr)) {
        throw new Error(`The key "${key}" is not an array.`);
    }

    const results = [[key, arr.shift()]] as [string, unknown][];
    json.set(key, arr);
    json.save();

    outputValues(results, output);
}

export function pop(opts: OptionValues, self: Command): void {
    const { json, output } = prep(self);

    const key = opts.key as string;

    const arr = json.get(key) as unknown[];

    if (!Array.isArray(arr)) {
        throw new Error(`The key "${key}" is not an array.`);
    }

    const results = [[key, arr.pop()]] as [string, unknown][];
    json.set(key, arr);
    json.save();

    outputValues(results, output);
}

export function unshift(opts: OptionValues, self: Command): void {
    const { json } = prep(self);

    const key = opts.key as string;
    const values = opts.value?.map(readValueAsJson);

    const arr = json.get(key) as unknown[];

    if (!Array.isArray(arr)) {
        throw new Error(`The key "${key}" is not an array.`);
    }

    arr.unshift(...(values as unknown[]));
    json.set(key, arr);
    json.save();
}

export function push(opts: OptionValues, self: Command): void {
    const { json } = prep(self);

    const key = opts.key as string;
    const values = opts.value?.map(readValueAsJson);

    const arr = json.get(key) as unknown[];

    if (!Array.isArray(arr)) {
        throw new Error(`The key "${key}" is not an array.`);
    }

    arr.push(...(values as unknown[]));
    json.set(key, arr);
    json.save();
}

export function remove(opts: OptionValues, self: Command): void {
    const { json } = prep(self);

    const keys = opts.key as string[];

    for (const key of keys) {
        json.unset(key);
    }

    json.save();
}
