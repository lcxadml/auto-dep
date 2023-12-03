const program = require("commander");
const Koa = require("koa");
const { createProjectAction } = require("./lib/core/action");

const app = new Koa();
app.use(async (ctx) => {
  await createProjectAction();
  ctx.body = "Success!";
});

app.listen(3000);
