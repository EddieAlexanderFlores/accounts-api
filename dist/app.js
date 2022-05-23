"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const fs_1 = require("fs");
const process_1 = __importDefault(require("process"));
const myFunctions_1 = require("./myFunctions");
const app = () => {
    process_1.default.stdout.write("\nEnter path of json file:  ");
    process_1.default.stdin.setEncoding("utf8");
    process_1.default.stdin.on("readable", () => {
        // Read input
        const input = process_1.default.stdin.read();
        const path = input.trim();
        const chunks = [];
        // Open up a readable stream and pass the path of the file
        const readStream = (0, fs_1.createReadStream)(path, {
            encoding: "utf-8",
        });
        // Handle stream events: data, end, close, and error
        // Push new chunk received to chunks array
        readStream.on("data", (chunk) => {
            chunks.push(chunk);
        });
        // Fill data, convert json to object and merge accounts.
        readStream.on("end", () => {
            const data = chunks.join("");
            const accounts = JSON.parse(data);
            (0, myFunctions_1.mergeAccounts)(accounts);
        });
        readStream.on("close", () => {
            process_1.default.exit();
        });
        readStream.on("error", (err) => {
            process_1.default.stdout.write(`\nOh Oh! Error!: ${err.message}`);
            process_1.default.exitCode = 1;
        });
    });
    process_1.default.on("exit", (code) => {
        switch (code) {
            case 0:
                process_1.default.stdout.write(`\n\nApplication exited successfully\n`);
                break;
            case 1:
                process_1.default.stdout.write(`\n\nApplication exited with errors\n`);
                break;
            default:
                process_1.default.stdout.write(`\n\nApplication exited with code: ${code}\n`);
        }
    });
};
exports.app = app;
