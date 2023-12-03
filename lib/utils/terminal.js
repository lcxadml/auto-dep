/**
 * 执行终端命令
 */
const { spawn } = require("child_process");

const commandSpawn = (...args) => {
  return new Promise((resolve, reject) => {
    const childrenProcess = spawn(...args);
    childrenProcess.stdout.pipe(process.stdout);
    childrenProcess.stderr.pipe(process.stderr);
    childrenProcess.on("close", () => {
      resolve();
    });
  });
};

module.exports = {
  commandSpawn,
};
