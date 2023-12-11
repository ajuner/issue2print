import core from "@actions/core";

const action = core.getInput("action");
const issue = core.getInput("issue");
const repo = core.getInput("repo");

console.log("action", action);
console.log("issue", issue);
console.log("repo", repo);
