const { syncSource } = require("../utils");

const { saveVersion, getVersion, delVersion } = require("./versionControl");
const {
  fetchSource,
  saveLog,
  triggerBuild,
  updateVersion,
  saveSource2Git,
} = require("../utils/spawnCommand");

const createProjectAction = async () => {
  await fetchSource();
  await syncSource();
  await triggerBuild();
  await saveSource2Git();

  saveLog("=========success deploy!=========");
};

const publishNewVersion = async (version) => {
  if (!version) {
    return null;
  }

  saveLog("=========publish Version...=========");

  // 保留最近6个版本
  await delVersion(6);

  // 1. 获取上一版本号
  const curVersion = await getVersion();
  // 2. 保存当前版本号
  await saveVersion(version);
  saveLog(`save current Version: ${version}...`);

  await updateVersion(curVersion);

  await fetchSource();
  await syncSource();
  await triggerBuild();
  await saveSource2Git();
  saveLog("=========publish Version Success=========");
};

module.exports = {
  createProjectAction,
  publishNewVersion,
};
