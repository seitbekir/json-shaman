# JSON Shaman

A powerful CLI tool for working with JSON data.

## Installation

```bash
npm install -g json-shaman
```

## Usage

```bash
jsons [command] [options]
```

## Commands

```
$ jsons --help

Usage: jsons [options] [command]

A CLI tool for manipulating JSON data

Options:
  -V, --version         output the version number
  -f, --file <path>     Path to the JSON file
  -o, --output <style>  (choices: "quiet", "key-value", "json", default: "key-value")
  -h, --help            display help for command

Commands:
  get [options]         Read a value from the JSON file by key
  set [options]         Set a value in the JSON file by key
  shift [options]       Shift a value from an array in the JSON file
  pop [options]         Pop a value from an array in the JSON file
  unshift [options]     Unshift a value to an array in the JSON file
  push [options]        Push a value to an array in the JSON file
  remove [options]      Remove a key from the JSON file
  help [command]        display help for command
```

## Examples

```bash
# Get a value by key
jsons get -f data.json -k user.name

# Set a value by key
jsons set -f data.json -k user.age -v 30

# Push a value to an array
jsons push -f data.json -k user.hobbies -v "coding"
```
