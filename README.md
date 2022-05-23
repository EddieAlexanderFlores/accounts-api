# FEVO assignment completed By Eddie A. Flores

API is implemented in TypeScript. This API uses command-line interface that outputs to stdout. It accepts input from stdin.

Given a listing of accounts, from a variety of applications, this API merges the accounts to create a listing of people.

API reads and parses the accounts.json file attached, merges the accounts, prints the merged accounts to the console in Json structure.

If two accounts share an email then they were created by the same person.

## Installation

Do a "npm install". This will install TypeScript and @types/node.

## `npm run start` or `node dist/index`

Runs the app.

## `npm run dev`

Compiles TypeScript automatically every time you save the file changes. It uses "tsc --watch".

## CLI Instructions

Follow them. ex: "Enter path of json file: src/accounts.json" or you can choose your own json file that follows the original json structure shown in the next section, but you must enter the full path.

## Original JSON Structure

[{ application: number, emails: [string], name: string }]

## Logic

Steps:

- Set up each account in the json file. Add a new property "belongsTo" with a unique value.

ex: Original Object: { "application": 1, "emails": ["a@gmail.com", "b@gmail.com"], "name": "A"}

=> Updated Object: { "application": 1, "emails": ["a@gmail.com", "b@gmail.com"], "name": "A", "belongsTo": 0}

Initially each account has a unique value in the "belongsTo" property.

ex: Updated JSON: [{..., belongsTo: 0}, {..., belongsTo: 1}, {..., belongsTo: 2}, {..., belongsTo: 3}, {..., belongsTo: 4}]

- Link accounts. If accounts share an email, then they belong to the same person. Those accounts that belong to the same person will have the same value in the "belongsTo" property.

ex: [{..., belongsTo: 0}, {..., belongsTo: 5}, {..., belongsTo: 0}, {..., belongsTo: 5}, {..., belongsTo: 0}, {..., belongsTo: 2}]

The ones with the number 0 belong to one person. The ones with the number 5 belong to another person, and so on.

- Merge all accounts that share the same "belongsTo" value. When merging only one name value gets picked.

ex: [{..., belongsTo: 0}, {..., belongsTo: 5}, {..., belongsTo: 2}]

In the end the JSON structure becomes => [{ application: [number], emails: [string], name: string }]
