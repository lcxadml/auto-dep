const { commandSpawn } = require("../utils/terminal");
const chalk = require("chalk");

const createProjectAction = async () => {
  console.log(chalk.whiteBright.bold.bgGreen("=========pull code...========="));
  // 1. 执行git pull
  await commandSpawn("git", ["pull"], { cwd: `./${process.env.PROJECT_NAME}` });

  console.log(chalk.whiteBright.bold.bgGreen("=========1copy code...========="));
  // 2. 复制docs内容到docs项目
  await commandSpawn(
    "cp",
    [
      "-r",
      process.env.COPY_DIRECTION || `./${process.env.PROJECT_NAME}`,
      process.env.TARGET_DIRECTION,
    ],
    {
      shell: true,
    }
  );

  console.log(chalk.whiteBright.bold.bgGreen("=========install...========="));
  // 3. 重新执行install
  await commandSpawn("npm", ["install"], {
    cwd: process.env.FRONT_END_DIRECTION || "../",
  });

  console.log(chalk.whiteBright.bold.bgGreen("=========build...========="));
  // 3. 重新执行build
  await commandSpawn("npm", ["run", "build"], {
    cwd: process.env.FRONT_END_DIRECTION || "../",
  });

  console.log(
    chalk.whiteBright.bold.bgGreen("=========success deploy!=========")
  );
};

module.exports = {
  createProjectAction,
};
