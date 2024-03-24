const fs = require("fs").promises;
const fsSync = require("fs");
const { logger } = require("../utils/terminal");
const { delSource } = require("../utils/spawnCommand");
const { isFileExist } = require("../utils/index");
const filePath = "./version.txt";

const saveVersion = async (version) => {
  const versionPath = "./version.txt";
  if (!version) return;
  await fs.writeFile(versionPath, version);
};

const getVersion = async () => {
  const data = await fs.readFile(filePath, "utf8");
  return data;
};

const getVersionSync = () => {
  const data = fsSync.readFileSync(filePath, {
    encodeURI: "utf8",
  });
  return data;
};

const delVersion = async (count) => {
  const versionPath = "./versions.json";
  // 1. 从version.json中删除

  if (!isFileExist(versionPath)) {
    return;
  }

  const data = await fs.readFile(versionPath, "utf8");

  // 检查文件是否存在

  let delVersion;
  try {
    const versionArr = JSON.parse(data);
    if (!versionArr || versionArr.length < count) {
      return;
    }
    // 获得要删除的版本号
    delVersion = versionArr[versionArr.length - 1];
    const newVersions = versionArr.filter(
      (_, index) => index !== versionArr.length - 1
    );

    // 删除该版本号
    await fs.writeFile(versionPath, JSON.stringify(newVersions, null, 2));
    logger.info(`删除版本号： ${delVersion}成功！`);
  } catch (error) {
    logger.error(`delete version error : ${error}`);
  }

  // 2. 删除版本化文件目录， 比如versioned_docs/versions-
  if (!isFileExist(`./versioned_docs/version-${delVersion}`)) {
    return;
  }

  await delSource(`./versioned_docs/version-${delVersion}`);
  logger.info(`delete versioned_docs!`);

  // 3. 删除本地化侧边栏文件  version-v0.5.1-sidebars
  if (
    !isFileExist(`./versioned_sidebars/version-${delVersion}-sidebars.json`)
  ) {
    return;
  }
  await delSource(`./versioned_sidebars/version-${delVersion}-sidebars.json`);

  logger.info(`delete versioned_sidebars!`);
};

module.exports = {
  saveVersion,
  getVersion,
  getVersionSync,
  delVersion,
};
