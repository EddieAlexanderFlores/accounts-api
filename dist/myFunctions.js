"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeAccounts = void 0;
const process_1 = __importDefault(require("process"));
/**
 * Merges accounts by comparing emails of all the accounts.
 * @param accounts The accounts to merge.
 */
const mergeAccounts = (accounts) => {
    const label = "\nmerge completed in";
    console.time(label);
    const mergedAccounts = start(accounts);
    console.timeEnd(label);
    process_1.default.stdout.write("\n# of Accounts: " + mergedAccounts.length);
    process_1.default.stdout.write("\n\nAccounts merged:\n" + JSON.stringify(mergedAccounts, null, "  "));
};
exports.mergeAccounts = mergeAccounts;
/**
 * Starts the merging process by first setting each account with a new common key, "belongsTo", and a unique value for each
 * account starting from zero. Then, it links all accounts by comparing and matching emails. Accounts with matching emails will have the
 * same value
 * ```js
 * ex:
 * [{application: 1, emails: [a@mail.com], belongsTo: 0},
 * {application: 4, emails: [a@mail.com, b@mail.com], belongsTo: 0}]
 * ```
 * Finally, it merges accounts based on their common property "belongsTo" value;
 * @param accounts The accounts to merge.
 * @returns The merged accounts withouth the "belongsTo" property.
 */
const start = (accounts) => {
    let updatedAccounts = setAccounts(accounts);
    updatedAccounts = linkAccounts(updatedAccounts);
    const mergedAccounts = merge(updatedAccounts);
    return mergedAccounts;
};
/**
 * Adds a new common key to all accounts and each one with a unique value starting from zero.
 * ```js
 * [{..., belongsTo: 0}, {..., belongsTo: 1}, {..., belongsTo: 2}, {..., belongsTo: 3}, {..., belongsTo: 4}]
 * ```
 * @param accounts The accounts to merge.
 * @returns The extended accounts with the new key and values.
 */
const setAccounts = (accounts) => {
    const updatedAccounts = [];
    for (let i = 0; i < accounts.length; i++) {
        const account = accounts[i];
        updatedAccounts.push(Object.assign(Object.assign({}, account), { belongsTo: i }));
    }
    return updatedAccounts;
};
/**
 * Links accounts by matching their emails and assigning a common value to the "belongsTo" key.
 * ```js
 * ex:
 * [{..., belongsTo: 0}, {..., belongsTo: 5}, {..., belongsTo: 0}, {..., belongsTo: 5}, {..., belongsTo: 0}]
 * ```
 * @param updatedAccounts The extended accounts with the new key and values.
 * @returns The extended linked accounts.
 */
const linkAccounts = (updatedAccounts) => {
    for (let i = 0; i < updatedAccounts.length; i++) {
        // Start with the first account in the array.
        const currentAccount = updatedAccounts[i];
        const currentEmailSet = new Set(updatedAccounts[i].emails);
        for (let j = 1; j < updatedAccounts.length; j++) {
            // Compare account A with account B
            const nextAccount = updatedAccounts[j];
            const nextEmailSet = new Set(updatedAccounts[j].emails);
            // Check if accounts A and B have at least one common email address.
            const result = hasIntersection(currentEmailSet, nextEmailSet);
            if (result) {
                // Account A's belongsTo is less than account B's belongsTo.
                if (currentAccount.belongsTo < nextAccount.belongsTo) {
                    // Therefore, assign account A's belongsTo to account B's belongsTo.
                    nextAccount.belongsTo = currentAccount.belongsTo;
                    // Update the updatedAccounts array.
                    updatedAccounts[j] = nextAccount;
                    // Account A's belongsTo is greater than account B's belongsTo.
                }
                else if (currentAccount.belongsTo > nextAccount.belongsTo) {
                    // Therefore, assign account B's belongsTo to account A's belongsTo.
                    currentAccount.belongsTo = nextAccount.belongsTo;
                    // Update the updatedAccounts array.
                    updatedAccounts[i] = currentAccount;
                }
            }
        }
    }
    return updatedAccounts;
};
/**
 * Checks if there's at least one common email.
 * @param setA First set of emails.
 * @param setB Second set of emails.
 * @returns true if there's at least one common email. Otherwise, false.
 */
const hasIntersection = (setA, setB) => {
    for (const element of setB) {
        if (setA.has(element))
            return true;
    }
    return false;
};
/**
 * Merges accounts by matching "belongsTo" values of each account. Accounts that belong to the same owner are merged with updated values of
 * each of its properties. If the account has multiple names, only one is chosen. All other duplicate values are removed. Two arrays are used
 * for merging: merged accounts are moved into one array and the other ones are moved to another array.
 * @param updatedAccounts The extended accounts with new property "belongsTo" to merge.
 * @returns The merged accounts without the "belongsTo" property.
 */
const merge = (updatedAccounts) => {
    const mergedAccounts = [];
    // The length of updatedAccounts decreases as the merging continues. When length is 0, merging is completed.
    while (updatedAccounts.length > 0) {
        const toBeFiltered = [];
        const person = { applications: [], emails: [], name: "" };
        // Always get the first account in the updatedAccounts array, record its "belongsTo" value for matching, and record the other
        // properties' values to the Person object.
        const index = 0;
        const valueToMatch = updatedAccounts[index].belongsTo;
        person.applications = [updatedAccounts[index].application];
        person.emails = updatedAccounts[index].emails;
        person.name = updatedAccounts[index].name;
        // Check if the rest of the accounts' "belongsTo" values match the first account's "belongsTo" value.
        for (let j = 1; j < updatedAccounts.length; j++) {
            const account = updatedAccounts[j];
            // Match found. This account belongs to the first one.
            if (account.belongsTo === valueToMatch) {
                // Edit the first account, add new values, and remove duplicates with "new Set()" function. No need to update the name since
                // the first one was chosen.
                person.applications = [
                    ...new Set([...person.applications, account.application]),
                ];
                person.emails = [...new Set([...person.emails, ...account.emails])];
                // No match. Send this account to the new array "toBeFiltered".
            }
            else {
                toBeFiltered.push(account);
            }
        }
        // Add this person with updated values to the mergedAccounts array.
        mergedAccounts.push(person);
        // Set the toBeFiltered accounts to the updatedAccounts. The length of updatedAccounts has decreased.
        updatedAccounts = toBeFiltered;
    }
    return mergedAccounts;
};
