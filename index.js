const Koa = require("koa");
const Router = require("koa-router");
const { createProjectAction } = require("./lib/core/action");
const initProject = require("./lib/core/initProject");

require("dotenv").config();

const app = new Koa();
var router = new Router();

router.get("/deploy", async (ctx, next) => {
  await createProjectAction();
  ctx.body = "GET Success!";
});

router.post("/deploy", async (ctx, next) => {
  await createProjectAction();
  ctx.body = "POST Success!";
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  initProject();
  console.log("Service started successfully: ", 3000);
});
