import chalk from "chalk";
import dayjs from "dayjs";
import ora from "ora";
import {EOL} from "os";

export function getOpLog() {
    return {
        info: function(...logs: string[]) {
            process.stdout.write(formatLogs(logs, "info"));
        },
        warn: function(...logs: string[]) {
            process.stdout.write(formatLogs(logs, "warning"));
        },
        error: function(...logs: string[]) {
            process.stdout.write(formatLogs(logs, "error"));
        },
        debug: function(...logs: string[]) {
            process.stdout.write(formatLogs(logs, "debug"));
        },
        waiter: function(text: string) {
            return ora({
                color: "green",
                text: `${text}\n`,
                spinner: "triangle"
            }).start();
        }
    };
}

function formatLogs(logs: string[], level: "info" | "warning" | "error" | "debug") {
    return logs.reduce(function(acc, log) {
        if (level === "info") {
            return `${acc} ${chalk.cyan(log)}`;
        } else if (level === "warning") {
            return `${acc} ${chalk.yellow(log)}`;
        } else if (level === "error") {
            return `${acc} ${chalk.red(log)}`;
        } else {
            return `${acc} ${chalk.gray(log)}`;
        }
    }, chalk.underline.white(`[${dayjs().format("HH:mm:ss")}]`)) + EOL;
}
