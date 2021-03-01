const { resolve } = require('path');
const convertCooike = require('./cookie');
const send = require('./send');

function statics(opts = { root: '' }) {
  opts.root = resolve(opts.root);
  // 是否需要等待其他请求
  if (opts.defer !== true) {
    // 如果需要等待其他请求
    return async function statics(ctx, next) {
      let done = false;
      if (ctx.method === 'HEAD' || ctx.method === 'GET') {
        try {
          const theme = await convertCooike(ctx);
          console.log(theme)
          await send(ctx, `/${theme}${ctx.path}`, opts);
          done = true;
        } catch (err) {
          if (err.status !== 404) {
            throw err;
          }
        }
      }

      if (!done) {
        await next();
      }
    };
  } else {
    // 如果不需要等待其他请求
    return async function statics(ctx, next) {

      await next();

      if (ctx.method !== 'HEAD' && ctx.method !== 'GET') {
        return;
      }

      if (ctx.body != null || ctx.status !== 404) {
        return;
      }

      try {
        const theme = await convertCooike(ctx);
        await send(ctx, `/${theme}${ctx.path}`, opts);
      } catch (err) {
        if (err.status !== 404) {
          throw err;
        }
      }
    };
  }
}

module.exports = statics;