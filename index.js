const Koa = require("koa");
const Router = require("koa-router");
const { createProjectAction } = require("./lib/core/action");
const initProject = require("./lib/core/initProject");
const { publishNewVersion } = require("./lib/core/action");
const { logger } = require("./lib/utils/terminal");
const bodyParser = require("koa-bodyparser");
const { saveLog } = require("./lib/utils/spawnCommand");

require("dotenv").config();

const app = new Koa();
var router = new Router();

app.use(bodyParser());

router.get("/deploy", async (ctx, next) => {
  try {
    await createProjectAction();
    logger.info("Automatic deployment code successful");
  } catch (error) {
    logger.error(`Automatic deployment code fail: ${error}`);
  }

  ctx.body = "GET Publish Success!";
});

router.post("/deploy", async (ctx, next) => {
  try {
    await createProjectAction();
    logger.info("Automatic deployment code successful");
  } catch (error) {
    logger.info(`Automatic deployment code fail: ${error}`);
  }

  ctx.body = "POST Publish Success!";
});

router.get("/publish", async (ctx, next) => {
  const tag = ctx?.request?.tag;

  // refs/tags/v0.4.5
  if (!tag) {
    saveLog(`tag is null time, get request`);
    ctx.body = "Publish Fail!";
    return;
  }
  const curVersion = tag.split("/")[2] || tag;

  await publishNewVersion(curVersion);
  logger.info(`publish success Tag: ${curVersion}`);
  ctx.body = "GET Success!";
});

router.post("/publish", async (ctx, next) => {
  const tag = ctx?.request.body?.tag;

  if (!tag) {
    saveLog(`tag is null time post request!`);
    ctx.body = "Publish Fail!";
    return;
  }

  const curVersion = tag.split("/")[2] || tag;

  try {
    await publishNewVersion(curVersion);
    logger.info(`versions ${curVersion} successful release!`);
  } catch (error) {
    logger.error(`versions ${curVersion} fail release, reason: ${error}`);
  }
  ctx.body = ctx?.request.body;
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(process.env.APP_PORT, async () => {
  try {
    await initProject();
    logger.info(
      `Service started successfully: http://localhost:${process.env.APP_PORT}`
    );
  } catch (error) {
    logger.error("Service started fail: ", error);
  }
});
