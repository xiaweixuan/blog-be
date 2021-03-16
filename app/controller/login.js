const { createToken } = require('../util/token')

class LoginController {

  async signIn(ctx) {
    const { user, password } = ctx.query;
    if (user !== process.env.ADMIN_USER || password !== process.env.ADMIN_PASSWORD) {
      ctx.status = 401;
      ctx.body = {
        data: { message: "密码或用户名错误" },
      };
      return;
    }
    const token = createToken({ username: process.env.ADMIN_USER })
    ctx.set('X-Jwt-Token', token);
    ctx.status = 202;
    ctx.body = {
      data: { success: 1, message: "登录成功", version: process.env.IMAGE_TAG },
    };
  }

  async verifyLogin(ctx) {
    ctx.status = 200;
    ctx.body = {
      data: { success: 1, message: "身份通过" },
    };
  }

  async forgot(ctx) {
  }
}

module.exports = LoginController;