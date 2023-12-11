const core = require('@actions/core');

const input = core.getInput('env');

console.log('env', input);