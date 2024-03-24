const { logger, commandSpawn } = require("./terminal");
const chalk = require("chalk");
const fs = require("fs");

const saveLog = (message) => {
  const isStr = typeof message === "string";

  logger.info(message);

  isStr && console.log(chalk.whiteBright.bold.bgGreen(message));
};

const errLog = (message) => {
  const isStr = typeof message === "string";

  logger.error(message);

  isStr && console.log(chalk.whiteBright.bold.redBright(message));
};

const copySource = async (source, target, message) => {
  saveLog(message);

  await commandSpawn("cp", ["-r", source, target], {
    shell: true,
  });

  logger.info(`cp -r ${source} ${target}!`);
};

const delSource = async (path) => {
  await commandSpawn("rm", ["-rf", path], {
    shell: true,
  });
};

const saveSource2Git = async () => {
  try {
    saveLog("=========push Code To Git...=========");
    await commandSpawn("git", ["add", "."]);
    await commandSpawn("git", ["commit", "-m", "script auto sync code"]);
    await commandSpawn("git", ["push"]);
    saveLog("=========push Code To Git Success=========");
  } catch (error) {
    errLog("=========push Code To Git Fail!=========");
  }
};

const fetchSource = async () => {
  saveLog("=========Pull Code...=========");

  await commandSpawn("git", ["pull"], {
    cwd: `./${process.env.PROJECT_NAME}`,
  });
};

const cloneRepo = async () => {
  saveLog("=========Clone Code...=========");

  await commandSpawn("git", ["clone", process.env.PROJECT_REPO]);
};

const copySliderBar = () => {
  const source = "./DB-GPT/docs/sidebars.js";
  const target = "./sidebars.ts";
  saveLog("=========copy sliderBar...=========");

  fs.readFile(source, "utf-8", (err, data) => {
    if (err) {
      return errLog(err);
    }
    fs.writeFile(target, data, (err) => {
      if (err) {
        errLog(err);
      }
    });
  });
};

const triggerBuild = async () => {
  saveLog("=========build...=========");

  try {
    await commandSpawn("npm", ["run", "build"], {
      cwd: process.env.FRONT_END_DIRECTION || "./",
    });
  } catch (error) {
    errLog(error);
    throw new Error(error);
  }

  try {
    await copySource(
      `${process.env.FRONT_END_DIRECTION}build`,
      `${process.env.FRONT_END_DIRECTION}build-nginx`,
      "=====copy Build to Build-Nginx success!"
    );
  } catch (error) {
    errLog(err);
  }
};

const updateVersion = async (version) => {
  saveLog(`npm run docusaurus docs:version ${version}...`);
  await commandSpawn("npm", ["run", "docusaurus", "docs:version", version], {
    cwd: `./${process.env.PROJECT_NAME}`,
  });
};

module.exports = {
  saveLog,
  copySource,
  fetchSource,
  cloneRepo,
  copySliderBar,
  triggerBuild,
  updateVersion,
  delSource,
  saveSource2Git,
};
