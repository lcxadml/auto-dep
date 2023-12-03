const { commandSpawn } = require("../utils/terminal");
const fs = require("fs");
const currentPath = "./";

const initProject = () => {
  let existProject = false;
  const files = fs.readdirSync(currentPath);
  files.forEach((file) => {
    if (fs.statSync(file).isDirectory()) {
      if (file === (process.env.PROJECT_NAME || "DB-GPT")) {
        existProject = true;
      }
    }
  });
  if (existProject) {
    commandSpawn("git", ["pull"], { cwd: `./${process.env.PROJECT_NAME}` });
  } else {
    commandSpawn("git", ["clone", process.env.PROJECT_REPO]);
  }
};

module.exports = initProject;
