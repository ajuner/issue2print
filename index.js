const core = require('@actions/core');

// 当有新建issue并且汇报bug的时候，会触发这个action
// 这个action会把issue的内容，以及issue的评论，以及issue的标签，都打印出来

const input = core.getInput('issue');

console.log('issue', input);