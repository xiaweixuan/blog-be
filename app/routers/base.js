const Router = require('koa-router');
const path = require('path');
const { uploadFile, deleteFile } = require('../util/file');
const router = new Router();

const baseUrl = "/api";

router.get(`${baseUrl}`, (ctx) => {
  ctx.body = {
    success: true,
    data: "hello, this api is right",
  };
  ctx.status = 200;
})
router.get(`${baseUrl}/1`, (ctx) => {
  // const theme = ctx.request.query.theme;
  // ctx.cookies.set('theme', theme);
  // ctx.status = 301;    
  // ctx.redirect('../../index.html');
  // ctx.body = {
  //   data: { message: "Hi there.", version: process.env.IMAGE_TAG },
  // };
});



const uploadDir = path.join(__dirname, '../../resourceStatic/');

router.post(`${baseUrl}/uploadFile`, async (ctx) => {
  const file = ctx.request.files.file;
  const res = uploadFile(file, uploadDir);

  // const res = deleteFile(uploadDir, '1614514832899_工作照.jpg')

  ctx.body = {
    success: true,
    data: res,
  };
});

module.exports = router;

