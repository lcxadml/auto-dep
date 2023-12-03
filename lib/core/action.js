const { commandSpawn } = require("../utils/terminal");
const chalk = require("chalk");

const createProjectAction = async () => {
  console.log(chalk.whiteBright.bold.bgGreen("=========pull code...========="));
  // 1. 执行git pull
  await commandSpawn("git", ["pull"], { cwd: "./DB-GPT" });

  console.log(chalk.whiteBright.bold.bgGreen("=========copy code...========="));
  // 2. 复制docs内容到docs项目
  await commandSpawn("cp", ["-r", `./DB-GPT/docs/docs/*`, `../Docs/docs`], {
    shell: true,
  });

  console.log(chalk.whiteBright.bold.bgGreen("=========install...========="));
  // 3. 重新执行install
  await commandSpawn("npm", ["install"], {
    cwd: "../Docs",
  });

  console.log(chalk.whiteBright.bold.bgGreen("=========build...========="));
  // 3. 重新执行build
  await commandSpawn("npm", ["run", "build"], {
    cwd: "../Docs",
  });
  
  console.log(
    chalk.whiteBright.bold.bgGreen("=========success deploy!=========")
  );
};

module.exports = {
  createProjectAction,
};
