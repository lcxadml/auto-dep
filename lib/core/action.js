const { promisify } = require("util");
const { commandSpawn } = require("../utils/terminal");

const createProjectAction = async (project) => {
  // 1. 执行git pull
  await commandSpawn("git", ["pull"], { cwd: "./DB-GPT" });
  // 2. 复制docs内容到docs项目
  await commandSpawn("cp", ["-r", `./DB-GPT/docs/docs/*`, `../Docs/docs`], {
    shell: true,
  });
  // 3. 重新执行install
  await commandSpawn("npm", ["install"], {
    cwd: "../Docs",
  });
  // 3. 重新执行build
  await commandSpawn("npm", ["run", "build"], {
    cwd: "../Docs",
  });
};

module.exports = {
  createProjectAction,
};
