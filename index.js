const core = require("@actions/core");
const iconv = require("iconv-lite");
const escpos = require("node-escpos-win");
const usb = escpos.GetDeviceList("USB");
const list = usb.list.filter(
  (item) => item.service === "usbprint" || item.name === "USB 打印支持"
);
const printer = list[0];

if (!printer) {
  console.warn("没有连接usb打印机");
  return;
}

const action = core.getInput("action");
const issue = core.getInput("issue");
const repo = core.getInput("repo");

console.log("action", action);
console.log("issue", issue);
console.log("repo", repo);

const cmds = [
  "SIZE 45 mm,60 mm",
  "GAP 2 mm,0 mm",
  "DENSITY 15",
  "SPEED 4",
  "DIRECTION 1",
  "CLS",
];

const actionText = {
  opened: `有新的issue #${issue.number}`,
  closed: `issue #${issue.number} 已关闭`,
  reopened: `issue #${issue.number} 已重新打开`,
  edited: `issue #${issue.number} 有更新`,
  assigned: `issue #${issue.number} 已分配`,
  unassigned: `issue #${issue.number} 已取消分配`,
};

cmds.push(`TEXT 0,20,"TSS24.BF2",0,1,1,"${actionText[action]}"`);
cmds.push(`TEXT 0,60,"TSS24.BF2",0,2,2,"${issue.title}"`);
if (!!issue?.assignees?.length) {
  const logins = issue.assignees.map((item) => item.login).join("、");
  cmds.push(`TEXT 0,120,"TSS24.BF2",0,1,1,"任务分配者：${logins}"`);
}
cmds.push("PRINT 1", "");

const content = iconv.encode(cmds.join("\r\n"), "gbk");

const res = escpos.Print(printer.path, content);

console.log(res);
