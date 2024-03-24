const fs = require("fs");
const { fetchSource, saveLog, cloneRepo } = require("../utils/spawnCommand");
const { syncSource } = require("../utils");

const currentPath = "./";

const initProject = async () => {
  const files = fs.readdirSync(currentPath);
  let existProject = false;

  files.forEach((file) => {
    if (fs.statSync(file).isDirectory()) {
      if (file === (process.env.PROJECT_NAME || "DB-GPT")) {
        existProject = true;
      }
    }
  });

  if (existProject) {
    await fetchSource();

    await syncSource();

    saveLog("=========项目启动成功!=========");
  } else {
    await cloneRepo();
    // 同步mdx资源
    await syncSource();

    saveLog("=========项目启动成功!=========");
  }
};

module.exports = initProject;
