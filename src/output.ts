export type OutputStyle = "quiet" | "key-value" | "json";

export function outputValues(
    values: [string, unknown][],
    style: OutputStyle = "key-value",
): void {
    const resulting = {} as Record<string, unknown>;

    for (const [key, value] of values) {
        if (style === "quiet") {
            console.log(
                typeof value === "string" ? value : JSON.stringify(value),
            );
            continue;
        }

        if (style === "key-value") {
            console.log(`${key}: ${JSON.stringify(value)}`);
            continue;
        }

        // Default to JSON output
        const path = key.split(".");
        path.reduce((obj, segment, index) => {
            if (index === path.length - 1) {
                obj[segment] = value;
            } else {
                if (!obj[segment]) {
                    obj[segment] = {};
                }
            }
            return obj[segment];
        }, resulting as any);
    }

    if (style === "json") {
        console.log(JSON.stringify(resulting, null, 2));
    }
}

export function readValueAsJson(value: string): unknown {
    try {
        return JSON.parse(value);
    } catch {
        return value;
    }
}
