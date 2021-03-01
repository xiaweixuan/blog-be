const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const formidable = require('./middleware/koa-formidable');
const { userAgent } = require('koa-useragent');
const koaJsonError = require('koa-json-error');
const statics = require("./middleware/statics")
const koaStatic = require('koa-static');
const logger = require("./logs/index");
const path = require('path');
const router = require('./routers/base')
const loginRouter = require('./routers/login')
const userRouter = require('./routers/user');
const articleRouter = require('./routers/articles');
const photoRouter = require('./routers/photo');
const audioRouter = require('./routers/audio');
const scriptRouter = require('./routers/script');

const app = new Koa();

// static
app.use(statics({ root: path.join(__dirname, '../themeStatic/') }));
app.use(koaStatic(path.join(__dirname, '../resourceStatic/')));

// Log each successful interaction.
app.use(async (ctx, next) => {
  try {
    await next();
    logger.info(`${ctx.method} ${ctx.url} RESPONSE: ${ctx.response.status}`);
  } catch (error) {
    //
  }
});

// Apply error json handling
const errorOptions = {
  postFormat: (e, obj) => {
    logger.info(obj);
    if (process.env.NODE_ENV !== "production") {
      return obj;
    }
    delete obj.stack;
    delete obj.name;
    return obj;
  },
};
app.use(koaJsonError(errorOptions));

// return response time in X-Response-Time header
// app.use(async function responseTime(ctx, next) {
//   const t1 = Date.now();
//   await next();
//   const t2 = Date.now();
//   ctx.set("X-Response-Time", `${Math.ceil(t2 - t1)}ms`);
// });

// For useragent detection
app.use(userAgent);
app.use(formidable());
app.use(bodyParser());

app.use(router.routes());
app.use(loginRouter.routes());
app.use(userRouter.routes());
app.use(articleRouter.routes());
app.use(photoRouter.routes());
app.use(audioRouter.routes());
app.use(scriptRouter.routes());

module.exports = app;