import {createReadStream, ReadStream} from "fs";
import process from "process";
import {Account} from "./myTypes";
import {mergeAccounts} from "./myFunctions";

export const app = () => {
  process.stdout.write("\nEnter path of json file:  ");

  process.stdin.setEncoding("utf8");

  process.stdin.on("readable", () => {
    // Read input
    const input: string = process.stdin.read();
    const path = input.trim();
    const chunks: Array<string | Buffer> = [];

    // Open up a readable stream and pass the path of the file
    const readStream: ReadStream = createReadStream(path, {
      encoding: "utf-8",
    });

    // Handle stream events: data, end, close, and error

    // Push new chunk received to chunks array
    readStream.on("data", (chunk) => {
      chunks.push(chunk);
    });

    // Fill data, convert json to object and merge accounts.
    readStream.on("end", () => {
      const data: string = chunks.join("");
      const accounts: Account[] = JSON.parse(data);
      mergeAccounts(accounts);
    });

    readStream.on("close", () => {
      process.exit();
    });

    readStream.on("error", (err) => {
      process.stdout.write(`\nOh Oh! Error!: ${err.message}`);
      process.exitCode = 1;
    });
  });

  process.on("exit", (code) => {
    switch (code) {
      case 0:
        process.stdout.write(`\n\nApplication exited successfully\n`);
        break;
      case 1:
        process.stdout.write(`\n\nApplication exited with errors\n`);
        break;
      default:
        process.stdout.write(`\n\nApplication exited with code: ${code}\n`);
    }
  });
};
