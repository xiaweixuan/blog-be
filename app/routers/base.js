const Router = require('koa-router');
const path = require('path');
const authenticateToken = require('../middleware/authenticate');
const router = new Router();

const baseUrl = "/api";
const authenticity = authenticateToken({ secret: process.env.JWT_SECRET });

router.get(`${baseUrl}`, (ctx) => {
  // ctx.body = {
  //   success: true,
  //   data: "hello, this api is right",
  // };
  // ctx.status = 200;
})
router.get(`/theme`, (ctx) => {
  const theme = ctx.request.query.theme;
  console.log(theme)
  ctx.cookies.set('theme', theme);
  ctx.status = 301;
  ctx.redirect('../../index.html');
  ctx.body = {
    data: { message: "Hi there.", version: process.env.IMAGE_TAG },
  };
});
router.get(`${baseUrl}/2`, (ctx) => {
  ctx.status = 202;
  ctx.body = {
    data: { message: "Hi there.", version: process.env.IMAGE_TAG },
  };
});


module.exports = router;

