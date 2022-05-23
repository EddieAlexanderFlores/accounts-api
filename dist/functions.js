"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeAccounts = void 0;
const mergeAccounts = (accounts) => {
    const label = "\nmerge completed in";
    console.time(label);
    start(accounts);
    console.timeEnd(label);
};
exports.mergeAccounts = mergeAccounts;
const start = (accounts) => {
    let updatedAccount = [];
    let currentIndex = 0;
    let nextIndex = currentIndex + 3;
    let length = accounts.length;
    let merging = true;
    // while (merging) {
    //   // type
    //   const currentEmailSet = new Set(accounts[currentIndex].emails);
    //   const nextEmailSet = new Set(accounts[nextIndex].emails);
    // }
    const currentEmailSet = new Set(accounts[currentIndex].emails);
    const nextEmailSet = new Set(accounts[nextIndex].emails);
    const result = hasIntersection(currentEmailSet, nextEmailSet);
    console.log("result:", result);
};
const hasIntersection = (setA, setB) => {
    for (const element of setB) {
        if (setA.has(element))
            return true;
    }
    return false;
};
